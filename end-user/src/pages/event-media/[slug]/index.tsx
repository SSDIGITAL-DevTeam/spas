import { JSX } from "react";
import Head from "next/head";
import { usePosts } from "@/hooks/usePosts";
import Loading from "@/components/partials/Loading";
import { useSinglePost } from "@/hooks/useSinglePost";
import { Post, Tag, Category } from "@/@types";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Link from "next/link";
import Image from "next/image";
import moment from 'moment';

export const getServerSideProps = async (
	context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{ slug: string }>> => {
	const slug = context.query.slug as string;

	return {
		props: {
			slug,
		},
	};
};

export default function BlogDetail({ slug }: { slug: string }): JSX.Element {
	// fetch single post with custom hooks
	const { singlePost, isLoading } = useSinglePost(slug);

	// console.log(singlePost.title);

	// fetch recent post with custom hooks
	const { posts } = usePosts();
	return (
    <>
      <Head>
        <title>{`SPAS | ${singlePost.title}`}</title>
        <link rel="icon" href="/spas-logo.png" />
        <meta name="author" content="SPAS" />

        <meta name="title" content="Details" />

        <meta name="description" content="details" />

        <meta name="keywords" content="spa, services, details" />

        <meta name="robots" content="index, follow" />

        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />

        <meta property="og:title" content="details" />

        <meta property="og:description" content="Details" />

        <meta property="og:type" content="website" />

        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/asset-special-offer.webp`}
        />
      </Head>

      <div className="pt-32">{isLoading && <Loading />}</div>
      {!isLoading && (
        <main>
          <header className="pb-5 lg:pb-24">
            <div className="container">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="aspect-video w-full rounded-xl object-cover"
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${singlePost.cover?.url}`}
                alt="Blog Cover"
              />

              <h2 className="mt-8 text-2xl lg:text-4xl font-bold text-black">
                {singlePost.title}
              </h2>
              <div className="mt-2 text-sm text-black">
                <p>
                  Last update :&nbsp;
                  <label className="text-primary">
                    {moment(singlePost.published_at).format(
                      "ddd, MMMM Do YYYY"
                    )}
                  </label>
                </p>
              </div>

              <article
                dangerouslySetInnerHTML={{
                  __html: singlePost.content,
                }}
                className="text-black mt-8 min-w-full text-sm lg:text-base prose lg:prose-xl"
              ></article>
              <hr className="my-6" />
              <div className="mb-8 flex flex-wrap gap-4">
                {singlePost.tags?.map((tag: Tag, index: number) => (
                  <div
                    key={`tag-${index}`}
                    className="rounded-lg bg-primary/20 px-4 py-1 text-sm font-medium text-dark/60 md:text-base"
                  >
                    <span className="dark:text-light">#{tag.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </header>

          <section className="pb-24 lg:pb-24">
            <div className="container">
              <div className="flex justify-between py-6">
                <p className="text-2xl font-bold">View Other Blog</p>

                <Link href="/event-media">
                  <span className="text-xl font-medium hover:underline">
                    See All
                  </span>
                </Link>
              </div>

              {posts.data?.length === 0 && (
                <div className="mt-16 rounded-2xl bg-primary/10 p-4 text-center">
                  <p className="text-3xl font-semibold">Opps..</p>

                  <p>No Recent Blog At This Time</p>
                </div>
              )}
              <div className="flex flex-col gap-y-8">
                <div className="flex flex-col lg:flex-row text-center">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {posts.data?.length === 0 && (
                      <div>
                        <p className="text-4xl font-semibold">Opps..</p>
                        <p>Blog not found</p>
                      </div>
                    )}
                    {posts.data?.slice(0, 3).map(
                      (post: Post, index: number): JSX.Element => (
                        <div
                          className="p-3 bg-white border-1 shadow-lg rounded-lg transition duration-200 hover:bg-black/10"
                          key={post.id}
                        >
                          <Link href={`/event-media/${post.slug}`}>
                            <div className="grid justify-center">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                className="aspect-video rounded-lg object-cover"
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${post.cover.url}`}
                                alt={post.title}
                              />
                            </div>
                            <div className="mt-5 space-y-3 text-left h-[100px]">
                              <h2 className="font-semibold text-[#3E3232]">
                                {post.title}
                              </h2>
                              <p className="text-secondary text-sm text-black/80 line-clamp-3">
                                {post.content.replace(/<[^>]+>/g, "")}
                              </p>
                            </div>
                          </Link>
                          <div className="bg-[#F5F5F5] p-5 mt-5 rounded-lg">
                            <div className="flex flex-wrap gap-4">
                              {post.categories
                                ?.slice(0, 3)
                                .map((category: Category, index: number) => (
                                  <p
                                    className="bg-[#dee9f9] w-max text-sm p-2 rounded-full flex-grow"
                                    key={category.id}
                                  >
                                    {category.name}
                                  </p>
                                ))}
                            </div>
                            <div className="text-sm text-secondary text-left p-2">
                              <p>
                                Last update : <br />
                                <label
                                  className="text-primary"
                                  htmlFor="{moment(post.published_at).format('ddd, MMMM Do YYYY')}"
                                >
                                  {moment(post.published_at).format(
                                    "ddd, MMMM Do YYYY"
                                  )}
                                </label>
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
}
