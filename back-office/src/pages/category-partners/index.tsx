import { JSX, useEffect, useState } from "react";
import Head from "next/head";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import { useCategoryPartner } from "@/hooks/useCategoryPartner";
import { CategoryPartner } from "@/@types";
import PageHeader from "@/components/ui/PageHeader";
import DataTable from "@/components/ui/DataTable";
import TablePagination from "@/components/ui/TablePagination";
import ConfirmModal from "@/components/ui/ConfirmModal";
import EmptyState from "@/components/ui/EmptyState";
import CategoryPartnerModule from "@/modules/CategoryPartner";
import ApiError from "@/errors/ApiError";
import toast from "react-hot-toast";
import { Input, Button } from "@nextui-org/react";
import Link from "next/link";
import { MdEdit, MdDelete } from "react-icons/md";

export default function CategoryPartners(): JSX.Element {
  const { setBreadcrumbs } = useBreadcrumb();
  const { categoryPartners, isCategoryPartnerLoading, fetchCategoryPartner } = useCategoryPartner();

  const [deleteId, setDeleteId] = useState<number>(0);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setBreadcrumbs([{ label: "Dashboard", href: "/" }, { label: "Category Partners" }]);
    fetchCategoryPartner().catch((err: ApiError) => {
      toast.error(err.getFirstError?.() ?? "Failed to load categories.");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);
    fetchCategoryPartner("1", q).catch((err: ApiError) => {
      toast.error(err.getFirstError?.() ?? "Failed to load categories.");
    });
  };

  const handlePageChange = async (p: number) => {
    setPage(p);
    fetchCategoryPartner(p.toString(), searchQuery).catch((err: ApiError) => {
      toast.error(err.getFirstError?.() ?? "Failed to load categories.");
    });
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await new CategoryPartnerModule().destroy(deleteId);
      toast.success("Category partner deleted.");
      await fetchCategoryPartner(page.toString(), searchQuery);
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
    { header: "Slug" },
    { header: "Actions", className: "w-32 text-center" },
  ];

  return (
    <>
      <Head><title>SPAS | Category Partners</title></Head>

      <PageHeader
        title="Category Partners"
        description="Manage value partner categories"
        action={{ label: "Add Category", href: "/category-partners/create" }}
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

      <DataTable columns={columns} isLoading={isCategoryPartnerLoading}>
        {categoryPartners?.data?.length === 0 ? (
          <EmptyState message="No category partners found." />
        ) : (
          categoryPartners?.data?.map((cat: CategoryPartner) => (
            <tr key={cat.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-3 text-sm text-slate-700 font-medium">{cat.name}</td>
              <td className="px-4 py-3 text-sm text-slate-500 font-mono">{cat.slug}</td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-center gap-2">
                  <Button
                    as={Link}
                    href={`/category-partners/edit/${cat.id}`}
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

      {categoryPartners?.meta && (
        <TablePagination meta={categoryPartners.meta} onPageChange={handlePageChange} />
      )}

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete Category Partner"
        message="Are you sure you want to delete this category? This action cannot be undone."
      />
    </>
  );
}
