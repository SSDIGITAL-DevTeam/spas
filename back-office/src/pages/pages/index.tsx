import { JSX, useEffect, useReducer, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { pageReducer } from "@/reducers/pageReducer";
import Loading from "@/components/partials/Loading";
import AssetEdit from "@/assets/svg/asset-edit.svg";
import { useRouter } from "next/router";
import { usePage } from "@/hooks/usePage";
import { DataWithPagination, Page, Pagination } from "@/@types";

export default function Pages(): JSX.Element {
  // states
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [pagetId, setPagetId] = useState<number>(0);

  // router
  const router = useRouter();

  // fetch posts
  const { pages, isPageLoading, fetchPage } = usePage();

  useEffect(() => {
    fetchPage();
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
        <title>SPAS | Pages</title>
      </Head>

      <main>
        <header className="mb-4 flex flex-col items-start justify-between md:flex-row md:items-center gap-y-4">
          <div>
            <h2 className="mb-4 text-4xl">Pages</h2>

            <p>You can add and update page here</p>
          </div>

          {/* <Link
            href={`/pages/create`}
            className="bg-secondary hover:bg-primary rounded-lg text-white p-3.5"
          >
            Add New
          </Link> */}
        </header>

        {/* TODO */}
        <section>
          {!pages?.data}

          <div className="grid gap-4 md:gap-8">
            {pages?.data?.length === 0 && (
              <div>
                <p>Page is empty</p>
              </div>
            )}

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="lg:text-base text-center text-white uppercase bg-secondary">
                  <tr>
                    <th scope="col" className="w-1/2 px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="w-1/2 px-6 py-3">
                      Slug
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={3}>{isPageLoading && <Loading />}</td>
                  </tr>
                  {pages?.data.map((page: Page, index: number) => (
                    <tr
                      className="bg-white text-md text-black hover:bg-secondary hover:text-white h-max"
                      key={page.id}
                    >
                      <td className="text-center p-6">{page.name}</td>
                      <td className="text-center p-6">{page.slug}</td>
                      <td>
                        <div className="flex gap-x-2 p-2 justify-center">
                          <Link href={`/pages/edit/${page.id}`}>
                            <Image
                              className="w-10 cursor-pointer rounded-lg bg-primary p-2.5"
                              src={AssetEdit}
                              alt="Asset View"
                            />
                          </Link>
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
                  Showing {pages?.meta.from} to {pages?.meta.to} of{" "}
                  {pages?.meta.total} entries
                </span>
              </div>
              <div className="flex gap-x-2">
                {pages?.meta?.links.map(
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
                            fetchPage(lastPageNumber.toString());
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
      </main>
    </>
  );
}
