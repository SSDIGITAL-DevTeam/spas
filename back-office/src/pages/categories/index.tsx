import { JSX, useEffect, useReducer, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import Loading from "@/components/partials/Loading";
import AssetEdit from "@/assets/svg/asset-edit.svg";
import AssetDelete from "@/assets/svg/asset-delete.svg";
import ApiError from "@/errors/ApiError";
import Modal from "@/components/partials/Modal";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { Category, Pagination } from "@/@types";
import CategoryModule from "@/modules/CategoryModule";
import { useCategory } from "@/hooks/useCategory";

export default function Categories(): JSX.Element {
  // states
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [categorytId, setCategorytId] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // router
  const router = useRouter();

  // fetch categoriy
  const { categories, isCategoryLoading, fetchCategory } = useCategory();

  useEffect(() => {
    fetchCategory();
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
  // handle delete caategory
  const handleDeleteCategory = async (id: number): Promise<void> => {
    setIsDeleting(true);
    try {
      await new CategoryModule().destroy(id);
      // toast
      toast("Category Deleted", {
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

  return (
    <>
      <Head>
        <title>SPAS | Categories</title>
      </Head>

      <main>
        <header className="mb-4 flex flex-col items-start justify-between md:flex-row md:items-center gap-y-4">
          <div>
            <h2 className="mb-4 text-4xl">Categories</h2>

            <p>You can add, update and delete categorie here</p>
          </div>

          <Link
            href={`/categories/create`}
            className="bg-secondary hover:bg-primary rounded-lg text-white p-2"
          >
            Add New
          </Link>
        </header>

        {/* TODO */}
        <section>
          {!categories?.data}

          <div className="grid gap-4 md:gap-8">
            {categories?.data?.length === 0 && (
              <div>
                <p>Category is empty</p>
              </div>
            )}

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="lg:text-base text-center text-white uppercase bg-secondary">
                  <tr>
                    <th scope="col" className="w-1/2 px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={2}>{isCategoryLoading && <Loading />}</td>
                  </tr>
                  {categories?.data.map((category: Category, index: number) => (
                    <tr
                      className="bg-white text-md text-black hover:bg-secondary hover:text-white h-max"
                      key={category.id}
                    >
                      <td className="text-center p-6">{category.name}</td>
                      <td>
                        <div className="flex gap-x-2 p-2 justify-center">
                          <Link href={`/categories/edit/${category.id}`}>
                            <Image
                              className="w-10 cursor-pointer rounded-lg bg-primary p-2.5"
                              src={AssetEdit}
                              alt="Asset View"
                            />
                          </Link>

                          <Image
                            onClick={() => {
                              setCategorytId(category.id);
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
                  Showing {categories?.meta.from} to {categories?.meta.to} of{" "}
                  {categories?.meta.total} entries
                </span>
              </div>
              <div className="flex gap-x-2">
                {categories?.meta?.links.map(
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
                            fetchCategory(lastPageNumber.toString());
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
                Are you sure you want to delete <br /> this categories?
              </p>
              <div className="flex gap-x-4">
                <button
                  onClick={() => handleDeleteCategory(categorytId)}
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
