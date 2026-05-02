/* eslint-disable @next/next/no-img-element */
import { JSX, useEffect, useState } from "react";
import Head from "next/head";
import HeroMember from "@/assets/membership-assets/member-hero.webp";
import Card1 from "@/assets/membership-assets/card1.webp";
import Card2 from "@/assets/membership-assets/card2.webp";
import Card3 from "@/assets/membership-assets/card3.webp";
import Card4 from "@/assets/membership-assets/card4.webp";
import Link from "next/link";
import axios from "axios";
import { motion } from "framer-motion";
import { FaArrowRight, FaCheck } from "react-icons/fa6";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const benefits = [
  { img: Card1, zh: "最新讯息 - 新闻、LicenseOne、警察执照部门、公积金部门、人力与劳工部门", en: "First-hand Information - News, LicenseOne, PLRD, CPF, MOM" },
  { img: Card2, zh: "同行合作，不带恶性竞争", en: "Collaboration, not Competition among SPAS" },
  { img: Card3, zh: "提高同行的专业形象", en: "Raise Professional Image" },
  { img: Card4, zh: "联谊友谊", en: "Build Bonding" },
];

const qualifications = [
  "Membership is open to all accredited and licensed massage establishments holding valid ME Cat 1 licenses and qualified masseur / masseuses and therapist working in member's massage establishment irrespective of race, language or religion.",
  "Only members who are above 21 years of age shall have the right to vote and to hold office in the association.",
  "A copy of the Constitution, SPAS member handbook, SPAS member decal, SPAS user ID & password to the SPAS website shall be furnished to every approved member upon payment of the entrance fee.",
];

export default function Membership(): JSX.Element {
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!);
    if (!token) return;
    const me = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/end-user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRole(res.data.data.role ?? "");
      } catch { /* invalid token */ }
    };
    me();
  }, []);

  return (
    <>
      <Head>
        <title>SPAS | Membership</title>
        <link rel="icon" href="/asset-logo.png" />
        <meta name="author" content="SPAS" />
        <meta name="title" content="Become a Member | Get Connected with SPAS Community" />
        <meta name="description" content="Our community membership gives you access to first-hand information and networking within the industry. Sign-up now!" />
        <meta name="keywords" content="spa, services, membership" />
        <meta name="robots" content="index, follow" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />
        <meta property="og:title" content="Become a Member | Get Connected with SPAS Community" />
        <meta property="og:description" content="Our community membership gives you access to first-hand information and networking within the industry. Sign-up now!" />
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
              className="md:w-1/2"
            >
              <img src={HeroMember.src} alt="Membership" className="w-full rounded-2xl shadow-xl object-cover" />
            </motion.div>
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger}
              className="md:w-1/2 space-y-5"
            >
              <motion.span variants={fadeUp} className="inline-block bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">
                Join Our Community
              </motion.span>
              <motion.h1 variants={fadeUp} className="text-4xl font-bold leading-tight text-slate-900 xl:text-5xl">
                Get connected with the SPAS community.
              </motion.h1>
              {!role && (
                <motion.div variants={fadeUp}>
                  <Link href="/join-us">
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
        {/* ── MEMBER BENEFITS ── */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
            >
              <motion.h2 variants={fadeUp} className="section-heading text-center mb-14">
                Member Benefits
              </motion.h2>
              <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {benefits.map((b, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="overflow-hidden h-52">
                      <img src={b.img.src} alt={b.en} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-6 space-y-2">
                      <p className="text-secondary font-semibold text-sm">{b.zh}</p>
                      <p className="text-slate-600 text-sm">{b.en}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── QUALIFICATIONS ── */}
        <section className="py-20 lg:py-28 bg-slate-50">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
            >
              <motion.h2 variants={fadeUp} className="section-heading text-center mb-14">
                Membership Qualifications
              </motion.h2>
              <motion.div variants={stagger} className="max-w-3xl mx-auto space-y-4">
                {qualifications.map((q, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="flex gap-x-4 p-6 bg-white rounded-2xl border border-slate-100"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <FaCheck className="w-3 h-3 text-primary" />
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{q}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── SUBSCRIPTION FEES ── */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
              className="text-center"
            >
              <motion.h2 variants={fadeUp} className="section-heading text-center mb-4">
                Membership Subscription Fees
              </motion.h2>

              <motion.div variants={stagger} className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                {[
                  {
                    label: "First-time Membership Fee",
                    price: "S$200",
                    desc: "Payable within two weeks of approval. At the end of the twelfth month of being a member, the annual membership shall be payable, pro-rated to the end of the calendar year 1st MAY when the annual membership fee is due.",
                    featured: true,
                  },
                  {
                    label: "Annual Membership Fee",
                    price: "S$100",
                    desc: "Payable annually one week before the 1st MAY. This annual fee is waived during the first year upon payment of the first time membership fee.",
                    featured: false,
                  },
                ].map((fee) => (
                  <motion.div
                    key={fee.label}
                    variants={fadeUp}
                    className={`rounded-2xl p-8 text-center space-y-4 ${
                      fee.featured
                        ? "bg-secondary text-white shadow-xl"
                        : "bg-slate-50 border border-slate-200"
                    }`}
                  >
                    <span className={`text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full ${fee.featured ? "bg-white/15 text-white" : "bg-primary/10 text-primary"}`}>
                      {fee.label}
                    </span>
                    <p className={`text-5xl font-bold ${fee.featured ? "text-white" : "text-secondary"}`}>
                      {fee.price}
                    </p>
                    <p className={`text-sm leading-relaxed ${fee.featured ? "text-white/75" : "text-slate-500"}`}>
                      {fee.desc}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {role !== "operator" && (
                <motion.div variants={fadeUp} className="mt-12">
                  <Link href="/join-us">
                    <span className="inline-flex items-center gap-x-2 btn-1">
                      JOIN SPAS <FaArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
