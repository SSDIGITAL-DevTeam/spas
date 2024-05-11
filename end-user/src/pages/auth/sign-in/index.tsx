import Head from "next/head";
import React, { FormEvent, useState } from "react";
import AssetBlank from "@/assets/images/blank.png";
import Link from "next/link";
import { Button, Image, Input, Pagination } from "@nextui-org/react";
import Logo from "@/components/utils/Logo";
import { LuUser2 } from "react-icons/lu";
import AssetLogo from "@/assets/logo/spas-logo.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";

type ErrorResponse = {
  errors: {
    message: string;
  };
};

export default function SpaOperators() {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [errMessage, setErrMessage] = useState<ErrorResponse>(
    {} as ErrorResponse
  );
  const [token, setToken] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: HTMLFormElement = e.currentTarget;
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`,
        form
      );
      setToken(response.data.data.token);

      localStorage.setItem(
        process.env.NEXT_PUBLIC_ACCESS_TOKEN || "",
        response.data.data.token
      );
      router.push("/");
    } catch (error) {
      console.log(error);
      const errorMessage = error as AxiosError;
      setErrMessage(errorMessage.response?.data as ErrorResponse);
      setIsError(true);
    }
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

      <main>
        <div className="bg-[url('/hero-sign-in.webp')] bg-center lg:bg-cover bg-no-repeat h-screen">
          <div className="md:w-1/3 mx-auto">
            <div className="bg-white/70 h-screen md:py-10 space-y-4 md:space-y-10">
              <form onSubmit={handleSubmit} className="container p-4 md:p-8">
                <div className="flex flex-col items-center gap-y-10">
                  <Link href={"/"} className="">
                    <Image
                      src={AssetLogo.src}
                      alt="SPAS"
                      className="object-cover md:w-3/4 mx-auto"
                      removeWrapper
                    />
                  </Link>

                  <div className="md:w-3/4">
                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      variant="underlined"
                      label="Email"
                      color="secondary"
                      size="lg"
                      endContent={<LuUser2 className="w-6 h-6" />}
                    />
                  </div>

                  <div className="md:w-3/4">
                    <Input
                      name="password"
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
                            <FaRegEyeSlash className="text-2xl  pointer-events-none w-6 h-6" />
                          ) : (
                            <FaRegEye className="text-2xl  pointer-events-none w-6 h-6" />
                          )}
                        </button>
                      }
                      type={isVisible ? "text" : "password"}
                    />
                  </div>

                  <div className="w-full  md:w-3/4 mx-auto">
                    {isError && (
                      <p className="text-center text-red-500">
                        Wrong email or password
                      </p>
                    )}
                    <Button
                      type="submit"
                      className="w-full bg-secondary text-white"
                    >
                      Submit
                    </Button>
                  </div>

                  <div className="flex flex-col items-center gap-y-2">
                    <h3> Don&apos;t have an account?</h3>
                    <h3>Register as: </h3>
                    <div className="flex flex-col items-center">
                      <div>
                        <Link
                          href={"/join-us/spa-operator"}
                          className="text-secondary font-bold "
                        >
                          Spa Operator{" "}
                        </Link>
                        <span>or </span>
                        <Link
                          href={"/join-us/spa-therapist"}
                          className="text-secondary font-bold "
                        >
                          Spa Therapist
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* <Link
                    href="/join-us"
                    className="font-semibold text-secondary"
                  >
                    Don&apos;t have an account?
                  </Link> */}
                </div>
              </form>

              <div className="">
                {/* <Link href="/join-us">Forgot PAssword?</Link> */}
                {/* <Link href="/join-us" className="font-semibold text-secondary">
                  Already have an account?
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
