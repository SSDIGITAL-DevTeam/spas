import { JSX } from "react";

type Status = "pending" | "approve" | "reject" | string;

const config: Record<string, { bg: string; text: string; dot: string }> = {
  pending: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-400" },
  approve: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-400" },
  reject:  { bg: "bg-red-50",    text: "text-red-700",    dot: "bg-red-400" },
};

export default function StatusBadge({ status }: { status: Status }): JSX.Element {
  const c = config[status] ?? { bg: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-400" };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
