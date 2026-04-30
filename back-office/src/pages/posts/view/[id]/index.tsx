import { JSX, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import PostModule from "@/modules/PostModule";
import { Post, Category, Tag } from "@/@types";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { MdEdit } from "react-icons/md";

export default function ViewPost(): JSX.Element {
  const router = useRouter();
  const { setBreadcrumbs } = useBreadcrumb();
  const [post, setPost] = useState<Post>({} as Post);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setBreadcrumbs([
      { label: "Dashboard", href: "/" },
      { label: "Posts", href: "/posts" },
      { label: "View Post" },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!router.query.id) return;
    const load = async () => {
      setIsLoading(true);
      try {
        const res = await new PostModule().singlePost(+router.query.id!);
        setPost(res.data);
      } catch {
        // silently fail
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [router.query.id]);

  if (isLoading) return <LoadingSpinner fullPage />;

  return (
    <>
      <Head><title>SPAS | {post.title}</title></Head>

      <div className="max-w-3xl mx-auto">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold text-slate-800">{post.title}</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              {post.categories?.map((cat: Category, i: number) => (
                <span key={i} className="px-2 py-0.5 bg-secondary/10 text-secondary text-xs rounded-full">
                  {cat.name}
                </span>
              ))}
            </div>
          </div>
          <Button as={Link} href={`/posts/edit/${post.id}`} size="sm" color="primary" startContent={<MdEdit className="w-4 h-4" />}>
            Edit
          </Button>
        </div>

        {post.cover?.url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${post.cover.url}`}
            alt={post.title}
            className="w-full aspect-video object-cover rounded-xl border border-slate-200 mb-6"
          />
        )}

        <article
          className="prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-100">
            {post.tags.map((tag: Tag, i: number) => (
              <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full">
                #{tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
