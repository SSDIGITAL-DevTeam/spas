import Head from "next/head";
import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { Button, Image, Input } from "@nextui-org/react";
import { LuUser2 } from "react-icons/lu";
import AssetLogo from "@/assets/logo/spas-logo.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useRouter } from "next/router";
import { apiModule, ApiRequestError } from "@/modules/apiModule";
import toast, { Toaster } from "react-hot-toast";

export default function SpaOperators() {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [errMessage, setErrMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrMessage("");
    setIsLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await apiModule("/auth/sign-in", "POST", {}, formData);
      const token = response?.data?.token;

      localStorage.setItem(
        process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || "",
        token
      );

      toast.success("Login successful!");
      router.push("/");
    } catch (error) {
      const message =
        error instanceof ApiRequestError
          ? error.getFirstError()
          : "An error occurred. Please try again.";
      setErrMessage(message);
    } finally {
      setIsLoading(false);
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

      <Toaster position="top-right" />
      <main>
        <div className="bg-[url('/hero-sign-in.webp')] bg-center lg:bg-cover bg-no-repeat h-screen">
          <div className="md:w-1/3 mx-auto">
            <div className="bg-white/90 backdrop-blur-sm h-screen md:py-10 space-y-4 md:space-y-10">
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
                    <div>
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

                    <div>
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
                  </div>

                  <div className="w-full  md:w-3/4 mx-auto">
                    {errMessage && (
                      <p className="text-center text-red-500 text-sm mb-2">
                        {errMessage}
                      </p>
                    )}
                    <Button
                      type="submit"
                      isLoading={isLoading}
                      isDisabled={isLoading}
                      className="w-full bg-secondary text-white"
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </div>

                  <div className="flex flex-col items-center gap-y-3">
                    <p className="text-slate-600 text-sm">Don&apos;t have an account?</p>
                    <Link
                      href="/join-us"
                      className="text-secondary font-semibold text-sm hover:underline"
                    >
                      Register here
                    </Link>
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
