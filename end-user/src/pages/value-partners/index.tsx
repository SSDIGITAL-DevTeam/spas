/* eslint-disable @next/next/no-img-element */
import { JSX, useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import { CiImageOn } from "react-icons/ci";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import PageHero from "@/components/ui/PageHero";

type Partner = {
  id: number;
  name: string;
  slug: string;
  value_partner: ValuePartner[];
};
type ValuePartner = {
  id: number;
  brand_name: string;
  email: string;
  logo: string;
  phone_number: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

export default function ValuePartners(): JSX.Element {
  const [role, setRole] = useState<string>("");
  const [partners, setPartners] = useState<Partner[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);

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
    const getValuePartners = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/end-user/operator/partners`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data: Partner[] = response.data.data;
        setPartners(data);
        if (data.length > 0) setSelectedCategoryId(data[0].id);
      } catch { /* unauthorized */ }
    };
    getValuePartners();
  }, []);

  const activePartner = partners.find((p) => p.id === selectedCategoryId);

  return (
    <>
      <Head>
        <title>SPAS | Value Partners</title>
        <link rel="icon" href="/asset-logo.png" />
        <meta name="author" content="SPAS" />
        <meta name="title" content="SPAS | Value Partners" />
        <meta name="description" content="Explore numerous opportunities with our partners. Get the best quality at the best price for your business." />
        <meta name="keywords" content="spa, services, value partners" />
        <meta name="robots" content="index, follow" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />
        <meta property="og:title" content="SPAS | Value Partners" />
        <meta property="og:description" content="Explore numerous opportunities with our partners. Get the best quality at the best price for your business." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_BASE_URL}/asset-logo.png`} />
      </Head>

      {/* ── HERO ── */}
      <PageHero
        badgeText="Exclusive Benefits"
        title="Value Partners"
        subtitle="Explore numerous opportunities with our partners. Get the best quality at the best price for your business."
        imagePath="/asset-hero.webp"
      />

      {role !== "operator" ? (
        <main>
          <section className="py-20 lg:py-28 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
              <motion.div
                initial="hidden"
                animate="show"
                variants={stagger}
                className="max-w-2xl mx-auto text-center space-y-8"
              >
                <motion.div variants={fadeUp} className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                  <CiImageOn className="w-10 h-10 text-primary" />
                </motion.div>
                <motion.h2 variants={fadeUp} className="section-heading">
                  Members-Only Access
                </motion.h2>
                <motion.p variants={fadeUp} className="section-subheading text-lg">
                  Are you ready to explore numerous opportunities with our partners? You&rsquo;ll get the best quality at the best price for your business. So, what are you waiting for? Register as a member now!
                </motion.p>
                <motion.div variants={fadeUp}>
                  <Link href="/join-us">
                    <span className="inline-flex items-center gap-x-2 btn-1">
                      JOIN SPAS <FaArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </main>
      ) : (
        <main>
          {partners.length === 0 ? (
            <section className="py-20 min-h-[60vh] flex items-center bg-white">
              <div className="container mx-auto px-4 lg:px-8 text-center">
                <p className="text-2xl font-semibold text-slate-700 mb-2">No Partners Found</p>
                <p className="text-slate-500">Partner listings will appear here once available.</p>
              </div>
            </section>
          ) : (
            <>
              {/* ── CATEGORY TABS ── */}
              <section className="py-6 bg-white border-b border-slate-100 sticky top-16 z-10">
                <div className="container mx-auto px-4 lg:px-8">
                  <div className="flex gap-3 overflow-x-auto pb-1">
                    {partners.map((partner) => (
                      <button
                        key={partner.id}
                        onClick={() => setSelectedCategoryId(partner.id)}
                        className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                          partner.id === selectedCategoryId
                            ? "bg-primary border-primary text-white shadow-sm"
                            : "border-slate-200 text-slate-600 hover:border-primary hover:text-primary bg-white"
                        }`}
                      >
                        {partner.name}
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              {/* ── PARTNER GRID ── */}
              <section className="py-16 lg:py-24 bg-slate-50">
                <div className="container mx-auto px-4 lg:px-8">
                  <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={stagger}
                  >
                    <motion.h2 variants={fadeUp} className="section-heading text-center mb-14">
                      {activePartner?.name}
                    </motion.h2>

                    {activePartner?.value_partner?.length === 0 ? (
                      <div className="text-center py-16 text-slate-400">
                        <p className="text-lg font-semibold mb-1">No partners in this category yet</p>
                      </div>
                    ) : (
                      <motion.div
                        variants={stagger}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                      >
                        {activePartner?.value_partner?.map((vp) => (
                          <motion.div
                            key={vp.id}
                            variants={fadeUp}
                            className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                          >
                            <div className="aspect-square overflow-hidden bg-slate-50 flex items-center justify-center p-4">
                              {!vp.logo?.length ? (
                                <CiImageOn className="w-16 h-16 text-slate-300" />
                              ) : (
                                <img
                                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${vp.logo}`}
                                  alt={vp.brand_name}
                                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                />
                              )}
                            </div>
                            <div className="p-4 text-center border-t border-slate-100">
                              <h3 className="font-semibold text-slate-800 text-sm">{vp.brand_name}</h3>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </section>
            </>
          )}
        </main>
      )}
    </>
  );
}
