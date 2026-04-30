import { JSX } from "react";
import { MdInbox } from "react-icons/md";

type Props = {
  message?: string;
  colSpan?: number;
};

export default function EmptyState({ message = "No data found.", colSpan = 100 }: Props): JSX.Element {
  return (
    <tr>
      <td colSpan={colSpan}>
        <div className="flex flex-col items-center justify-center py-16 text-slate-400">
          <MdInbox className="w-12 h-12 mb-3 text-slate-300" />
          <p className="text-sm">{message}</p>
        </div>
      </td>
    </tr>
  );
}
