/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { LuMapPin, LuPhone, LuUser2 } from "react-icons/lu";
import axios from "axios";
import { useRouter } from "next/router";
import { Operator } from "@/@types";
import { FaUser, FaArrowLeft } from "react-icons/fa6";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

export default function DetailOperator(): JSX.Element {
  const [profile, setProfile] = useState<Operator>();
  const router = useRouter();
  const slug = router.query.slug;

  useEffect(() => {
    const getProfile = async () => {
      if (!slug) return;
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/end-user/operators/${slug}`);
        setProfile(res.data.data);
      } catch { /* not found */ }
    };
    getProfile();
  }, [slug]);

  return (
    <>
      <Head>
        <title>SPAS | {profile?.company_name ?? "Spa Operator"}</title>
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

      <main className="pt-32">
        {/* ── HERO BAND ── */}
        <div className="bg-secondary/5 border-b border-slate-100 py-8">
          <div className="container mx-auto px-4 lg:px-8">
            <Link href="/spa-operators" className="inline-flex items-center gap-x-2 text-primary text-sm font-medium hover:gap-x-3 transition-all">
              <FaArrowLeft className="w-3.5 h-3.5" />
              Back to Spa Operators
            </Link>
          </div>
        </div>

        {/* ── PROFILE ── */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger}
              className="max-w-4xl mx-auto"
            >
              <motion.div variants={fadeUp} className="flex flex-col md:flex-row gap-10 items-start">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 md:w-44 md:h-44 rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 flex items-center justify-center">
                    {!profile?.cover?.url?.length ? (
                      <FaUser className="text-slate-300 w-14 h-14" />
                    ) : (
                      <img
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${profile?.cover?.url}`}
                        alt={profile?.brand_name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 space-y-6">
                  <div>
                    <p className="text-primary font-semibold text-sm mb-1">SPAS Community Member</p>
                    <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">{profile?.company_name}</h1>
                    {profile?.brand_name && (
                      <p className="text-slate-500 text-lg mt-1">{profile?.brand_name}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <LuMapPin className="text-primary w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Location</p>
                        <p className="text-slate-700 text-sm font-semibold">Singapore</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <LuPhone className="text-primary w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Phone</p>
                        <p className="text-slate-700 text-sm font-semibold">{profile?.contact_no || "—"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Person In Charge */}
              {(profile?.contact_person || profile?.contact_person_no) && (
                <motion.div
                  variants={fadeUp}
                  className="mt-10 p-6 rounded-2xl border border-slate-100 bg-slate-50 space-y-4"
                >
                  <h2 className="font-bold text-slate-900 text-lg">Person In Charge</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {profile?.contact_person && (
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <LuUser2 className="text-primary w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Name</p>
                          <p className="text-slate-700 text-sm font-semibold">{profile.contact_person}</p>
                        </div>
                      </div>
                    )}
                    {profile?.contact_person_no && (
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <LuPhone className="text-primary w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Phone</p>
                          <p className="text-slate-700 text-sm font-semibold">{profile.contact_person_no}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
