import { JSX, useEffect, useState } from "react";
import Head from "next/head";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import OperatorModule from "@/modules/OperatorModule";
import ApiError from "@/errors/ApiError";
import { Operator } from "@/@types";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ConfirmModal from "@/components/ui/ConfirmModal";
import StatusBadge from "@/components/ui/StatusBadge";
import ImageViewer from "@/components/ui/ImageViewer";
import toast from "react-hot-toast";

function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-0.5">{label}</p>
      <p className="text-sm text-slate-700">{value || "—"}</p>
    </div>
  );
}

export default function DetailOperator(): JSX.Element {
  const router = useRouter();
  const { setBreadcrumbs } = useBreadcrumb();
  const [operator, setOperator] = useState<Operator>({} as Operator);
  const [isLoading, setIsLoading] = useState(true);
  const [isApproving, setIsApproving] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  useEffect(() => {
    setBreadcrumbs([
      { label: "Dashboard", href: "/" },
      { label: "New Members", href: "/new-members" },
      { label: "Operator Detail" },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!router.query.id) return;
    const load = async () => {
      setIsLoading(true);
      try {
        const res = await new OperatorModule().singleOperator(+router.query.id!);
        setOperator(res.data);
      } catch (error) {
        const msg = error instanceof ApiError ? error.getFirstError() : "Failed to load operator.";
        toast.error(msg);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [router.query.id]);

  const handleApprove = async () => {
    setIsApproving(true);
    try {
      const formData = new FormData();
      formData.append("status", "approve");
      await new OperatorModule().update(formData, operator.id);

      const token = localStorage.getItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || "");
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/send-mail-operator/${operator.id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });

      toast.success("Operator approved and notified by email.");
      router.push("/member-lists");
    } catch (error) {
      const msg = error instanceof ApiError ? error.getFirstError() : "Failed to approve.";
      toast.error(msg);
    } finally {
      setIsApproving(false);
    }
  };

  const handleReject = async () => {
    setIsRejecting(true);
    try {
      const formData = new FormData();
      formData.append("status", "reject");
      await new OperatorModule().update(formData, operator.id);
      toast.success("Operator rejected.");
      router.push("/new-members");
    } catch (error) {
      const msg = error instanceof ApiError ? error.getFirstError() : "Failed to reject.";
      toast.error(msg);
    } finally {
      setIsRejecting(false);
      setIsRejectOpen(false);
    }
  };

  if (isLoading) return <LoadingSpinner fullPage />;

  return (
    <>
      <Head><title>SPAS | {operator.company_name}</title></Head>

      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">{operator.company_name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm text-slate-500">Operator Review</p>
            <StatusBadge status={operator.status as "pending" | "approve" | "reject"} />
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button size="sm" color="danger" variant="flat" onPress={() => setIsRejectOpen(true)}>
            Reject
          </Button>
          <Button size="sm" color="primary" isLoading={isApproving} onPress={handleApprove}>
            Approve
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Images */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">Documents</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">Company Logo</p>
              <ImageViewer
                src={operator.cover ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${operator.cover.url}` : "/no-image.png"}
                alt="Logo"
                className="w-full aspect-square object-cover rounded-lg border border-slate-200"
              />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">Payment Slip</p>
              <ImageViewer
                src={operator.payment_slip ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${operator.payment_slip}` : "/no-image.png"}
                alt="Payment Slip"
                className="w-full aspect-square object-cover rounded-lg border border-slate-200"
              />
            </div>
          </div>
        </div>

        {/* Company Info */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">Company Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoRow label="Company Name" value={operator.company_name} />
            <InfoRow label="Brand Name" value={operator.brand_name} />
            <InfoRow label="UEN No" value={operator.uen_no} />
            <InfoRow label="Email" value={operator.user?.email} />
            <InfoRow label="Contact No" value={operator.contact_no} />
            <InfoRow label="Contact Person" value={operator.contact_person} />
            <InfoRow label="Contact Person No" value={operator.contact_person_no} />
            <div className="sm:col-span-2">
              <InfoRow label="Address" value={operator.address} />
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isRejectOpen}
        onClose={() => setIsRejectOpen(false)}
        onConfirm={handleReject}
        isLoading={isRejecting}
        title="Reject Operator"
        message="Are you sure you want to reject this operator registration?"
        confirmLabel="Reject"
        confirmColor="danger"
      />
    </>
  );
}
