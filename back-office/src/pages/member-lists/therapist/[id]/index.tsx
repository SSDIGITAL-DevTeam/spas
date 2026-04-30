import { JSX, useEffect, useMemo, useState, FormEvent } from "react";
import Head from "next/head";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/router";
import TherapistModule from "@/modules/TherapistModule";
import ApiError from "@/errors/ApiError";
import { Therapist } from "@/@types";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import FileInput from "@/components/ui/FileInput";
import ImageViewer from "@/components/ui/ImageViewer";
import toast from "react-hot-toast";
import countryList from "react-select-country-list";

type Errors = {
  name?: string[];
  passport_finno?: string[];
  date_of_birth?: string[];
  sex?: string[];
  contact_no?: string[];
  nationality?: string[];
  address?: string[];
  professional_certs?: string[];
  email?: string[];
  name_cert?: string[];
  issuing_organization?: string[];
  date_of_issue?: string[];
  expired_date?: string[];
  credential_id?: string[];
  url?: string[];
};

export default function EditTherapist(): JSX.Element {
  const router = useRouter();
  const { setBreadcrumbs } = useBreadcrumb();
  const [therapist, setTherapist] = useState<Therapist>({} as Therapist);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const countries = useMemo(() => countryList().getData(), []);

  useEffect(() => {
    setBreadcrumbs([
      { label: "Dashboard", href: "/" },
      { label: "Member Lists", href: "/member-lists" },
      { label: "Edit Therapist" },
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
      } catch {
        toast.error("Failed to load therapist.");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [router.query.id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrors({});
    try {
      await new TherapistModule().update(new FormData(e.currentTarget), +router.query.id!);
      toast.success("Therapist updated successfully.");
      router.push("/member-lists");
    } catch (error) {
      const err = error as ApiError;
      setErrors((err.getValidationErrors?.() as Errors) ?? {});
      toast.error(err.getFirstError?.() ?? "Something went wrong.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) return <LoadingSpinner fullPage />;

  const inputClass = "w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary";

  return (
    <>
      <Head><title>SPAS | Edit Therapist</title></Head>

      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-800">Edit Therapist</h1>
        <p className="text-sm text-slate-500 mt-0.5">{therapist.name}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Info */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 space-y-4">
            <h2 className="text-sm font-semibold text-slate-700">Personal Information</h2>

            {/* Profile picture */}
            <div>
              <ImageViewer
                src={therapist.cover ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${therapist.cover.url}` : "/no-image.png"}
                alt={therapist.name ?? "Profile"}
                className="w-24 h-24 rounded-full object-cover border border-slate-200 mb-2"
              />
              <label className="block text-xs font-medium text-slate-500 mb-1">Replace Profile Photo</label>
              <FileInput name="url" accept="image/*" />
              {errors.url && <p className="mt-1 text-xs text-red-500">{errors.url[0]}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <Input variant="bordered" size="sm" name="name" defaultValue={therapist.name} />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name[0]}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Passport/Fin No</label>
                <Input variant="bordered" size="sm" name="passport_finno" defaultValue={therapist.passport_finno} />
                {errors.passport_finno && <p className="mt-1 text-xs text-red-500">{errors.passport_finno[0]}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <Input variant="bordered" size="sm" name="email" defaultValue={therapist.user?.email} />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email[0]}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
                <input name="date_of_birth" type="date" defaultValue={therapist.date_of_birth?.split(" ")[0]} className={inputClass} />
                {errors.date_of_birth && <p className="mt-1 text-xs text-red-500">{errors.date_of_birth[0]}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Sex</label>
                <Input variant="bordered" size="sm" name="sex" defaultValue={therapist.sex} />
                {errors.sex && <p className="mt-1 text-xs text-red-500">{errors.sex[0]}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Contact No</label>
                <Input variant="bordered" size="sm" name="contact_no" defaultValue={therapist.contact_no} />
                {errors.contact_no && <p className="mt-1 text-xs text-red-500">{errors.contact_no[0]}</p>}
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Nationality</label>
                <select name="nationality" defaultValue={therapist.nationality || ""} className={inputClass}>
                  <option value="" disabled>Select country</option>
                  {countries.map((c) => (
                    <option key={c.label} value={c.label}>{c.label}</option>
                  ))}
                </select>
                {errors.nationality && <p className="mt-1 text-xs text-red-500">{errors.nationality[0]}</p>}
              </div>
            </div>
          </div>

          {/* Certificate */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 space-y-4">
            <h2 className="text-sm font-semibold text-slate-700">Professional Certificate</h2>

            <div>
              <ImageViewer
                src={therapist.professional_certs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${therapist.professional_certs}` : "/no-image.png"}
                alt="Certificate"
                className="w-full aspect-video object-cover rounded-lg border border-slate-200 mb-2"
              />
              <label className="block text-xs font-medium text-slate-500 mb-1">Replace Certificate</label>
              <FileInput name="professional_certs" accept="image/*" />
              {errors.professional_certs && <p className="mt-1 text-xs text-red-500">{errors.professional_certs[0]}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Certificate Name</label>
                <Input variant="bordered" size="sm" name="name_cert" defaultValue={therapist.name_cert} />
                {errors.name_cert && <p className="mt-1 text-xs text-red-500">{errors.name_cert[0]}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Issuing Organization</label>
                <Input variant="bordered" size="sm" name="issuing_organization" defaultValue={therapist.issuing_organization} />
                {errors.issuing_organization && <p className="mt-1 text-xs text-red-500">{errors.issuing_organization[0]}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Issue Date</label>
                <input name="date_of_issue" type="date" defaultValue={therapist.date_of_issue?.split(" ")[0]} className={inputClass} />
                {errors.date_of_issue && <p className="mt-1 text-xs text-red-500">{errors.date_of_issue[0]}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Expiry Date</label>
                <input name="expired_date" type="date" defaultValue={therapist.expired_date?.split(" ")[0]} className={inputClass} />
                {errors.expired_date && <p className="mt-1 text-xs text-red-500">{errors.expired_date[0]}</p>}
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Credential ID</label>
                <Input variant="bordered" size="sm" name="credential_id" defaultValue={therapist.credential_id} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button type="submit" color="primary" size="sm" isLoading={isProcessing}>Update</Button>
          <Button variant="flat" size="sm" onPress={() => router.push("/member-lists")} isDisabled={isProcessing}>Cancel</Button>
        </div>
      </form>
    </>
  );
}
