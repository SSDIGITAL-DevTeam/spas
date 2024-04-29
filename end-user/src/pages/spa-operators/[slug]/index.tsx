import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import AssetBlank from "@/assets/images/blank-therapist.png";
import { Image } from "@nextui-org/react";
import { LuMapPin, LuPhone, LuUser2 } from "react-icons/lu";
import axios from "axios";
import { useRouter } from "next/router";
import { Operator } from "@/@types";
import AssetProfile from "@/assets/dev/profile.png";

export default function DetailOperator(): JSX.Element {
  const [profile, setProfile] = useState<Operator>();

  const router = useRouter();
  const slug = router.query.slug;

  const getProfile = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/end-user/operators/${slug}`
      );
      setProfile(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, [slug]);

  return (
    <>
      {" "}
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
            href="/membership"
            className="text-secondary flex items-center gap-x-4"
          >
            <div>
              <BsArrowLeftSquareFill className="w-8 h-8 md:w-10 md:h-10 " />
            </div>
            <span className="font-semibold text-lg md:text-2xl">
              Back to Spa Operators List
            </span>
          </Link>
        </header>

        <section className="pb-10 md:pb-20">
          <div className="container p-4 md:p-8">
            <div className="flex flex-col  gap-y-8 md:flex-row gap-x-20">
              <div className="space-y-4 flex flex-col items-center md:items-start">
                <Image
                  src={AssetProfile.src}
                  // src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${profile?.cover.url}`}
                  alt="Operators"
                  className="object-cover lg:w-40 lg:h-40 aspect-square"
                  radius="none"
                />
                <div className="">
                  <span className="font-bold text-lg md:text-2xl">
                    {profile?.brand_name}
                  </span>
                </div>
                <div className="flex flex-col text-center md:text-start md:text-lg">
                  <span>SINGAPORE</span>
                  <span>SPAS Community</span>
                </div>
              </div>

              <div className="">
                <h2 className="font-bold md:text-2xl mb-8 text-center md:text-start">
                  {profile?.company_name}
                </h2>

                <div className="space-y-14">
                  <div className="w-max md:w-full mx-auto flex flex-col gap-y-4 md:items-start">
                    <div className="flex items-center gap-x-4">
                      <div>
                        <LuMapPin className="text-secondary w-6 h-6 md:w-8 md:h-8" />
                      </div>
                      <span className="text-lg">Singapore</span>
                    </div>

                    <div className="flex items-center gap-x-4">
                      <div>
                        <LuPhone className="text-secondary w-6 h-6 md:w-8 md:h-8" />
                      </div>
                      <span className="text-lg">{profile?.contact_no}</span>
                    </div>
                  </div>

                  <div className="w-max md:w-full mx-auto flex flex-col gap-y-4 md:items-start">
                    <h3 className="font-bold md:text-xl">Person In Charge</h3>
                    <div className="flex items-center gap-x-4">
                      <div>
                        <LuUser2 className="text-secondary w-6 h-6 md:w-8 md:h-8" />
                      </div>
                      <span className="text-lg">{profile?.contact_person}</span>
                    </div>

                    <div className="flex items-center gap-x-4">
                      <div>
                        <LuPhone className="text-secondary w-6 h-6 md:w-8 md:h-8" />
                      </div>
                      <span className="text-lg">
                        {profile?.contact_person_no}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
// export const getServerSideProps: GetServerSideProps = async (
//   context
// ): Promise<{ props: { operator: Operator } }> => {
//   const slug = context.params!.slug;

//   const response = await axios.get(
//     `${process.env.NEXT_PUBLIC_API_URL}end-user/operators/${slug}`
//   );

//   return {
//     props: {
//       operator: response.data.data,
//     },
//   };
// };
