import { JSX, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Category } from "@/@types";
import CategoryModule from "@/modules/CategoryModule";
import { useCategory } from "@/hooks/useCategory";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import PageHeader from "@/components/ui/PageHeader";
import DataTable from "@/components/ui/DataTable";
import TablePagination from "@/components/ui/TablePagination";
import ConfirmModal from "@/components/ui/ConfirmModal";
import EmptyState from "@/components/ui/EmptyState";
import ApiError from "@/errors/ApiError";
import toast from "react-hot-toast";
import { Input, Button } from "@nextui-org/react";
import Link from "next/link";
import { MdEdit, MdDelete } from "react-icons/md";

export default function Categories(): JSX.Element {
  const router = useRouter();
  const { setBreadcrumbs } = useBreadcrumb();

  const [deleteId, setDeleteId] = useState<number>(0);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const { categories, isCategoryLoading, fetchCategory } = useCategory();

  useEffect(() => {
    setBreadcrumbs([{ label: "Dashboard", href: "/" }, { label: "Categories" }]);
    fetchCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);
    await fetchCategory("1", q);
  };

  const handlePageChange = async (p: number) => {
    setPage(p);
    await fetchCategory(p.toString(), searchQuery);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await new CategoryModule().destroy(deleteId);
      toast.success("Category deleted.");
      await fetchCategory(page.toString(), searchQuery);
    } catch (error) {
      const err = error as ApiError;
      toast.error(err.getFirstError?.() ?? "Failed to delete.");
    } finally {
      setIsDeleting(false);
      setIsDeleteOpen(false);
    }
  };

  const columns = [
    { header: "Name" },
    { header: "Actions", className: "w-32 text-center" },
  ];

  return (
    <>
      <Head><title>SPAS | Categories</title></Head>

      <PageHeader
        title="Categories"
        description="Manage blog categories"
        action={{ label: "Add Category", href: "/categories/create" }}
      />

      <div className="mb-4 w-64">
        <Input
          placeholder="Search categories..."
          variant="bordered"
          size="sm"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <DataTable columns={columns} isLoading={isCategoryLoading}>
        {categories?.data?.length === 0 ? (
          <EmptyState message="No categories found." />
        ) : (
          categories?.data?.map((cat: Category) => (
            <tr key={cat.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-3 text-sm text-slate-700">{cat.name}</td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-center gap-2">
                  <Button
                    as={Link}
                    href={`/categories/edit/${cat.id}`}
                    isIconOnly
                    size="sm"
                    variant="flat"
                    color="primary"
                    aria-label="Edit"
                  >
                    <MdEdit className="w-4 h-4" />
                  </Button>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    color="danger"
                    aria-label="Delete"
                    onPress={() => { setDeleteId(cat.id); setIsDeleteOpen(true); }}
                  >
                    <MdDelete className="w-4 h-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))
        )}
      </DataTable>

      {categories?.meta && (
        <TablePagination meta={categories.meta} onPageChange={handlePageChange} />
      )}

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete Category"
        message="Are you sure you want to delete this category? This action cannot be undone."
      />
    </>
  );
}
