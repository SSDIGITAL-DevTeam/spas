import Head from "next/head";
import React, { JSX } from "react";
import AssetBlank from "@/assets/images/blank.png";
import Link from "next/link";
import { Image, Pagination } from "@nextui-org/react";
import { GetServerSideProps } from "next";
import { DataWithPagination, Operator } from "@/@types";
import axios from "axios";
import AssetProfile from "@/assets/dev/profile.png";
import { FaUser } from "react-icons/fa6";

export const getServerSideProps: GetServerSideProps<{
  operators: DataWithPagination<Operator>;
}> = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/end-user/operators`
    );
    const operators = await res.data.data;

    return { props: { operators } };
  } catch (error) {
    console.log(error);
    return {
      props: {
        operators: [],
      },
    };
  }
};
export default function SpaOperators({
  operators,
}: {
  operators: Operator[];
}): JSX.Element {
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
          <div className="space-y-8">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center lg:text-start">
              Spa Operators
            </h1>
            <p className="md:text-lg md:w-1/2 text-justify">
              Thank you for embarking on this path to wellness with us. At SPAS,
              we're committed to more than just your relaxation. We're fostering
              a community dedicated to sustainable practices to ensure a healthy
              future for all.
            </p>
          </div>
          <div className="w-max mx-auto lg:mx-0">
            <Link href={"/join-us/spa-operator"}>
              <span className="btn-1 block my-4  text-center  hover:bg-primary transition-colors ease-out">
                JOIN SPAS
              </span>
            </Link>
          </div>
        </header>

        {/* Meet Spa Operators */}
        <section className="mb-10">
          <div className="container p-4 md:p-8">
            <div className="grid md:grid-cols-2 gap-4 md:gap-10 mb-10 ">
              {operators.map((operator: Operator) => (
                <div key={operator.id} className="shadow-md border p-4 md:p-8">
                  <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                    {!operator.cover.url ? (
                      <FaUser className="text-gray-400 w-40 h-40" />
                    ) : (
                      <Image
                        // src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${operator.cover.url}`}
                        src={operator?.cover?.url}
                        radius="none"
                        alt="Spa Operators"
                        className="object-cover lg:w-40 lg:h-40 aspect-square"
                      />
                    )}

                    <div className="flex flex-col items-center md:items-start">
                      <h3 className="text-lg md:text-2xl text-black font-semibold">
                        {operator.company_name}
                      </h3>
                      <Link
                        href={`/spa-operators/${operator.slug}`}
                        className="text-primary"
                      >
                        See Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="w-max mx-auto">
              <Pagination showControls total={6} initialPage={1} />
            </div> */}
          </div>
        </section>
      </main>
    </>
  );
}
