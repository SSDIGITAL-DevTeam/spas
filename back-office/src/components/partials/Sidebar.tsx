import { JSX, useState } from "react";
import Logo from "@/assets/logo/spas-logo.png";
import Link from "next/link";
import { navGroups, NavLink } from "@/constants/navlink";
import { useRouter } from "next/router";
import Image from "next/image";
import { MdLogout } from "react-icons/md";
import AuthModule from "@/modules/AuthModule";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: Props): JSX.Element {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await new AuthModule().signOut();
    localStorage.removeItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME);
    router.push("/login");
    setIsLoggingOut(false);
  };

  const isActive = (url: string) =>
    url === "/" ? router.pathname === "/" : router.pathname.startsWith(url);

  return (
    <>
      {/* Mobile overlay — uses opacity transition so it fades in/out */}
      <div
        className={`fixed inset-0 z-20 bg-slate-900/50 lg:hidden transition-opacity duration-300 ease-in-out
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      <aside
        className={`fixed top-0 left-0 z-30 h-screen w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-slate-100 px-6 shrink-0">
          <Image src={Logo} alt="SPAS Logo" className="h-8 w-auto" />
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                {group.label}
              </p>
              <ul className="space-y-0.5">
                {group.links.map((link: NavLink) => {
                  const active = isActive(link.url);
                  return (
                    <li key={link.url}>
                      <Link
                        href={link.url}
                        onClick={onClose}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                          ${active
                            ? "bg-primary text-white"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                          }`}
                      >
                        <link.icon className="w-4 h-4 shrink-0" />
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="shrink-0 border-t border-slate-100 px-3 py-3">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <MdLogout className="w-4 h-4 shrink-0" />
            <span>{isLoggingOut ? "Signing out…" : "Sign Out"}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
