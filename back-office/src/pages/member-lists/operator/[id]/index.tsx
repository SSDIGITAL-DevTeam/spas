import { JSX, useEffect, useState, FormEvent } from "react";
import Head from "next/head";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/router";
import OperatorModule from "@/modules/OperatorModule";
import ApiError from "@/errors/ApiError";
import { Operator } from "@/@types";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import FileInput from "@/components/ui/FileInput";
import ImageViewer from "@/components/ui/ImageViewer";
import toast from "react-hot-toast";

type Errors = {
  company_name?: string[];
  uen_no?: string[];
  brand_name?: string[];
  address?: string[];
  contact_no?: string[];
  contact_person?: string[];
  contact_person_no?: string[];
  email?: string[];
  url?: string[];
};

export default function EditOperator(): JSX.Element {
  const router = useRouter();
  const { setBreadcrumbs } = useBreadcrumb();
  const [operator, setOperator] = useState<Operator>({} as Operator);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    setBreadcrumbs([
      { label: "Dashboard", href: "/" },
      { label: "Member Lists", href: "/member-lists" },
      { label: "Edit Operator" },
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
      } catch {
        toast.error("Failed to load operator.");
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
      await new OperatorModule().update(new FormData(e.currentTarget), +router.query.id!);
      toast.success("Operator updated successfully.");
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
      <Head><title>SPAS | Edit Operator</title></Head>

      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-800">Edit Operator</h1>
        <p className="text-sm text-slate-500 mt-0.5">{operator.company_name}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Logo upload */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-slate-700 mb-4">Company Logo</h2>
            <ImageViewer
              src={operator.cover ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${operator.cover.url}` : "/no-image.png"}
              alt={operator.company_name ?? "Logo"}
              className="w-full aspect-square object-cover rounded-lg border border-slate-200 mb-4"
            />
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Replace Logo</label>
              <FileInput name="url" accept="image/*" />
              {errors.url && <p className="mt-1 text-xs text-red-500">{errors.url[0]}</p>}
            </div>
          </div>

          {/* Fields */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
              <h2 className="text-sm font-semibold text-slate-700 mb-4">Company Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                  <Input variant="bordered" size="sm" name="company_name" defaultValue={operator.company_name} />
                  {errors.company_name && <p className="mt-1 text-xs text-red-500">{errors.company_name[0]}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Brand Name</label>
                  <Input variant="bordered" size="sm" name="brand_name" defaultValue={operator.brand_name} />
                  {errors.brand_name && <p className="mt-1 text-xs text-red-500">{errors.brand_name[0]}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">UEN No</label>
                  <Input variant="bordered" size="sm" name="uen_no" defaultValue={operator.uen_no} />
                  {errors.uen_no && <p className="mt-1 text-xs text-red-500">{errors.uen_no[0]}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <Input variant="bordered" size="sm" name="email" defaultValue={operator.user?.email} />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email[0]}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Contact No</label>
                  <Input variant="bordered" size="sm" name="contact_no" defaultValue={operator.contact_no} />
                  {errors.contact_no && <p className="mt-1 text-xs text-red-500">{errors.contact_no[0]}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Contact Person</label>
                  <Input variant="bordered" size="sm" name="contact_person" defaultValue={operator.contact_person} />
                  {errors.contact_person && <p className="mt-1 text-xs text-red-500">{errors.contact_person[0]}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Contact Person No</label>
                  <Input variant="bordered" size="sm" name="contact_person_no" defaultValue={operator.contact_person_no} />
                  {errors.contact_person_no && <p className="mt-1 text-xs text-red-500">{errors.contact_person_no[0]}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                  <textarea name="address" rows={3} defaultValue={operator.address} className={`${inputClass} resize-none`} />
                  {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address[0]}</p>}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="submit" color="primary" size="sm" isLoading={isProcessing}>Update</Button>
              <Button variant="flat" size="sm" onPress={() => router.push("/member-lists")} isDisabled={isProcessing}>Cancel</Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
