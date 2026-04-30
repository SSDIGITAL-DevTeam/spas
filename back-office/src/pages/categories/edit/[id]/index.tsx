import { JSX, useEffect, useState, FormEvent } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import ApiError from "@/errors/ApiError";
import CategoryModule from "@/modules/CategoryModule";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import { Button } from "@nextui-org/react";
import toast from "react-hot-toast";
import { Category } from "@/@types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

type Errors = { name?: string[] };

export default function EditCategory(): JSX.Element {
  const router = useRouter();
  const { setBreadcrumbs } = useBreadcrumb();
  const [category, setCategory] = useState<Category>({} as Category);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    setBreadcrumbs([
      { label: "Dashboard", href: "/" },
      { label: "Categories", href: "/categories" },
      { label: "Edit Category" },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!router.query.id) return;
    const load = async () => {
      setIsLoading(true);
      try {
        const res = await new CategoryModule().single(+router.query.id!);
        setCategory(res.data);
      } catch {
        toast.error("Failed to load category.");
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
      await new CategoryModule().update(new FormData(e.currentTarget), +router.query.id!);
      toast.success("Category updated.");
      router.push("/categories");
    } catch (error) {
      const err = error as ApiError;
      setErrors((err.getValidationErrors?.() as Errors) ?? {});
      toast.error(err.getFirstError?.() ?? "Something went wrong.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner fullPage />;
  }

  return (
    <>
      <Head><title>SPAS | Edit Category</title></Head>

      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-800">Edit Category</h1>
        <p className="text-sm text-slate-500 mt-0.5">Update category name</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              type="text"
              defaultValue={category.name}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name[0]}</p>}
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" color="primary" size="sm" isLoading={isProcessing}>
              Update
            </Button>
            <Button variant="flat" size="sm" onPress={() => router.push("/categories")} isDisabled={isProcessing}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
