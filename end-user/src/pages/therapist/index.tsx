/* eslint-disable @next/next/no-img-element */
import { JSX, useEffect, useState } from "react";
import Head from "next/head";
import HeroTherapist from "@/assets/therapist-assets/therapist-hero.webp";
import GroupImg1 from "@/assets/therapist-assets/group-1.svg";
import GroupImg2 from "@/assets/therapist-assets/group-2.svg";
import GroupImg3 from "@/assets/therapist-assets/group-3.svg";
import GroupImg4 from "@/assets/therapist-assets/group-4.svg";
import GroupImg5 from "@/assets/therapist-assets/group-5.svg";
import GroupImg6 from "@/assets/therapist-assets/group-6.svg";
import Img1 from "@/assets/therapist-assets/img1.webp";
import Img2 from "@/assets/therapist-assets/img2.webp";
import Img3 from "@/assets/therapist-assets/img3.webp";
import Img4 from "@/assets/therapist-assets/img4.webp";
import Img5 from "@/assets/therapist-assets/img5.webp";
import Img6 from "@/assets/therapist-assets/img6.webp";
import Link from "next/link";
import axios from "axios";
import { Therapist } from "@/@types";
import { FaUser, FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const benefits = [
  { img: Img1, title: "Gain Professional Image", body: "By becoming SPAS member, you can elevate your personal image and value." },
  { img: Img2, title: "Accredited Recognition", body: "Gain acknowledgment as a Certified Therapist with accreditation." },
  { img: Img3, title: "Career Development Opportunities", body: "Access exclusive opportunities to further enhance your skills and expertise." },
  { img: Img4, title: "Endorsed by Expertise", body: "Receive endorsement of qualifications and competencies as a professional specializing in specific treatment(s)." },
  { img: Img5, title: "Strategic Marketing Support", body: "Take advantage of SPAS' marketing and promotional initiatives for increased visibility." },
  { img: Img6, title: "Enhance Visibility", body: "Enable potential customers to locate and authenticate your professional profile." },
];

const industries = [
  { img: GroupImg6, title: "Yoga & Physical Training Center" },
  { img: GroupImg3, title: "Hair Treatment & Beauty Salon" },
  { img: GroupImg1, title: "Hydrotherapy & Body Treatment Spa" },
  { img: GroupImg2, title: "Traditional Health Treatment" },
  { img: GroupImg4, title: "Manicure & Pedicure Salon" },
  { img: GroupImg5, title: "Massage Center & Reflexology" },
];

export default function Therapists(): JSX.Element {
  const [role, setRole] = useState<string>("");
  const [therapists, setTherapists] = useState<Therapist[]>([]);

  useEffect(() => {
    const token = localStorage.getItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!);
    if (!token) return;
    const me = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/end-user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRole(response.data.data.role ?? "");
      } catch { /* invalid token */ }
    };
    me();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!);
    if (!token) return;
    const getTherapists = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/end-user/operator/therapists`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTherapists(response.data.data);
      } catch { /* unauthorized */ }
    };
    getTherapists();
  }, []);

  return (
    <>
      <Head>
        <title>SPAS | Therapist</title>
        <meta name="author" content="SPAS" />
        <link rel="icon" href="/asset-logo.png" />
        <meta name="title" content="Therapist | Gain Recognition for Professional Status" />
        <meta name="description" content="Get accredited recognition and other benefits by registering your professional status with us." />
        <meta name="keywords" content="spa, services, therapist" />
        <meta name="robots" content="index, follow" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />
        <meta property="og:title" content="Therapist | Gain Recognition for Professional Status" />
        <meta property="og:description" content="Get accredited recognition and other benefits by registering your professional status with us." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_BASE_URL}/asset-logo.png`} />
      </Head>

      {/* ── HERO ── */}
      <header className="pt-32 lg:pt-40 pb-16 lg:pb-24 hero-gradient">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row gap-10 md:items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2 order-2 md:order-1"
            >
              <img src={HeroTherapist.src} alt="Therapist" className="w-full rounded-2xl shadow-xl object-cover" />
            </motion.div>
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger}
              className="md:w-1/2 space-y-5 order-1 md:order-2"
            >
              <motion.span variants={fadeUp} className="inline-block bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">
                Join As Therapist
              </motion.span>
              <motion.h1 variants={fadeUp} className="text-4xl font-bold leading-tight text-slate-900 xl:text-5xl">
                Gain Recognition{" "}
                <span className="gradient-text">By getting a Professional status!</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="section-subheading">
                <strong>SPAS</strong> offers a platform for{" "}
                <strong>Complementary Therapists</strong> to enroll their competencies, demonstrating their expertise and skills in specific treatments and sectors of the Wellness Industry.
              </motion.p>
              {!role && (
                <motion.div variants={fadeUp}>
                  <Link href="/join-us/spa-therapist">
                    <span className="inline-flex items-center gap-x-2 btn-1">
                      JOIN SPAS <FaArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </header>

      <main>
        {/* ── BENEFITS ── */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={stagger}
            >
              <div className="text-center mb-14 space-y-3">
                <motion.h2 variants={fadeUp} className="section-heading">
                  Benefits for Registered Therapist
                </motion.h2>
                <motion.p variants={fadeUp} className="section-subheading max-w-xl mx-auto">
                  Enjoy these SPAS&prime; benefits if you decide to register your professional status.
                </motion.p>
              </div>

              <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {benefits.map((b) => (
                  <motion.div
                    key={b.title}
                    variants={fadeUp}
                    className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="overflow-hidden h-52">
                      <img
                        src={b.img.src}
                        alt={b.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 space-y-2">
                      <h3 className="font-semibold text-slate-900">{b.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{b.body}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── YOU ARE WELCOME ── */}
        <section className="py-20 lg:py-28 bg-slate-50">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={stagger}
            >
              <div className="text-center mb-14 space-y-3">
                <motion.h2 variants={fadeUp} className="section-heading">
                  You Are Welcome
                </motion.h2>
                <motion.p variants={fadeUp} className="section-subheading">
                  If you work in one of the following businesses.
                </motion.p>
              </div>

              <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                {industries.map((ind) => (
                  <motion.div
                    key={ind.title}
                    variants={fadeUp}
                    className="group flex flex-col items-center gap-4 p-6 bg-white rounded-2xl border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center"
                  >
                    <div className="w-16 h-16 flex items-center justify-center">
                      <img src={ind.img.src} alt={ind.title} className="w-full h-full object-contain" />
                    </div>
                    <p className="font-semibold text-slate-700 text-sm">{ind.title}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── CTA (non-operator) ── */}
        {role !== "operator" && (
          <section className="py-16 bg-white border-t border-slate-100">
            <div className="container mx-auto px-4 lg:px-8 text-center space-y-4">
              <h3 className="text-xl font-semibold text-slate-700">
                Join as member to see all spa therapists
              </h3>
              <Link href="/join-us">
                <span className="inline-flex items-center gap-x-2 btn-1">
                  JOIN SPAS <FaArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>
          </section>
        )}

        {/* ── THERAPIST GRID (operator-only) ── */}
        {role === "operator" && (
          <section className="py-20 lg:py-28 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                variants={stagger}
              >
                <motion.h2 variants={fadeUp} className="section-heading text-center mb-14">
                  Meet All Our Spa Therapists
                </motion.h2>

                {therapists.length === 0 ? (
                  <div className="text-center py-12 text-slate-400">
                    <p className="text-lg font-semibold">No therapists found</p>
                  </div>
                ) : (
                  <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {therapists.map((therapist: Therapist, index: number) => (
                      <motion.div
                        key={index}
                        variants={fadeUp}
                        className="group bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                      >
                        <div className="flex flex-col items-center gap-4 text-center">
                          <div className="w-24 h-24 rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 flex items-center justify-center">
                            {!therapist?.cover?.url ? (
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

                <motion.div variants={fadeUp} className="flex justify-center">
                  <Link href="/spa-therapists">
                    <span className="inline-flex items-center gap-x-2 btn-1">
                      View More <FaArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
