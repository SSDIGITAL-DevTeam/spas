import { JSX, ReactNode } from "react";
import SkeletonRow from "./SkeletonRow";

type Column = {
  header: string;
  className?: string;
};

type Props = {
  columns: Column[];
  children: ReactNode;
  isLoading?: boolean;
  skeletonRows?: number;
};

export default function DataTable({ columns, children, isLoading = false, skeletonRows = 5 }: Props): JSX.Element {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary">
              {columns.map((col, i) => (
                <th
                  key={i}
                  className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-white ${col.className ?? ""}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <SkeletonRow cols={columns.length} rows={skeletonRows} />
            ) : (
              children
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
