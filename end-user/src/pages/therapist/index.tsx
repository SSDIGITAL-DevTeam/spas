/* eslint-disable @next/next/no-img-element */
import { JSX, useEffect, useState } from "react";
import Head from "next/head";
import HeroTherapist from "@/assets/therapist-assets/therapist-hero.webp";
import ImgTherapist from "@/assets/therapist-assets/therapist-img.webp";
import GroupImg1 from "@/assets/therapist-assets/group-1.svg";
import GroupImg2 from "@/assets/therapist-assets/group-2.svg";
import GroupImg3 from "@/assets/therapist-assets/group-3.svg";
import GroupImg4 from "@/assets/therapist-assets/group-4.svg";
import GroupImg5 from "@/assets/therapist-assets/group-5.svg";
import GroupImg6 from "@/assets/therapist-assets/group-6.svg";
import Img1 from "@/assets/therapist-assets/img1.webp";
import Img2 from "@/assets/therapist-assets/img2.webp";
import Img3 from "@/assets/therapist-assets/img3.webp";
import Img4 from "@/assets/therapist-assets/img4.webp";
import Img5 from "@/assets/therapist-assets/img5.webp";
import Img6 from "@/assets/therapist-assets/img6.webp";
import Link from "next/link";
import AssetProfile from "@/assets/dev/profile.png";

import { Button, Image } from "@nextui-org/react";
import axios from "axios";
import { Therapist } from "@/@types";

