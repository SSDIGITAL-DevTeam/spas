/* eslint-disable @next/next/no-img-element */
import { JSX } from "react";
import Head from "next/head";
import HeroMember from "@/assets/membership-assets/member-hero.webp";
import Card1 from "@/assets/membership-assets/card1.webp";
import Card2 from "@/assets/membership-assets/card2.webp";
import Card3 from "@/assets/membership-assets/card3.webp";
import Card4 from "@/assets/membership-assets/card4.webp";
import Ellipse from "@/assets/membership-assets/ellipse.png";
import Link from "next/link";

export default function Membership(): JSX.Element {
  return (
    <>
      <Head>
        <title>SPAS | Membership</title>
        <link rel="icon" href="/asset-logo.png" />
        <meta name="author" content="SPAS" />

        <meta
          name="title"
          content="Become a Member | Get Connected with SPAS Community"
        />

        <meta
          name="description"
          content="Our community membership gives you access to first-hand information and networking within the industry. Sign-up now!"
        />

        <meta name="keywords" content="spa, services, membership" />

        <meta name="robots" content="index, follow" />

        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />

        <meta
          property="og:title"
          content="Become a Member | Get Connected with SPAS Community"
        />

        <meta
          property="og:description"
          content="Our community membership gives you access to first-hand information and networking within the industry. Sign-up now!"
        />

        <meta property="og:type" content="website" />

        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/asset-logo.png`}
        />
      </Head>

      {/* HERO MEMBERSHIP */}
      <header className="pb-14 pt-32 lg:pt-30">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-x-14 gap-y-10">
            <div className="md:w-1/2">
              <img
                className="w-screen rounded-lg"
                src={HeroMember.src}
                alt="HeroMember"
              />
            </div>
            <div className="md:w-1/2 grid items-center">
              <h1 className="text-4xl font-semibold leading-snug md:leading-normal xl:max-w-xl xl:text-5xl xl:leading-tight">
                {/* Elevate{" "} */}
                <span className="text-black">
                  Get connnected with the SPAS community.
                </span>
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* MEMBERSHIP BENEFITS */}
        <section className="pb-14 lg:pb-0 lg:pt-20">
          <div className="container">
            <div className="flex flex-col gap-y-8">
              <header className="flex flex-col gap-y-4 text-center">
                <h2 className="at-center mx-auto w-fit text-2xl leading-snug md:max-w-md md:leading-normal lg:text-3xl xl:max-w-2xl xl:text-5xl xl:leading-tight text-black font-semibold md:mb-10">
                  Member Benefits
                </h2>
              </header>

              <div className="flex flex-col md:flex-row">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-center">
                  <div className="rounded-xl bg-white border-1 shadow-lg">
                    <img className="w-screen" src={Card1.src} alt="Card1" />
                    <div className="py-10 px-5 space-y-5">
                      <h2 className="text-secondary font-bold md:text-2xl">
                        最新讯息 - 新闻&cedil; LicenseOne&cedil;
                        警察执照部⻔&cedil; 公积⾦部⻔&cedil; ⼈⼒与劳⼯部⻔
                      </h2>
                      <p className="text-sm md:text-lg">
                        First-hand Information - News, LicenseOne, PLRD, CPF,
                        MOM
                      </p>
                    </div>
                  </div>
                  <div className="rounded-xl bg-white border-1 shadow-lg">
                    <img className="w-screen" src={Card2.src} alt="Card2" />
                    <div className="py-10 px-5 space-y-12">
                      <h2 className="text-secondary font-semibold md:text-2xl">
                        同⾏合作， 不带恶性竞争
                      </h2>
                      <p className="text-sm md:text-lg md:w-3/5 mx-auto">
                        Collaboration, not Competition among SPAS
                      </p>
                    </div>
                  </div>
                  <div className="rounded-xl bg-white border-1 shadow-lg">
                    <img className="w-screen" src={Card3.src} alt="Card3" />
                    <div className="py-10 px-5 space-y-5">
                      <h2 className="text-secondary font-semibold md:text-2xl">
                        提⾼同⾏的专业形象
                      </h2>
                      <p className="text-sm md:text-lg">
                        Raise Professional Image
                      </p>
                    </div>
                  </div>
                  <div className="rounded-xl bg-white border-1 shadow-lg">
                    <img className="w-screen" src={Card4.src} alt="Card4" />
                    <div className="py-10 px-5 space-y-5">
                      <h2 className="text-secondary font-semibold md:text-2xl">
                        联谊友谊
                      </h2>
                      <p className="text-sm md:text-lg">Build Bonding</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MEMBERSHIP QUALIFICATIONS */}
        <section className="pb-14 lg:pb-0 lg:pt-20">
          <div className="container">
            <div className="flex flex-col gap-y-8">
              <header className="flex flex-col gap-y-4 text-center">
                <h2 className="at-center mx-auto w-fit text-2xl leading-snug md:max-w-md md:leading-normal lg:text-3xl xl:max-w-2xl xl:text-5xl xl:leading-tight text-black font-semibold md:mb-10">
                  Membership Qualifications
                </h2>
              </header>

              <div className="flex flex-col">
                <div className="flex border-2 p-5 gap-x-10 justify-center items-center">
                  <img className="" src={Ellipse.src} alt="Ellipse" />
                  <p className=" text-secondary text-sm md:text-lg">
                    Membership is open to all{" "}
                    <strong>
                      accredited and licensed massage establishments holding
                      valid ME Cat 1 licenses and qualified masseur / masseuses
                      and therapist working in member&lsquo;s massage
                      establishment irrespective of race, language or religion.
                    </strong>
                  </p>
                </div>
                <div className="flex border-2 p-5 gap-x-10 items-center">
                  <img className="" src={Ellipse.src} alt="Ellipse" />
                  <p className=" text-secondary text-sm md:text-lg">
                    Only members <strong>who are above 21 years of age</strong>{" "}
                    shall have the right to vote and to hold office in the
                    association.
                  </p>
                </div>
                <div className="flex border-2 p-5 gap-x-10 justify-center items-center">
                  <img className="" src={Ellipse.src} alt="Ellipse" />
                  <p className=" text-secondary text-sm md:text-lg">
                    A copy of the{" "}
                    <strong>
                      Constitution, SPAS member handbook, SPAS member decal,
                      SPAS user ID & password to the SPAS website
                    </strong>{" "}
                    shall be furnished to every approved member upon payment of
                    the entrance fee.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MEMBERSHIP SUBS FEE */}
        <section className="pb-14 lg:pb-0 lg:pt-20">
          <div className="container">
            <div className="flex flex-col gap-y-8">
              <header className="flex flex-col gap-y-4 text-center">
                <h2 className="mx-auto text-2xl leading-snug md:leading-normal lg:text-3xl xl:text-5xl lg:leading-tight text-black font-semibold md:mb-10">
                  Membership Subscription Fees
                </h2>
                <div className="grid justify-center">
                  <p className="bg-[#F0F6FF] w-max py-2 px-6 rounded-full">
                    First-time Membership Fee
                  </p>
                </div>
              </header>

              <div className="flex flex-col">
                <div className="border-b-2 pb-10">
                  <div className="text-left md:text-center">
                    <h2 className="text-secondary lg:text-4xl font-semibold text-2xl text-center">
                      S$200
                    </h2>
                    <div className="text-center">
                      <p className="text-secondary text-sm md:text-lg mt-5 w-3/4 md:w-2/5 mx-auto">
                        Payable within two weeks of approval. At the end of the
                        twelfth month of being a member, the annual membership
                        shall be payable, pro-rated to the end of the calendar
                        year 1st MAY when the annual membership fee is due.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-8">
              <header className="flex flex-col gap-y-4 text-center">
                <div className="grid justify-center pt-10">
                  <p className="bg-[#F0F6FF] w-max py-2 px-6 rounded-full">
                    Annual Membership Fee
                  </p>
                </div>
              </header>

              <div className="flex flex-col">
                <div className="pb-10">
                  <div className="text-left md:text-center">
                    <h2 className="text-secondary lg:text-4xl font-semibold text-2xl text-center">
                      S$100
                    </h2>
                    <div className="text-center">
                      <p className="text-secondary text-sm md:text-lg mt-5 w-3/4 md:w-2/5 mx-auto">
                        Payable annually one week before the 1st MAY. This
                        annual fee is waived during the first year upon payment
                        of the first time membership fee.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BECOME SPAS MEMBERS */}
        <section className="pb-14 lg:pb-14 lg:pt-20">
          <div className="container">
            <div className="flex flex-col gap-y-5">
              <header className="flex flex-col gap-y-4 text-center">
                <h2 className="mx-auto text-2xl leading-snug md:leading-normal lg:text-3xl xl:text-5xl lg:leading-tight text-black font-semibold md:mb-10">
                  Become SPAS Member
                </h2>
              </header>

              <div className="flex flex-col lg:flex-row justify-center">
                <Link
                  href={"/SPAS Membership Application Form.pdf"}
                  download="SPAS Membership Application Form"
                >
                  <span className="btn-1 block capitalize text-center w-full lg:w-max hover:bg-primary transition-colors ease-out">
                    DOWNLOAD APPLICATION FORM
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
