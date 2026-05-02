import { JSX } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa6";

export default function NotFound(): JSX.Element {
  return (
    <>
      <Head>
        <title>SPAS | Page Not Found</title>
        <link rel="icon" href="/asset-logo.png" />
        <meta name="title" content="SPAS" />
        <meta name="description" content="spas" />
        <meta name="keyword" content="spas, services" />
        <meta property="og:title" content="SPAS" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="" />
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-white px-4">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" aria-hidden />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-quaternary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" aria-hidden />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 text-center space-y-6 max-w-lg"
        >
          {/* 404 large number */}
          <div className="relative">
            <span className="text-[9rem] md:text-[12rem] font-black leading-none select-none gradient-text opacity-20">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-7xl md:text-9xl font-black leading-none gradient-text">
                404
              </span>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <p className="text-2xl font-semibold text-slate-700">
              Page under construction
            </p>
            <p className="text-slate-500 text-sm leading-relaxed">
              Coming soon...
            </p>
          </div>

          <Link href="/">
            <span className="inline-flex items-center gap-x-2 btn-1 mx-auto">
              <FaArrowLeft className="w-3.5 h-3.5" />
              Back to homepage
            </span>
          </Link>
        </motion.div>
      </main>
    </>
  );
}
