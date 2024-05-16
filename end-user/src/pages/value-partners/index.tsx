import { JSX, useEffect, useState } from "react";
import { Card, CardBody, Image, CardFooter } from "@nextui-org/react";
import axios from "axios";
import Head from "next/head";
import AssetDaikin from "@/assets/dev/daikin.png";

import Link from "next/link";

type Partner = {
  id: number;
  name: string;
  slug: string;
  value_partner: ValuePartner[];
};
type ValuePartner = {
  id: number;
  brand_name: string;
  email: string;
  logo: string;
  phone_number: string;
};

export default function EventMedia(): JSX.Element {
  const [role, setRole] = useState<string>("");
  const [partners, setPartners] = useState<[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(4);

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

  const getValuePartners = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/end-user/operator/partners`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              `${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
            )}`,
          },
        }
      );
      setPartners(response.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getValuePartners();
  }, []);

  return (
    <>
      <Head>
        <title>SPAS | Event & Media</title>
        <link rel="icon" href="/asset-logo.png" />
        <meta name="author" content="SPAS" />

        <meta name="title" content="SPAS | Value Partners" />

        <meta
          name="description"
          content="Expand your knowledge with our latest information and upcoming events about beauty, spas, and wellness."
        />

        <meta name="keywords" content="spa, services, event and media" />

        <meta name="robots" content="index, follow" />

        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />

        <meta property="og:title" content="SPAS | Event & Media" />

        <meta
          property="og:description"
          content="Expand your knowledge with our latest information and upcoming events about beauty, spas, and wellness."
        />

        <meta property="og:type" content="website" />

        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/asset-logo.png`}
        />
      </Head>
      {!role ? (
        <main>
          <section className="pb-18 lg:pb-0 ">
            <div className="container p-4 md:p-8">
              <div className="md:w-3/4 mx-auto min-h-screen flex flex-col items-center justify-center">
                <div className=" flex flex-col items-center">
                  <h2 className="md:text-lg text-center">
                    Are you ready to explore numerous opportunities with our
                    partners? You'll get the best quality at the best price for
                    your business. So, what are you waiting for? Register as a
                    member now!
                  </h2>
                  <Link
                    href={"/join-us/spa-operator"}
                    className="mx-auto md:mx-0 w-max"
                  >
                    <span className="btn-1 block my-4 w-full text-center lg:w-max hover:bg-primary transition-colors ease-out">
                      JOIN SPAS
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      ) : (
        <main>
          <section className="pb-18 lg:pb-0 pt-32 mb-16 md:mb-20">
            <div className="container p-4 md:p-8">
              <div className="mb-8 lg:mb-24">
                <div className="flex justify-between gap-x-8 whitespace-nowrap overflow-scroll md:overflow-auto mb-4 p-5 bg-[#F5F5F5] rounded-lg shadow-xl">
                  {partners.map((partner: Partner) => (
                    <button
                      key={partner.id}
                      className={`p-3  font-bold py-2 px-4 duration-100 rounded-lg text-black border-2 hover:bg-primary hover:text-white transition-all ease-out
                    ${
                      partner.id == selectedCategoryId
                        ? "bg-primary text-white"
                        : ""
                    }`}
                      onClick={() => setSelectedCategoryId(partner.id)}
                    >
                      {partner.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-x-10 gap-y-4 md:gap-y-10">
                {partners
                  .filter(
                    (partner: Partner) => partner.id == selectedCategoryId
                  )
                  .map((partner: Partner) =>
                    partner.value_partner.map((valuePartner: ValuePartner) => (
                      <Card key={valuePartner.id}>
                        <CardBody className=" aspect-square w-full ">
                          <Image
                            src={AssetDaikin.src}
                            isBlurred
                            removeWrapper
                            className="object-cover "
                          />
                        </CardBody>
                        <CardFooter className="text-lg md:text-xl flex items-center justify-center">
                          <h2 className="text-center">
                            {valuePartner.brand_name}
                          </h2>
                        </CardFooter>
                      </Card>
                    ))
                  )}
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
}
