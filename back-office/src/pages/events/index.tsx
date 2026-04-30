import { JSX, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Event } from "@/@types";
import EventModule from "@/modules/EventModule";
import { useEvent } from "@/hooks/useEvent";
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

export default function Events(): JSX.Element {
  const { setBreadcrumbs } = useBreadcrumb();

  const [deleteId, setDeleteId] = useState<number>(0);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const { events, isEventLoading, fetchEvent } = useEvent();

  useEffect(() => {
    setBreadcrumbs([{ label: "Dashboard", href: "/" }, { label: "Events" }]);
    fetchEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);
    await fetchEvent("1", q);
  };

  const handlePageChange = async (p: number) => {
    setPage(p);
    await fetchEvent(p.toString(), searchQuery);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await new EventModule().destroy(deleteId);
      toast.success("Event deleted.");
      await fetchEvent(page.toString(), searchQuery);
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
    { header: "Description" },
    { header: "Start Date", className: "w-32" },
    { header: "End Date", className: "w-32" },
    { header: "Actions", className: "w-28 text-center" },
  ];

  return (
    <>
      <Head><title>SPAS | Events</title></Head>

      <PageHeader
        title="Events"
        description="Manage upcoming and past events"
        action={{ label: "Add Event", href: "/events/create" }}
      />

      <div className="mb-4 w-64">
        <Input
          placeholder="Search events..."
          variant="bordered"
          size="sm"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <DataTable columns={columns} isLoading={isEventLoading}>
        {events?.data?.length === 0 ? (
          <EmptyState message="No events found." />
        ) : (
          events?.data?.map((event: Event) => (
            <tr key={event.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-3 text-sm font-medium text-slate-700">{event.name}</td>
              <td className="px-4 py-3 text-sm text-slate-500 max-w-xs truncate">
                {event.description}
              </td>
              <td className="px-4 py-3 text-sm text-slate-600">{event.start_date?.split(" ")[0]}</td>
              <td className="px-4 py-3 text-sm text-slate-600">{event.end_date?.split(" ")[0]}</td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-center gap-2">
                  <Button
                    as={Link}
                    href={`/events/edit/${event.id}`}
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
                    onPress={() => { setDeleteId(event.id); setIsDeleteOpen(true); }}
                  >
                    <MdDelete className="w-4 h-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))
        )}
      </DataTable>

      {events?.meta && (
        <TablePagination meta={events.meta} onPageChange={handlePageChange} />
      )}

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete Event"
        message="Are you sure you want to delete this event?"
      />
    </>
  );
}
