/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Tab, Tabs, Image, Button } from "@nextui-org/react";
import { LuMapPin, LuPhone, LuUser2 } from "react-icons/lu";
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import { CgCalendarDates } from "react-icons/cg";
import AssetGender from "@/assets/therapist-assets/gender.svg";
import { PiGlobeHemisphereEastBold, PiTiktokLogo } from "react-icons/pi";
import { IoReload } from "react-icons/io5";
import { useRouter } from "next/router";
import { EmployeHistory, SocialMedia, Therapist } from "@/@types";
import axios from "axios";
import moment from "moment";
import { FaUser, FaArrowLeft } from "react-icons/fa6";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

const socmedIcon = (label: string) => {
  switch (label) {
    case "Instagram": return <FiInstagram className="text-primary w-5 h-5" />;
    case "Tiktok":    return <PiTiktokLogo className="text-primary w-5 h-5" />;
    case "Facebook":  return <FiFacebook className="text-primary w-5 h-5" />;
    case "Twitter":   return <FiTwitter className="text-primary w-5 h-5" />;
    default:          return null;
  }
};

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{label}</p>
        <p className="text-slate-700 text-sm font-semibold mt-0.5">{value}</p>
      </div>
    </div>
  );
}

export default function DetailTherapist() {
  const [profile, setProfile] = useState<Therapist>();
  const [employeHistory, setEmployeHistory] = useState<EmployeHistory[]>([]);
  const router = useRouter();
  const slug = router.query.slug;

  useEffect(() => {
    if (!slug) return;
    const token = localStorage.getItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!);
    if (!token) return;
    const getProfile = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/end-user/operator/therapists/${slug}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProfile(res.data.data);
        setEmployeHistory(res.data.data.employHistorys ?? []);
      } catch { /* unauthorized or not found */ }
    };
    getProfile();
  }, [slug]);

  return (
    <>
      <Head>
        <title>SPAS | {profile?.name ?? "Spa Therapist"}</title>
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
        {/* ── BACK BAND ── */}
        <div className="bg-slate-50 border-b border-slate-100 py-8">
          <div className="container mx-auto px-4 lg:px-8">
            <Link href="/spa-therapists" className="inline-flex items-center gap-x-2 text-primary text-sm font-medium hover:gap-x-3 transition-all">
              <FaArrowLeft className="w-3.5 h-3.5" />
              Back to Spa Therapists
            </Link>
          </div>
        </div>

        {/* ── PROFILE HEADER ── */}
        <section className="py-12 bg-white border-b border-slate-100">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger}
              className="flex flex-col items-center gap-4 text-center max-w-sm mx-auto"
            >
              <motion.div variants={fadeUp}>
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg bg-slate-50 flex items-center justify-center">
                  {!profile?.cover?.url?.length ? (
                    <FaUser className="text-slate-300 w-12 h-12" />
                  ) : (
                    <img
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${profile?.cover?.url}`}
                      alt={profile?.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </motion.div>
              <motion.div variants={fadeUp}>
                <h1 className="text-2xl font-bold text-slate-900">{profile?.name}</h1>
                <p className="text-primary text-sm font-medium mt-1">SPAS Certified Therapist</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── TABS ── */}
        <section className="py-12 lg:py-20 bg-slate-50">
          <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
            <Tabs
              aria-label="Therapist profile"
              color="primary"
              variant="underlined"
              classNames={{
                tabList: "gap-6 border-b border-slate-200 pb-0 mb-8",
                cursor: "bg-primary",
                tab: "pb-3 text-sm font-medium",
              }}
            >
              <Tab title="Personal Information" key="personal">
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-3">
                    <h3 className="font-semibold text-slate-900 mb-4">Basic Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <InfoRow icon={<LuUser2 className="text-primary w-4 h-4" />} label="Name" value={profile?.name} />
                      <InfoRow icon={<CgCalendarDates className="text-primary w-4 h-4" />} label="Date of Birth" value={profile?.date_of_birth} />
                      <InfoRow
                        icon={<Image src={AssetGender.src} className="w-4 h-4" removeWrapper />}
                        label="Sex"
                        value={profile?.sex}
                      />
                      <InfoRow icon={<LuPhone className="text-primary w-4 h-4" />} label="Contact No" value={profile?.contact_no} />
                      <InfoRow icon={<PiGlobeHemisphereEastBold className="text-primary w-4 h-4" />} label="Nationality" value={profile?.nationality} />
                      <InfoRow icon={<LuMapPin className="text-primary w-4 h-4" />} label="Address Nearest MRT" value={profile?.address_nearest_mrt} />
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-100 p-6">
                    <h3 className="font-semibold text-slate-900 mb-4">Social Media</h3>
                    {!profile?.social_media?.length ? (
                      <p className="text-slate-400 text-sm text-center py-4">No social media found</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {profile.social_media.map((media: SocialMedia) => (
                          <a
                            key={media.id}
                            href={media.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl hover:bg-primary/5 transition-colors"
                          >
                            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              {socmedIcon(media.name)}
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{media.name}</p>
                              <p className="text-slate-700 text-sm font-medium truncate max-w-[180px]">{media.url}</p>
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Tab>

              <Tab title="Career Information" key="career">
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl border border-slate-100 p-6">
                    <h3 className="font-semibold text-slate-900 mb-4">Employment History</h3>
                    {!employeHistory?.length ? (
                      <p className="text-slate-400 text-sm text-center py-4">No history found</p>
                    ) : (
                      <div className="space-y-4">
                        {employeHistory.map((history: EmployeHistory) => (
                          <div key={history.id} className="p-4 bg-slate-50 rounded-xl space-y-1 border-l-4 border-primary/30">
                            <h4 className="font-bold text-slate-900">{history.job_title}</h4>
                            <p className="text-slate-600 text-sm">{history.company_name}</p>
                            <p className="text-slate-400 text-xs">
                              {moment(history.start_date).format("MMMM YYYY")} — {moment(history.end_date).format("MMMM YYYY")}
                            </p>
                            <p className="text-slate-400 text-xs">{history.location}</p>
                            {history.description && <p className="text-slate-500 text-sm">{history.description}</p>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-100 p-6">
                    <h3 className="font-semibold text-slate-900 mb-4">Professional Certifications</h3>
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      {profile?.professional_certs && (
                        <div className="flex-shrink-0 w-32 h-32 rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
                          <img
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${profile.professional_certs}`}
                            alt="Certificate"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="space-y-2 flex-1">
                        <h4 className="font-bold text-slate-900">{profile?.name_cert}</h4>
                        <p className="text-slate-600 text-sm">{profile?.issuing_organization}</p>
                        <p className="text-slate-400 text-xs">Issued Nov 2021 · Expires Mar 2025</p>
                        {profile?.credential_id && (
                          <p className="text-slate-400 text-xs">Credential ID: {profile.credential_id}</p>
                        )}
                        <Button
                          color="secondary"
                          size="sm"
                          endContent={<IoReload className="w-3.5 h-3.5" />}
                          className="mt-2"
                          radius="full"
                        >
                          Show credential
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </section>
      </main>
    </>
  );
}
