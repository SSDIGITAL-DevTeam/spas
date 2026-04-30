import { JSX } from "react";
import Logo from "@/components/utils/Logo";
import { FaSquareFacebook, FaLinkedin, FaInstagram, FaPhone } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import Link from "next/link";

const company = [
  { label: "Home", href: "/" },
  { label: "Membership", href: "/membership" },
  { label: "Spa Therapist", href: "/therapist" },
  { label: "Event & Media", href: "/event-media" },
];

const explore = [
  { label: "Spa Operator", href: "/spa-operators" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Value Partners", href: "/value-partners" },
];

export default function Footer(): JSX.Element {
  return (
    <footer className="bg-secondary text-white mt-auto">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-4">
          {/* Brand */}
          <div className="space-y-5 xl:col-span-1">
            <div className="brightness-0 invert w-fit">
              <Logo />
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              We love working with ambitious people. Let&rsquo;s build something great together now.
            </p>
            <div className="flex gap-x-4">
              <a
                href="https://www.linkedin.com/company/the-butterlfy/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61550755322576"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <FaSquareFacebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/thebutterflyid/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Company</p>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Explore</p>
            <ul className="space-y-3">
              {explore.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Contact</p>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@spas.com.sg"
                  className="flex items-start gap-x-3 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <MdOutlineMailOutline className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  hello@spas.com.sg
                </a>
              </li>
              <li>
                <a
                  href="tel:+6588002950"
                  className="flex items-start gap-x-3 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <FaPhone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  +65 8800 2950
                </a>
              </li>
              <li className="flex items-start gap-x-3 text-sm text-white/70">
                <IoLocationOutline className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>1100 Lower Delta Rd #02-02B EPL Building Singapore 169206</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-y-2">
          <p className="text-sm text-white/50">
            &copy; {new Date().getFullYear()} SPAS. All Rights Reserved.
          </p>
          <Link
            href="/join-us"
            className="text-sm text-white/50 hover:text-white transition-colors"
          >
            Join Us
          </Link>
        </div>
      </div>
    </footer>
  );
}
