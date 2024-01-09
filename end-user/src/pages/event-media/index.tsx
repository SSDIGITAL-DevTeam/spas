import { JSX, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import BlogImg1 from "@/assets/images/Replace Image.webp";
import BlogImg2 from "@/assets/images/Replace Image-1.webp";
import BlogImg3 from "@/assets/images/Replace Image-2.webp";
import PostImg1 from "@/assets/images/01.webp";
import PostImg2 from "@/assets/images/05.webp";
import PostImg3 from "@/assets/images/08.webp";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import { Service, services } from "@/data/event-media";

//Swiper
import { register } from "swiper/element/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";

register();

export default function EventMedia(): JSX.Element {
	const [id, setId] = useState(1);

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
				{/* CATEGORY BUTTON */}
				<section className="pb-18 lg:pb-0 pt-32">
					<div className="md:container">
						<div className="flex justify-between gap-x-8 whitespace-nowrap overflow-scroll md:overflow-auto mb-4 p-5 bg-[#F5F5F5] rounded-lg">
							{services.map((service: Service, index: number) => (
								<button
									key={index}
									className={`p-3 border-1 font-bold py-2 px-4 duration-100 rounded-lg text-white w-40 bg-[url('/event-media-assets/03.webp')]
									`}
									onClick={() => setId(service.id)}
								>
									{service.name}
								</button>
							))}
						</div>
					</div>
				</section>

				{/* BLOG TOP */}
				<section className="pb-24 lg:pb-0 pt-12">
					<div className="container">
						<div className="flex flex-col md:flex-row">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
								<div className="relative w-full">
									<Swiper
										pagination={{
											dynamicBullets: true,
										}}
										navigation={{
											nextEl: ".arrow-right",
											prevEl: ".arrow-left",
										}}
										modules={[Navigation]}
										autoplay={{ delay: 2000 }}
										className="mySwiper"
									>
										<SwiperSlide>
											<div className="relative">
												<Image
													className="object-cover rounded-md w-full"
													src={PostImg1}
													alt="PostImg1"
												/>
												<div className="bg-white/80 absolute bottom-5 mx-5 space-y-4 p-2 rounded-md">
													<span className="text-black font-bold">
														Best Place in Singapore
														to Enjoy a Massage or
														Spa
													</span>
													<p className="text-black text-xs md:text-base md:text-md line-clamp-3">
														A Single Monitor
														Manifesto — Many
														developers believe
														multiple monitors
														improve productivity.
														Studies have proven it,
														right? Well, keep in
														mind, many of those
														studies are commissioned
														from monitor
														manufacturers like.
													</p>
												</div>
											</div>
										</SwiperSlide>
									</Swiper>

									<div className="bg-black">
										<button className="arrow-left absolute top-[45%] mx-5 z-20 bg-white rounded-lg md:p-0.5">
											<FaAngleLeft className="text-black z-10 w-8 h-8 " />
										</button>
										<button className="arrow-right absolute z-20 top-[45%] mx-5 right-0 bg-white rounded-lg md:p-0.5">
											<FaAngleRight className="text-black z-10 w-8 h-8 " />
										</button>
									</div>
								</div>
								<div className="flex flex-col md:flex-row gap-6">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
										<div className="relative">
											<Image
												src={PostImg2}
												alt="PostImg2"
												className="object-cover rounded-md w-full"
											/>
											<div className="bg-white/80 absolute bottom-5 mx-3 space-y-4 p-2 rounded-md">
												<span className="text-black font-bold">
													Top 5 Acupressure Points For
													Stress Relief
												</span>
												<p className="text-black text-sm md:text-base line-clamp-2">
													Ah, the joy of the open
													road—it&prime;s a good
													feeling. But if you&prime;re
													new to driving, you may feel
													a little nervous about
													getting behind the wheel.
													Don&prime;t worry. While
													it&prime;s true that
													accidents can happen to
													anybody, there are things
													you can do to drive safely
													and do your best to avoid
													them.
												</p>
											</div>
										</div>

										<div className="relative">
											<Image
												src={PostImg3}
												alt="PostImg3"
												className="object-cover rounded-md w-full"
											/>
											<div className="bg-white/80 absolute bottom-5 mx-3 space-y-4 p-2 rounded-md">
												<span className="text-black font-bold">
													Empowering Growth
												</span>
												<p className="text-black text-sm md:text-base line-clamp-3">
													Download torrents from
													verified or trusted
													uploaders. If you're a
													BitTorrent user looking for
													safety tips, use this
													method. Both of the big-name
													BitTorrent indexers (The
													Pirate Bay and
													KickAssTorrents) use symbols
													to highlight torrents
													uploaded by verified users.
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* BLOG BOTTOM */}
				<section className="pb-14 lg:pb-24 lg:py-24">
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
													Accupressure
												</p>

												<p className="bg-[#F0F6FF] w-max text-sm p-2 rounded-full flex-grow">
													Therapist
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
													Accupressure
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
													Therapist
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
								<a
									href="/loadmore"
									className="btn-1 block capitalize text-center w-full lg:w-max hover:bg-primary transition-colors ease-out"
								>
									Load more
								</a>
							</div>
						</div>
					</div>
				</section>

				{/* CALENDER */}
				<section className="pb-14 lg:pb-0 lg:pt-0">
					<div className="bg-[url('/event-media-assets/blur.webp')] bg-cover">
						<div className="container">
							<div className="md:py-10 py-10">
								<div className="md:p-10 p-5 bg-white rounded-lg text-sm fc-prev-button fc-next-button fc-today-button fc-toolbar fc-day">
									<header className="flex flex-col gap-y-4 text-center">
										<h2 className="mx-auto text-2xl leading-snug md:leading-normal lg:text-3xl xl:text-5xl lg:leading-tight text-black font-semibold md:mb-10 mb-3">
											Event Calendar
										</h2>
									</header>
									<FullCalendar
										plugins={[dayGridPlugin]}
										headerToolbar={{
											right: "prev,next",
										}}
									/>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
