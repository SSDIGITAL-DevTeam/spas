import Head from "next/head";
import React from "react";
import AssetBlank from "@/assets/images/blank.png";
import Link from "next/link";
import { Image, Input, Pagination } from "@nextui-org/react";
import Logo from "@/components/utils/Logo";
import { LuUser2 } from "react-icons/lu";
import AssetLogo from "@/assets/logo/spas-logo.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function SpaOperators() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
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

      <main>
        <div className="bg-[url('/hero-sign-in.webp')] bg-cover bg-no-repeat h-screen">
          <div className="w-1/2 mx-auto">
            <div className="bg-white/80 lg:py-40 h-screen">
              <div className="flex flex-col items-center gap-y-10">
                <Image
                  src={AssetLogo.src}
                  alt="SPAS"
                  className="object-cover md:w-1/2"
                  removeWrapper
                />

                <div className="w-1/2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    variant="underlined"
                    label="Email"
                    color="secondary"
                    size="lg"
                    endContent={<LuUser2 className="w-8 h-8" />}
                  />
                </div>

                <div className="w-1/2">
                  <Input
                    label="Password"
                    variant="underlined"
                    color="secondary"
                    placeholder="Enter your password"
                    size="lg"
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <FaRegEyeSlash className="text-2xl  pointer-events-none w-8 h-8" />
                        ) : (
                          <FaRegEye className="text-2xl  pointer-events-none w-8 h-8" />
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
