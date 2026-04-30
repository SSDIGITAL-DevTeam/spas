import { JSX } from "react";

type Props = {
  cols: number;
  rows?: number;
};

export default function SkeletonRow({ cols, rows = 5 }: Props): JSX.Element {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="border-b border-slate-100">
          {Array.from({ length: cols }).map((_, j) => (
            <td key={j} className="px-4 py-4">
              <div className="h-4 bg-slate-100 rounded animate-pulse" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
