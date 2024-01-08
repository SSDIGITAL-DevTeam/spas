import { JSX } from "react";
import Head from "next/head";
import HeroTherapist from "@/assets/therapist-assets/therapist-hero.webp";
import ImgTherapist from "@/assets/therapist-assets/therapist-img.webp";
import GroupImg1 from "@/assets/therapist-assets/group-1.svg";
import GroupImg2 from "@/assets/therapist-assets/group-2.svg";
import GroupImg3 from "@/assets/therapist-assets/group-3.svg";
import GroupImg4 from "@/assets/therapist-assets/group-4.svg";
import GroupImg5 from "@/assets/therapist-assets/group-5.svg";
import GroupImg6 from "@/assets/therapist-assets/group-6.svg";
import Image from "next/image";

export default function Therapist(): JSX.Element {
	return (
		<>
			<Head>
				<title>SPAS | Therapist</title>
				<meta name="author" content="SPAS" />

				<meta name="title" content="Therapist" />

				<meta name="description" content="therapist" />

				<meta name="keywords" content="spa, services, therapist" />

				<meta name="robots" content="index, follow" />

				<meta
					property="og:url"
					content={process.env.NEXT_PUBLIC_BASE_URL}
				/>

				<meta property="og:title" content="therapist" />

				<meta property="og:description" content="Therapist" />

				<meta property="og:type" content="website" />

				<meta
					property="og:image"
					content={`${process.env.NEXT_PUBLIC_BASE_URL}/asset-special-offer.webp`}
				/>
			</Head>

			{/* HERO */}
			<header className="pb-14 lg:pb-18 pt-32">
				<div className="container">
					<div className="flex flex-col md:flex-row md:items-center">
						<div className="flex flex-col gap-y-4 md:w-1/2">
							<h1 className="text-4xl font-semibold leading-snug md:leading-normal xl:max-w-xl xl:text-5xl xl:leading-tight">
								Gain Recognition{" "}
								<span className="text-black">
									By getting a Professional status!
								</span>
							</h1>
							<p className="mr-5 text-secondary text-sm md:text-lg">
								<strong>SPAS</strong> offers a platform for
								<strong> Complementary Therapists</strong> to
								enroll their competencies, demonstrating their
								expertise and skills in specific treatments and
								sectors of the Wellness Industry.
							</p>
							<a className="btn-1 block my-4 w-full text-center lg:w-max">
								JOIN SPAS
							</a>
						</div>

						<div className="mt-8 md:w-1/2">
							<Image
								className="w-screen rounded-lg"
								src={HeroTherapist}
								alt="HeroTherapist"
								priority={true}
							/>
						</div>
					</div>
				</div>
			</header>

			<main>
				{/* THERAPIST BENEFITS */}
				<section className="pb-14 lg:pb-0 lg:pt-20">
					<div className="container">
						<div className="flex flex-col">
							<header className="flex flex-col gap-y-6 text-center pb-10">
								<h2 className="mx-auto w-fit text-2xl leading-snug md:max-w-md md:leading-normal lg:text-3xl xl:max-w-2xl xl:text-5xl xl:leading-tight text-black font-semibold">
									Benefits for Registered Therapist
								</h2>

								<p className="mx-auto md:w-3/4 text-secondary text-sm md:text-lg">
									Enjoy these SPAS&prime; benefits if you
									decide to register your professional status.
								</p>
							</header>

							<div className="flex flex-col lg:flex-row text-center py-6 gap-8 items-center lg:justify-between">
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6">
									<div className="space-y-6">
										<div className="">
											<Image
												className="w-md rounded-lg mx-auto"
												src={ImgTherapist}
												alt="ImgTherapist"
												priority={true}
											/>
										</div>
										<div className="space-y-3">
											<h2 className="font-semibold">
												Gain Professional Image
											</h2>
											<p className="text-secondary p-3 max-w-xs mx-auto text-sm md:text-lg">
												By becoming SPAS member, you can
												elevate your personal image and
												value.
											</p>
										</div>
									</div>
									<div className="space-y-6 lg:border-x-2 px-10">
										<div className="">
											<Image
												className="w-md rounded-lg mx-auto"
												src={ImgTherapist}
												alt="ImgTherapist"
												priority={true}
											/>
										</div>
										<div className="space-y-3">
											<h2 className="font-semibold">
												Accredited Recognition
											</h2>
											<p className="text-secondary p-3 max-w-xs mx-auto text-sm md:text-lg">
												Gain acknowledgment as a
												Certified Therapist with
												accreditation.
											</p>
										</div>
									</div>
									<div className="space-y-6">
										<div className="">
											<Image
												className="w-md rounded-lg mx-auto"
												src={ImgTherapist}
												alt="ImgTherapist"
												priority={true}
											/>
										</div>
										<div className="space-y-3">
											<h2 className="font-semibold">
												Career Development Opportunities
											</h2>
											<p className="text-secondary p-3 max-w-xs text-sm md:text-lg mx-auto">
												Access exclusive opportunities
												to further enhance your skills
												and expertise.
											</p>
										</div>
									</div>
									<div className="space-y-6">
										<div className="">
											<Image
												className="w-md rounded-lg mx-auto"
												src={ImgTherapist}
												alt="ImgTherapist"
												priority={true}
											/>
										</div>
										<div className="space-y-3">
											<h2 className="font-semibold">
												Endorsed by Expertise
											</h2>
											<p className="text-secondary p-3 max-w-xs text-sm md:text-lg mx-auto">
												Receive endorsement of
												qualifications and competencies
												as a professional specializing
												in specific treatment(s).
											</p>
										</div>
									</div>
									<div className="space-y-6 lg:border-x-2 px-10">
										<div className="">
											<Image
												className="w-md rounded-lg mx-auto"
												src={ImgTherapist}
												alt="ImgTherapist"
												priority={true}
											/>
										</div>
										<div className="space-y-3">
											<h2 className="font-semibold">
												Strategic Marketing Support
											</h2>
											<p className="text-secondary p-3 max-w-xs text-sm md:text-lg mx-auto">
												Take advantage of SWAS&prime;
												marketing and promotional
												initiatives for increased
												visibility.
											</p>
										</div>
									</div>
									<div className="space-y-6">
										<div className="">
											<Image
												className="w-md rounded-lg mx-auto"
												src={ImgTherapist}
												alt="ImgTherapist"
												priority={true}
											/>
										</div>
										<div className="space-y-3">
											<h2 className="font-semibold">
												Enhance Visibility
											</h2>
											<p className="text-secondary p-3 max-w-xs text-sm md:text-lg mx-auto">
												Enable potential customers to
												locate and authenticate your
												professional profile.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* YOU ARE WELCOME */}
				<section className="pb-14 lg:pb-0 lg:pt-20">
					<div className="container">
						<div className="flex flex-col">
							<header className="flex flex-col gap-y-6 text-center pb-10">
								<h2 className="mx-auto w-fit text-2xl leading-snug md:max-w-md md:leading-normal lg:text-3xl xl:max-w-2xl xl:text-5xl xl:leading-tight text-black font-semibold">
									You Are Welcome
								</h2>

								<p className="mx-auto md:w-3/4 text-secondary">
									If you work in one of the following
									businesses.
								</p>
							</header>

							<div className="flex flex-col lg:flex-row text-center py-6 gap-8 items-center lg:justify-center">
								<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
									<div className="space-y-6">
										<div className="">
											<Image
												className="w-md rounded-lg mx-auto"
												src={GroupImg6}
												alt="GroupImg6"
												priority={true}
											/>
										</div>
										<div className="space-y-3">
											<h2 className="font-semibold w-1/2 mx-auto">
												Yoga & Physical Training Center
											</h2>
										</div>
									</div>
									<div className="space-y-6">
										<div className="">
											<Image
												className="w-md rounded-lg mx-auto"
												src={GroupImg3}
												alt="GroupImg3"
												priority={true}
											/>
										</div>
										<div className="space-y-3">
											<h2 className="font-semibold w-1/2 mx-auto">
												Hair Treatment & Beauty Salon
											</h2>
										</div>
									</div>
									<div className="space-y-6">
										<div className="">
											<Image
												className="w-md rounded-lg mx-auto"
												src={GroupImg1}
												alt="GroupImg1"
												priority={true}
											/>
										</div>
										<div className="space-y-3">
											<h2 className="font-semibold w-1/2 mx-auto">
												Hydrotherapy & Body Treatment
												Spa
											</h2>
										</div>
									</div>
									<div className="space-y-6">
										<div className="">
											<Image
												className="w-md rounded-lg mx-auto"
												src={GroupImg2}
												alt="GroupImg2"
												priority={true}
											/>
										</div>
										<div className="space-y-3 w-1/2 mx-auto">
											<h2 className="font-semibold">
												Traditional Health Treatment
											</h2>
										</div>
									</div>
									<div className="space-y-6">
										<div className="">
											<Image
												className="w-md rounded-lg mx-auto"
												src={GroupImg5}
												alt="GroupImg5"
												priority={true}
											/>
										</div>
										<div className="space-y-3 w-1/2 mx-auto">
											<h2 className="font-semibold">
												Manicure & Pedicure Salon
											</h2>
										</div>
									</div>
									<div className="space-y-6">
										<div className="">
											<Image
												className="w-md rounded-lg mx-auto"
												src={GroupImg1}
												alt="GroupImg1"
												priority={true}
											/>
										</div>
										<div className="space-y-3 w-1/2 mx-auto">
											<h2 className="font-semibold">
												Massage Center & Reflexology
											</h2>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* BECOME A PROFESSIONAL */}
				<section className="pb-14 lg:pb-14 lg:pt-20">
					<div className="container">
						<div className="flex flex-col gap-y-5">
							<header className="flex flex-col gap-y-4 text-center">
								<h2 className="mx-auto text-2xl leading-snug md:leading-normal lg:text-3xl xl:text-5xl lg:leading-tight text-black font-semibold md:mb-10">
									Become a Professional
								</h2>
							</header>

							<div className="flex flex-col">
								<div className="flex justify-center">
									<a className="btn-1 block capitalize text-center w-full lg:w-max">
										DOWNLOAD APPLICATION FORM
									</a>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
