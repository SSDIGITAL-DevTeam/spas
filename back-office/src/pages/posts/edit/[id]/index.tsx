import { JSX, useEffect, useState, FormEvent, useRef, ChangeEvent, KeyboardEvent } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "@nextui-org/react";
import ApiError from "@/errors/ApiError";
import PostModule from "@/modules/PostModule";
import { useCategory } from "@/hooks/useCategory";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import { Category, Post, Tag } from "@/@types";
import TinyMceEditor from "@/components/partials/TinyMceEditor";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import toast from "react-hot-toast";
import { MdClose, MdCloudUpload } from "react-icons/md";

type Errors = {
  title?: string[];
  slug?: string[];
  content?: string[];
  categories?: string[];
  url?: string[];
  tags?: string[];
};

export default function EditPost(): JSX.Element {
  const router = useRouter();
  const { setBreadcrumbs } = useBreadcrumb();
  const [post, setPost] = useState<Post>({} as Post);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [postTags, setPostTags] = useState<string[]>([]);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [slug, setSlug] = useState("");

  const tagInputRef = useRef<HTMLInputElement | null>(null);
  const { categories, fetchCategory } = useCategory();

  useEffect(() => {
    setBreadcrumbs([
      { label: "Dashboard", href: "/" },
      { label: "Posts", href: "/posts" },
      { label: "Edit Post" },
    ]);
    fetchCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!router.query.id) return;
    const load = async () => {
      setIsLoading(true);
      try {
        const res = await new PostModule().singlePost(+router.query.id!);
        setPost(res.data);
        if (res.data.slug) setSlug(res.data.slug);
        if (res.data.tags) {
          setPostTags(res.data.tags.map((t: Tag) => t.name));
        }
      } catch (error) {
        const err = error as ApiError;
        toast.error(err.getFirstError?.() ?? "Failed to load post.");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [router.query.id]);

  const handleCoverUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.item(0);
    if (file) setCoverPreview(URL.createObjectURL(file));
  };

  const addTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tag = e.currentTarget.value.trim();
      if (tag && !postTags.includes(tag)) setPostTags((prev) => [...prev, tag]);
      e.currentTarget.value = "";
    }
  };

  const removeTag = (tag: string) => setPostTags((prev) => prev.filter((t) => t !== tag));

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const title = e.currentTarget.value;
    const generated = title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
    setSlug(generated);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrors({});
    const formData = new FormData(e.currentTarget);
    const submit = e.nativeEvent as SubmitEvent;
    const btn = submit.submitter as HTMLButtonElement;
    formData.append("status", btn.value);

    const pending = tagInputRef.current?.value.trim();
    const allTags = pending ? [...postTags, pending] : postTags;
    allTags.forEach((tag, i) => formData.append(`tags[${i}][name]`, tag));

    try {
      await new PostModule().update(formData, +router.query.id!);
      toast.success("Post updated.");
      router.push(`/posts/view/${post.id}`);
    } catch (error) {
      const err = error as ApiError;
      setErrors((err.getValidationErrors?.() as Errors) ?? {});
      toast.error(err.getFirstError?.() ?? "Something went wrong.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) return <LoadingSpinner fullPage />;

  const inputClass = "w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary";
  const existingCover = post.cover?.url 
    ? (post.cover.url.startsWith("http") ? post.cover.url : `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${post.cover.url}`) 
    : null;

  return (
    <>
      <Head><title>SPAS | Edit Post</title></Head>

      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-800">Edit Post</h1>
        <p className="text-sm text-slate-500 mt-0.5 truncate">{post.title}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main */}
          <div className="xl:col-span-2 space-y-5">
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input name="title" type="text" defaultValue={post.title} className={inputClass} onChange={handleTitleChange} />
                {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title[0]}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Slug</label>
                <input name="slug" type="text" value={slug} readOnly className={`${inputClass} bg-slate-50 text-slate-500 cursor-not-allowed`} />
                {errors.slug && <p className="mt-1 text-xs text-red-500">{errors.slug[0]}</p>}
              </div>

              <div className="min-h-[380px]">
                <label className="block text-sm font-medium text-slate-700 mb-1">Content</label>
                <TinyMceEditor textareaName="content" initialValue={post.content} />
                {errors.content && <p className="mt-1 text-xs text-red-500">{errors.content[0]}</p>}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Cover */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
              <h2 className="text-sm font-semibold text-slate-700 mb-3">Cover Image</h2>
              <label htmlFor="cover-edit" className="cursor-pointer block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverPreview ?? existingCover ?? "/no-image.png"}
                  alt="Cover"
                  className="w-full aspect-video object-cover rounded-lg border border-slate-200"
                />
                <p className="text-xs text-slate-500 mt-2 text-center">Click to change cover</p>
              </label>
              <input id="cover-edit" type="file" name="url" className="hidden" accept="image/*" onChange={handleCoverUpload} />
              {errors.url && <p className="mt-1 text-xs text-red-500">{errors.url[0]}</p>}
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
              <h2 className="text-sm font-semibold text-slate-700 mb-3">Categories</h2>
              <div className="space-y-2">
                {categories?.data.map((cat: Category, i: number) => (
                  <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      value={cat.id}
                      name={`categories[${i}][category_id]`}
                      defaultChecked={post.categories?.some((c) => c.name === cat.name)}
                      className="rounded border-slate-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-slate-700">{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
              <h2 className="text-sm font-semibold text-slate-700 mb-3">Tags</h2>
              <input ref={tagInputRef} type="text" placeholder="Press Enter to add..." className={inputClass} onKeyDown={addTag} />
              <div className="flex flex-wrap gap-2 mt-3">
                {postTags.map((tag, i) => (
                  <span key={i} className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)}><MdClose className="w-3 h-3" /></button>
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button type="submit" name="status" value="2" variant="flat" size="sm" isDisabled={isProcessing}>Save Draft</Button>
              <Button type="submit" name="status" value="4" color="primary" size="sm" isLoading={isProcessing}>Update & Publish</Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
