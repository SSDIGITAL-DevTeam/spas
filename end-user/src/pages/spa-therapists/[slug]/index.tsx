import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import AssetBlank from "@/assets/images/blank-therapist.png";
import { Button, Image, Tab, Tabs } from "@nextui-org/react";
import { LuMapPin, LuPhone, LuUser2 } from "react-icons/lu";
import { FaRegAddressCard } from "react-icons/fa6";
import { CgCalendarDates } from "react-icons/cg";
import AssetGender from "@/assets/therapist-assets/gender.svg";
import AssetCerfiticate from "@/assets/therapist-assets/certificate.png";
import { PiGlobeHemisphereEastBold } from "react-icons/pi";
import { IoReload } from "react-icons/io5";
import AssetProfile from "@/assets/dev/profile.png";
import { useRouter } from "next/router";
import { Therapist } from "@/@types";
import axios from "axios";

export default function DetailTherapist() {
  const [profile, setProfile] = useState<Therapist>();

  const router = useRouter();
  const slug = router.query.slug;

  const getProfile = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/end-user/operator/therapists/${slug}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              process.env.NEXT_PUBLIC_ACCESS_TOKEN!
            )}`,
          },
        }
      );
      setProfile(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, [slug]);

  console.log(profile);
  return (
    <>
      <Head>
        <title>SPAS | Elevate your Spa & Wellness Business with Us!</title>
        <link rel="icon" href="/asset-logo.png" />
        <meta name="author" content="SPAS" />

        <meta
          name="title"
          content="SPAS | Elevate your Spa & Wellness Business with Us!"
        />

        <meta
          name="description"
          content="Promote and protect business entities, practitioners, stakeholders, and consumers of the Beauty, Spa, and Wellness industry in Singapore."
        />

        <meta name="keywords" content="spa, services" />

        <meta name="robots" content="index, follow" />

        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />

        <meta
          property="og:title"
          content="SPAS | Elevate your Spa & Wellness Business with Us!"
        />

        <meta
          property="og:description"
          content="Promote and protect business entities, practitioners, stakeholders, and consumers of the Beauty, Spa, and Wellness industry in Singapore."
        />

        <meta property="og:type" content="website" />

        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/asset-logo.png`}
        />
      </Head>
      <main className="pt-32">
        <header className="container p-4 md:p-8 mb-10">
          <Link
            href="/spa-therapists"
            className="text-secondary flex items-center gap-x-4"
          >
            <div>
              <BsArrowLeftSquareFill className="w-8 h-8 md:w-10 md:h-10 " />
            </div>
            <span className="font-semibold text-lg md:text-2xl">
              Back to Spa Therapists List
            </span>
          </Link>
        </header>

        <section className="pb-10 md:pb-20">
          <div className="container p-4 md:p-8">
            <div className="">
              <div className="relative md:w-max mx-auto mb-8 space-y-2">
                <div className="space-y-4 flex flex-col items-center">
                  <Image
                    src={AssetProfile.src}
                    alt="Operators"
                    className="object-cover"
                    radius="none"
                  />
                  <div className="text-center">
                    <h2 className="font-bold text-lg md:text-2xl ">
                      {profile?.name}
                    </h2>
                  </div>
                </div>

                <div className="md:absolute md:-right-96 top-0 flex flex-col gap-y-2 text-[#A3A3A3] text-sm md:text-base text-center">
                  <span>Last updated on: </span>
                  <span>Tuesday, Jan 22 2024</span>
                </div>
              </div>

              <Tabs className="flex items-center justify-center">
                <Tab title="Personal Information" key="personal" className="">
                  <div className="lg:w-3/4 mx-auto border p-4 md:p-8">
                    <div className="md:columns-2 md:gap-x-40 space-y-4">
                      <div className="flex items-center gap-x-4">
                        <div>
                          <LuUser2 className="text-secondary w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div className="flex flex-col gap-y-1">
                          <span className="text-[#A3A3A3] text-sm md:text-base">
                            Name
                          </span>
                          <span className="text-secondary text-lg md:text-xl">
                            {profile?.name}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-x-4">
                        <div>
                          <FaRegAddressCard className="text-secondary w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div className="flex flex-col gap-y-1">
                          <span className="text-[#A3A3A3] text-sm md:text-base">
                            Passport / Fin No.
                          </span>
                          <span className="text-secondary text-lg md:text-xl">
                            {profile?.passport_finno}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-x-4">
                        <div>
                          <CgCalendarDates className="text-secondary w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div className="flex flex-col gap-y-1">
                          <span className="text-[#A3A3A3] text-sm md:text-base">
                            Date of Birth
                          </span>
                          <span className="text-secondary text-lg md:text-xl">
                            {profile?.date_of_birth}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-x-4">
                        <div>
                          <Image
                            src={AssetGender.src}
                            className="text-secondary w-6 h-6 md:w-8 md:h-8"
                            removeWrapper
                          />
                        </div>
                        <div className="flex flex-col gap-y-1">
                          <span className="text-[#A3A3A3] text-sm md:text-base">
                            Sex
                          </span>
                          <span className="text-secondary text-lg md:text-xl">
                            {profile?.sex}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-x-4">
                        <div>
                          <LuPhone className="text-secondary w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div className="flex flex-col gap-y-1">
                          <span className="text-[#A3A3A3] text-sm md:text-base">
                            Contact No
                          </span>
                          <span className="text-secondary text-lg md:text-xl">
                            {profile?.contact_no}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-x-4">
                        <div>
                          <PiGlobeHemisphereEastBold className="text-secondary w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div className="flex flex-col gap-y-1">
                          <span className="text-[#A3A3A3] text-sm md:text-base">
                            Nationality
                          </span>
                          <span className="text-secondary text-lg md:text-xl">
                            Singapore
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-x-4">
                        <div>
                          <LuMapPin className="text-secondary w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div className="flex flex-col gap-y-1">
                          <span className="text-[#A3A3A3] text-sm md:text-base">
                            Address
                          </span>
                          <span className="text-secondary text-lg md:text-xl">
                            {profile?.address}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-x-4">
                        <div>
                          <LuMapPin className="text-secondary w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div className="flex flex-col gap-y-1">
                          <span className="text-[#A3A3A3] text-sm md:text-base">
                            Address nearest MRT
                          </span>
                          <span className="text-secondary text-lg md:text-xl">
                            Canberra MRT
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>

                <Tab title="Career Information" key="career">
                  <div className="space-y-4 md:space-y-8">
                    <div className="border p-4 md:p-8 md:w-3/4 mx-auto ">
                      <h3 className="text-[#A3A3A3] md:text-lg font-bold mb-4 md:mb-8">
                        Employment History
                      </h3>

                      <div className="flex flex-col gap-y-2">
                        <h3 className="text-black text-lg md:text-xl font-bold">
                          Back Massage Specialists
                        </h3>
                        <span>Spa A</span>
                        <span>Feb 2022 - Mar 2023</span>
                        <span>Singapore</span>
                        <ul className="list-disc">
                          <li>
                            ase Back Pain & Tension: I use targeted massage
                            techniques to relieve discomfort and promote
                            relaxation in your back, shoulders, and neck.
                          </li>
                          <li>
                            Client-Focused Care: Every massage is tailored to
                            your needs and preferences, ensuring a comfortable
                            and effective experience.
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="border p-4 md:p-8 md:w-3/4 mx-auto ">
                      <h3 className="text-[#A3A3A3] md:text-lg font-bold mb-4 md:mb-8">
                        Professional Certifications
                      </h3>

                      <div className="flex flex-col md:flex-row gap-x-8 gap-y-2">
                        <div>
                          <Image
                            src={AssetCerfiticate.src}
                            alt="Therapist Certificate SPAS"
                            className="w-max mx-auto"
                            removeWrapper
                            radius="none"
                          />
                        </div>
                        <div className="flex flex-col gap-y-2">
                          <h3 className="text-black md:text-lg font-bold">
                            CIBTAC Level 3 Diploma in Spa Therapy
                          </h3>
                          <span>CIBTAC</span>
                          <span>Issued Nov 2021 - Expires Mar 2025</span>
                          <span>Credential ID: 1A2B3C4DXYZ</span>
                          <Button color="secondary" endContent={<IoReload />}>
                            Show credential
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
