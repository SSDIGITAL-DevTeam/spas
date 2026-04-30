import { JSX, useEffect, useState } from "react";
import Head from "next/head";
import { ValuePartner } from "@/@types";
import ValuePartnerModule from "@/modules/ValuePartnerModule";
import { useValuePartner } from "@/hooks/useValuePartner";
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

export default function ValuePartners(): JSX.Element {
  const { setBreadcrumbs } = useBreadcrumb();

  const [deleteId, setDeleteId] = useState<number>(0);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const { valuePartners, isValuePartnerLoading, fetchValuePartner } = useValuePartner();

  useEffect(() => {
    setBreadcrumbs([{ label: "Dashboard", href: "/" }, { label: "Value Partners" }]);
    fetchValuePartner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);
    await fetchValuePartner("1", q);
  };

  const handlePageChange = async (p: number) => {
    setPage(p);
    await fetchValuePartner(p.toString(), searchQuery);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await new ValuePartnerModule().destroy(deleteId);
      toast.success("Value partner deleted.");
      await fetchValuePartner(page.toString(), searchQuery);
    } catch (error) {
      const err = error as ApiError;
      toast.error(err.getFirstError?.() ?? "Failed to delete.");
    } finally {
      setIsDeleting(false);
      setIsDeleteOpen(false);
    }
  };

  const columns = [
    { header: "Logo", className: "w-20" },
    { header: "Brand Name" },
    { header: "Category" },
    { header: "Email" },
    { header: "Actions", className: "w-28 text-center" },
  ];

  return (
    <>
      <Head><title>SPAS | Value Partners</title></Head>

      <PageHeader
        title="Value Partners"
        description="Manage brand partners"
        action={{ label: "Add Partner", href: "/value-partners/create" }}
      />

      <div className="mb-4 w-64">
        <Input
          placeholder="Search partners..."
          variant="bordered"
          size="sm"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <DataTable columns={columns} isLoading={isValuePartnerLoading}>
        {valuePartners?.data?.length === 0 ? (
          <EmptyState message="No value partners found." />
        ) : (
          valuePartners?.data?.map((partner: ValuePartner) => (
            <tr key={partner.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={partner.logo ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${partner.logo}` : "/no-image.png"}
                  alt={partner.brand_name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
              </td>
              <td className="px-4 py-3 text-sm font-medium text-slate-700">{partner.brand_name}</td>
              <td className="px-4 py-3 text-sm text-slate-500">{partner.category_partner?.name ?? "—"}</td>
              <td className="px-4 py-3 text-sm text-slate-500">{partner.email}</td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-center gap-2">
                  <Button
                    as={Link}
                    href={`/value-partners/partner/${partner.id}`}
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
                    onPress={() => { setDeleteId(partner.id); setIsDeleteOpen(true); }}
                  >
                    <MdDelete className="w-4 h-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))
        )}
      </DataTable>

      {valuePartners?.meta && (
        <TablePagination meta={valuePartners.meta} onPageChange={handlePageChange} />
      )}

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete Value Partner"
        message="Are you sure you want to delete this value partner?"
      />
    </>
  );
}
