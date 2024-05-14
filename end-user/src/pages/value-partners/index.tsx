import { JSX, useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Image,
  CardFooter,
} from "@nextui-org/react";
import axios from "axios";
import Head from "next/head";
import AssetSamsung from "@/assets/dev/samsung.png";
import AssetDaikin from "@/assets/dev/daikin.png";

import Link from "next/link";

export default function EventMedia(): JSX.Element {
  const [role, setRole] = useState<string>("");

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
          <section className="pb-18 lg:pb-0 pt-32">
            <div className="container p-4 md:p-8">
              <div className="md:w-3/4 mx-auto md:py-36 py-10 mb-8">
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
          <section className="pb-18 lg:pb-0 pt-32">
            <div className="container p-4 md:p-8">
              <div>
                <Tabs
                  aria-label="Options"
                  className="flex items-center justify-center mb-8 md:mb-14"
                >
                  <Tab key="contractors" title="Contractors">
                    <div className="grid md:grid-cols-4 gap-x-10 gap-y-4">
                      <Card>
                        <CardBody className=" aspect-square w-full ">
                          <Image
                            src={AssetDaikin.src}
                            isBlurred
                            removeWrapper
                            className="object-cover "
                          />
                        </CardBody>
                        <CardFooter className="text-lg md:text-xl flex items-center justify-center">
                          <h2 className="text-center">Daikin</h2>
                        </CardFooter>
                      </Card>

                      <Card>
                        <CardBody className="aspect-square w-full ">
                          <Image
                            src={AssetSamsung.src}
                            isBlurred
                            removeWrapper
                            className="object-cover "
                          />
                        </CardBody>
                        <CardFooter className="text-lg md:text-xl flex items-center justify-center">
                          <h2 className="text-center">Samsung</h2>
                        </CardFooter>
                      </Card>

                      <Card>
                        <CardBody className="aspect-square w-full">
                          <Image
                            src={AssetDaikin.src}
                            isBlurred
                            removeWrapper
                            className="object-cover "
                          />
                        </CardBody>
                        <CardFooter className="text-lg md:text-xl flex items-center justify-center">
                          <h2 className="text-center">Daikin</h2>
                        </CardFooter>
                      </Card>

                      <Card>
                        <CardBody className="w-full aspect-square">
                          <Image
                            src={AssetSamsung.src}
                            isBlurred
                            removeWrapper
                            className="object-cover "
                          />
                        </CardBody>
                        <CardFooter className="text-lg md:text-xl flex items-center justify-center">
                          <h2 className="text-center">Samsung</h2>
                        </CardFooter>
                      </Card>
                    </div>
                  </Tab>

                  <Tab key="aircon" title="Aircon">
                    <div className="grid md:grid-cols-4 gap-x-10 gap-y-4">
                      <Card>
                        <CardBody className="aspect-square w-full ">
                          <Image
                            src={AssetDaikin.src}
                            isBlurred
                            removeWrapper
                            className="object-cover"
                          />
                        </CardBody>
                        <CardFooter className="text-lg md:text-xl flex items-center justify-center">
                          <h2 className="text-center">Daikin</h2>
                        </CardFooter>
                      </Card>

                      <Card>
                        <CardBody className="aspect-square w-full ">
                          <Image
                            src={AssetSamsung.src}
                            isBlurred
                            removeWrapper
                            className="object-cover "
                          />
                        </CardBody>
                        <CardFooter className="text-lg md:text-xl flex items-center justify-center">
                          <h2 className="text-center">Samsung</h2>
                        </CardFooter>
                      </Card>

                      <Card>
                        <CardBody className="aspect-square w-full">
                          <Image
                            src={AssetDaikin.src}
                            isBlurred
                            removeWrapper
                            className="object-cover "
                          />
                        </CardBody>
                        <CardFooter className="text-lg md:text-xl flex items-center justify-center">
                          <h2 className="text-center">Daikin</h2>
                        </CardFooter>
                      </Card>

                      <Card>
                        <CardBody className="w-full aspect-square">
                          <Image
                            src={AssetSamsung.src}
                            isBlurred
                            removeWrapper
                            className="object-cover "
                          />
                        </CardBody>
                        <CardFooter className="text-lg md:text-xl flex items-center justify-center">
                          <h2 className="text-center">Samsung</h2>
                        </CardFooter>
                      </Card>
                    </div>
                  </Tab>

                  <Tab key="furniture" title="Furniture">
                    <div className="grid md:grid-cols-4 gap-x-10 gap-y-4">
                      <Card>
                        <CardBody className=" aspect-square w-full ">
                          <Image
                            src={AssetDaikin.src}
                            isBlurred
                            removeWrapper
                            className="object-cover "
                          />
                        </CardBody>
                        <CardFooter className="text-lg md:text-xl flex items-center justify-center">
                          <h2 className="text-center">Daikin</h2>
                        </CardFooter>
                      </Card>

                      <Card>
                        <CardBody className="aspect-square w-full ">
                          <Image
                            src={AssetSamsung.src}
                            isBlurred
                            removeWrapper
                            className="object-cover "
                          />
                        </CardBody>
                        <CardFooter className="text-lg md:text-xl flex items-center justify-center">
                          <h2 className="text-center">Samsung</h2>
                        </CardFooter>
                      </Card>

                      <Card>
                        <CardBody className="aspect-square w-full">
                          <Image
                            src={AssetDaikin.src}
                            isBlurred
                            removeWrapper
                            className="object-cover "
                          />
                        </CardBody>
                        <CardFooter className="text-lg md:text-xl flex items-center justify-center">
                          <h2 className="text-center">Daikin</h2>
                        </CardFooter>
                      </Card>

                      <Card>
                        <CardBody className="w-full aspect-square">
                          <Image
                            src={AssetSamsung.src}
                            isBlurred
                            removeWrapper
                            className="object-cover"
                          />
                        </CardBody>
                        <CardFooter className="text-lg md:text-xl flex items-center justify-center">
                          <h2 className="text-center">Samsung</h2>
                        </CardFooter>
                      </Card>
                    </div>
                  </Tab>

                  <Tab key="pos" title="Post System">
                    <div className="grid md:grid-cols-4 gap-x-10 gap-y-4">
                      <Card>
                        <CardBody className=" aspect-square w-full ">
                          <Image
                            src={AssetDaikin.src}
                            isBlurred
                            removeWrapper
                            className="object-cover "
                          />
                        </CardBody>
                        <CardFooter className="text-lg md:text-xl flex items-center justify-center">
                          <h2 className="text-center">Daikin</h2>
                        </CardFooter>
                      </Card>

                      <Card>
                        <CardBody className="aspect-square w-full ">
                          <Image
                            src={AssetSamsung.src}
                            isBlurred
                            removeWrapper
                            className="object-cover "
                          />
                        </CardBody>
                        <CardFooter className="text-lg md:text-xl flex items-center justify-center">
                          <h2 className="text-center">Samsung</h2>
                        </CardFooter>
                      </Card>

                      <Card>
                        <CardBody className="aspect-square w-full">
                          <Image
                            src={AssetDaikin.src}
                            isBlurred
                            removeWrapper
                            className="object-cover "
                          />
                        </CardBody>
                        <CardFooter className="text-lg md:text-xl flex items-center justify-center">
                          <h2 className="text-center">Daikin</h2>
                        </CardFooter>
                      </Card>

                      <Card>
                        <CardBody className="w-full aspect-square">
                          <Image
                            src={AssetSamsung.src}
                            isBlurred
                            removeWrapper
                            className="object-cover"
                          />
                        </CardBody>
                        <CardFooter className="text-lg md:text-xl flex items-center justify-center">
                          <h2 className="text-center">Samsung</h2>
                        </CardFooter>
                      </Card>
                    </div>
                  </Tab>

                  <Tab key="digital" title="Digital Partner">
                    <div className="grid md:grid-cols-4 gap-x-10 gap-y-4">
                      <Card>
                        <CardBody className=" aspect-square w-full ">
                          <Image
                            src={AssetDaikin.src}
                            isBlurred
                            removeWrapper
                            className="object-cover "
                          />
                        </CardBody>
                        <CardFooter className="text-lg md:text-xl flex items-center justify-center">
                          <h2 className="text-center">Daikin</h2>
                        </CardFooter>
                      </Card>

                      <Card>
                        <CardBody className="aspect-square w-full ">
                          <Image
                            src={AssetSamsung.src}
                            isBlurred
                            removeWrapper
                            className="object-cover "
                          />
                        </CardBody>
                        <CardFooter className="text-lg md:text-xl flex items-center justify-center">
                          <h2 className="text-center">Samsung</h2>
                        </CardFooter>
                      </Card>

                      <Card>
                        <CardBody className="aspect-square w-full">
                          <Image
                            src={AssetDaikin.src}
                            isBlurred
                            removeWrapper
                            className="object-cover "
                          />
                        </CardBody>
                        <CardFooter className="text-lg md:text-xl flex items-center justify-center">
                          <h2 className="text-center">Daikin</h2>
                        </CardFooter>
                      </Card>

                      <Card>
                        <CardBody className="w-full aspect-square">
                          <Image
                            src={AssetSamsung.src}
                            isBlurred
                            removeWrapper
                            className="object-cover"
                          />
                        </CardBody>
                        <CardFooter className="text-lg md:text-xl flex items-center justify-center">
                          <h2 className="text-center">Samsung</h2>
                        </CardFooter>
                      </Card>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
}