export default function Therapists(): JSX.Element {
  const [role, setRole] = useState<string>("");
  const [therapists, setTherapists] = useState<[]>([]);

  const me = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/end-user/me`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              `${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
            )}`,
          },
        }
      );

      setRole(response.data.data.role);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    me();
  }, []);

  const getTherapists = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/end-user/operator/therapists`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              process.env.NEXT_PUBLIC_ACCESS_TOKEN!
            )}`,
          },
        }
      );
      setTherapists(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTherapists();
  }, []);

  return (
    <>
      <Head>
        <title>SPAS | Therapist</title>
        <meta name="author" content="SPAS" />
        <link rel="icon" href="/asset-logo.png" />

        <meta
          name="title"
          content="Therapist | Gain Recognition for Professional Status"
        />

        <meta
          name="description"
          content="Get accredited recognition and other benefits by registering your professional status with us."
        />

        <meta name="keywords" content="spa, services, therapist" />

        <meta name="robots" content="index, follow" />

        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />

        <meta
          property="og:title"
          content="Therapist | Gain Recognition for Professional Status"
        />

        <meta
          property="og:description"
          content="Get accredited recognition and other benefits by registering your professional status with us."
        />

        <meta property="og:type" content="website" />

        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/asset-logo.png`}
        />
      </Head>

      {/* HERO */}
      <header className="pb-14 lg:pb-18 pt-24">
        <div className="container">
          <div className="flex flex-col md:flex-row md:gap-x-6 md:items-center">
            <div className="flex flex-col gap-y-4 md:w-1/2">
              <h1 className="text-center lg:text-start text-4xl font-semibold leading-snug md:leading-normal xl:max-w-xl xl:text-5xl xl:leading-tight">
                Gain Recognition{" "}
                <span className="text-black">
                  By getting a Professional status!
                </span>
              </h1>
              <p className="mr-5 text-secondary md:text-lg text-justify">
                <strong>SPAS</strong> offers a platform for
                <strong> Complementary Therapists</strong> to enroll their
                competencies, demonstrating their expertise and skills in
                specific treatments and sectors of the Wellness Industry.
              </p>
              <Link href={"/join-us"}>
                <span className="btn-1 block my-4 w-full text-center lg:w-max hover:bg-primary transition-colors ease-out">
                  JOIN SPAS
                </span>
              </Link>
            </div>

            <div className="mt-8 md:w-1/2">
              <img
                className="w-screen rounded-lg"
                src={HeroTherapist.src}
                alt="HeroTherapist"
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
                  Enjoy these SPAS&prime; benefits if you decide to register
                  your professional status.
                </p>
              </header>

              <div className="flex flex-col lg:flex-row text-center py-6 gap-8 items-center lg:justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6">
                  <div className="space-y-6">
                    <div className="">
                      <img
                        className="w-md rounded-lg mx-auto"
                        src={Img1.src}
                        alt="Img1"
                      />
                    </div>
                    <div className="space-y-3">
                      <h2 className="font-semibold">Gain Professional Image</h2>
                      <p className="text-secondary p-3 max-w-xs mx-auto text-sm md:text-lg">
                        By becoming SPAS member, you can elevate your personal
                        image and value.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-6 lg:border-x-2 px-10">
                    <div className="">
                      <img
                        className="w-md rounded-lg mx-auto"
                        src={Img2.src}
                        alt="Img2"
                      />
                    </div>
                    <div className="space-y-3">
                      <h2 className="font-semibold">Accredited Recognition</h2>
                      <p className="text-secondary p-3 max-w-xs mx-auto text-sm md:text-lg">
                        Gain acknowledgment as a Certified Therapist with
                        accreditation.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="">
                      <img
                        className="w-md rounded-lg mx-auto"
                        src={Img3.src}
                        alt="Img3"
                      />
                    </div>
                    <div className="space-y-3">
                      <h2 className="font-semibold">
                        Career Development Opportunities
                      </h2>
                      <p className="text-secondary p-3 max-w-xs text-sm md:text-lg mx-auto">
                        Access exclusive opportunities to further enhance your
                        skills and expertise.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="">
                      <img
                        className="w-md rounded-lg mx-auto"
                        src={Img4.src}
                        alt="Img4"
                      />
                    </div>
                    <div className="space-y-3">
                      <h2 className="font-semibold">Endorsed by Expertise</h2>
                      <p className="text-secondary p-3 max-w-xs text-sm md:text-lg mx-auto">
                        Receive endorsement of qualifications and competencies
                        as a professional specializing in specific treatment(s).
                      </p>
                    </div>
                  </div>
                  <div className="space-y-6 lg:border-x-2 px-10">
                    <div className="">
                      <img
                        className="w-md rounded-lg mx-auto"
                        src={Img5.src}
                        alt="Img5"
                      />
                    </div>
                    <div className="space-y-3">
                      <h2 className="font-semibold">
                        Strategic Marketing Support
                      </h2>
                      <p className="text-secondary p-3 max-w-xs text-sm md:text-lg mx-auto">
                        Take advantage of SWAS&prime; marketing and promotional
                        initiatives for increased visibility.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="">
                      <img
                        className="w-md rounded-lg mx-auto"
                        src={Img6.src}
                        alt="Img6"
                      />
                    </div>
                    <div className="space-y-3">
                      <h2 className="font-semibold">Enhance Visibility</h2>
                      <p className="text-secondary p-3 max-w-xs text-sm md:text-lg mx-auto">
                        Enable potential customers to locate and authenticate
                        your professional profile.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* YOU ARE WELCOME */}
        <section className="pb-14 lg:pb-0 lg:pt-20 mb-10 md:mb-20">
          <div className="container">
            <div className="flex flex-col">
              <header className="flex flex-col gap-y-6 text-center pb-10">
                <h2 className="mx-auto w-fit text-2xl leading-snug md:max-w-md md:leading-normal lg:text-3xl xl:max-w-2xl xl:text-5xl xl:leading-tight text-black font-semibold">
                  You Are Welcome
                </h2>

                <p className="mx-auto md:w-3/4 text-secondary">
                  If you work in one of the following businesses.
                </p>
              </header>

              <div className="flex flex-col lg:flex-row text-center py-6 gap-8 items-center lg:justify-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-6">
                    <div className="">
                      <img
                        className="w-md rounded-lg mx-auto"
                        src={GroupImg6.src}
                        alt="GroupImg6"
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
                      <img
                        className="w-md rounded-lg mx-auto"
                        src={GroupImg3.src}
                        alt="GroupImg3"
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
                      <img
                        className="w-md rounded-lg mx-auto"
                        src={GroupImg1.src}
                        alt="GroupImg1"
                      />
                    </div>
                    <div className="space-y-3">
                      <h2 className="font-semibold w-1/2 mx-auto">
                        Hydrotherapy & Body Treatment Spa
                      </h2>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="">
                      <img
                        className="w-md rounded-lg mx-auto"
                        src={GroupImg2.src}
                        alt="GroupImg2"
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
                      <img
                        className="w-md rounded-lg mx-auto"
                        src={GroupImg4.src}
                        alt="GroupImg4"
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
                      <img
                        className="w-md rounded-lg mx-auto"
                        src={GroupImg5.src}
                        alt="GroupImg5"
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

        {/* Mett Spa Operators */}
        {role == "operator" ? (
          <section className="mb-10">
            <div className="container p-4 md:p-8">
              <h2 className="text-2xl md:text-4xl lg:text-5xl text-black text-center mb-4 md:mb-8 lg:mb-20 font-bold">
                Meet All Our Spa Therapists
              </h2>
              <div className="grid md:grid-cols-3 gap-4 md:gap-10 mb-4 md:mb-8 lg:mb-20">
                {therapists.map((therapist: Therapist, index: number) => (
                  <div key={index} className="shadow-md border p-4 md:p-8">
                    <div className="flex flex-col items-center gap-4 md:gap-8">
                      <Image
                        src={AssetProfile.src}
                        radius="none"
                        alt="Spa Operators"
                        className="object-cover"
                      />
                      <div className="flex flex-col items-center">
                        <h3 className="text-lg md:text-2xl text-black font-semibold">
                          {therapist.name}
                        </h3>
                        <Link
                          href={`/spa-therapists/${therapist.slug}`}
                          className="text-primary"
                        >
                          See Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-max mx-auto">
                <Button
                  as={Link}
                  href="/spa-therapists"
                  color="secondary"
                  size="lg"
                >
                  View More
                </Button>
              </div>
            </div>
          </section>
        ) : (
          ""
        )}
      </main>
    </>
  );
}
