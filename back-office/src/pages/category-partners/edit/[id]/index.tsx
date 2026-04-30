import { JSX, useEffect, useState, FormEvent, ChangeEvent } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "@nextui-org/react";
import ApiError from "@/errors/ApiError";
import CategoryPartnerModule from "@/modules/CategoryPartner";
import { CategoryPartner } from "@/@types";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import toast from "react-hot-toast";

type Errors = {
  name?: string[];
  slug?: string[];
};

export default function EditCategoryPartner(): JSX.Element {
  const router = useRouter();
  const { setBreadcrumbs } = useBreadcrumb();
  const [category, setCategory] = useState<CategoryPartner>({} as CategoryPartner);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [slug, setSlug] = useState("");

  useEffect(() => {
    setBreadcrumbs([
      { label: "Dashboard", href: "/" },
      { label: "Category Partners", href: "/category-partners" },
      { label: "Edit Category" },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!router.query.id) return;
    const load = async () => {
      setIsLoading(true);
      try {
        const res = await new CategoryPartnerModule().single(+router.query.id!);
        setCategory(res.data);
        setSlug(res.data.slug ?? "");
      } catch (error) {
        const err = error as ApiError;
        toast.error(err.getFirstError?.() ?? "Failed to load category.");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [router.query.id]);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.value;
    const generated = name.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
    setSlug(generated);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrors({});
    try {
      await new CategoryPartnerModule().update(new FormData(e.currentTarget), +router.query.id!);
      toast.success("Category partner updated.");
      router.push("/category-partners");
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
      <Head><title>SPAS | Edit Category Partner</title></Head>

      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-800">Edit Category Partner</h1>
        <p className="text-sm text-slate-500 mt-0.5">{category.name}</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              type="text"
              defaultValue={category.name}
              className={inputClass}
              onChange={handleNameChange}
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name[0]}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Slug</label>
            <input
              name="slug"
              type="text"
              value={slug}
              readOnly
              className={`${inputClass} bg-slate-50 text-slate-500 cursor-not-allowed`}
            />
            {errors.slug && <p className="mt-1 text-xs text-red-500">{errors.slug[0]}</p>}
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" color="primary" size="sm" isLoading={isProcessing}>Update</Button>
            <Button variant="flat" size="sm" onPress={() => router.push("/category-partners")} isDisabled={isProcessing}>Cancel</Button>
          </div>
        </form>
      </div>
    </>
  );
}
