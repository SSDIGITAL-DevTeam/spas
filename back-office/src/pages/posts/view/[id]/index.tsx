import Head from "next/head";
import { JSX, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PostModule from "@/modules/PostModule";
import { Cover, Post, Tag, Category } from "@/@types";
import Loading from "@/components/partials/Loading";

export default function ViewPost(): JSX.Element {
  // states
  const [singlePost, setSinglePost] = useState<Post>({} as Post);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // router
  const router = useRouter();

  const cover = singlePost.cover as Cover;

  useEffect(() => {
    const fetchSinglePost = async () => {
      setIsLoading(true);

      try {
        const res = await new PostModule().singlePost(+router.query.id!);
        setSinglePost(res.data);

        console.log(res.data.categories);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchSinglePost();
  }, [router]);

  return (
    <>
      <Head>
        <title>SPAS | {singlePost.title}</title>
      </Head>

      <main>
        <Link
          href="/posts"
          className="btn bg-primary rounded-lg text-white px-4 py-2"
        >
          Back
        </Link>

        {isLoading ? (
          <Loading />
        ) : (
          <section className="mx-auto mt-8 flex max-w-2xl flex-col gap-y-8">
            <header>
              <h1 className="md:text-3xl">{singlePost.title}</h1>

              <div className="mt-2 flex gap-x-2">
                {singlePost.categories?.map(
                  (category: Category, index: number) => (
                    <div
                      key={`categories-${index}`}
                      className="rounded-lg bg-secondary/40 px-2 py-1"
                    >
                      <span>{category.name}</span>
                    </div>
                  )
                )}
              </div>
            </header>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="aspect-video w-full rounded-xl object-cover"
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${singlePost.cover?.url}`}
              alt="Asset Cover"
            />

            <article
              className="prose min-w-full"
              dangerouslySetInnerHTML={{
                __html: singlePost.content,
              }}
            ></article>

            <div className="mt-2 flex flex-col lg:flex-row gap-x-2">
              <div className="grid grid-cols-4 gap-1">
                {singlePost.tags?.map((tag: Tag, index: number) => (
                  <div
                    key={`tag-${index}`}
                    className="rounded-lg bg-secondary/40 px-2 py-1"
                  >
                    <span>#{tag.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
