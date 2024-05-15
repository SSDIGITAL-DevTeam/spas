/* eslint-disable @next/next/no-img-element */
import { Dispatch, JSX, SetStateAction, useState } from "react";
import Logo from "@/assets/logo/spas-logo.png";
import Link from "next/link";
import { NavLink, navLinks } from "@/constants/navlink";
import { useRouter } from "next/router";
import Image from "next/image";

import AuthModule from "@/modules/AuthModule";

type Props = {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Sidebar({
  isMenuOpen,
  setIsMenuOpen,
}: Props): JSX.Element {
  // router
  const router = useRouter();

  // states
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogout = async (): Promise<void> => {
    setIsLoading(true);
    await new AuthModule().signOut();
    localStorage.removeItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME);
    router.push("/login");
    setIsLoading(false);
  };

  return (
    <aside
      className={`${
        isMenuOpen
          ? "left-0 right-0 md:left-4 md:right-4"
          : "-translate-x-full lg:translate-x-4"
      } fixed top-1/2 z-10 h-[95vh] -translate-y-1/2 overflow-y-auto rounded-xl bg-white shadow-lg backdrop-blur duration-300 lg:w-64`}
    >
      <div className="flex h-full flex-col gap-y-8 text-center">
        <div>
          <img
            src={Logo.src}
            className="w-[180px] my-6 mx-auto"
            alt="Logo SPAS"
          />

          {/* <p className="text-2xl font-semibold text-secondary">
						SPAS
					</p> */}
        </div>

        <ul className="flex flex-col gap-y-2">
          {navLinks.map((navLink: NavLink, index: number) => (
            <li onClick={() => setIsMenuOpen(false)} key={`navlink-${index}`}>
              <Link
                className={`${
                  router.pathname === navLink.url
                    ? "bg-secondary w-full text-center px-5 text-white"
                    : ""
                } btn flex items-center gap-x-2 py-2.5 text-secondary hover:bg-secondary hover:text-white hover:text-center hover:px-5 transition-all ease-in-out`}
                href={navLink.url}
                aria-label="Link"
              >
                <Image className="w-4 pb-1" src={navLink.icon} alt="Icon" />
                <span>{navLink.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        <button
          onClick={handleLogout}
          className="bg-secondary hover:bg-primary text-center transition-all capitalize mt-auto py-2 text-white"
        >
          {/* <Image className="w-4 pb-1" src={AssetLogout} alt="Icon" /> */}
          <span>{isLoading ? "Logging out.." : "Sign Out"}</span>
        </button>
      </div>
    </aside>
  );
}
