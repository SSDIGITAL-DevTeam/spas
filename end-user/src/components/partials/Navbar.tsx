import { JSX, useState, useEffect, useRef } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/router";
import NavLink from "@/components/utils/NavLink";
import Logo from "@/components/utils/Logo";

type NavLink = {
  name: string;
  path: string;
};

const navLinks: NavLink[] = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Membership",
    path: "/membership",
  },
  {
    name: "Therapist",
    path: "/theraphist",
  },
  {
    name: "Event & Media",
    path: "/event-and-media",
  },
  {
    name: "About Us",
    path: "/about-us",
  },
  {
    name: "Contact Us",
    path: "/contact us",
  },
];

export default function Navbar(): JSX.Element {
  // states
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrollTop, setScrollTop] = useState<number>(0);

  // ref
  const menuRef = useRef<HTMLUListElement | null>(null);

  // router
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        scrollTop > 0 ? "shadow" : "shadow-none"
      } fixed bg-white top-0 z-30 h-20 w-full duration-300 lg:h-24`}
    >
      {/* mobile nav */}
      <div className="flex h-full items-center justify-between bg-white p-4 lg:p-8 lg:hidden">
        {/* open menu */}
        <IoMenu
          onClick={() => setIsMenuOpen(true)}
          className="w-10 h-10 bg-gray-400 text-white rounded-full p-2"
        />

        <div className="flex gap-x-4">
          <Link href="/">
            <Logo />
          </Link>

          <div>
            {/* <p className="font-bold">SPAS</p>

						<p></p> */}
          </div>
        </div>
      </div>

      <div
        className={`${
          isMenuOpen ? "h-screen bg-white" : "h-0 bg-white"
        } absolute inset-0 overflow-hidden duration-300 lg:hidden`}
      >
        {/* close menu */}
        <IoClose
          className="absolute right-6 top-6 w-8 h-8"
          onClick={() => setIsMenuOpen(false)}
        />

        <div className="flex gap-x-4 absolute top-3 left-5">
          <Link href="/">
            <Logo />
          </Link>

          <div>
            {/* <p className="font-bold">SPAS</p>

						<p></p> */}
          </div>
        </div>

        <ul
          ref={menuRef}
          onClick={() => setIsMenuOpen(false)}
          className="mt-32 flex flex-col items-center gap-y-2 text-xl font-medium text-white"
        >
          {navLinks.map((navLink: NavLink, index: number) => (
            <li
              key={index}
              className={`${
                router.pathname === navLink.path ? "text-[#1374B1]" : ""
              } px-4 py-1.5 font-semibold text-black`}
            >
              <Link href={navLink.path}>{navLink.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* desktop nav */}
      <div className="container h-full py-4">
        <div className="hidden justify-between items-center h-full lg:flex">
          <div className="flex gap-x-4">
            <Link href="/">
              <Logo />
            </Link>

            <div>
              {/* <p className="font-bold">SPAS</p>

							<p></p> */}
            </div>
          </div>

          <ul className="flex gap-x-8 items-center text-[#1374B1]">
            {navLinks.map((navLink: NavLink, index: number) => (
              <li
                key={index}
                className={`${
                  router.pathname === navLink.path
                    ? "text-primary font-bold"
                    : ""
                } px-2 font-semibold`}
              >
                <Link href={navLink.path}>{navLink.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
