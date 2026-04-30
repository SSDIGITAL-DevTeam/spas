import { JSX, useEffect, useState } from "react";
import Head from "next/head";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import ApiError from "@/errors/ApiError";
import { RequestUpdate } from "@/@types";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ImageViewer from "@/components/ui/ImageViewer";
import RequestUpdateModule from "@/modules/RequestUpdateModule";
import toast from "react-hot-toast";

function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-0.5">{label}</p>
      <p className="text-sm text-slate-700">{value || "—"}</p>
    </div>
  );
}

export default function DetailRequestTherapist(): JSX.Element {
  const router = useRouter();
  const { setBreadcrumbs } = useBreadcrumb();
  const [request, setRequest] = useState<RequestUpdate>({} as RequestUpdate);
  const [isLoading, setIsLoading] = useState(true);
  const [isApproving, setIsApproving] = useState(false);

  useEffect(() => {
    setBreadcrumbs([
      { label: "Dashboard", href: "/" },
      { label: "Request Update", href: "/member-request" },
      { label: "Therapist Request" },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!router.query.id) return;
    const load = async () => {
      setIsLoading(true);
      try {
        const res = await new RequestUpdateModule().single(+router.query.id!);
        setRequest(res.data);
      } catch (error) {
        const msg = error instanceof ApiError ? error.getFirstError() : "Failed to load request.";
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
      const token = localStorage.getItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || "");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/request-updates/approve-therapist/${router.query.id}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
        }
      );
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || "Approval failed.");
      }
      toast.success("Therapist request approved.");
      router.push("/member-request");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to approve.");
    } finally {
      setIsApproving(false);
    }
  };

  if (isLoading) return <LoadingSpinner fullPage />;

  return (
    <>
      <Head><title>SPAS | Therapist Update Request</title></Head>

      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Therapist Update Request</h1>
          <p className="text-sm text-slate-500 mt-0.5">{request.name}</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button size="sm" color="danger" variant="flat" onPress={() => toast.error("Reject not yet implemented.")}>
            Reject
          </Button>
          <Button size="sm" color="primary" isLoading={isApproving} onPress={handleApprove}>
            Approve
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Documents */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">Documents</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase mb-2">Profile Photo</p>
              <ImageViewer
                src={request.url_logo_therapist ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${request.url_logo_therapist}` : "/no-image.png"}
                alt={request.name ?? "Profile"}
                className="w-full aspect-square object-cover rounded-lg border border-slate-200"
              />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase mb-2">Certificate</p>
              <ImageViewer
                src={request.professional_certs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${request.professional_certs}` : "/no-image.png"}
                alt="Certificate"
                className="w-full aspect-square object-cover rounded-lg border border-slate-200"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-slate-700 mb-4">Personal Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <InfoRow label="Full Name" value={request.name} />
              <InfoRow label="Passport/Fin No" value={request.passport_finno} />
              <InfoRow label="Date of Birth" value={request.date_of_birth} />
              <InfoRow label="Sex" value={request.sex} />
              <InfoRow label="Contact No" value={request.contact_no} />
              <InfoRow label="Nationality" value={request.nationality} />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-slate-700 mb-4">Certificate Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <InfoRow label="Certificate Name" value={request.name_cert} />
              <InfoRow label="Issuing Organization" value={request.issuing_organization} />
              <InfoRow label="Issue Date" value={request.date_of_issue} />
              <InfoRow label="Expiry Date" value={request.expired_date} />
              <InfoRow label="Credential ID" value={request.credential_id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
