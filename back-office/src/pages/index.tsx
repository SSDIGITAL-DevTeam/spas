import { JSX, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { usePosts } from "@/hooks/usePosts";
import { useEvent } from "@/hooks/useEvent";
import { useOperator } from "@/hooks/useOperator";
import { useTherapist } from "@/hooks/useTherapist";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import { MdArticle, MdEvent, MdPeople, MdPersonAdd } from "react-icons/md";

type StatCardProps = {
  label: string;
  value: number | undefined;
  icon: React.ElementType;
  href: string;
  color: string;
};

function StatCard({ label, value, icon: Icon, href, color }: StatCardProps) {
  return (
    <Link href={href}>
      <div className={`bg-white rounded-xl border border-slate-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow`}>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-2xl font-bold text-slate-800">{value ?? "—"}</p>
          <p className="text-sm text-slate-500">{label}</p>
        </div>
      </div>
    </Link>
  );
}

export default function Dashboard(): JSX.Element {
  const { setBreadcrumbs } = useBreadcrumb();

  const { posts, fetchPosts } = usePosts();
  const { events, fetchEvent } = useEvent();
  const { operator, fetchOperator } = useOperator();
  const { therapist, fetchTherapist } = useTherapist();

  useEffect(() => {
    setBreadcrumbs([{ label: "Dashboard" }]);
    fetchPosts();
    fetchEvent();
    fetchOperator();
    fetchTherapist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pendingOperators = operator?.data?.filter((o) => o.status === "pending").length ?? 0;
  const pendingTherapists = therapist?.data?.filter((t) => t.status === "pending").length ?? 0;
  const pendingTotal = pendingOperators + pendingTherapists;

  return (
    <>
      <Head>
        <title>SPAS | Dashboard</title>
      </Head>

      <div>
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-slate-800">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">Welcome back, Admin</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Total Posts"
            value={posts?.meta?.total}
            icon={MdArticle}
            href="/posts"
            color="bg-primary"
          />
          <StatCard
            label="Total Events"
            value={events?.meta?.total}
            icon={MdEvent}
            href="/events"
            color="bg-secondary"
          />
          <StatCard
            label="Active Members"
            value={(operator?.data?.filter((o) => o.status === "approve").length ?? 0) + (therapist?.data?.filter((t) => t.status === "approve").length ?? 0)}
            icon={MdPeople}
            href="/member-lists"
            color="bg-emerald-500"
          />
          <StatCard
            label="Pending Approval"
            value={pendingTotal}
            icon={MdPersonAdd}
            href="/new-members"
            color="bg-amber-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Operators */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-700">Pending Operators</h2>
              <Link href="/new-members" className="text-xs text-primary hover:underline">View all</Link>
            </div>
            <div className="divide-y divide-slate-50">
              {operator?.data?.filter((o) => o.status === "pending").slice(0, 5).map((op) => (
                <div key={op.id} className="flex items-center gap-3 px-5 py-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={op.cover ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${op.cover.url}` : "/no-image.png"}
                    alt={op.company_name}
                    className="w-8 h-8 rounded-lg object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-700 truncate">{op.company_name}</p>
                    <p className="text-xs text-slate-500 truncate">{op.contact_no}</p>
                  </div>
                  <Link href={`/new-members/operator/${op.id}`} className="text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-colors shrink-0">
                    Review
                  </Link>
                </div>
              ))}
              {pendingOperators === 0 && (
                <p className="text-sm text-slate-400 text-center py-6">No pending operators</p>
              )}
            </div>
          </div>

          {/* Pending Therapists */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-700">Pending Therapists</h2>
              <Link href="/new-members" className="text-xs text-primary hover:underline">View all</Link>
            </div>
            <div className="divide-y divide-slate-50">
              {therapist?.data?.filter((t) => t.status === "pending").slice(0, 5).map((th) => (
                <div key={th.id} className="flex items-center gap-3 px-5 py-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={th.cover ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${th.cover.url}` : "/no-image.png"}
                    alt={th.name}
                    className="w-8 h-8 rounded-full object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-700 truncate">{th.name}</p>
                    <p className="text-xs text-slate-500 truncate">{th.contact_no}</p>
                  </div>
                  <Link href={`/new-members/therapist/${th.id}`} className="text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-colors shrink-0">
                    Review
                  </Link>
                </div>
              ))}
              {pendingTherapists === 0 && (
                <p className="text-sm text-slate-400 text-center py-6">No pending therapists</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
