import { JSX, InputHTMLAttributes, ReactNode } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  error?: string;
  endContent?: ReactNode;
};

const inputClass =
  "w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors";

export default function FormInput({ label, name, error, endContent, required, className, ...rest }: Props): JSX.Element {
  return (
    <div className="flex flex-col gap-y-1">
      <label className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="relative">
        <input
          name={name}
          className={`${inputClass} ${endContent ? "pr-10" : ""} ${className ?? ""}`}
          {...rest}
        />
        {endContent && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
            {endContent}
          </span>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
