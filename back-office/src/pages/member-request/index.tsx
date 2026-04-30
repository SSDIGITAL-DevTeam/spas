import { JSX, useEffect, useState } from "react";
import Head from "next/head";
import { Tabs, Tab, Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useRequestUpdate } from "@/hooks/useRequestUpdate";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import PageHeader from "@/components/ui/PageHeader";
import DataTable from "@/components/ui/DataTable";
import EmptyState from "@/components/ui/EmptyState";
import { MdSearch, MdVisibility } from "react-icons/md";

export default function MemberRequest(): JSX.Element {
  const { setBreadcrumbs } = useBreadcrumb();
  const [searchQuery, setSearchQuery] = useState("");

  const { requestUpdate, isRequestUpdateLoading, fetchRequestUpdate } = useRequestUpdate();

  useEffect(() => {
    setBreadcrumbs([{ label: "Dashboard", href: "/" }, { label: "Request Update" }]);
    fetchRequestUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);
    await fetchRequestUpdate("1", q);
  };

  const pendingOperators = requestUpdate?.data?.filter((r) => r.role === "operator") ?? [];
  const pendingTherapists = requestUpdate?.data?.filter((r) => r.role === "therapist") ?? [];

  const operatorColumns = [
    { header: "Logo", className: "w-16" },
    { header: "Company Name" },
    { header: "Contact" },
    { header: "Actions", className: "w-24 text-center" },
  ];

  return (
    <>
      <Head><title>SPAS | Request Update</title></Head>

      <PageHeader title="Request Update" description="Review member profile update requests" />

      <div className="mb-5 w-64">
        <Input
          placeholder="Search..."
          variant="bordered"
          size="sm"
          value={searchQuery}
          onChange={handleSearch}
          startContent={<MdSearch className="text-slate-400 w-4 h-4" />}
        />
      </div>

      <Tabs color="primary" variant="underlined" aria-label="Request tabs">
        <Tab key="operators" title={`Operators (${pendingOperators.length})`}>
          <div className="mt-3">
            <DataTable columns={operatorColumns} isLoading={isRequestUpdateLoading}>
              {pendingOperators.length === 0 ? (
                <EmptyState message="No operator update requests." />
              ) : (
                pendingOperators.map((op) => (
                  <tr key={op.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={op.url_logo_operator ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${op.url_logo_operator}` : "/no-image.png"}
                        alt={op.company_name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-slate-700">{op.company_name}</td>
                    <td className="px-4 py-3 text-sm text-slate-500">{op.contact_no}</td>
                    <td className="px-4 py-3 text-center">
                      <Button
                        as={Link}
                        href={`/member-request/operator/${op.id}`}
                        isIconOnly
                        size="sm"
                        color="primary"
                        variant="flat"
                        aria-label="View"
                      >
                        <MdVisibility className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </DataTable>
          </div>
        </Tab>

        <Tab key="therapists" title={`Therapists (${pendingTherapists.length})`}>
          <div className="mt-3">
            <DataTable
              columns={[
                { header: "Photo", className: "w-16" },
                { header: "Full Name" },
                { header: "Contact" },
                { header: "Actions", className: "w-24 text-center" },
              ]}
              isLoading={isRequestUpdateLoading}
            >
              {pendingTherapists.length === 0 ? (
                <EmptyState message="No therapist update requests." />
              ) : (
                pendingTherapists.map((th) => (
                  <tr key={th.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={th.url_logo_therapist ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${th.url_logo_therapist}` : "/no-image.png"}
                        alt={th.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-slate-700">{th.name}</td>
                    <td className="px-4 py-3 text-sm text-slate-500">{th.contact_no}</td>
                    <td className="px-4 py-3 text-center">
                      <Button
                        as={Link}
                        href={`/member-request/therapist/${th.id}`}
                        isIconOnly
                        size="sm"
                        color="primary"
                        variant="flat"
                        aria-label="View"
                      >
                        <MdVisibility className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </DataTable>
          </div>
        </Tab>
      </Tabs>
    </>
  );
}
