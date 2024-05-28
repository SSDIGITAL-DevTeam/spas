import React, { JSX, useState, useEffect, useRef } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/router";
import NavLink from "@/components/utils/NavLink";
import Logo from "@/components/utils/Logo";
import { Button } from "@nextui-org/react";
import axios from "axios";
import AssetProfile from "@/assets/dev/profile.png";
import { Image } from "@nextui-org/react";
import { FaRegUser, FaUser } from "react-icons/fa6";

type NavLink = {
  name: string;
  path: string;
};

const navLinks: NavLink[] = [
  {
    name: "Spa Therapist",
    path: "/therapist",
  },
  {
    name: "Spa Operator",
    path: "/spa-operators",
  },
  {
    name: "Membership",
    path: "/membership",
  },
  { name: "Event & Media", path: "/event-media" },
  { name: "Value Partners", path: "/value-partners" },
  {
    name: "About",
    path: "/about-us",
  },
  {
    name: "Contact",
    path: "/contact-us",
  },
];

export default function Navbar(): JSX.Element {
  // states
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [role, setRole] = useState<string>("");
  const [slugTherapist, setSlugTherapist] = useState<string>("");
  const [slugOperator, setSlugOperator] = useState<string>("");

  const [cover, setCover] = useState<string>("");
  const [id, setId] = useState<string>("");

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

  const me = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/end-user/me`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              `${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
            )}`,
          },
        }
      );
      console.log(response.data.data);
      // console.log(response.data.data?.covers?.operator[0]);
      setId(response.data.data.id);
      setCover(response.data.data?.covers?.operator[0]);
      setSlugTherapist(response.data.data?.therapist?.slug);
      setSlugOperator(response.data.data?.operator?.slug);
      setRole(response.data.data.role);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    me();
  }, []);
  console.log(role);
  return (
    <nav
      className={`${
        scrollTop > 0 ? "shadow" : "shadow-none"
      } fixed bg-white shadow-md top-0 z-30 h-20 w-full duration-300 lg:h-24`}
    >
      {/* mobile nav */}
      <div className="container flex h-full items-center justify-between bg-white p-4 lg:p-8 lg:hidden">
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
        className={` ${
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

          {role ? (
            <Button
              className="bg-secondary text-white text-xl rounded-md w-max"
              radius="none"
              as={Link}
              onClick={() => setIsMenuOpen(false)}
              href={`${
                role == "operator"
                  ? `/profile/operator/${slugOperator}`
                  : `/profile/therapist/${slugTherapist}`
              }`}
            >
              Profile
            </Button>
          ) : (
            <Link
              href={"/auth/sign-in"}
              className="mx-auto md:mx-0 w-max text-base"
            >
              <span className="btn-1 block my-4 w-full text-center lg:w-max hover:bg-primary transition-colors ease-out">
                Sign In
              </span>
            </Link>
            // <Button
            //   as={Link}
            //   href="/auth/sign-in"
            //   className="bg-secondary text-white"
            // >
            //   Sign In
            // </Button>
          )}
        </ul>
      </div>

      {/* desktop nav */}
      <div className="container h-full py-4">
        <div className="hidden justify-between items-center h-full lg:flex">
          <div className="flex gap-x-4">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          <ul className="flex gap-x-8 items-center text-[#1374B1]">
            {navLinks.map((navLink: NavLink, index: number) => (
              <li
                key={index}
                className={`${
                  router.pathname === navLink.path
                    ? "text-secondary font-bold"
                    : ""
                } px-2 font-semibold`}
              >
                <Link href={navLink.path}>{navLink.name}</Link>
              </li>
            ))}

            {/* <Link
                  href={"/spa-operators"}
                  className={`${
                    router.pathname === "/spa-operators"
                      ? "text-secondary font-bold"
                      : ""
                  } px-2 font-semibold`}
                >
                  Spa Operator
                </Link> */}
            {/* {role == "operator" && (
              <Link
                href={"/event-media"}
                className={`${
                  router.pathname === "/event-media"
                    ? "text-secondary font-bold"
                    : ""
                } px-2 font-semibold`}
              >
                Event & Media
              </Link>
            )} */}

            {role ? (
              <Button
                as={Link}
                href={`${
                  role == "operator"
                    ? `/profile/operator/${slugOperator}`
                    : `/profile/therapist/${slugTherapist}`
                }`}
                className=" text-white lg:w-20 lg:h-20 aspect-square bg-transparent"
              >
                {cover == undefined ? (
                  <FaUser className="text-gray-400 w-10 h-10" />
                ) : (
                  <Image
                    // src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${cover[0]}`}
                    src={cover}
                    removeWrapper
                    isBlurred
                    className="object-cover aspect-square"
                    radius="full"
                  />
                )}
              </Button>
            ) : (
              <Button
                as={Link}
                href="/auth/sign-in"
                className="bg-secondary text-white"
              >
                Sign In
              </Button>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
