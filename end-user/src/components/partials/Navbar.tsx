import React, { JSX, useState, useEffect } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "@/components/utils/Logo";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Image,
} from "@nextui-org/react";
import axios from "axios";
import { FaUser } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

type NavLink = { name: string; path: string };

const navLinks: NavLink[] = [
  { name: "Spa Therapist", path: "/therapist" },
  { name: "Spa Operator", path: "/spa-operators" },
  { name: "Membership", path: "/membership" },
  { name: "Event & Media", path: "/event-media" },
  { name: "Value Partners", path: "/value-partners" },
  { name: "About", path: "/about-us" },
  { name: "Contact", path: "/contact-us" },
];

export default function Navbar(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [role, setRole] = useState("");
  const [slugTherapist, setSlugTherapist] = useState("");
  const [slugOperator, setSlugOperator] = useState("");
  const [cover, setCover] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const me = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/end-user/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!)}`,
          },
        });
        const data = res.data.data;
        setCover(data?.cover ?? "");
        setSlugTherapist(data?.therapist?.slug ?? "");
        setSlugOperator(data?.operator?.slug ?? "");
        setRole(data.role ?? "");
      } catch {
        // not logged in
      }
    };
    me();
  }, []);

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-out`, undefined, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!)}`,
        },
      });
      localStorage.removeItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!);
      router.push("/auth/sign-in");
    } catch {
      localStorage.removeItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!);
      router.push("/auth/sign-in");
    }
  };

  const profileHref =
    role === "operator"
      ? `/profile/operator/${slugOperator}`
      : `/profile/therapist/${slugTherapist}`;

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100"
            : "bg-white"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-18 lg:h-20 items-center justify-between py-3">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Logo />
            </Link>

            {/* Desktop Nav */}
            <ul className="hidden lg:flex items-center gap-x-1 xl:gap-x-2">
              {navLinks.map((link) => {
                const isActive = router.pathname === link.path;
                return (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 group ${
                        isActive
                          ? "text-primary"
                          : "text-slate-700 hover:text-primary hover:bg-primary/5"
                      }`}
                    >
                      {link.name}
                      {isActive && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Desktop Auth */}
            <div className="hidden lg:flex items-center gap-x-3">
              {role ? (
                <Dropdown>
                  <DropdownTrigger>
                    <button className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary/20 hover:border-primary/50 transition-colors focus:outline-none">
                      {cover ? (
                        <Image
                          src={cover}
                          removeWrapper
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                          <FaUser className="text-primary w-4 h-4" />
                        </div>
                      )}
                    </button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="User actions" variant="flat">
                    <DropdownItem
                      as={Link}
                      href={profileHref}
                      key="profile"
                      color="primary"
                      className="text-primary"
                    >
                      My Profile
                    </DropdownItem>
                    <DropdownItem
                      onClick={handleLogout}
                      key="logout"
                      color="danger"
                      className="text-danger"
                    >
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <Link href="/auth/sign-in">
                  <Button
                    size="sm"
                    className="bg-secondary text-white font-medium px-5 rounded-lg"
                  >
                    Sign In
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <IoMenu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-2xl lg:hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <Link href="/" onClick={() => setIsMenuOpen(false)}>
                  <Logo />
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
                >
                  <IoClose className="w-5 h-5" />
                </button>
              </div>

              {/* Links */}
              <ul className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                {navLinks.map((link, i) => {
                  const isActive = router.pathname === link.path;
                  return (
                    <motion.li
                      key={link.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-slate-700 hover:bg-slate-50 hover:text-primary"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Mobile Auth */}
              <div className="p-4 border-t border-slate-100 space-y-2">
                {role ? (
                  <>
                    <Link
                      href={profileHref}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-x-3 px-4 py-3 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/30">
                        {cover ? (
                          <img src={cover} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                            <FaUser className="text-primary w-4 h-4" />
                          </div>
                        )}
                      </div>
                      <span className="text-sm font-medium text-primary">My Profile</span>
                    </Link>
                    <button
                      onClick={() => { setIsMenuOpen(false); handleLogout(); }}
                      className="w-full px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/auth/sign-in"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center px-4 py-3 rounded-xl bg-secondary text-white text-sm font-medium hover:bg-secondary/90 transition-colors"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
