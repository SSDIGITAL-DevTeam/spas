import { JSX, SetStateAction, useEffect, useReducer, useState } from "react";
import { Tabs, Tab, Input } from "@nextui-org/react";
import Image from "next/image";
import Head from "next/head";
import { Cover, DataWithPagination, Post, Pagination } from "@/@types";
import { usePosts } from "@/hooks/usePosts";
import Loading from "@/components/partials/Loading";
import AssetView from "@/assets/svg/asset-view.svg";
import AssetEdit from "@/assets/svg/asset-edit.svg";
import AssetDelete from "@/assets/svg/asset-delete.svg";
import Link from "next/link";
import PostModule from "@/modules/PostModule";
import ApiError from "@/errors/ApiError";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Modal from "@/components/partials/Modal";
import { PostStatusEnum } from "@/enums";

export default function Posts(): JSX.Element {
  // states
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [postId, setPostId] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    await fetchPosts(searchQuery);
  };

  // router
  const router = useRouter();

  // fetch posts
  const { posts, isPostsLoading, fetchPosts } = usePosts();

  // handle delete blog
  const handleDeleteBlog = async (id: number): Promise<void> => {
    setIsDeleting(true);
    try {
      await new PostModule().destroy(id);
      // toast
      toast("Post Deleted", {
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
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get last data after ?page=
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
        <title>SPAS | Blog</title>
      </Head>

      <main>
        <header className="mb-4 flex flex-col items-start justify-between md:flex-row md:items-center gap-y-4">
          <div>
            <h2 className="mb-4 text-4xl">Blogs</h2>

            <p>You can add, update and delete blog here</p>
          </div>

          <Link
            href={`/posts/create`}
            className="bg-secondary hover:bg-primary rounded-lg text-white p-2"
          >
            Add New
          </Link>
        </header>

        <form onSubmit={handleSearchSubmit}>
          <div className="w-60 pb-5">
            <Input
              name="search"
              placeholder="Search..."
              variant="bordered"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </form>

        <section>
          {!posts?.data}

          <div className="grid gap-4 md:gap-8">
            {posts?.data?.length === 0 && (
              <div>
                <p>Blog is empty</p>
              </div>
            )}

            <div className="flex w-full flex-col space-y-4 md:space-y-8">
              <Tabs aria-label="Options" color="secondary" className="mx-auto">
                <Tab key="operators" title="PUBLISHED" className="relative">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="lg:text-base text-center text-white uppercase bg-secondary">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Slug
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td colSpan={5}>{isPostsLoading && <Loading />}</td>
                      </tr>
                      {posts?.data
                        .filter((posts) => posts.status === "4")
                        .map((post, index) => (
                          <tr
                            className="bg-white text-md text-black  hover:bg-secondary hover:text-white h-max"
                            key={post.id}
                          >
                            <td className="text-left p-6">
                              <Link href={`/posts/view/${post.id}`}>
                                {post.title}
                              </Link>
                            </td>
                            <td className="text-center p-6">{post.slug}</td>
                            <td className="text-center">
                              <p className="bg-[#e7e4e4] w-max mx-auto py-1 px-2 text-secondary text-sm rounded-lg capitalize">
                                {post.status === "4"
                                  ? "PUBLISHED"
                                  : post.status === "2"
                                  ? "DRAFTED"
                                  : "Unknown"}
                              </p>
                            </td>
                            <td>
                              <div className="flex gap-x-2 p-2 w-max">
                                <Link href={`/posts/view/${post.id}`}>
                                  <Image
                                    className="w-10 cursor-pointer rounded-lg bg-secondary p-2.5 object-cover"
                                    src={AssetView}
                                    alt="Asset View"
                                  />
                                </Link>

                                <Link href={`/posts/edit/${post.id}`}>
                                  <Image
                                    className="w-10 cursor-pointer rounded-lg bg-primary p-2.5"
                                    src={AssetEdit}
                                    alt="Asset View"
                                  />
                                </Link>

                                <Image
                                  onClick={() => {
                                    setPostId(post.id);
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
                </Tab>

                <Tab key="therapist" title="DRAFT">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="lg:text-base text-center text-white uppercase bg-secondary">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Slug
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td colSpan={5}>{isPostsLoading && <Loading />}</td>
                      </tr>
                      {posts?.data
                        .filter((posts) => posts.status === "2")
                        .map((post, index) => (
                          <tr
                            className="bg-white text-md text-black hover:bg-secondary hover:text-white h-max"
                            key={post.id}
                          >
                            <td className="text-left p-6">
                              <Link href={`/posts/view/${post.id}`}>
                                {post.title}
                              </Link>
                            </td>
                            <td className="text-center p-6">{post.slug}</td>
                            <td className="text-center">
                              <p className="bg-[#e7e4e4] w-max mx-auto py-1 px-2 text-secondary text-sm rounded-lg capitalize">
                                {post.status === "4"
                                  ? "PUBLISHED"
                                  : post.status === "2"
                                  ? "DRAFTED"
                                  : "Unknown"}
                              </p>
                            </td>
                            <td>
                              <div className="flex gap-x-2 p-2 w-max">
                                <Link href={`/posts/view/${post.id}`}>
                                  <Image
                                    className="w-10 cursor-pointer rounded-lg bg-secondary p-2.5 object-cover"
                                    src={AssetView}
                                    alt="Asset View"
                                  />
                                </Link>

                                <Link href={`/posts/edit/${post.id}`}>
                                  <Image
                                    className="w-10 cursor-pointer rounded-lg bg-primary p-2.5"
                                    src={AssetEdit}
                                    alt="Asset View"
                                  />
                                </Link>

                                <Image
                                  onClick={() => {
                                    setPostId(post.id);
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
                </Tab>
              </Tabs>
            </div>
            <div className="mt-12 flex flex-col md:flex-row w-full gap-x-2 justify-between items-center gap-y-4">
              <div>
                <span className="font-normal text-sm">
                  Showing {posts?.meta.from} to {posts?.meta.to} of{" "}
                  {posts?.meta.total} entries
                </span>
              </div>
              <div className="flex gap-x-2">
                {posts?.meta?.links.map(
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
                            fetchPosts(lastPageNumber.toString());
                          }}
                          href={`?status=${PostStatusEnum.PUBLISHED.toString()}&page=${lastPageNumber}`}
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
                Are you sure you want to delete <br /> this blog?
              </p>
              <div className="flex gap-x-4">
                <button
                  onClick={() => handleDeleteBlog(postId)}
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
