import { JSX, ReactNode } from "react";

type Props = {
  label: string;
  error?: string | string[];
  required?: boolean;
  children: ReactNode;
  hint?: string;
};

export default function FormField({ label, error, required, children, hint }: Props): JSX.Element {
  const errorMsg = Array.isArray(error) ? error[0] : error;
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && !errorMsg && <p className="text-xs text-slate-400">{hint}</p>}
      {errorMsg && <p className="text-xs text-red-500">{errorMsg}</p>}
    </div>
  );
}
