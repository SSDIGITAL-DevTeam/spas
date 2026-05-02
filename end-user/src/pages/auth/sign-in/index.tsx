import Head from "next/head";
import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { LuUser2 } from "react-icons/lu";
import AssetLogo from "@/assets/logo/spas-logo.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useRouter } from "next/router";
import { apiModule, ApiRequestError } from "@/modules/apiModule";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

export default function SignIn() {
  const [isVisible, setIsVisible] = React.useState(false);
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
      localStorage.setItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || "", token);
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
        <title>SPAS | Sign In</title>
        <link rel="icon" href="/asset-logo.png" />
        <meta name="author" content="SPAS" />
        <meta name="title" content="SPAS | Elevate your Spa & Wellness Business with Us!" />
        <meta name="description" content="Promote and protect business entities, practitioners, stakeholders, and consumers of the Beauty, Spa, and Wellness industry in Singapore." />
        <meta name="keywords" content="spa, services" />
        <meta name="robots" content="index, follow" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />
        <meta property="og:title" content="SPAS | Elevate your Spa & Wellness Business with Us!" />
        <meta property="og:description" content="Promote and protect business entities, practitioners, stakeholders, and consumers of the Beauty, Spa, and Wellness industry in Singapore." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_BASE_URL}/asset-logo.png`} />
      </Head>

      <Toaster position="top-right" />

      <main className="min-h-screen relative flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-[url('/hero-sign-in.webp')] bg-center bg-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-secondary/60" aria-hidden />

        {/* Decorative blobs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl" aria-hidden />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-quaternary/20 rounded-full blur-3xl" aria-hidden />

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 w-full max-w-md mx-4"
        >
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-8 md:p-10 space-y-8">
            {/* Logo */}
            <div className="flex justify-center">
              <Link href="/">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={AssetLogo.src} alt="SPAS" className="h-14 object-contain" />
              </Link>
            </div>

            {/* Heading */}
            <div className="text-center space-y-1.5">
              <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
              <p className="text-slate-500 text-sm">Sign in to your SPAS account</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    className="w-full pl-4 pr-11 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white"
                  />
                  <LuUser2 className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 w-4 h-4" />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Password</label>
                <div className="relative">
                  <input
                    name="password"
                    type={isVisible ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    className="w-full pl-4 pr-11 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setIsVisible(!isVisible)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {isVisible ? (
                      <FaRegEyeSlash className="w-4 h-4" />
                    ) : (
                      <FaRegEye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {errMessage && (
                <p className="text-red-500 text-sm text-center bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
                  {errMessage}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-secondary text-white font-semibold rounded-xl hover:bg-primary transition-colors disabled:opacity-60 text-sm"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* Register link */}
            <div className="text-center space-y-1">
              <p className="text-slate-500 text-sm">Don&apos;t have an account?</p>
              <Link href="/join-us" className="text-primary font-semibold text-sm hover:underline">
                Register here
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
}
