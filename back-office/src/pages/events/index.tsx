import { JSX, useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import Loading from "@/components/partials/Loading";
import AssetView from "@/assets/svg/asset-view.svg";
import AssetEdit from "@/assets/svg/asset-edit.svg";
import AssetDelete from "@/assets/svg/asset-delete.svg";
import ApiError from "@/errors/ApiError";
import Modal from "@/components/partials/Modal";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useEvent } from "@/hooks/useEvent";
import { DataWithPagination, Event, Pagination } from "@/@types";
import EventModule from "@/modules/EventModule";

export default function Events(): JSX.Element {
  // states
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [eventId, setEventId] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // router
  const router = useRouter();

  // fetch posts
  const { events, isEventLoading, fetchEvent } = useEvent();

  // handle delete blog
  const handleDeleteBlog = async (id: number): Promise<void> => {
    setIsDeleting(true);
    try {
      await new EventModule().destroy(id);
      // toast
      toast("Event Deleted", {
        icon: "✅",
        style: {
          backgroundColor: "#F4B202",
          color: "#ffffff",
          paddingBlock: 12,
        },
      });
    } catch (error) {
      const err = error as ApiError;
      alert(err.message);
    } finally {
      setIsOpen(false);
      setIsDeleting(false);
      router.reload();
    }
  };

  useEffect(() => {
    fetchEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getLastPageNumber(page: string | null | undefined) {
    if (page === null || page === undefined) {
      return 1; // nilai default jika page adalah null atau undefined
    }

    try {
      const url = new URL(page);
      const params = new URLSearchParams(url.search);
      const pageNumbers = params.getAll("page").map(Number);
      return Math.max(...pageNumbers, 1);
    } catch (error) {
      console.error("Error parsing URL:", error);
      return 1;
    }
  }

  return (
    <>
      <Head>
        <title>SPAS | Events</title>
      </Head>

      <main>
        <header className="mb-4 flex flex-col items-start justify-between md:flex-row md:items-center gap-y-4">
          <div>
            <h2 className="mb-4 text-4xl">Events</h2>

            <p>You can add, update and delete event here</p>
          </div>

          <Link
            href={`/events/create`}
            className="bg-secondary hover:bg-primary rounded-lg text-white p-3.5"
          >
            Add New
          </Link>
        </header>

        {/* TODO */}
        <section>
          {!events?.data}

          <div className="grid gap-4 md:gap-8">
            {events?.data?.length === 0 && (
              <div>
                <p>Event is empty</p>
              </div>
            )}

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="lg:text-base text-center text-white uppercase bg-secondary">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Descriptsion
                    </th>
                    <th scope="col" className=" px-6 py-3">
                      Start Date
                    </th>
                    <th scope="col" className=" px-6 py-3">
                      End Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={5}>{isEventLoading && <Loading />}</td>
                  </tr>
                  {events?.data.map((event: Event, index: number) => (
                    <tr
                      className="bg-white text-md text-black hover:bg-secondary hover:text-white dark:hover:bg-gray-300 h-max"
                      key={event.id}
                    >
                      <td className="text-center p-6">{event.name}</td>
                      <td className="text-center p-6">{event.description}</td>
                      <td className="text-center p-6">{event.start_date}</td>
                      <td className="text-center p-6">{event.end_date}</td>
                      <td>
                        <div className="flex gap-x-2 p-2 justify-center">
                          <Link href={`/events/edit/${event.id}`}>
                            <Image
                              className="w-10 cursor-pointer rounded-lg bg-primary p-2.5"
                              src={AssetEdit}
                              alt="Asset View"
                            />
                          </Link>

                          <Image
                            onClick={() => {
                              setEventId(event.id);
                              setIsOpen(true);
                            }}
                            className="w-10 cursor-pointer rounded-lg bg-red-600 p-2.5"
                            src={AssetDelete}
                            alt="Asset View"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-12 flex flex-col md:flex-row w-full gap-x-2 justify-between items-center gap-y-4">
              <div>
                <span className="font-normal text-sm">
                  Showing {events?.meta.from} to {events?.meta.to} of{" "}
                  {events?.meta.total} entries
                </span>
              </div>
              <div className="flex gap-x-2">
                {events?.meta?.links.map(
                  (pagination: Pagination, index: number) => {
                    const lastPageNumber = getLastPageNumber(pagination.url);
                    return (
                      <div
                        key={index}
                        className={`${
                          pagination.active
                            ? "bg-primary text-white"
                            : "bg-tertiary text-white hover:bg-primary"
                        } ${
                          !pagination.url
                            ? "bg-tertiary/40 text-black/30 cursor-not-allowed"
                            : ""
                        } flex gap-x-2 rounded-lg px-3 py-1.5 text-sm`}
                      >
                        <Link
                          onClick={() => {
                            fetchEvent(lastPageNumber.toString());
                          }}
                          href={`?page=${lastPageNumber}`}
                          className={`${
                            !pagination.url
                              ? "pointer-events-none cursor-not-allowed"
                              : ""
                          }`}
                        >
                          <span
                            dangerouslySetInnerHTML={{
                              __html: pagination.label,
                            }}
                          />
                        </Link>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </section>

        <section>
          <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <div
              className={`${
                false ? "pointer-events-none" : ""
              } relative flex flex-col items-center gap-y-8 p-8 text-center font-bold text-white`}
            >
              <p className="text-xl">
                Are you sure you want to delete <br /> this event?
              </p>
              <div className="flex gap-x-4">
                <button
                  onClick={() => handleDeleteBlog(eventId)}
                  className="btn bg-secondary px-8"
                >
                  Yes
                </button>

                <button onClick={() => setIsOpen(false)} className="btn">
                  Cancel
                </button>
              </div>
              {/* {isDeleting && (
                        <div className='bg-white/60 flex items-center absolute inset-0 z-40'>
                            <Image
                                className='mx-auto w-16'
                                src={Spin}
                                alt='loading'
                            />
                        </div>
                    )} */}
            </div>
          </Modal>
        </section>
      </main>
    </>
  );
}
