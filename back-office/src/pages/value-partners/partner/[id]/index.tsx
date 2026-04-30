import { JSX, useEffect, useState, FormEvent } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import ApiError from "@/errors/ApiError";
import ValuePartnerModule from "@/modules/ValuePartnerModule";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import { ValuePartner } from "@/@types";
import { Button } from "@nextui-org/react";
import FileInput from "@/components/ui/FileInput";
import ImageViewer from "@/components/ui/ImageViewer";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

type Errors = {
  logo?: string[];
  brand_name?: string[];
  email?: string[];
  phone_number?: string[];
};

export default function EditValuePartner(): JSX.Element {
  const router = useRouter();
  const { setBreadcrumbs } = useBreadcrumb();
  const [partner, setPartner] = useState<ValuePartner>({} as ValuePartner);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    setBreadcrumbs([
      { label: "Dashboard", href: "/" },
      { label: "Value Partners", href: "/value-partners" },
      { label: "Edit Partner" },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!router.query.id) return;
    const load = async () => {
      setIsLoading(true);
      try {
        const res = await new ValuePartnerModule().single(+router.query.id!);
        setPartner(res.data);
      } catch (error) {
        const err = error as ApiError;
        toast.error(err.getFirstError?.() ?? "Failed to load partner.");
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
      await new ValuePartnerModule().update(new FormData(e.currentTarget), +router.query.id!);
      toast.success("Partner updated.");
      router.push("/value-partners");
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
      <Head><title>SPAS | Edit Value Partner</title></Head>

      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-800">Edit Value Partner</h1>
        <p className="text-sm text-slate-500 mt-0.5">{partner.brand_name}</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Current Logo</label>
            <ImageViewer
              src={partner.logo ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${partner.logo}` : "/no-image.png"}
              alt={partner.brand_name ?? "Logo"}
              className="w-24 h-24 rounded-xl object-cover border border-slate-200 mb-3"
            />
            <label className="block text-sm font-medium text-slate-700 mb-1">Replace Logo</label>
            <FileInput name="logo" accept="image/*" />
            {errors.logo && <p className="mt-1 text-xs text-red-500">{errors.logo[0]}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Brand Name</label>
            <input name="brand_name" type="text" defaultValue={partner.brand_name} className={inputClass} />
            {errors.brand_name && <p className="mt-1 text-xs text-red-500">{errors.brand_name[0]}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input name="email" type="email" defaultValue={partner.email} className={inputClass} />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email[0]}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
              <input name="phone_number" defaultValue={partner.phone_number} className={inputClass} />
              {errors.phone_number && <p className="mt-1 text-xs text-red-500">{errors.phone_number[0]}</p>}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" color="primary" size="sm" isLoading={isProcessing}>Update</Button>
            <Button variant="flat" size="sm" onPress={() => router.push("/value-partners")} isDisabled={isProcessing}>Cancel</Button>
          </div>
        </form>
      </div>
    </>
  );
}
