import { JSX } from "react";
import Head from "next/head";
import Hero from "@/assets/homepage-assets/hero-homepage.webp";
import Ficon1 from "@/assets/homepage-assets/featured-icons.svg";
import Ficon2 from "@/assets/homepage-assets/featured-icons-1.svg";
import Ficon3 from "@/assets/homepage-assets/featured-icons-2.svg";
import Ficon4 from "@/assets/homepage-assets/featured-icons-3.svg";
import img1 from "@/assets/homepage-assets/rectangle-145.webp";
import img2 from "@/assets/homepage-assets/rectangle-146.webp";
import img3 from "@/assets/homepage-assets/rectangle-147.webp";
import img4 from "@/assets/homepage-assets/rectangle-148.webp";
import Image from "next/image";

export default function Home(): JSX.Element {
	return (
		<>
			<Head>
				<title>SPAS</title>
				<meta name="author" content="SPAS" />

				<meta name="title" content="Beranda" />

				<meta name="description" content="SPAS" />

				<meta name="keywords" content="spa, services" />

				<meta name="robots" content="index, follow" />

				<meta
					property="og:url"
					content={process.env.NEXT_PUBLIC_BASE_URL}
				/>

				<meta property="og:title" content="beranda" />

				<meta property="og:description" content="SPAS" />

				<meta property="og:type" content="website" />

				<meta
					property="og:image"
					content={`${process.env.NEXT_PUBLIC_BASE_URL}/asset-special-offer.webp`}
				/>

				<meta
					name="google-site-verification"
					content="EhcruQmZ534ovq8BFx9Fvi7ipJ7v1YVTPANGyYT05Ag"
				/>
			</Head>

			{/* HERO */}
			<header className="pb-10 lg:pb-0 pt-32">
				<div className="container">
					<div className="flex flex-col md:flex-row md:items-center">
						<div className="flex flex-col gap-y-4 md:min-w-1/2">
							<h1 className="text-4xl font-semibold leading-snug md:leading-normal xl:max-w-xl xl:text-5xl xl:leading-tight">
								Elevate{" "}
								<span className="text-black">
									your Spa & Wellness Business with Us!
								</span>
							</h1>
							<p className="mr-5 text-secondary">
								We are here to promote and protect business
								entities, practitioners, stakeholders, and
								consumers of the Beauty, Spa and Wellness
								Industry in Singapore.
							</p>
							<a className="btn-1">JOIN SPAS</a>
						</div>

						<div className="mt-8">
							<Image
								className="w-screen rounded-lg"
								src={Hero}
								alt="Hero"
								priority={true}
							/>
						</div>
					</div>
				</div>
			</header>

			<main>
				{/* WHO WE ARE */}
				<section className="pb-0 lg:pb-14 lg:py-16">
					<div className="container">
						<div className="flex flex-col gap-y-8">
							<header className="flex flex-col gap-y-4 text-center">
								<h2 className="mini-underline at-center mx-auto w-fit text-2xl leading-snug md:max-w-md md:leading-normal lg:text-3xl xl:max-w-2xl xl:text-5xl xl:leading-tight text-black font-semibold">
									Who We Are
								</h2>

								<p className="mx-auto mt-2 md:w-3/4 text-secondary">
									At SPAs, we&prime;re more than just a
									network - we&prime;re a community of
									passionate professionals shaping the future
									of Beauty, Spa, and Wellness in Singapore.
								</p>
								<div className="grid justify-center">
									<p className="bg-[#F0F6FF] w-max py-2 px-6 rounded-full">
										Our Missions
									</p>
								</div>
							</header>

							<div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-2">
								<div>
									<Image
										className="w-md rounded-lg"
										src={Ficon1}
										alt="Ficon1"
										priority={true}
									/>
									<div className="mt-5 space-y-3">
										<h2 className="font-semibold">
											Fostering Collaboration
										</h2>
										<p className="text-secondary">
											We believe in the power of
											collaboration. By bringing together
											spa and wellness professionals,
											stakeholders, and consumers, we
											create an environment where ideas
											flow freely, partnerships flourish,
											and the collective wisdom of the
											community becomes a driving force
											for progress.
										</p>
									</div>
								</div>
								<div>
									<Image
										className="w-md rounded-lg"
										src={Ficon3}
										alt="Ficon3"
										priority={true}
									/>
									<div className="mt-5 space-y-3">
										<h2 className="font-semibold">
											Empowering Growth
										</h2>
										<p className="text-secondary">
											Your growth is our priority. Whether
											you&prime;re a seasoned owner or a
											budding therapist, SPAS is designed
											to be the catalyst for your
											professional journey. We empower Spa
											Therapists to be World-class Spa
											Professionals through delivering
											world-class Spa Experiences.
										</p>
									</div>
								</div>
								<div>
									<Image
										className="w-md rounded-lg"
										src={Ficon2}
										alt="Ficon2"
										priority={true}
									/>
									<div className="mt-5 space-y-3">
										<h2 className="font-semibold">
											Enabling Innovation
										</h2>
										<p className="text-secondary">
											Through SPAS, we aim to be a hub of
											innovation, where ideas are born,
											tested, and refined. By fostering an
											environment that encourages
											creativity and forward-thinking.
										</p>
									</div>
								</div>
								<div>
									<Image
										className="w-md rounded-lg"
										src={Ficon4}
										alt="Ficon4"
										priority={true}
									/>
									<div className="mt-5 space-y-3">
										<h2 className="font-semibold">
											Give Recognition
										</h2>
										<p className="text-secondary">
											SPAs is a platform where Singaporean
											therapists find recognition and
											support by validating their crucial
											role in enhancing the well-being of
											our community.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* WHY JOIN US */}
				<section className="py-16 pb-14">
					<div className="container">
						<div className="lg:grid-col-2 grid-col-1 grid gap-y-8 lg:gap-x-16">
							<div className="lg:flex lg:flex-row">
								<div className="w-1/3 hidden lg:block">
									<div>
										<Image
											className="lg:block"
											src={img1}
											alt="Tentang Kami"
										/>
									</div>
									<div className="mt-5">
										<Image
											className="lg:block"
											src={img4}
											alt="Tentang Kami"
										/>
									</div>
								</div>
								<div className="mx-2"></div>
								<div className="w-1/3  hidden lg:block">
									<div>
										<Image
											className="lg:block"
											src={img3}
											alt="Tentang Kami"
										/>
									</div>
									<div className="mt-5">
										<Image
											className="lg:block"
											src={img2}
											alt="Tentang Kami"
										/>
									</div>
								</div>
								<div className="lg:w-3/4 px-5">
									<h2 className="at-left bg-gradient text-black font-semibold w-fit max-w-sm text-2xl leading-snug md:leading-normal lg:text-3xl xl:max-w-2xl xl:text-4xl xl:leading-tight">
										Why Join Us
									</h2>
									<div className="mt-6 space-y-4 text-base flex flex-row">
										<div className="mr-5 mt-4 space-y-2">
											<h2 className="font-semibold">
												Validation
											</h2>
											<p className="text-secondary">
												Gain recognition for your skills
												and expertise in the spa and
												wellness industry.
											</p>
										</div>
										<div className="space-y-2">
											<h2 className="font-semibold">
												Connections
											</h2>
											<p className="text-secondary">
												Gain recognition for your skills
												and expertise in the spa and
												wellness industry.
											</p>
										</div>
									</div>
									<div className="mt-6 space-y-4 text-base">
										<div className="mr-5 mt-4 space-y-2">
											<h2 className="font-semibold">
												Knowledge Exchange
											</h2>
											<p className="text-secondary">
												Access a treasure trove of
												insights and ideas to stay ahead
												in your field.
											</p>
										</div>
									</div>
									<div className="mt-6 space-y-4 text-base">
										<div className="mb-8">
											<p className="text-secondary">
												Join us on SPAS and take your
												journey in the Beauty, Spa, and
												Wellness industry to new
												heights.
											</p>
										</div>

										<a className="btn-1 mt-8">JOIN SPAS</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* MEMBERSHIP BENEFITS */}
				<section className="pb-8 lg:pb-0 lg:py-16">
					<div className="container">
						<div className="flex flex-col gap-y-8">
							<header className="flex flex-col gap-y-4 text-center">
								<h2 className="at-center mx-auto w-fit text-2xl leading-snug md:max-w-md md:leading-normal lg:text-3xl xl:max-w-2xl xl:text-5xl xl:leading-tight text-black font-semibold">
									Member Benefits
								</h2>
							</header>

							<div className="lg:flex lg:flex-row text-center py-6">
								<div>
									<div className="grid justify-center">
										<Image
											className="w-md rounded-lg"
											src={Ficon1}
											alt="Ficon1"
											priority={true}
										/>
									</div>
									<div className="mt-5 space-y-3">
										<h2 className="font-semibold">
											Networking Events
										</h2>
										<p className="text-secondary p-3">
											Attend exclusive events to connect
											with industry leaders and fellow
											professionals.
										</p>
									</div>
								</div>
								<div className="border-x-2">
									<div className="grid justify-center">
										<Image
											className="w-md rounded-lg"
											src={Ficon1}
											alt="Ficon1"
											priority={true}
										/>
									</div>
									<div className="mt-5 space-y-3">
										<h2 className="font-semibold">
											Resource Hub
										</h2>
										<p className="text-secondary p-3">
											Access a rich repository of
											resources, from business insights to
											the latest wellness trends.
										</p>
									</div>
								</div>
								<div>
									<div className="grid justify-center">
										<Image
											className="w-md rounded-lg"
											src={Ficon1}
											alt="Ficon1"
											priority={true}
										/>
									</div>
									<div className="mt-5 space-y-3">
										<h2 className="font-semibold">
											Profile Showcase
										</h2>
										<p className="text-secondary p-3">
											Showcase your expertise with a
											personalized profile, boosting your
											visibility.
										</p>
									</div>
								</div>
							</div>
							<div className="flex justify-center">
								<p className="text-center font-semibold w-1/2">
									Our membership benefits is more than that.
									Become a member today and unlock a world of
									opportunities in the Beauty, Spa, and
									Wellness community.
								</p>
							</div>
							<div className="flex justify-center">
								<a className="btn-1 capitalize">
									See Membership Details
								</a>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
