import { JSX, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import PostImg2 from "@/assets/images/05.webp";
import PostImg3 from "@/assets/images/08.webp";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Link from "next/link";

import { Service, services } from "@/data/event-media";

//Swiper
import { register } from "swiper/element/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import { usePosts } from "@/hooks/usePosts";
import { Post, Event, Tag } from "@/@types";
import { useEvents } from "@/hooks/useEvents";

register();

export default function EventMedia(): JSX.Element {
	const [id, setId] = useState(1);

	const { posts } = usePosts();
	const { events } = useEvents();

	const parseEvents = events?.data?.map((event: Event, index: number) => ({
		title: event.name,
		start: event.start_date,
		end: event.end_date,
	}));

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
									<Link href="/details">
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
											{posts.data?.map(
												(
													post: Post,
													index: number
												): JSX.Element => (
													<SwiperSlide>
														<Link
															href={`/event-media/${post.slug}`}
														>
															<div className="relative rounded-md h-max">
																<img
																	className="object-cover rounded-md w-full"
																	src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${post.cover.url}`}
																	alt={
																		post.title
																	}
																/>
																<div className="bg-white/80 absolute bottom-5 mx-5 space-y-4 p-2 rounded-md">
																	<span className="text-black font-bold">
																		{
																			post.title
																		}
																	</span>
																	<p className="text-black text-xs md:text-base md:text-md line-clamp-3 w-full">
																		{post.content.replace(
																			/<[^>]+>/g,
																			""
																		)}
																	</p>
																</div>
															</div>
														</Link>
													</SwiperSlide>
												)
											)}
										</Swiper>
									</Link>

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
										<Link href={"/details"}>
											<div className="relative">
												<Image
													src={PostImg2}
													alt="PostImg2"
													className="object-cover rounded-md w-full"
												/>
												<div className="bg-white/80 absolute bottom-5 mx-3 space-y-4 p-2 rounded-md">
													<span className="text-black font-bold">
														Top 5 Acupressure Points
														For Stress Relief
													</span>
													<p className="text-black text-sm md:text-base line-clamp-2">
														Ah, the joy of the open
														road—it&prime;s a good
														feeling. But if
														you&prime;re new to
														driving, you may feel a
														little nervous about
														getting behind the
														wheel. Don&prime;t
														worry. While it&prime;s
														true that accidents can
														happen to anybody, there
														are things you can do to
														drive safely and do your
														best to avoid them.
													</p>
												</div>
											</div>
										</Link>

										<Link href={"/details"}>
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
														BitTorrent user looking
														for safety tips, use
														this method. Both of the
														big-name BitTorrent
														indexers (The Pirate Bay
														and KickAssTorrents) use
														symbols to highlight
														torrents uploaded by
														verified users.
													</p>
												</div>
											</div>
										</Link>
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
									{posts.data?.length === 0 && (
										<div>
											<p className="text-4xl font-semibold">
												Opps..
											</p>
											<p>Artikel Sedang Kosong</p>
										</div>
									)}
									{posts.data?.map(
										(
											post: Post,
											index: number
										): JSX.Element => (
											<div className="p-3 bg-white border-1 shadow-lg rounded-lg transition duration-200 hover:bg-black/10">
												<Link
													href={`/event-media/${post.slug}`}
												>
													<div className="grid justify-center">
														<img
															className="aspect-video rounded-lg object-cover"
															src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${post.cover.url}`}
															alt={post.title}
														/>
													</div>
													<div className="mt-5 space-y-3 text-left">
														<h2 className="font-semibold text-[#3E3232]">
															{post.title}
														</h2>
														<p className="text-secondary text-black/80 line-clamp-3">
															{post.content.replace(
																/<[^>]+>/g,
																""
															)}
														</p>
													</div>
												</Link>
												<div className="bg-[#F5F5F5] p-5 mt-5 rounded-lg">
													<div className="flex flex-wrap gap-4">
														{post.tags?.map(
															(
																tag: Tag,
																index: number
															) => (
																<p className="bg-[#dee9f9] w-max text-sm p-2 rounded-full flex-grow">
																	#{tag.name}
																</p>
															)
														)}
													</div>
													<div className="text-sm text-secondary text-left p-2">
														<p>
															{post.published_at}
														</p>
													</div>
												</div>
											</div>
										)
									)}
								</div>
							</div>

							<div className="flex justify-center mt-10">
								<Link href={"/loadmore"}>
									<span className="btn-1 block my-4 w-full text-center lg:w-max hover:bg-primary transition-colors ease-out">
										Load more
									</span>
								</Link>
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
										events={parseEvents}
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
