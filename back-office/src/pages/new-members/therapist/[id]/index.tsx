import { JSX, useEffect, useState } from "react";
import Head from "next/head";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import TherapistModule from "@/modules/TherapistModule";
import ApiError from "@/errors/ApiError";
import { Therapist } from "@/@types";
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

export default function DetailTherapist(): JSX.Element {
  const router = useRouter();
  const { setBreadcrumbs } = useBreadcrumb();
  const [therapist, setTherapist] = useState<Therapist>({} as Therapist);
  const [isLoading, setIsLoading] = useState(true);
  const [isApproving, setIsApproving] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  useEffect(() => {
    setBreadcrumbs([
      { label: "Dashboard", href: "/" },
      { label: "New Members", href: "/new-members" },
      { label: "Therapist Detail" },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!router.query.id) return;
    const load = async () => {
      setIsLoading(true);
      try {
        const res = await new TherapistModule().singleTherapist(+router.query.id!);
        setTherapist(res.data);
      } catch (error) {
        const msg = error instanceof ApiError ? error.getFirstError() : "Failed to load therapist.";
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
      await new TherapistModule().update(formData, therapist.id);

      const token = localStorage.getItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || "");
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/send-mail-therapist/${therapist.id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });

      toast.success("Therapist approved and notified by email.");
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
      await new TherapistModule().update(formData, therapist.id);
      toast.success("Therapist rejected.");
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
      <Head><title>SPAS | {therapist.name}</title></Head>

      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">{therapist.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm text-slate-500">Therapist Review</p>
            <StatusBadge status={therapist.status as "pending" | "approve" | "reject"} />
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button size="sm" color="danger" variant="flat" onPress={() => setIsRejectOpen(true)}>Reject</Button>
          <Button size="sm" color="primary" isLoading={isApproving} onPress={handleApprove}>Approve</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Documents */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">Documents</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">Profile Photo</p>
              <ImageViewer
                src={therapist.cover ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${therapist.cover.url}` : "/no-image.png"}
                alt="Profile"
                className="w-full aspect-square object-cover rounded-lg border border-slate-200"
              />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">Certificate</p>
              <ImageViewer
                src={therapist.professional_certs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${therapist.professional_certs}` : "/no-image.png"}
                alt="Certificate"
                className="w-full aspect-square object-cover rounded-lg border border-slate-200"
              />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-slate-700 mb-4">Personal Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <InfoRow label="Full Name" value={therapist.name} />
              <InfoRow label="Email" value={therapist.user?.email} />
              <InfoRow label="Passport/Fin No" value={therapist.passport_finno} />
              <InfoRow label="Date of Birth" value={therapist.date_of_birth} />
              <InfoRow label="Sex" value={therapist.sex} />
              <InfoRow label="Contact No" value={therapist.contact_no} />
              <InfoRow label="Nationality" value={therapist.nationality} />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-slate-700 mb-4">Certificate Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <InfoRow label="Certificate Name" value={therapist.name_cert} />
              <InfoRow label="Issuing Organization" value={therapist.issuing_organization} />
              <InfoRow label="Issue Date" value={therapist.date_of_issue} />
              <InfoRow label="Expiry Date" value={therapist.expired_date} />
              <InfoRow label="Credential ID" value={therapist.credential_id} />
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isRejectOpen}
        onClose={() => setIsRejectOpen(false)}
        onConfirm={handleReject}
        isLoading={isRejecting}
        title="Reject Therapist"
        message="Are you sure you want to reject this therapist registration?"
        confirmLabel="Reject"
        confirmColor="danger"
      />
    </>
  );
}
