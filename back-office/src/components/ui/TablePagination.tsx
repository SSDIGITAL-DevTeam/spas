import { JSX } from "react";
import { Pagination } from "@nextui-org/react";

type Meta = {
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  total: number;
};

type Props = {
  meta: Meta;
  onPageChange: (page: number) => void;
};

export default function TablePagination({ meta, onPageChange }: Props): JSX.Element {
  if (meta.last_page <= 1) return <></>;
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 px-1">
      <p className="text-xs text-slate-500">
        Showing <span className="font-medium text-slate-700">{meta.from}</span>–
        <span className="font-medium text-slate-700">{meta.to}</span> of{" "}
        <span className="font-medium text-slate-700">{meta.total}</span> results
      </p>
      <Pagination
        total={meta.last_page}
        page={meta.current_page}
        onChange={onPageChange}
        size="sm"
        color="primary"
        variant="flat"
        showControls
      />
    </div>
  );
}
