import { FormEvent, JSX, useEffect, useState } from "react";
import Head from "next/head";
import Hero from "@/assets/homepage-assets/hero-homepage.webp";
import img1 from "@/assets/homepage-assets/rectangle-145.webp";
import img2 from "@/assets/homepage-assets/rectangle-146.webp";
import img3 from "@/assets/homepage-assets/rectangle-147.webp";
import img4 from "@/assets/homepage-assets/rectangle-148.webp";
import KeepBg from "@/assets/homepage-assets/Keep.webp";
import Ficon1 from "@/assets/homepage-assets/featured-icons.svg";
import moment from "moment";
import Link from "next/link";
import { FaChartLine, FaArrowRight } from "react-icons/fa6";
import { RiVoiceRecognitionLine } from "react-icons/ri";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoIosPhonePortrait } from "react-icons/io";
import axios, { AxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { usePosts } from "@/hooks/usePosts";
import { Post, Category } from "@/@types";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

type ErrorResponseSubs = { errors: { email: string } };

const missions = [
  {
    icon: FaRegCheckCircle,
    title: "Fostering Collaboration",
    body: "We believe in the power of collaboration. By bringing together spa and wellness professionals, stakeholders, and consumers, we create an environment where ideas flow freely, partnerships flourish, and the collective wisdom of the community becomes a driving force for progress.",
  },
  {
    icon: FaChartLine,
    title: "Empowering Growth",
    body: "Your growth is our priority. Whether you’re a seasoned owner or a budding therapist, SPAS is designed to be the catalyst for your professional journey. We empower Spa Therapists to be World-class Spa Professionals through delivering world-class Spa Experiences.",
  },
  {
    icon: IoIosPhonePortrait,
    title: "Enabling Innovation",
    body: "Through SPAS, we aim to be a hub of innovation, where ideas are born, tested, and refined. By fostering an environment that encourages creativity and forward-thinking.",
  },
  {
    icon: RiVoiceRecognitionLine,
    title: "Give Recognition",
    body: "SPAS is a platform where Singaporean therapists find recognition and support by validating their crucial role in enhancing the well-being of our community.",
  },
];

const benefits = [
  {
    title: "Networking Events",
    body: "Attend exclusive events to connect with industry leaders and fellow professionals.",
  },
  {
    title: "Resource Hub",
    body: "Access a rich repository of resources, from business insights to the latest wellness trends.",
  },
  {
    title: "Profile Showcase",
    body: "Showcase your expertise with a personalized profile, boosting your visibility.",
  },
];

export default function Home(): JSX.Element {
  const { posts } = usePosts();
  const [email, setEmail] = useState("");
  const [errMsgSubs, setErrMsgSubs] = useState<ErrorResponseSubs>({} as ErrorResponseSubs);
  const [role, setRole] = useState("");

  useEffect(() => {
    const me = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/end-user/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!)}`,
          },
        });
        setRole(res.data.data.role ?? "");
      } catch { /* not logged in */ }
    };
    me();
  }, []);

  const submitFormSubscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/end-user/subscribes`, { email });
      toast("Subscribed", {
        position: "bottom-right",
        icon: "✅",
        style: { backgroundColor: "#1975FF", color: "#ffffff", paddingBlock: 12 },
      });
      (e.target as HTMLFormElement).reset();
      setEmail("");
    } catch (error) {
      const err = error as AxiosError;
      setErrMsgSubs(err.response?.data as ErrorResponseSubs);
    }
  };

  const publishedPosts = posts.data?.filter((p) => p.status === "4").slice(0, 3) ?? [];

  return (
    <>
      <Head>
        <title>SPAS | Elevate your Spa & Wellness Business with Us!</title>
        <link rel="icon" href="/asset-logo.png" />
        <meta name="author" content="SPAS" />
        <meta name="title" content="SPAS | Elevate your Spa & Wellness Business with Us!" />
        <meta name="description" content="Promote and protect business entities, practitioners, stakeholders, and consumers of the Beauty, Spa and Wellness Industry in Singapore." />
        <meta name="keywords" content="spa, services" />
        <meta name="robots" content="index, follow" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />
        <meta property="og:title" content="SPAS | Elevate your Spa & Wellness Business with Us!" />
        <meta property="og:description" content="Promote and protect business entities, practitioners, stakeholders, and consumers of the Beauty, Spa and Wellness Industry in Singapore." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_BASE_URL}/asset-logo.png`} />
      </Head>

      <Toaster />

      {/* ── HERO ── */}
      <header className="relative overflow-hidden pt-20 lg:pt-24 pb-16 lg:pb-24 hero-gradient">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 -left-20 w-80 h-80 rounded-full bg-quaternary/10 blur-3xl" />

        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row gap-10 md:items-center">
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger}
              className="flex flex-col gap-y-5 md:w-1/2"
            >
              <motion.div variants={fadeUp}>
                <span className="inline-flex items-center gap-x-2 bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full">
                  Singapore&apos;s Spa & Wellness Community
                </span>
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="text-4xl font-bold leading-tight text-slate-900 xl:text-5xl xl:leading-[1.15]"
              >
                Elevate{" "}
                <span className="gradient-text">
                  your Spa & Wellness Business with Us!
                </span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-slate-600 text-lg leading-relaxed max-w-lg">
                We are here to promote and protect business entities, practitioners,
                stakeholders, and consumers of the Beauty, Spa and Wellness Industry
                in Singapore.
              </motion.p>
              {!role && (
                <motion.div variants={fadeUp}>
                  <Link href="/join-us/spa-operator">
                    <span className="inline-flex items-center gap-x-2 btn-1">
                      JOIN SPAS
                      <FaArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="md:w-1/2"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={Hero.src}
                alt="Hero"
                className="w-full rounded-2xl shadow-2xl object-cover"
              />
            </motion.div>
          </div>
        </div>
      </header>

      <main>
        {/* ── WHO WE ARE ── */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
              className="flex flex-col gap-y-12"
            >
              <motion.div variants={fadeUp} className="text-center space-y-4 max-w-2xl mx-auto">
                <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">
                  Our Missions
                </span>
                <h2 className="section-heading">Who We Are</h2>
                <p className="section-subheading">
                  At SPAS, we&rsquo;re more than just a network - we&rsquo;re a community of passionate
                  professionals shaping the future of Beauty, Spa, and Wellness in Singapore.
                </p>
              </motion.div>

              <motion.div
                variants={stagger}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {missions.map((m) => (
                  <motion.div
                    key={m.title}
                    variants={fadeUp}
                    className="group flex gap-x-5 p-6 rounded-2xl border border-slate-100 hover:border-primary/20 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/15 flex items-center justify-center transition-colors">
                      <m.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-slate-900">{m.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{m.body}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── WHY JOIN US ── */}
        <section className="py-20 lg:py-28 bg-slate-50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-14 items-center">
              {/* Image grid */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-2 gap-3 lg:w-1/2"
              >
                <div className="space-y-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img1.src} alt="" className="w-full rounded-xl object-cover aspect-[4/3]" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img4.src} alt="" className="w-full rounded-xl object-cover aspect-[4/3]" />
                </div>
                <div className="space-y-3 mt-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img3.src} alt="" className="w-full rounded-xl object-cover aspect-[4/3]" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img2.src} alt="" className="w-full rounded-xl object-cover aspect-[4/3]" />
                </div>
              </motion.div>

              {/* Text */}
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={stagger}
                className="lg:w-1/2 space-y-8"
              >
                <motion.h2 variants={fadeUp} className="section-heading">
                  Why Join Us
                </motion.h2>

                <motion.div variants={stagger} className="space-y-6">
                  {[
                    {
                      title: "Validation",
                      body: "Gain recognition for your skills and expertise in the spa and wellness industry.",
                    },
                    {
                      title: "Connections",
                      body: "Gain recognition for your skills and expertise in the spa and wellness industry.",
                    },
                    {
                      title: "Knowledge Exchange",
                      body: "Access a treasure trove of insights and ideas to stay ahead in your field.",
                    },
                  ].map((item) => (
                    <motion.div
                      key={item.title}
                      variants={fadeUp}
                      className="flex gap-x-4 items-start"
                    >
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{item.title}</h3>
                        <p className="text-slate-500 text-sm mt-1">{item.body}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.p variants={fadeUp} className="text-slate-500 text-sm">
                  Join us on SPAS and take your journey in the Beauty, Spa, and Wellness industry to new heights.
                </motion.p>

                {!role && (
                  <motion.div variants={fadeUp}>
                    <Link href="/join-us/spa-operator">
                      <span className="inline-flex items-center gap-x-2 btn-1">
                        JOIN SPAS
                        <FaArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── MEMBER BENEFITS ── */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
              className="flex flex-col gap-y-12"
            >
              <motion.div variants={fadeUp} className="text-center">
                <h2 className="section-heading">Member Benefits</h2>
              </motion.div>

              <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {benefits.map((b, i) => (
                  <motion.div
                    key={b.title}
                    variants={fadeUp}
                    className={`flex flex-col items-center text-center p-8 rounded-2xl ${
                      i === 1 ? "bg-secondary text-white" : "bg-slate-50 border border-slate-100"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={Ficon1.src}
                      alt=""
                      className={`w-16 h-16 mb-5 ${i === 1 ? "brightness-0 invert" : ""}`}
                    />
                    <h3 className={`font-semibold text-lg mb-3 ${i === 1 ? "text-white" : "text-slate-900"}`}>
                      {b.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${i === 1 ? "text-white/80" : "text-slate-500"}`}>
                      {b.body}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-col items-center gap-y-6 text-center">
                <p className="text-slate-600 max-w-md">
                  Our membership benefits is more than that.
                  <br />
                  Become a member today and unlock a world of opportunities in the Beauty, Spa, and Wellness community.
                </p>
                <Link href="/membership">
                  <span className="btn-1 inline-flex items-center gap-x-2">
                    See Membership Details
                    <FaArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── BLOG / EVENT & MEDIA ── */}
        <section className="py-20 lg:py-28 bg-slate-50">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={stagger}
              className="flex flex-col gap-y-10"
            >
              <motion.div variants={fadeUp} className="flex items-end justify-between">
                <h2 className="section-heading">Event & Media</h2>
                {role === "operator" ? (
                  <Link href="/event-media" className="text-sm font-semibold text-primary hover:underline flex items-center gap-x-1">
                    View all <FaArrowRight className="w-3 h-3" />
                  </Link>
                ) : null}
              </motion.div>

              {publishedPosts.length === 0 ? (
                <div className="text-center py-16 text-slate-400">
                  <p className="text-4xl font-semibold mb-2">Oops..</p>
                  <p>No Event & Media currently found</p>
                </div>
              ) : (
                <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {publishedPosts.map((post: Post) => (
                    <motion.div
                      key={post.id}
                      variants={fadeUp}
                      className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                      <Link href={`/event-media/${post.slug}`}>
                        <div className="overflow-hidden h-48">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${post.cover.url}`}
                            alt={post.title}
                          />
                        </div>
                        <div className="p-5">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.categories?.slice(0, 2).map((cat: Category) => (
                              <span
                                key={cat.id}
                                className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium"
                              >
                                {cat.name}
                              </span>
                            ))}
                          </div>
                          <h3 className="font-semibold text-slate-900 line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-slate-500 text-sm line-clamp-2">
                            {post.content.replace(/<[^>]+>/g, "")}
                          </p>
                          <p className="text-xs text-slate-400 mt-3">
                            {moment(post.published_at).format("MMM Do YYYY")}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              <motion.div variants={fadeUp} className="flex justify-center">
                {role !== "operator" ? (
                  <Link href="/join-us/spa-operator">
                    <span className="btn-1 inline-flex items-center gap-x-2">
                      Join to see all events
                      <FaArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                ) : (
                  <Link href="/event-media">
                    <span className="btn-1 inline-flex items-center gap-x-2">
                      Read more
                      <FaArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                )}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── NEWSLETTER ── */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl bg-secondary p-10 lg:p-14"
            >
              {/* Decorative */}
              <div className="pointer-events-none absolute right-0 top-0 w-72 h-full overflow-hidden rounded-r-3xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={KeepBg.src}
                  alt=""
                  className="w-full h-full object-cover opacity-20"
                />
              </div>
              <div className="pointer-events-none absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/5" />
              <div className="pointer-events-none absolute -bottom-20 left-40 w-48 h-48 rounded-full bg-white/5" />

              <div className="relative z-10 max-w-2xl space-y-5">
                <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                  Keep Up-to-Date with Us
                </h2>
                <p className="text-white/70 leading-relaxed">
                  Stay in the loop with the latest industry news, events, and community updates. Follow us on and be a part of the ongoing dialogue in the world of Beauty, Spa, and Wellness.
                </p>
                <form onSubmit={submitFormSubscribe} className="mt-4">
                  <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
                    <div className="flex-1">
                      <input
                        type="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        placeholder="Your e-mail address"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors text-sm"
                      />
                      {errMsgSubs?.errors?.email && (
                        <p className="text-xs text-red-300 mt-1">{errMsgSubs.errors.email}</p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-white text-secondary font-semibold rounded-xl hover:bg-slate-100 transition-colors text-sm whitespace-nowrap"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
