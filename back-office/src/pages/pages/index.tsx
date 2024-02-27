import { JSX, useReducer, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { pageReducer } from "@/reducers/pageReducer";
import Loading from "@/components/partials/Loading";
import AssetEdit from "@/assets/svg/asset-edit.svg";
import { useRouter } from "next/router";
import { usePage } from "@/hooks/usePage";
import { DataWithPagination, Page } from "@/@types";

export default function Pages(): JSX.Element {
  // states
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [pagetId, setPagetId] = useState<number>(0);

  // router
  const router = useRouter();

  // fetch posts
  const { pages, isPageLoading } = usePage();

  // reducers ONPROGRESS
  const [state, dispatch] = useReducer(
    pageReducer,
    {} as DataWithPagination<Page>
  );

  return (
    <>
      <Head>
        <title>SPAS | Pages</title>
      </Head>

      <main>
        <header className="mb-4 flex flex-col items-start justify-between md:flex-row md:items-center">
          <div>
            <h2 className="mb-4 text-4xl">Pages</h2>

            <p>You can add and update page here</p>
          </div>

          <Link
            href={`/pages/create`}
            className="bg-secondary hover:bg-primary rounded-lg text-white p-3.5"
          >
            Add New
          </Link>
        </header>

        {/* TODO */}
        <section>
          {isPageLoading && !pages?.data && <Loading />}

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
                  {pages?.data.map((page: Page, index: number) => (
                    <tr
                      className="bg-white text-md text-black hover:bg-secondary hover:text-white dark:hover:bg-gray-300 h-max"
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
          </div>
        </section>
      </main>
    </>
  );
}
