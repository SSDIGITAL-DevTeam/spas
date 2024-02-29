import { JSX, useReducer, useState } from "react";

import Image from "next/image";
import Head from "next/head";
import { Cover, DataWithPagination, Post } from "@/@types";
import { usePosts } from "@/hooks/usePosts";
import Loading from "@/components/partials/Loading";
import AssetView from "@/assets/svg/asset-view.svg";
import AssetEdit from "@/assets/svg/asset-edit.svg";
import AssetDelete from "@/assets/svg/asset-delete.svg";
import Link from "next/link";
import { postReducer } from "@/reducers/postReducer";
import PostModule from "@/modules/PostModule";
import ApiError from "@/errors/ApiError";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Modal from "@/components/partials/Modal";

export default function Posts(): JSX.Element {
  // states
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [postId, setPostId] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // router
  const router = useRouter();

  // fetch posts
  const { posts, isPostsLoading } = usePosts();

  // reducers ONPROGRESS
  const [state, dispatch] = useReducer(
    postReducer,
    {} as DataWithPagination<Post>
  );

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
            className="bg-secondary hover:bg-primary rounded-lg text-white p-3.5"
          >
            Add New
          </Link>
        </header>

        {/* TODO */}
        <section>
          <div className="mb-8 flex gap-x-4">
            <button className="btn w-full bg-white px-4 py-2 text-primary md:w-max">
              Published
            </button>

            <button className="btn w-full px-4 py-2 text-white md:w-max">
              Drafted
            </button>
          </div>

          {isPostsLoading && !posts?.data && <Loading />}

          <div className="grid gap-4 md:gap-8">
            {posts?.data?.length === 0 && (
              <div>
                <p>Blog is empty</p>
              </div>
            )}

            <div className="overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="lg:text-base text-sm text-center text-white uppercase bg-secondary">
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
                    <th scope="col" className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {posts?.data.map((post: Post) => (
                    <tr
                      className="bg-white text-md text-black hover:bg-secondary hover:text-white dark:hover:bg-gray-300 h-max"
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
                          {post.status}
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
