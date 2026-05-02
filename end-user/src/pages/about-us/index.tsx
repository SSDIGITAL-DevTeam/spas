/* eslint-disable @next/next/no-img-element */
import React, { JSX } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoMailOpenOutline } from "react-icons/io5";
import Head from "next/head";
import AssetMission1 from "@/assets/about-assets/asset-mission1.webp";
import AssetMission2 from "@/assets/about-assets/asset-mission2.webp";
import AssetMission3 from "@/assets/about-assets/asset-mission3.webp";
import AssetMission4 from "@/assets/about-assets/asset-mission4.webp";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const missions = [
  {
    img: AssetMission1,
    title: "Fostering Collaboration",
    body: "We believe that collaboration is the cornerstone of success. We strive to create an environment where diverse minds come together and share ideas.",
  },
  {
    img: AssetMission2,
    title: "Empowering Growth",
    body: "We are dedicated to empowering every individual associated with SPAS to reach their full potential through mentorship and skill development programs.",
  },
  {
    img: AssetMission3,
    title: "Enabling Innovation",
    body: "SPAS thrives on the spirit of continuous improvement and exploration. We encourage bold ideas, embrace change, and turn innovative concepts into reality.",
  },
  {
    img: AssetMission4,
    title: "Give Recognition",
    body: "We celebrate achievements, big and small, to create a culture where everyone feels appreciated. Your hard work and dedication do not go unnoticed.",
  },
];

const values = [
  {
    title: "Superior Standards",
    body: "Upholding unparalleled excellence, we are dedicated to maintaining superior standards in every aspect of our work, ensuring a commitment to quality that exceeds expectations.",
  },
  {
    title: "Practice Professionalism",
    body: "Embodying a culture of utmost professionalism, we consistently adhere to ethical conduct, reliability, and a results-driven approach, fostering trust and confidence in all our interactions.",
  },
  {
    title: "Ace All Achievements",
    body: "With a relentless pursuit of excellence, we strive to ace every endeavor, turning challenges into triumphs through innovation, determination, and a passion for continuous improvement.",
  },
  {
    title: "Service with Smiles",
    body: "Infusing warmth into every interaction, we deliver service with genuine smiles, creating positive experiences and lasting connections that go beyond meeting expectations.",
  },
];

export default function AboutUs(): JSX.Element {
  return (
    <>
      <Head>
        <title>SPAS | About Us</title>
        <link rel="icon" href="/asset-logo.png" />
        <meta name="author" content="SPAS" />
        <meta name="title" content="SPAS | About Us" />
        <meta name="description" content="SPAS is a large community that connects passionate professionals to shape the future of beauty, spa, and wellness in Singapore." />
        <meta name="keywords" content="spa, services, about-us" />
        <meta name="robots" content="index, follow" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />
        <meta property="og:title" content="SPAS | About Us" />
        <meta property="og:description" content="SPAS is a large community that connects passionate professionals to shape the future of beauty, spa, and wellness in Singapore." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_BASE_URL}/asset-logo.png`} />
      </Head>

      <main>
        {/* ── HERO ── */}
        <PageHero
          badgeText="About SPAS"
          title="Who We Are"
          subtitle="At SPAS, we&rsquo;re more than just a network - we&rsquo;re a community of passionate professionals shaping the future of Beauty, Spa, and Wellness in Singapore."
          imagePath="/asset-hero.webp"
        />

        {/* ── OUR VISIONS ── */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
            >
              <motion.h2
                variants={fadeUp}
                className="section-heading text-center mb-14"
              >
                Our Visions
              </motion.h2>

              <motion.div
                variants={stagger}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <motion.div
                  variants={fadeUp}
                  className="flex gap-x-5 p-8 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FaRegCircleCheck className="w-5 h-5 text-primary" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-bold text-slate-900">Uniting World-class Spa Operators</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      We believe in the power of collaboration. By bringing together spa and wellness
                      professionals, stakeholders, and consumers, we create an environment where ideas
                      flow freely, partnerships flourish, and the collective wisdom of the community
                      becomes a driving force for progress.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  className="flex gap-x-5 p-8 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <IoMailOpenOutline className="w-5 h-5 text-primary" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-bold text-slate-900">Delivering World-class Spa Professionals</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Your growth is our priority. Whether you&rsquo;re a seasoned owner or a budding therapist,
                      SPAS is designed to be the catalyst for your professional journey. We empower Spa
                      Therapists to be World-class Spa Professionals through delivering world-class Spa Experiences.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── OUR MISSIONS ── */}
        <section className="py-20 lg:py-28 bg-slate-50">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={stagger}
            >
              <motion.h2 variants={fadeUp} className="section-heading text-center mb-14">
                Our Missions
              </motion.h2>

              <motion.div
                variants={stagger}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {missions.map((m) => (
                  <motion.div
                    key={m.title}
                    variants={fadeUp}
                    className="group relative overflow-hidden rounded-2xl"
                  >
                    <img
                      src={m.img.src}
                      alt={m.title}
                      className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 space-y-2">
                      <span className="font-bold text-white text-sm">{m.title}</span>
                      <p className="text-white/80 text-xs leading-relaxed line-clamp-3">{m.body}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── OUR VALUES ── */}
        <section className="py-20 lg:py-28">
          <div className="bg-[url('/asset-about-bg.webp')] bg-cover bg-center">
            <div className="bg-secondary/75">
              <div className="container mx-auto px-4 lg:px-8 py-20">
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={stagger}
                >
                  <motion.div variants={fadeUp} className="text-center space-y-4 mb-14">
                    <h2 className="text-white text-3xl md:text-4xl font-bold">Our Values</h2>
                    <p className="text-white/70 md:w-1/3 mx-auto">
                      Take advantage of SPAS&rsquo; marketing and promotional initiatives for increased visibility.
                    </p>
                  </motion.div>

                  <motion.div
                    variants={stagger}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {values.map((v) => (
                      <motion.div
                        key={v.title}
                        variants={fadeUp}
                        className="bg-white/95 rounded-2xl p-8 hover:shadow-xl transition-shadow"
                      >
                        <p className="text-slate-600 text-sm leading-relaxed mb-5">{v.body}</p>
                        <div className="w-10 h-0.5 bg-primary mb-3" />
                        <span className="font-bold text-secondary text-lg">{v.title}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
