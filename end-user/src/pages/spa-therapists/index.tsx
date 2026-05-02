/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { DataWithPagination, Therapist } from "@/@types";
import { FaUser, FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

export default function SpaTherapists() {
  const [therapists, setTherapists] = useState<DataWithPagination<Therapist>>();

  useEffect(() => {
    const token = localStorage.getItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!);
    if (!token) return;
    const getTherapists = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/end-user/operator/therapists`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTherapists(response.data);
      } catch { /* unauthorized */ }
    };
    getTherapists();
  }, []);

  const handlePage = async (url: any) => {
    if (!url) return;
    const response = await axios.get(url);
    setTherapists(response.data);
  };

  return (
    <>
      <Head>
        <title>SPAS | Spa Therapists</title>
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

      {/* ── HERO ── */}
      <header className="pt-32 lg:pt-40 pb-16 lg:pb-24 hero-gradient">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="max-w-2xl space-y-5"
          >
            <motion.span variants={fadeUp} className="inline-block bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">
              Our Members
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-4xl font-bold leading-tight text-slate-900 xl:text-5xl">
              Spa Therapists
            </motion.h1>
            <motion.p variants={fadeUp} className="section-subheading text-lg">
              Thank you for embarking on this path to wellness with us. At SPAS, we&rsquo;re committed to more than just your relaxation. We&rsquo;re fostering a community dedicated to sustainable practices to ensure a healthy future for all.
            </motion.p>
          </motion.div>
        </div>
      </header>

      <main>
        <section className="py-20 lg:py-28 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              variants={stagger}
            >
              <motion.h2 variants={fadeUp} className="section-heading text-center mb-14">
                Meet Our Spa Therapists
              </motion.h2>

              {!therapists?.data?.length ? (
                <div className="text-center py-16 text-slate-400">
                  <p className="text-2xl font-semibold mb-2">No therapists found</p>
                  <p className="text-sm">Listings will appear here once available.</p>
                </div>
              ) : (
                <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {therapists.data.map((therapist: Therapist, index: number) => (
                    <motion.div
                      key={index}
                      variants={fadeUp}
                      className="group bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="flex flex-col items-center gap-4 text-center">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 flex items-center justify-center">
                          {!therapist?.cover?.url?.length ? (
                            <FaUser className="text-slate-300 w-10 h-10" />
                          ) : (
                            <img
                              src={therapist.cover.url.startsWith("http") ? therapist.cover.url : `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${therapist.cover.url}`}
                              alt={therapist.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-primary transition-colors">
                            {therapist.name}
                          </h3>
                          <Link
                            href={`/spa-therapists/${therapist.slug}`}
                            className="inline-flex items-center gap-x-1.5 text-primary text-sm font-medium mt-1 hover:gap-x-2.5 transition-all"
                          >
                            See Details <FaArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Pagination */}
              {therapists?.meta?.links && (
                <motion.div variants={fadeUp} className="flex justify-center gap-2 flex-wrap">
                  {therapists.meta.links.map((page: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => handlePage(page.url)}
                      disabled={!page.url}
                      className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
                        page.active
                          ? "bg-primary text-white shadow-sm"
                          : page.url
                          ? "bg-white border border-slate-200 text-slate-600 hover:border-primary hover:text-primary"
                          : "bg-slate-100 text-slate-400 cursor-not-allowed"
                      }`}
                      dangerouslySetInnerHTML={{ __html: page.label }}
                    />
                  ))}
                </motion.div>
              )}

              {/* Mobile prev/next */}
              <div className="flex justify-between md:hidden mt-8">
                <button
                  onClick={() => handlePage(therapists?.links?.prev)}
                  disabled={!therapists?.links?.prev}
                  className="px-5 py-2.5 text-sm font-semibold rounded-xl border border-slate-200 text-slate-600 disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePage(therapists?.links?.next)}
                  disabled={!therapists?.links?.next}
                  className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-primary text-white disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
