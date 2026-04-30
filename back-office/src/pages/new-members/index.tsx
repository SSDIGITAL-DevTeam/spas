import { JSX, useEffect, useState } from "react";
import Head from "next/head";
import { Tabs, Tab, Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useOperator } from "@/hooks/useOperator";
import { useTherapist } from "@/hooks/useTherapist";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import PageHeader from "@/components/ui/PageHeader";
import DataTable from "@/components/ui/DataTable";
import EmptyState from "@/components/ui/EmptyState";
import StatusBadge from "@/components/ui/StatusBadge";
import { MdSearch } from "react-icons/md";

export default function NewMembers(): JSX.Element {
  const { setBreadcrumbs } = useBreadcrumb();
  const [searchQuery, setSearchQuery] = useState("");

  const { operator, isOperatorLoading, fetchOperator } = useOperator();
  const { therapist, isTherapistLoading, fetchTherapist } = useTherapist();

  useEffect(() => {
    setBreadcrumbs([{ label: "Dashboard", href: "/" }, { label: "New Members" }]);
    fetchOperator();
    fetchTherapist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);
    await fetchOperator("1", q);
    await fetchTherapist("1", q);
  };

  const pendingOperators = operator?.data?.filter((o) => o.status === "pending") ?? [];
  const pendingTherapists = therapist?.data?.filter((t) => t.status === "pending") ?? [];

  const operatorColumns = [
    { header: "Logo", className: "w-16" },
    { header: "Company Name" },
    { header: "Email" },
    { header: "Contact" },
    { header: "Status", className: "w-28" },
    { header: "Actions", className: "w-24 text-center" },
  ];

  const therapistColumns = [
    { header: "Photo", className: "w-16" },
    { header: "Full Name" },
    { header: "Email" },
    { header: "Contact" },
    { header: "Status", className: "w-28" },
    { header: "Actions", className: "w-24 text-center" },
  ];

  return (
    <>
      <Head><title>SPAS | New Members</title></Head>

      <PageHeader title="New Members" description="Review and approve new member registrations" />

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

      <Tabs color="primary" variant="underlined" aria-label="Member tabs">
        <Tab key="operators" title={`Spa Operators (${pendingOperators.length})`}>
          <div className="mt-3">
            <DataTable columns={operatorColumns} isLoading={isOperatorLoading}>
              {pendingOperators.length === 0 ? (
                <EmptyState message="No pending operators." />
              ) : (
                pendingOperators.map((op) => (
                  <tr key={op.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={op.cover ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${op.cover.url}` : "/no-image.png"}
                        alt={op.company_name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-slate-700">{op.company_name}</td>
                    <td className="px-4 py-3 text-sm text-slate-500">{op.user?.email}</td>
                    <td className="px-4 py-3 text-sm text-slate-500">{op.contact_no}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={op.status as "pending" | "approve" | "reject"} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Button
                        as={Link}
                        href={`/new-members/operator/${op.id}`}
                        size="sm"
                        color="primary"
                        variant="flat"
                      >
                        Review
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </DataTable>
          </div>
        </Tab>

        <Tab key="therapists" title={`Spa Therapists (${pendingTherapists.length})`}>
          <div className="mt-3">
            <DataTable columns={therapistColumns} isLoading={isTherapistLoading}>
              {pendingTherapists.length === 0 ? (
                <EmptyState message="No pending therapists." />
              ) : (
                pendingTherapists.map((th) => (
                  <tr key={th.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={th.cover ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${th.cover.url}` : "/no-image.png"}
                        alt={th.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-slate-700">{th.name}</td>
                    <td className="px-4 py-3 text-sm text-slate-500">{th.user?.email}</td>
                    <td className="px-4 py-3 text-sm text-slate-500">{th.contact_no}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={th.status as "pending" | "approve" | "reject"} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Button
                        as={Link}
                        href={`/new-members/therapist/${th.id}`}
                        size="sm"
                        color="primary"
                        variant="flat"
                      >
                        Review
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
