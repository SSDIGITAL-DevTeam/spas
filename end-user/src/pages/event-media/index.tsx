/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, type JSX } from "react";
import { GetServerSidePropsResult } from "next";
import Head from "next/head";
import Link from "next/link";
import moment from "moment";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa6";
import { Category, Post } from "@/@types";
import PageHero from "@/components/ui/PageHero";

type EventMediaProps = {
  initialPosts: Post[];
};

function EventMediaCard({
  post,
  featured = false,
}: {
  post: Post;
  featured?: boolean;
}): JSX.Element {
  return (
    <article
      className={`group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        featured ? "lg:col-span-2" : ""
      }`}
    >
      <Link
        href={`/event-media/${post.slug}`}
        className={featured ? "grid h-full md:grid-cols-[1.1fr_0.9fr]" : "flex h-full flex-col"}
      >
        <div
          className={`relative overflow-hidden bg-slate-100 ${
            featured ? "min-h-[280px] md:min-h-full" : "h-56"
          }`}
        >
          {post.cover?.url ? (
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${post.cover.url}`}
              alt={post.title}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-200 text-sm font-semibold text-slate-500">
              SPAS
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/55 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm">
            {moment(post.published_at).format("MMM Do YYYY")}
          </span>
        </div>
        <div className={`flex flex-col ${featured ? "p-6 lg:p-8" : "p-5"}`}>
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories?.slice(0, 2).map((cat: Category) => (
              <span
                key={cat.id}
                className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full font-medium"
              >
                {cat.name}
              </span>
            ))}
          </div>
          <h2
            className={`font-semibold text-slate-900 group-hover:text-primary transition-colors ${
              featured ? "text-2xl lg:text-3xl leading-tight line-clamp-3 mb-4" : "line-clamp-2 mb-2"
            }`}
          >
            {post.title}
          </h2>
          <p className={`text-slate-500 text-sm ${featured ? "line-clamp-4" : "line-clamp-2"}`}>
            {post.content.replace(/<[^>]+>/g, "")}
          </p>
          <span className="mt-5 inline-flex w-max items-center gap-x-2 text-sm font-semibold text-primary">
            Read article <FaArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </article>
  );
}

export const getServerSideProps = async (): Promise<
  GetServerSidePropsResult<EventMediaProps>
> => {
  try {
    const serverApiUrl = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(
      "://localhost",
      "://127.0.0.1"
    );
    const res = await fetch(`${serverApiUrl}/end-user/posts`, {
      headers: { Accept: "application/json" },
    });

    if (!res.ok) return { props: { initialPosts: [] } };

    const body = await res.json();
    return { props: { initialPosts: body.data ?? [] } };
  } catch {
    return { props: { initialPosts: [] } };
  }
};

export default function EventMedia({ initialPosts }: EventMediaProps): JSX.Element {
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!);
    if (!token) return;

    const me = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/end-user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRole(res.data.data.role ?? "");
      } catch {
        setRole("");
      }
    };

    me();
  }, []);

  const publishedPosts = initialPosts.filter((post) => post.status === "4");

  return (
    <>
      <Head>
        <title>SPAS | Event &amp; Media</title>
        <link rel="icon" href="/asset-logo.png" />
        <meta name="author" content="SPAS" />
        <meta name="title" content="SPAS | Event & Media" />
        <meta
          name="description"
          content="Expand your knowledge with our latest information and upcoming events about beauty, spas, and wellness."
        />
        <meta name="keywords" content="spa, services, event and media" />
        <meta name="robots" content="index, follow" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />
        <meta property="og:title" content="SPAS | Event & Media" />
        <meta
          property="og:description"
          content="Expand your knowledge with our latest information and upcoming events about beauty, spas, and wellness."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/asset-logo.png`}
        />
      </Head>

      <main>
        <PageHero
          badgeText="Media Journal"
          title="Event & Media"
          subtitle="Explore the latest industry news, event updates, and community stories from SPAS."
          imagePath="/event-media-assets/blur.webp"
        />

        <section className="py-16 lg:py-24 bg-slate-50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col gap-y-10">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl lg:text-4xl font-semibold text-slate-950">
                    Latest News &amp; Events
                  </h2>
                  <p className="mt-3 max-w-xl text-slate-500">
                    The same event feed from the homepage, expanded for browsing.
                  </p>
                </div>
                {role !== "operator" ? (
                  <Link
                    href="/join-us"
                    className="hidden md:inline-flex text-sm font-semibold text-primary hover:underline items-center gap-x-1"
                  >
                    Join SPAS <FaArrowRight className="w-3 h-3" />
                  </Link>
                ) : null}
              </div>

              {publishedPosts.length === 0 ? (
                <div className="text-center py-16 text-slate-400">
                  <p className="text-4xl font-semibold mb-2">Oops..</p>
                  <p>No Event &amp; Media currently found</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {publishedPosts.map((post: Post, index: number) => (
                    <EventMediaCard key={post.id} post={post} featured={index === 0} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
