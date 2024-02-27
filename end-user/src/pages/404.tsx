import { JSX } from "react";
import Head from "next/head";
import Link from "next/link";

export default function NotFound(): JSX.Element {
  return (
    <>
      {/* meta section */}
      <Head>
        <title>Page Not Found</title>
        <link rel="icon" href="/spas-logo.png" />
        <meta name="title" content="SPAS" />

        <meta name="description" content="spas" />
        <meta name="keyword" content="psasp, services" />

        <meta property="og:title" content="SPAS" />

        <meta property="og:type" content="website" />

        <meta property="og:image" content="" />
      </Head>
      {/* end of meta section */}

      <div className="flex h-screen flex-col items-center justify-center gap-8 p-4 text-center lg:mt-8 ">
        <div className="space-y-4 text-neutral-500">
          <p className="font-semibold lg:text-2xl">Coming soon...</p>

          <p className="text-2xl font-semibold md:text-4xl">
            Page under construction
          </p>

          <div>
            <Link href={"/"}>
              <span className="text-blue-500 hover:underline">
                Back to homepage
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
