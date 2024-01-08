import { JSX } from "react";
import Logo from "@/components/utils/Logo";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";

export default function Footer(): JSX.Element {
	return (
		<footer className="mt-auto animate-shiny border-t py-4 lg:py-8">
			<div className="container">
				<div className="flex flex-col gap-y-8">
					<div className="flex flex-col gap-y-8 xl:flex-row xl:justify-between xl:gap-x-16 text-black">
						<div className="flex flex-col gap-y-4 md:max-w-sm">
							<Logo />
							<p className="text-secondary">
								We love working with ambitious people.
								Let&rsquo;s build something great together now.
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
										<li>About</li>
										<li>Careers</li>
										<li>News</li>
										<li>Blog</li>
										<li>Contact</li>
									</ul>
								</nav>
							</div>

							<div className="flex flex-col gap-y-4 md:max-w-sm">
								<strong>Support</strong>

								<ul className="flex flex-col gap-y-2 text-secondary">
									<li>Help Center</li>
									{/* <li>Status</li> */}
									<li>Report a Bug</li>
									<li>Chat Support</li>
								</ul>
							</div>

							<div className="flex flex-col gap-y-4 md:max-w-sm">
								<strong>Contact Us</strong>

								<ul className="flex flex-col gap-y-2 text-secondary">
									<li className="flex">
										<MdOutlineMailOutline className="w-5 h-5 mt-0.5" />
										<a
											className="ml-2"
											href="mailto:hello@spas.sg"
										>
											hello@spas.sg
										</a>
									</li>
									<li className="flex">
										<FaPhone className="w-4 h-4 mt-0.5" />
										<a
											className="ml-2"
											target="_blank"
											href="https://wa.me/+6588002950"
										>
											+65 8800 2950
										</a>
									</li>

									<li className="flex">
										<IoLocationOutline className="w-6 h-6 mt-0.5" />
										<a className="ml-2" href="#">
											360 Orchard Road 07-05 International
											Building, Singapore
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>

					<hr />

					<div className="lg:flex justify-between">
						<div>
							<p className="text-center text-secondary">
								&copy; {new Date().getFullYear()} SPAS. All
								Rights Reserved.
							</p>
						</div>
						<div className="text-center mt-2 lg:mt-0">
							<a className="mx-2" href="/services">
								Terms of Service
							</a>
							&#124;
							<a className="mx-2" href="/privacy">
								Privacy Policy
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
