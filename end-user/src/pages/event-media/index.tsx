import { JSX } from "react";
import Head from "next/head";
import Image from "next/image";
import BlogImg1 from "@/assets/homepage-assets/Replace Image.webp";
import BlogImg2 from "@/assets/homepage-assets/Replace Image-1.webp";
import BlogImg3 from "@/assets/homepage-assets/Replace Image-2.webp";

export default function EventMedia(): JSX.Element {
	return (
		<>
			<Head>
				<title>SPAS | Eveent & Media</title>
				<meta name="author" content="SPAS" />

				<meta name="title" content="Event and Media" />

				<meta name="description" content="event and media" />

				<meta
					name="keywords"
					content="spa, services, event and media"
				/>

				<meta name="robots" content="index, follow" />

				<meta
					property="og:url"
					content={process.env.NEXT_PUBLIC_BASE_URL}
				/>

				<meta property="og:title" content="event and media" />

				<meta property="og:description" content="Event And Media" />

				<meta property="og:type" content="website" />

				<meta
					property="og:image"
					content={`${process.env.NEXT_PUBLIC_BASE_URL}/asset-special-offer.webp`}
				/>
			</Head>
			<main>
				{/* HERO */}
				<header className="pb-24 lg:pb-0">
					<div className="container"></div>
				</header>

				{/* BLOG */}
				<section className="pb-14 lg:pb-14 lg:py-28">
					<div className="container">
						<div className="flex flex-col gap-y-8">
							<div className="flex flex-col lg:flex-row text-center">
								<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
									<div className="p-3 bg-white border-1 shadow-lg rounded-lg">
										<div className="grid justify-center">
											<Image
												className="rounded-lg"
												src={BlogImg1}
												alt="BlogImg1"
												priority={true}
											/>
										</div>
										<div className="mt-5 space-y-3 text-left">
											<h2 className="font-semibold text-[#3E3232]">
												Progressing The Wellness
												Industry Through Professional
												Recognition
											</h2>
											<p className="text-secondary text-black/80">
												Progressing The Wellness
												Industry Through Professional
												Recognition.
											</p>
										</div>
										<div className="bg-[#F5F5F5] p-5 mt-5 rounded-lg">
											<div className="flex flex-wrap gap-4">
												<p className="bg-[#F0F6FF] w-max text-sm p-2 rounded-full flex-grow">
													Beauty
												</p>

												<p className="bg-[#F0F6FF] w-max text-sm p-2 rounded-full flex-grow">
													Yoga
												</p>

												<p className="bg-[#F0F6FF] w-max text-sm p-2 rounded-full flex-grow">
													Hair Salon
												</p>
											</div>
											<div className="text-sm text-secondary text-left p-2">
												<p>August 18 , 2022</p>
											</div>
										</div>
									</div>
									<div className="p-3 bg-white border-1 shadow-lg rounded-lg">
										<div className="grid justify-center">
											<Image
												className="rounded-lg"
												src={BlogImg2}
												alt="BlogImg2"
												priority={true}
											/>
										</div>
										<div className="mt-5 space-y-3 text-left">
											<h2 className="font-semibold text-[#3E3232]">
												Coup for Singapore Exhibitors
												for SPAS for Dubai&prime;s
												Beauty Wellness & Spa Show
											</h2>
											<p className="text-secondary text-black/80">
												Coup for Singapore Exhibitors
												from the Spa & Wellness
												Association (Singapore).
											</p>
										</div>
										<div className="bg-[#F5F5F5] p-5 mt-5 rounded-lg">
											<div className="flex flex-wrap gap-4">
												<p className="bg-[#F0F6FF] w-max text-sm p-2 rounded-full flex-grow">
													Beauty
												</p>

												<p className="bg-[#F0F6FF] w-max text-sm p-2 rounded-full flex-grow">
													Yoga
												</p>

												<p className="bg-[#F0F6FF] w-max text-sm p-2 rounded-full flex-grow">
													Hair Salon
												</p>
											</div>
											<div className="text-sm text-secondary text-left p-2">
												<p>August 18 , 2022</p>
											</div>
										</div>
									</div>
									<div className="p-3 bg-white border-1 shadow-lg rounded-lg">
										<div className="grid justify-center">
											<Image
												className="rounded-lg"
												src={BlogImg3}
												alt="BlogImg3"
												priority={true}
											/>
										</div>
										<div className="mt-5 space-y-3 text-left">
											<h2 className="font-semibold text-[#3E3232]">
												Blue Ocean Strategy Talk for the
												Spa & Wellness Industry
											</h2>
											<p className="text-secondary text-black/80">
												Blue Ocean Strategy Talk for the
												Spa & Wellness Industry.
											</p>
										</div>
										<div className="bg-[#F5F5F5] p-5 mt-5 rounded-lg">
											<div className="flex flex-wrap gap-4">
												<p className="bg-[#F0F6FF] w-max text-sm p-2 rounded-full flex-grow">
													Beauty
												</p>

												<p className="bg-[#F0F6FF] w-max text-sm p-2 rounded-full flex-grow">
													Yoga
												</p>

												<p className="bg-[#F0F6FF] w-max text-sm p-2 rounded-full flex-grow">
													Hair Salon
												</p>
											</div>
											<div className="text-sm text-secondary text-left p-2">
												<p>August 18 , 2022</p>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="flex justify-center mt-10">
								<a className="btn-1 block capitalize text-center w-full lg:w-max">
									Load more
								</a>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
