/* eslint-disable @next/next/no-img-element */
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
import moment from "moment";
import KeepBg from "@/assets/homepage-assets/Keep.webp";
import Link from "next/link";
import { FaChartLine } from "react-icons/fa6";
import { RiVoiceRecognitionLine } from "react-icons/ri";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoIosPhonePortrait } from "react-icons/io";

import { usePosts } from "@/hooks/usePosts";
import { Post, Event, Tag, Category } from "@/@types";

export default function Home(): JSX.Element {
  const { posts } = usePosts();

  return (
    <>
      <Head>
        <title>SPAS | Homepage</title>
        <link rel="icon" href="/spas-logo.png" />
        <meta name="author" content="SPAS" />

        <meta name="title" content="Beranda" />

        <meta name="description" content="SPAS" />

        <meta name="keywords" content="spa, services" />

        <meta name="robots" content="index, follow" />

        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />

        <meta property="og:title" content="beranda" />

        <meta property="og:description" content="SPAS" />

        <meta property="og:type" content="website" />

        <meta
          property="og:img"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/asset-special-offer.webp`}
        />
      </Head>

      {/* HERO */}
      <header className="pb-14 lg:pb-18 pt-24">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-x-6 md:items-center">
            <div className="flex flex-col gap-y-4 md:w-1/2">
              <h1 className="text-4xl font-semibold leading-snug md:leading-normal xl:max-w-xl xl:text-5xl xl:leading-tight">
                Elevate{" "}
                <span className="text-black">
                  your Spa & Wellness Business with Us!
                </span>
              </h1>
              <p className="mr-5 text-secondary">
                We are here to promote and protect business entities,
                practitioners, stakeholders, and consumers of the Beauty, Spa
                and Wellness Industry in Singapore.
              </p>
              <Link href={"/membership"}>
                <span className="btn-1 block my-4 w-full text-center lg:w-max hover:bg-primary transition-colors ease-out">
                  JOIN SPAS
                </span>
              </Link>
            </div>

            <div className="mt-8 md:w-1/2">
              <img className="w-screen rounded-lg" src={Hero.src} alt="Hero" />
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* WHO WE ARE */}
        <section className="pb-0 lg:pb-14 lg:py-16">
          <div className="container">
            <div className="flex flex-col gap-y-8">
              <header className="space-y-5 flex flex-col text-center">
                <h2 className="mx-auto w-fit text-2xl leading-snug md:max-w-md md:leading-normal lg:text-3xl xl:max-w-2xl xl:text-5xl xl:leading-tight text-black font-semibold">
                  Who We Are
                </h2>

                <p className="mx-auto md:w-3/4 text-secondary">
                  At SPAS, we&prime;re more than just a network - we&prime;re a
                  community of passionate professionals shaping the future of
                  Beauty, Spa, and Wellness in Singapore.
                </p>
                <div className="grid justify-center">
                  <p className="bg-[#F0F6FF] w-max py-2 px-6 rounded-full">
                    Our Missions
                  </p>
                </div>
              </header>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-2 mt-5">
                <div>
                  <div className="bg-[#F0F6FF] w-max px-3 rounded-xl">
                    <FaRegCheckCircle className="h-10 w-5" />
                  </div>
                  <div className="mt-5 space-y-3">
                    <h2 className="font-semibold">Fostering Collaboration</h2>
                    <p className="text-secondary text-justify">
                      We believe in the power of collaboration. By bringing
                      together spa and wellness professionals, stakeholders, and
                      consumers, we create an environment where ideas flow
                      freely, partnerships flourish, and the collective wisdom
                      of the community becomes a driving force for progress.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="bg-[#F0F6FF] w-max px-3 rounded-xl">
                    <FaChartLine className="h-10 w-5" />
                  </div>
                  <div className="mt-5 space-y-3">
                    <h2 className="font-semibold">Empowering Growth</h2>
                    <p className="text-secondary text-justify">
                      Your growth is our priority. Whether you&prime;re a
                      seasoned owner or a budding therapist, SPAS is designed to
                      be the catalyst for your professional journey. We empower
                      Spa Therapists to be World-class Spa Professionals through
                      delivering world-class Spa Experiences.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="bg-[#F0F6FF] w-max px-3 rounded-xl">
                    <IoIosPhonePortrait className="h-10 w-6" />
                  </div>
                  <div className="mt-5 space-y-3">
                    <h2 className="font-semibold">Enabling Innovation</h2>
                    <p className="text-secondary text-justify">
                      Through SPAS, we aim to be a hub of innovation, where
                      ideas are born, tested, and refined. By fostering an
                      environment that encourages creativity and
                      forward-thinking.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="bg-[#F0F6FF] w-max px-3 rounded-xl">
                    <RiVoiceRecognitionLine className="h-10 w-6" />
                  </div>
                  <div className="mt-5 space-y-3">
                    <h2 className="font-semibold">Give Recognition</h2>
                    <p className="text-secondary text-justify">
                      SPAS is a platform where Singaporean therapists find
                      recognition and support by validating their crucial role
                      in enhancing the well-being of our community.
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
            <div className="flex flex-col lg:flex-row">
              <div className="grid grid-cols-2 gap-5 mb-10 lg:w-1/2 xl:w-1/2">
                <div className="space-y-5">
                  <img className="w-full" src={img1.src} alt="Tentang Kami" />
                  <img className="w-full" src={img4.src} alt="Tentang Kami" />
                </div>
                <div className="space-y-5">
                  <img className="w-full" src={img3.src} alt="Tentang Kami" />
                  <img className="w-full" src={img2.src} alt="Tentang Kami" />
                </div>
              </div>
              <div className="lg:w-1/2 lg:px-10 space-y-8">
                <h2 className="at-left bg-gradient text-black font-semibold w-fit max-w-sm text-2xl leading-snug md:leading-normal lg:text-3xl xl:max-w-2xl xl:text-4xl xl:leading-tight">
                  Why Join Us
                </h2>
                <div className="mt-6 space-y-4 text-base lg:flex lg:flex-row">
                  <div className="mr-5 mt-4 space-y-2">
                    <h2 className="font-semibold">Validation</h2>
                    <p className="text-secondary">
                      Gain recognition for your skills and expertise in the spa
                      and wellness industry.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h2 className="font-semibold">Connections</h2>
                    <p className="text-secondary">
                      Gain recognition for your skills and expertise in the spa
                      and wellness industry.
                    </p>
                  </div>
                </div>
                <div className="mt-6 space-y-4 text-base">
                  <div className="mr-5 mt-4 space-y-2">
                    <h2 className="font-semibold">Knowledge Exchange</h2>
                    <p className="text-secondary">
                      Access a treasure trove of insights and ideas to stay
                      ahead in your field.
                    </p>
                  </div>
                </div>
                <div className="mt-6 space-y-4 text-base">
                  <div className="mb-8">
                    <p className="text-secondary">
                      Join us on SPAS and take your journey in the Beauty, Spa,
                      and Wellness industry to new heights.
                    </p>
                  </div>
                  <Link href={"/membership"}>
                    <span className="btn-1 block my-4 w-full text-center lg:w-max hover:bg-primary transition-colors ease-out">
                      JOIN SPAS
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MEMBERSHIP BENEFITS */}
        <section className="pb-14 lg:pb-0 lg:py-0">
          <div className="container">
            <div className="flex flex-col gap-y-8">
              <header className="flex flex-col gap-y-4 text-center">
                <h2 className="at-center mx-auto w-fit text-2xl leading-snug md:max-w-md md:leading-normal lg:text-3xl xl:max-w-2xl xl:text-5xl xl:leading-tight text-black font-semibold">
                  Member Benefits
                </h2>
              </header>

              <div className="flex flex-col lg:flex-row text-center py-6 gap-8 items-center lg:justify-between">
                <div>
                  <div className="">
                    <img
                      className="w-md rounded-lg mx-auto"
                      src={Ficon1.src}
                      alt="Ficon1"
                    />
                  </div>
                  <div className="space-y-3">
                    <h2 className="font-semibold">Networking Events</h2>
                    <p className="text-secondary p-3 max-w-xs">
                      Attend exclusive events to connect with industry leaders
                      and fellow professionals.
                    </p>
                  </div>
                </div>
                <div className="lg:border-x-2 px-10">
                  <div className="">
                    <img
                      className="w-md rounded-lg mx-auto"
                      src={Ficon1.src}
                      alt="Ficon1"
                    />
                  </div>
                  <div className="space-y-3">
                    <h2 className="font-semibold">Resource Hub</h2>
                    <p className="text-secondary p-3 max-w-xs">
                      Access a rich repository of resources, from business
                      insights to the latest wellness trends.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="">
                    <img
                      className="w-md rounded-lg mx-auto"
                      src={Ficon1.src}
                      alt="Ficon1"
                    />
                  </div>
                  <div className="space-y-3">
                    <h2 className="font-semibold">Profile Showcase</h2>
                    <p className="text-secondary p-3 max-w-xs">
                      Showcase your expertise with a personalized profile,
                      boosting your visibility.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <p className="text-center font-semibold lg:w-1/2">
                  Our membership benefits is more than that.
                  <br />
                  Become a member today and unlock a world of opportunities in
                  the Beauty, Spa, and Wellness community.
                </p>
              </div>
              <div className="flex flex-col lg:flex-row justify-center">
                <Link href={"/membership"}>
                  <span className="btn-1 block w-full text-center lg:text-left lg:w-max hover:bg-primary transition-colors ease-out">
                    See Membership Details
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* BLOG */}
        <section className="pb-14 lg:pb-24 pt-12">
          <div className="container">
            <div className="flex flex-col gap-y-8">
              <div className="flex flex-col lg:flex-row text-center">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {posts.data?.length === 0 && (
                    <div className="text-center">
                      <p className="text-4xl font-semibold">Opps..</p>
                      <p>Blog not found</p>
                    </div>
                  )}
                  {posts.data
                    ?.slice(0, 3)
                    .filter((post) => post.status === "PUBLISHED")
                    .map(
                      (post: Post, index: number): JSX.Element => (
                        <div
                          className="p-3 bg-white border-1 shadow-lg rounded-lg transition duration-200 hover:bg-black/10"
                          key={post.id}
                        >
                          <Link href={`/event-media/${post.slug}`}>
                            <div className="grid justify-center">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                className="aspect-video w-full rounded-xl object-cover"
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${post.cover.url}`}
                                alt={post.title}
                              />
                            </div>
                            <div className="mt-5 space-y-3 text-left h-[130px]">
                              <h2 className="font-semibold text-[#3E3232]">
                                {post.title}
                              </h2>
                              <p className="text-secondary text-black/80 line-clamp-3">
                                {post.content.replace(/<[^>]+>/g, "")}
                              </p>
                            </div>
                          </Link>
                          <div className="bg-[#F5F5F5] p-5 mt-5 rounded-lg">
                            <div className="flex flex-wrap gap-4">
                              {post.categories
                                ?.slice(0, 3)
                                .map((category: Category, index: number) => (
                                  <p
                                    className="bg-[#dee9f9] w-max text-sm p-2 rounded-full flex-grow"
                                    key={category.id}
                                  >
                                    {category.name}
                                  </p>
                                ))}
                            </div>
                            <div className="text-sm text-secondary text-left p-2">
                              <p>
                                Last update : <br />
                                <label
                                  className="text-primary"
                                  htmlFor="{moment(post.published_at).format('ddd, MMMM Do YYYY')}"
                                >
                                  {moment(post.published_at).format(
                                    "ddd, MMMM Do YYYY"
                                  )}
                                </label>
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row justify-center lg:mt-10">
                <Link href={"/event-media"}>
                  <span className="btn-1 block my-4 w-full text-center lg:w-max hover:bg-primary transition-colors ease-out">
                    Read more
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* KEEP UP TO DATE WITH US */}
        <section className="pb-12 lg:pb-14">
          <div className="container">
            <div className="relative lg:flex gap-y-8 bg-[#F0F6FF] rounded-lg">
              <div className="space-y-3 p-9">
                <h2 className="text-2xl leading-snug md:max-w-md md:leading-normal lg:text-3xl xl:max-w-2xl xl:text-5xl xl:leading-tight text-secondary font-semibold">
                  Keep Up-to-Date with Us
                </h2>
                <p className="text-secondary lg:w-3/4">
                  Stay in the loop with the latest industry news, events, and
                  community updates. Follow us on and be a part of the ongoing
                  dialogue in the world of Beauty, Spa, and Wellness.
                </p>
                <div className="">
                  <form action="/send" method="POST" className="mt-8">
                    <div className="lg:flex lg:flex-row lg:gap-x-3 lg:w-3/4">
                      <input
                        type="text"
                        required
                        className="p-3 h-max w-full lg:w-3/4 focus:text-secondary rounded-lg border-1 shadow-lg"
                        placeholder="Your e-mail address"
                      />
                      <input
                        type="button"
                        value="Subscribe"
                        className="btn-2 text-white lg:w-max w-full mt-5 lg:mt-0 capitalize cursor-pointer hover:bg-secondary transition-colors ease-out"
                      />
                    </div>
                  </form>
                </div>
              </div>
              <div className="absolute right-0 top-0 hidden lg:block">
                <img
                  className="w-72 rounded-lg"
                  src={KeepBg.src}
                  alt="KeepBg"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
