/* eslint-disable @next/next/no-img-element */
import { JSX } from "react";
import Head from "next/head";
import { usePosts } from "@/hooks/usePosts";
import Loading from "@/components/partials/Loading";
import { useSinglePost } from "@/hooks/useSinglePost";
import { Post, Tag, Category } from "@/@types";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Link from "next/link";
import moment from "moment";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{ slug: string }>> => {
  const slug = context.query.slug as string;
  return { props: { slug } };
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

export default function BlogDetail({ slug }: { slug: string }): JSX.Element {
  const { singlePost, isLoading } = useSinglePost(slug);
  const { posts } = usePosts();

  return (
    <>
      <Head>
        <title>{`SPAS | ${singlePost.title || "Event & Media"}`}</title>
        <link rel="icon" href="/asset-logo.png" />
        <meta name="author" content="SPAS" />
        <meta name="title" content="SPAS | Event & Media" />
        <meta name="description" content="Expand your knowledge with our latest information and upcoming events about beauty, spas, and wellness." />
        <meta name="keywords" content="spa, services, details" />
        <meta name="robots" content="index, follow" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />
        <meta property="og:title" content="SPAS | Event & Media" />
        <meta property="og:description" content="Expand your knowledge with our latest information and upcoming events about beauty, spas, and wellness." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_BASE_URL}/asset-logo.png`} />
      </Head>

      {isLoading ? (
        <div className="pt-32 min-h-screen flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <main className="pt-20">
          {/* ── COVER IMAGE ── */}
          <div className="relative">
            <img
              className="w-full aspect-video object-cover max-h-[520px]"
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${singlePost.cover?.url}`}
              alt={singlePost.title || "Post cover"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* ── ARTICLE ── */}
          <section className="py-16 lg:py-24 bg-white">
            <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
              <motion.div
                initial="hidden"
                animate="show"
                variants={stagger}
                className="space-y-6"
              >
                {/* Back link */}
                <motion.div variants={fadeUp}>
                  <Link href="/event-media" className="inline-flex items-center gap-x-2 text-primary text-sm font-medium hover:gap-x-3 transition-all">
                    <FaArrowLeft className="w-3.5 h-3.5" />
                    Back to Event &amp; Media
                  </Link>
                </motion.div>

                {/* Date */}
                <motion.p variants={fadeUp} className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  {moment(singlePost.published_at).format("dddd, MMMM Do YYYY")}
                </motion.p>

                {/* Title */}
                <motion.h1 variants={fadeUp} className="text-3xl lg:text-5xl font-bold text-slate-900 leading-tight">
                  {singlePost.title}
                </motion.h1>

                {/* Categories */}
                {singlePost.categories && singlePost.categories.length > 0 && (
                  <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                    {singlePost.categories.map((cat: Category) => (
                      <span key={cat.id} className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-medium">
                        {cat.name}
                      </span>
                    ))}
                  </motion.div>
                )}

                <motion.hr variants={fadeUp} className="border-slate-100" />

                {/* Content */}
                <motion.article
                  variants={fadeUp}
                  dangerouslySetInnerHTML={{ __html: singlePost.content }}
                  className="prose prose-slate lg:prose-lg max-w-none"
                />

                <motion.hr variants={fadeUp} className="border-slate-100 mt-8" />

                {/* Tags */}
                {singlePost.tags && singlePost.tags.length > 0 && (
                  <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                    {singlePost.tags.map((tag: Tag, i: number) => (
                      <span
                        key={`tag-${i}`}
                        className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        #{tag.name}
                      </span>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </div>
          </section>

          {/* ── RELATED POSTS ── */}
          <section className="py-16 lg:py-24 bg-slate-50">
            <div className="container mx-auto px-4 lg:px-8">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                variants={stagger}
              >
                <div className="flex items-center justify-between mb-10">
                  <motion.h2 variants={fadeUp} className="section-heading">
                    More Articles
                  </motion.h2>
                  <motion.div variants={fadeUp}>
                    <Link href="/event-media" className="inline-flex items-center gap-x-2 text-primary text-sm font-semibold hover:gap-x-3 transition-all">
                      See All <FaArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </motion.div>
                </div>

                {posts.data?.length === 0 ? (
                  <div className="text-center py-12 text-slate-400">
                    <p>No recent articles found.</p>
                  </div>
                ) : (
                  <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.data?.slice(0, 3).map((post: Post) => (
                      <motion.div
                        key={post.id}
                        variants={fadeUp}
                        className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                      >
                        <Link href={`/event-media/${post.slug}`}>
                          <div className="overflow-hidden h-48">
                            <img
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${post.cover.url}`}
                              alt={post.title}
                            />
                          </div>
                          <div className="p-5 space-y-2">
                            <p className="text-xs text-slate-400">{moment(post.published_at).format("MMM Do, YYYY")}</p>
                            <h3 className="font-semibold text-slate-900 line-clamp-2 group-hover:text-primary transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-slate-500 text-sm line-clamp-2">
                              {post.content.replace(/<[^>]+>/g, "")}
                            </p>
                          </div>
                        </Link>
                        <div className="px-5 pb-5 flex flex-wrap gap-2">
                          {post.categories?.slice(0, 3).map((cat: Category) => (
                            <span key={cat.id} className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                              {cat.name}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </div>
          </section>
        </main>
      )}
    </>
  );
}
