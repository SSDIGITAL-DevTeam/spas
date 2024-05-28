import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { Button, Image, Tab, Tabs } from "@nextui-org/react";
import { LuMapPin, LuPhone, LuUser2 } from "react-icons/lu";
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import { CgCalendarDates } from "react-icons/cg";
import AssetGender from "@/assets/therapist-assets/gender.svg";
import AssetCerfiticate from "@/assets/therapist-assets/certificate.png";
import { PiGlobeHemisphereEastBold, PiTiktokLogo } from "react-icons/pi";
import { IoReload } from "react-icons/io5";
import AssetProfile from "@/assets/dev/profile.png";
import { useRouter } from "next/router";
import { EmployeHistory, SocialMedia, Therapist } from "@/@types";
import axios from "axios";
import moment from "moment";

const social_medias = [
  {
    id: 1,
    label: "Instagram",
    url: "https://www.instagram.com",
  },
  {
    id: 2,
    label: "Facebook",
    url: "https://www.facebook.com",
  },
  {
    id: 3,
    label: "Tiktok",
    url: "https://www.tiktok.com",
  },
  {
    id: 4,
    label: "Twitter",
    url: "https://www.twitter.com",
  },
];

export default function DetailTherapist() {
  const [profile, setProfile] = useState<Therapist>();
  const [employeHistory, setEmployeHistory] = useState<[]>([]);
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
      setEmployeHistory(res.data.data.employHistorys);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, [slug]);

  const socmedIcon = (label: string) => {
    switch (true) {
      case label == "Instagram":
        return <FiInstagram className="text-secondary w-6 h-6 md:w-8 md:h-8" />;

      case label == "Tiktok":
        return (
          <PiTiktokLogo className="text-secondary w-6 h-6 md:w-8 md:h-8" />
        );

      case label == "Facebook":
        return <FiFacebook className="text-secondary w-6 h-6 md:w-8 md:h-8" />;

      case label == "Twitter":
        return <FiTwitter className="text-secondary w-6 h-6 md:w-8 md:h-8" />;

      default:
        return;
    }
  };

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
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${profile?.cover?.url}`}
                    alt="Operators"
                    className="w-max lg:w-40 lg:h-40 mx-auto object-cover rounded-full"
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
                <Tab title="Personal Information" key="personal">
                  <div className="space-y-4 md:space-y-8">
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
                              {profile?.nationality}
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
                              {profile?.address_nearest_mrt}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-3/4 mx-auto border p-4 md:p-8">
                      <h3 className="text-[#A3A3A3] md:text-lg font-bold mb-4 md:mb-8">
                        Social Media
                      </h3>
                      {profile?.social_media.length == 0 ? (
                        <p className="text-center md:text-lg">
                          No social media found
                        </p>
                      ) : (
                        <div className="md:columns-2 md:gap-x-40 space-y-4">
                          {profile?.social_media.map((media: SocialMedia) => (
                            <div
                              key={media.id}
                              className="flex items-center gap-x-4"
                            >
                              <div>{socmedIcon(media.name)}</div>
                              <a
                                href={media.url}
                                target="_blank"
                                className="flex flex-col gap-y-1"
                              >
                                <span className="text-[#A3A3A3] text-sm md:text-base">
                                  {media.name}
                                </span>
                                <span className="text-secondary text-lg md:text-xl">
                                  {media.url}
                                </span>
                              </a>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Tab>

                <Tab title="Career Information" key="career">
                  <div className="space-y-4 md:space-y-8">
                    <div className="border p-4 md:p-8 md:w-3/4 mx-auto ">
                      <h3 className="text-[#A3A3A3] md:text-lg font-bold mb-4 md:mb-8">
                        Employment History
                      </h3>
                      {employeHistory.length == 0 ? (
                        <p className="text-center md:text-lg">
                          No history found
                        </p>
                      ) : (
                        employeHistory.map((history: EmployeHistory) => (
                          <div
                            key={history.id}
                            className="flex flex-col gap-y-2"
                          >
                            <h3 className="text-black text-lg md:text-xl font-bold">
                              {history.job_title}
                            </h3>
                            <span>{history.company_name}</span>
                            <span>
                              {moment(history.start_date).format("MMMM YYYY")} -{" "}
                              {moment(history.end_date).format("MMMM YYYY")}
                            </span>
                            <span>{history.location}</span>
                            <p>{history.description}</p>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="border p-4 md:p-8 md:w-3/4 mx-auto ">
                      <h3 className="text-[#A3A3A3] md:text-lg font-bold mb-4 md:mb-8">
                        Professional Certifications
                      </h3>

                      <div className="flex flex-col md:flex-row gap-x-8 gap-y-2">
                        <div>
                          <Image
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${profile?.professional_certs}`}
                            alt="Therapist Certificate SPAS"
                            className="w-max lg:w-40 lg:h-40 mx-auto rounded-md"
                            removeWrapper
                            radius="none"
                          />
                        </div>
                        <div className="flex flex-col gap-y-2">
                          <h3 className="text-black md:text-lg font-bold">
                            {profile?.name_cert}
                          </h3>
                          <span>{profile?.issuing_organization}</span>
                          <span>Issued Nov 2021 - Expires Mar 2025</span>
                          <span>Credential ID: {profile?.credential_id}</span>
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
