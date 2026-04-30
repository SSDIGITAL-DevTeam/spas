import { JSX } from "react";
import { MdMenu } from "react-icons/md";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import Link from "next/link";

type Props = {
  onMenuToggle: () => void;
};

export default function Navbar({ onMenuToggle }: Props): JSX.Element {
  const { breadcrumbs } = useBreadcrumb();

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 sm:px-6 h-14 flex items-center gap-3 min-w-0">
      {/* Hamburger (mobile) */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 shrink-0"
        aria-label="Toggle menu"
      >
        <MdMenu className="w-5 h-5" />
      </button>

      {/* Breadcrumbs — hidden on very small screens to prevent overflow */}
      <nav className="flex items-center gap-1 text-sm min-w-0 overflow-hidden">
        {breadcrumbs.map((item, i) => {
          const isLast = i === breadcrumbs.length - 1;
          const isFirst = i === 0;
          return (
            <span key={i} className={`flex items-center gap-1 min-w-0 ${isFirst && !isLast ? "hidden sm:flex" : ""}`}>
              {i > 0 && <span className="text-slate-300 shrink-0">/</span>}
              {isLast || !item.href ? (
                <span className={`truncate ${isLast ? "font-medium text-slate-800" : "text-slate-500"}`}>
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-slate-500 hover:text-primary truncate transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </header>
  );
}
