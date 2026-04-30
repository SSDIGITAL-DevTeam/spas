import { JSX } from "react";

type Props = {
  size?: "sm" | "md" | "lg";
  fullPage?: boolean;
};

const sizeMap = {
  sm: "w-4 h-4 border-2",
  md: "w-8 h-8 border-2",
  lg: "w-12 h-12 border-[3px]",
};

export default function LoadingSpinner({ size = "md", fullPage = false }: Props): JSX.Element {
  const spinner = (
    <div
      className={`${sizeMap[size]} rounded-full border-slate-200 border-t-primary animate-spin`}
    />
  );

  if (fullPage) {
    return (
      <div className="flex items-center justify-center w-full py-20">
        {spinner}
      </div>
    );
  }

  return spinner;
}
