import { JSX } from "react";
import Image from "next/image";
import Logo from "@/components/utils/Logo";
import Ig from "@/assets/images/instagram.png";
import Fb from "@/assets/images/Facebook.png";
import Linked from "@/assets/images/linkedin.png";

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
									<Image
										className="rounded-lg"
										src={Linked}
										alt="Linked"
										priority={true}
									/>
								</li>

								<li>
									<a
										href="https://www.facebook.com/profile.php?id=61550755322576"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Link to The SPAS Facebook"
									></a>
									<Image
										className="rounded-lg"
										src={Fb}
										alt="Fb"
										priority={true}
									/>
								</li>

								<li>
									<a
										href="https://www.instagram.com/thebutterflyid/"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Link to The SPAS Instagram"
									></a>
									<Image
										className="rounded-lg"
										src={Ig}
										alt="Ig"
										priority={true}
									/>
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
									<li>
										<a
											className="ml-2"
											href="mailto:hello@spas.sg"
										>
											hello@spas.sg
										</a>
									</li>
									<li>
										<a
											className="ml-2"
											target="_blank"
											href="https://wa.me/+6588002950"
										>
											+65 8800 2950
										</a>
									</li>

									<li>
										<a className="ml-2" href="#">
											3891 Ranchview Dr. Richardson, CA
											62639
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
								&copy; {new Date().getFullYear()} SPAS. Hak
								cipta dilindungi.
							</p>
						</div>
						<div className="text-center mt-2 lg:mt-0">
							<a className="mx-2" href="#">
								Terms of Service
							</a>
							&#124;
							<a className="mx-2" href="#">
								Privacy Policy
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
