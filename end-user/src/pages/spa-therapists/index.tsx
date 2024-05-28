import Head from "next/head";
import React, { useState, useEffect } from "react";
import AssetBlank from "@/assets/images/blank-therapist.png";
import Link from "next/link";
import { Image } from "@nextui-org/react";
import axios from "axios";
import AssetProfile from "@/assets/dev/profile.png";
import { DataWithPagination, Therapist } from "@/@types";
import { FaUser } from "react-icons/fa6";

export default function SpaOperators() {
  const [role, setRole] = useState<string>("");
  const [therapists, setTherapists] = useState<DataWithPagination<Therapist>>();

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
      setTherapists(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTherapists();
  }, []);

  const handlePage = async (url: any) => {
    const response = await axios.get(url);
    setTherapists(response.data);
  };
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
      <main className="pt-24">
        <header className="container p-4 md:p-8">
          <div className="lg:space-y-8">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
              Spa Therapists
            </h1>
            <p className="md:text-lg md:w-1/2">
              Thank you for embarking on this path to wellness with us. At SPAS,
              we're committed to more than just your relaxation. We're fostering
              a community dedicated to sustainable practices to ensure a healthy
              future for all.
            </p>
          </div>
        </header>

        {/* Mett Spa Operators */}
        <section className="mb-10">
          <div className="container p-4 md:p-8">
            <div className="grid md:grid-cols-3 gap-4 md:gap-10 mb-10">
              {therapists?.data?.map((therapist: Therapist, index: number) => (
                <div key={index} className="shadow-md border p-4 md:p-8">
                  <div className="flex flex-col items-center gap-4 md:gap-8">
                    {!therapist?.cover?.url.length ? (
                      <FaUser className="text-gray-400 w-20 h-20 md:w-40 md:h-40" />
                    ) : (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${therapist?.cover?.url}`}
                        radius="none"
                        alt="Spa Operators"
                        className="object-cover lg:w-40 lg:h-40 aspect-square rounded-md"
                      />
                    )}

                    <div className="flex flex-col items-center">
                      <h3 className="text-lg md:text-2xl text-black font-semibold">
                        {therapist.name}
                      </h3>
                      <Link
                        href={`/spa-therapists/${therapist.slug}`}
                        className="text-primary text-lg"
                      >
                        See Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>{" "}
            {/* <div className="w-max mx-auto">
              <Pagination showControls total={6} initialPage={1} />
            </div> */}
            {/* pagination */}
            <div className="md:flex justify-center gap-x-4 hidden">
              {therapists?.meta?.links?.map((page: any, index: number) => (
                <button
                  key={index}
                  aria-current="page"
                  onClick={() => handlePage(page.url)}
                  disabled={!page.url}
                  className={`relative z-10 inline-flex items-center px-4 py-2.5 text-sm font-semibold rounded-lg focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                    page.active
                      ? "bg-primary text-white"
                      : "bg-tertiary text-white"
                  } ${
                    page.url == null && page.label != "..."
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : ""
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: page.label,
                  }}
                ></button>
              ))}
            </div>
            <div className="flex flex-1 justify-between sm:hidden pt-12">
              <button
                onClick={() => handlePage(therapists?.links?.prev)}
                disabled={!therapists?.links?.prev}
                className={`relative inline-flex items-center rounded-md bg-white x-4 py-2 text-sm font-medium text-primary hover:bg-gray-50 ${
                  therapists?.links?.prev == null
                    ? "bg-gray-300 text-white"
                    : ""
                }`}
              >
                Previous
              </button>
              <button
                onClick={() => handlePage(therapists?.links?.next)}
                disabled={!therapists?.links?.next}
                className={`relative inline-flex items-center rounded-md bg-tertiary px-4 py-2 text-sm font-medium text-primary hover:bg-gray-50 ${
                  therapists?.links?.next == null
                    ? "bg-gray-300 text-white"
                    : ""
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
