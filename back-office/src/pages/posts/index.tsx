import { JSX, useEffect, useState } from "react";
import Head from "next/head";
import { Tabs, Tab, Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { Post } from "@/@types";
import { usePosts } from "@/hooks/usePosts";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import PageHeader from "@/components/ui/PageHeader";
import DataTable from "@/components/ui/DataTable";
import TablePagination from "@/components/ui/TablePagination";
import ConfirmModal from "@/components/ui/ConfirmModal";
import EmptyState from "@/components/ui/EmptyState";
import ApiError from "@/errors/ApiError";
import PostModule from "@/modules/PostModule";
import toast from "react-hot-toast";
import { PostStatusEnum } from "@/enums";
import { MdEdit, MdDelete, MdVisibility, MdSearch } from "react-icons/md";

function StatusPill({ status }: { status: string }) {
  const isPublished = status === "4";
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${isPublished ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
      {isPublished ? "Published" : "Draft"}
    </span>
  );
}

export default function Posts(): JSX.Element {
  const { setBreadcrumbs } = useBreadcrumb();
  const [deleteId, setDeleteId] = useState(0);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const { posts, isPostsLoading, fetchPosts } = usePosts();

  useEffect(() => {
    setBreadcrumbs([{ label: "Dashboard", href: "/" }, { label: "Posts" }]);
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);
    await fetchPosts("1", PostStatusEnum.PUBLISHED, q);
  };

  const handlePageChange = async (p: number) => {
    setPage(p);
    await fetchPosts(p.toString(), PostStatusEnum.PUBLISHED, searchQuery);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await new PostModule().destroy(deleteId);
      toast.success("Post deleted.");
      await fetchPosts(page.toString(), PostStatusEnum.PUBLISHED, searchQuery);
    } catch (error) {
      const err = error as ApiError;
      toast.error(err.getFirstError?.() ?? "Failed to delete.");
    } finally {
      setIsDeleting(false);
      setIsDeleteOpen(false);
    }
  };

  const columns = [
    { header: "Title" },
    { header: "Slug" },
    { header: "Status", className: "w-28" },
    { header: "Actions", className: "w-32 text-center" },
  ];

  const renderRows = (statusFilter: string) => {
    const filtered = posts?.data?.filter((p) => p.status === statusFilter) ?? [];
    if (filtered.length === 0) return <EmptyState message="No posts found." />;
    return filtered.map((post: Post) => (
      <tr key={post.id} className="hover:bg-slate-50 transition-colors">
        <td className="px-4 py-3 text-sm font-medium text-slate-700 max-w-xs truncate">{post.title}</td>
        <td className="px-4 py-3 text-sm text-slate-500 max-w-xs truncate">{post.slug}</td>
        <td className="px-4 py-3"><StatusPill status={post.status} /></td>
        <td className="px-4 py-3">
          <div className="flex items-center justify-center gap-2">
            <Button as={Link} href={`/posts/view/${post.id}`} isIconOnly size="sm" variant="flat" color="default" aria-label="View">
              <MdVisibility className="w-4 h-4" />
            </Button>
            <Button as={Link} href={`/posts/edit/${post.id}`} isIconOnly size="sm" variant="flat" color="primary" aria-label="Edit">
              <MdEdit className="w-4 h-4" />
            </Button>
            <Button isIconOnly size="sm" variant="flat" color="danger" aria-label="Delete" onPress={() => { setDeleteId(post.id); setIsDeleteOpen(true); }}>
              <MdDelete className="w-4 h-4" />
            </Button>
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <Head><title>SPAS | Posts</title></Head>

      <PageHeader title="Posts" description="Manage blog posts" action={{ label: "New Post", href: "/posts/create" }} />

      <div className="mb-5 w-64">
        <Input
          placeholder="Search posts..."
          variant="bordered"
          size="sm"
          value={searchQuery}
          onChange={handleSearch}
          startContent={<MdSearch className="text-slate-400 w-4 h-4" />}
        />
      </div>

      <Tabs color="primary" variant="underlined" aria-label="Post tabs">
        <Tab key="published" title="Published">
          <div className="mt-3">
            <DataTable columns={columns} isLoading={isPostsLoading}>
              {renderRows("4")}
            </DataTable>
          </div>
        </Tab>
        <Tab key="draft" title="Drafts">
          <div className="mt-3">
            <DataTable columns={columns} isLoading={isPostsLoading}>
              {renderRows("2")}
            </DataTable>
          </div>
        </Tab>
      </Tabs>

      {posts?.meta && (
        <TablePagination meta={posts.meta} onPageChange={handlePageChange} />
      )}

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete Post"
        message="Are you sure you want to delete this post?"
      />
    </>
  );
}
