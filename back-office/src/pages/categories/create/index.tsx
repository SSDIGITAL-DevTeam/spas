import { JSX, useEffect, useState, FormEvent } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import ApiError from "@/errors/ApiError";
import CategoryModule from "@/modules/CategoryModule";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import { Button } from "@nextui-org/react";
import toast from "react-hot-toast";

type Errors = { name?: string[] };

export default function CreateCategory(): JSX.Element {
  const router = useRouter();
  const { setBreadcrumbs } = useBreadcrumb();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    setBreadcrumbs([
      { label: "Dashboard", href: "/" },
      { label: "Categories", href: "/categories" },
      { label: "New Category" },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrors({});
    try {
      await new CategoryModule().store(new FormData(e.currentTarget));
      toast.success("Category created.");
      router.push("/categories");
    } catch (error) {
      const err = error as ApiError;
      setErrors((err.getValidationErrors?.() as Errors) ?? {});
      toast.error(err.getFirstError?.() ?? "Something went wrong.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Head><title>SPAS | New Category</title></Head>

      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-800">New Category</h1>
        <p className="text-sm text-slate-500 mt-0.5">Add a new blog category</p>
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
              placeholder="e.g. Wellness"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name[0]}</p>}
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" color="primary" size="sm" isLoading={isProcessing}>
              Save Category
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
