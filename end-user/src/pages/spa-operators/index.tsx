import Head from "next/head";
import React from "react";
import AssetBlank from "@/assets/images/blank.png";
import Link from "next/link";
import { Image, Pagination } from "@nextui-org/react";
export default function SpaOperators() {
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
              Spa Operators
            </h1>
            <p className="md:text-lg md:w-1/2">
              Thank you for embarking on this path to wellness with us. At SPAS,
              we're committed to more than just your relaxation. We're fostering
              a community dedicated to sustainable practices to ensure a healthy
              future for all.
            </p>
          </div>
        </header>

        {/* Meet Spa Operators */}
        <section className="mb-10">
          <div className="container p-4 md:p-8">
            <div className="grid md:grid-cols-2 gap-4 md:gap-10 mb-10 ">
              {[1, 2, 3, 4].map((op, index: number) => (
                <div key={index} className="shadow-md border p-4 md:p-8">
                  <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                    <Image
                      src={AssetBlank.src}
                      radius="none"
                      alt="Spa Operators"
                      className="object-cover"
                    />
                    <div className="flex flex-col items-center md:items-start">
                      <h3 className="text-lg md:text-2xl text-black font-semibold">
                        Operators {op}
                      </h3>
                      <Link href={"#"} className="text-primary">
                        See Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-max mx-auto">
              <Pagination showControls total={6} initialPage={1} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
