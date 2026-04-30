import { JSX, useEffect, useState, FormEvent } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import ApiError from "@/errors/ApiError";
import ValuePartnerModule from "@/modules/ValuePartnerModule";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import { useCategoryPartner } from "@/hooks/useCategoryPartner";
import { CategoryPartner } from "@/@types";
import { Button } from "@nextui-org/react";
import FileInput from "@/components/ui/FileInput";
import toast from "react-hot-toast";

type Errors = {
  logo?: string[];
  brand_name?: string[];
  email?: string[];
  phone_number?: string[];
  category_partner_id?: string[];
};

export default function CreateValuePartner(): JSX.Element {
  const router = useRouter();
  const { setBreadcrumbs } = useBreadcrumb();
  const { categoryPartners, fetchCategoryPartner } = useCategoryPartner();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    setBreadcrumbs([
      { label: "Dashboard", href: "/" },
      { label: "Value Partners", href: "/value-partners" },
      { label: "New Partner" },
    ]);
    fetchCategoryPartner("1", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrors({});
    try {
      await new ValuePartnerModule().store(new FormData(e.currentTarget));
      toast.success("Value partner created.");
      router.push("/value-partners");
    } catch (error) {
      const err = error as ApiError;
      setErrors((err.getValidationErrors?.() as Errors) ?? {});
      toast.error(err.getFirstError?.() ?? "Something went wrong.");
    } finally {
      setIsProcessing(false);
    }
  };

  const inputClass = "w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary";

  return (
    <>
      <Head><title>SPAS | New Value Partner</title></Head>

      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-800">New Value Partner</h1>
        <p className="text-sm text-slate-500 mt-0.5">Add a new brand partner</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Category Partner</label>
            <select name="category_partner_id" className={inputClass}>
              <option value="">Select category...</option>
              {categoryPartners?.data?.map((cat: CategoryPartner) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {errors.category_partner_id && <p className="mt-1 text-xs text-red-500">{errors.category_partner_id[0]}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Brand Name <span className="text-red-500">*</span>
            </label>
            <input name="brand_name" type="text" placeholder="Brand name..." className={inputClass} />
            {errors.brand_name && <p className="mt-1 text-xs text-red-500">{errors.brand_name[0]}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input name="email" type="email" placeholder="email@example.com" className={inputClass} />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email[0]}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
              <input name="phone_number" type="text" placeholder="+65 xxxx xxxx" className={inputClass} />
              {errors.phone_number && <p className="mt-1 text-xs text-red-500">{errors.phone_number[0]}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Logo</label>
            <FileInput name="logo" accept="image/jpeg,image/png,image/jpg,image/gif,image/svg+xml" />
            {errors.logo && <p className="mt-1 text-xs text-red-500">{errors.logo[0]}</p>}
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" color="primary" size="sm" isLoading={isProcessing}>Save</Button>
            <Button variant="flat" size="sm" onPress={() => router.push("/value-partners")} isDisabled={isProcessing}>Cancel</Button>
          </div>
        </form>
      </div>
    </>
  );
}
