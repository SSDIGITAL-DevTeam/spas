import { JSX } from "react";
import Logo from "@/components/utils/Logo";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import Link from "next/link";

export default function Footer(): JSX.Element {
  return (
    <footer className="mt-auto animate-shiny border-t py-4 lg:py-8">
      <div className="container">
        <div className="flex flex-col gap-y-8">
          <div className="flex flex-col gap-y-8 xl:flex-row xl:justify-between xl:gap-x-16 text-black">
            <div className="flex flex-col gap-y-4 md:max-w-sm">
              <Logo />
              <p className="text-secondary">
                We love working with ambitious people. Let&rsquo;s build
                something great together now.
              </p>

              <ul className="flex gap-x-4 text-2xl text-secondary">
                <li>
                  <a
                    href="https://www.linkedin.com/company/the-butterlfy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Link to The SPAS Linkedin"
                  ></a>
                  <FaLinkedin />
                </li>

                <li>
                  <a
                    href="https://www.facebook.com/profile.php?id=61550755322576"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Link to The SPAS Facebook"
                  ></a>
                  <FaSquareFacebook />
                </li>

                <li>
                  <a
                    href="https://www.instagram.com/thebutterflyid/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Link to The SPAS Instagram"
                  ></a>
                  <FaInstagram />
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-y-8 md:flex-row md:justify-between xl:gap-x-16">
              <div className="flex flex-col gap-y-4 md:max-w-sm">
                <strong>Company</strong>

                <nav>
                  <ul className="flex flex-col gap-y-2 text-secondary">
                    <li>
                      <Link href="https://dev.spas.com.sg/">Home</Link>
                    </li>
                    <li>
                      <Link href={"/membership"} rel="noopener noreferrer">
                        Membership
                      </Link>
                    </li>
                    <li>
                      <Link href={"/therapist"} rel="noopener noreferrer">
                        Spa Therapist
                      </Link>
                    </li>
                    <li>
                      <Link href={"/event-media"} rel="noopener noreferrer">
                        Event & Media
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className="flex flex-col gap-y-4 md:max-w-sm">
                <ul className="flex flex-col gap-y-2 text-secondary md:pt-10">
                  <li>
                    <Link href={"/spa-operators"} rel="noopener noreferrer">
                      Spa Operator
                    </Link>
                  </li>
                  <li>
                    <Link href={"/about-us"} rel="noopener noreferrer">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href={"/contact-us"} rel="noopener noreferrer">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href={"/value-partners"} rel="noopener noreferrer">
                      Value Partners
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-y-4 md:max-w-sm">
                <strong>Contact</strong>

                <ul className="flex flex-col gap-y-2 text-secondary">
                  <li className="flex">
                    <MdOutlineMailOutline className="w-5 h-5 mt-0.5" />
                    <a className="ml-2" href="mailto:hello@spas.com.sg">
                      hello@spas.com.sg
                    </a>
                  </li>
                  <li className="flex">
                    <FaPhone className="w-4 h-4 mt-0.5" />
                    <a className="ml-2" target="_blank" href="tel:+6588002950">
                      +65 8800 2950
                    </a>
                  </li>

                  <li className="flex">
                    <IoLocationOutline className="w-6 h-6 mt-0.5" />
                    <a className="ml-2">
                      1100 Lower Delta Rd #02-02B EPL Building Singapore 169206
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <hr className="mt-5 mb-5" />
        <div className="lg:flex justify-center">
          <div>
            <p className="text-center text-secondary">
              &copy; {new Date().getFullYear()} SPAS. All Rights Reserved.
            </p>
          </div>
          {/* <div className="text-center mt-2 lg:mt-0">
              <a className="mx-2" href="/services">
                Terms of Service
              </a>
              &#124;
              <a className="mx-2" href="/privacy">
                Privacy Policy
              </a>
            </div> */}
        </div>
      </div>
    </footer>
  );
}
