import { JSX } from "react";
import Head from "next/head";
import KeepBg from "@/assets/homepage-assets/Keep.webp";
import Image from "next/image";

export default function Contact(): JSX.Element {
	return (
		<>
			<Head>
				<title>SPAS | Contact Us</title>
				<meta name="author" content="SPAS" />

				<meta name="title" content="Contact-Us" />

				<meta name="description" content="contact-us" />

				<meta name="keywords" content="spa, services, contact-us" />

				<meta name="robots" content="index, follow" />

				<meta
					property="og:url"
					content={process.env.NEXT_PUBLIC_BASE_URL}
				/>

				<meta property="og:title" content="contact-us" />

				<meta property="og:description" content="Contact-us" />

				<meta property="og:type" content="website" />

				<meta
					property="og:image"
					content={`${process.env.NEXT_PUBLIC_BASE_URL}/asset-special-offer.webp`}
				/>
			</Head>

			{/* HERO */}
			<header className="pb-14 md:pb-0 pt-28">
				<div className="bg-[url('/contact-assets/contact.png')] bg-no-repeat bg-cover w-screen min-h-96 py-24 md:py-28">
					<div className="container">
						<div className="grid justify-center item-center">
							<div className="md:p-14 py-14">
								<h1 className="text-4xl font-semibold leading-snug md:leading-normal xl:max-w-xl xl:text-5xl xl:leading-tight ">
									<span className="text-white">
										Contact Us
									</span>
								</h1>
							</div>
						</div>
					</div>
				</div>
			</header>

			<main>
				{/* TELL US */}
				<section className="pb-14 lg:pb-0 lg:pt-20">
					<div className="container">
						<div className="flex flex-col">
							<header className="text-left space-y-6">
								<p className="text-secondary font-semibold">
									Tell Us !
								</p>

								<h2 className="text-2xl text-black font-bold">
									I want to ask about...
								</h2>
							</header>

							<div className="flex flex-col md:flex-row py-8 md:w-3/5 gap-6 flex-wrap">
								<button className="p-3 border-2 rounded-lg md:w-max w-full border-secondary font-semibold text-secondary hover:bg-[#1975FF] hover:text-white">
									Membership
								</button>
								<button className="p-3 border-2 rounded-lg md:w-max w-full border-secondary font-semibold text-secondary hover:bg-[#1975FF] hover:text-white">
									How To Join ?
								</button>
								<button className="p-3 border-2 rounded-lg md:w-max w-full border-secondary font-semibold text-secondary hover:bg-[#1975FF] hover:text-white">
									Where do I register ?
								</button>
								<button className="p-3 border-2 rounded-lg md:w-max w-full border-secondary font-semibold text-secondary hover:bg-[#1975FF] hover:text-white">
									Is there any requirements ?
								</button>
								<button className="p-3 border-2 rounded-lg md:w-max w-full border-secondary font-semibold text-secondary hover:bg-[#1975FF] hover:text-white">
									Any consultations that should I get ?
								</button>
							</div>
						</div>
					</div>
				</section>

				{/* CONTACT INFORMATION */}
				<div className="pb-14 lg:pb-18 lg:pt-20">
					<div className="container">
						<div className="flex flex-col md:flex-row">
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full">
								<div className="pb-10">
									<h2 className="font-bold text-2xl text-secondary text-center md:text-left">
										Contact Information
									</h2>
									<div className="pt-10">
										<form className="grid gap-y-6">
											<input
												type="text"
												placeholder="Full Name *"
												className="border-2 p-2.5 rounded-lg w-full"
											/>
											<input
												type="email"
												placeholder="Email Address *"
												className="border-2 p-2.5 rounded-lg w-full"
											/>
											<textarea className="border-2 p-2.5 rounded-lg w-full"></textarea>
											<input
												type="submit"
												value="Submit Now"
												className="btn-1 w-full capitalize"
											/>
										</form>
									</div>
								</div>
								<div className="lg:pl-20 flex- flex-col justify-end">
									<h2 className="font-bold text-2xl text-secondary text-center md:text-left">
										Our Company
									</h2>
									<div className="py-8">
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
													360 Orchard Road 07-05
													International Building,
													Singapore
												</a>
											</li>
										</ul>
									</div>
									<div>
										<iframe
											src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7817643671033!2d103.8310023!3d1.3060711999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da198d053a8b83%3A0xbda05168a851fede!2s360%20Orchard%20Rd%2C%20%2307%2005%20International%20Building%2C%20Singapore%20238869!5e0!3m2!1sen!2sid!4v1704712708437!5m2!1sen!2sid"
											className="w-full min-h-80"
										></iframe>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* KEEP UP TO DATE WITH US */}
				<section className="pb-12 lg:pb-14">
					<div className="container">
						<div className="relative lg:flex gap-y-8 bg-[#F0F6FF] rounded-lg">
							<div className="space-y-3 p-9">
								<h2 className="text-2xl leading-snug md:max-w-md md:leading-normal lg:text-3xl xl:max-w-2xl xl:text-5xl xl:leading-tight text-secondary font-semibold">
									Keep Up-to-Date with Us
								</h2>
								<p className="text-secondary lg:w-3/4">
									Stay in the loop with the latest industry
									news, events, and community updates. Follow
									us on and be a part of the ongoing dialogue
									in the world of Beauty, Spa, and Wellness.
								</p>
								<div className="">
									<form className="mt-8">
										<div className="lg:flex lg:flex-row lg:gap-x-3 lg:w-3/4">
											<input
												type="text"
												className="p-3 h-max w-full lg:w-3/4 focus:text-secondary rounded-lg border-1 shadow-lg"
												placeholder="Your e-mail address"
											/>
											<input
												type="submit"
												value="Subscribe"
												className="btn-2 text-white lg:w-max w-full mt-5 lg:mt-0 capitalize cursor-pointer"
											/>
										</div>
									</form>
								</div>
							</div>
							<div className="absolute right-0 top-0 hidden lg:block">
								<Image
									className="w-72 rounded-lg"
									src={KeepBg}
									alt="KeepBg"
									priority={true}
								/>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
