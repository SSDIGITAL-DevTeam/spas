/* eslint-disable @next/next/no-img-element */
import { JSX, useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import Head from "next/head";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { FaAngleLeft, FaAngleRight, FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import { motion } from "framer-motion";

import { register } from "swiper/element/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import { usePosts } from "@/hooks/usePosts";
import { Post, Event, Category } from "@/@types";
import { useEvents } from "@/hooks/useEvents";
import { useCategory } from "@/hooks/useCategory";
import EventModals from "@/components/modals/EventModals";

register();

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

function PostCard({ post }: { post: Post }) {
  return (
    <motion.div
      variants={fadeUp}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      <Link href={`/event-media/${post.slug}`}>
        <div className="overflow-hidden h-52">
          <img
            src={post?.cover?.url}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-5 space-y-3">
          <h2 className="font-semibold text-slate-900 line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h2>
          <p className="text-slate-500 text-sm line-clamp-2">
            {post.content.replace(/<[^>]+>/g, "")}
          </p>
        </div>
      </Link>
      <div className="px-5 pb-5 pt-0 space-y-3">
        <div className="flex flex-wrap gap-2">
          {post.categories?.slice(0, 3).map((category: Category) => (
            <span
              key={category.id}
              className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-medium"
            >
              {category.name}
            </span>
          ))}
        </div>
        <p className="text-xs text-slate-400">
          {moment(post.published_at).format("ddd, MMMM Do YYYY")}
        </p>
      </div>
    </motion.div>
  );
}

export default function EventMedia(): JSX.Element {
  const { posts } = usePosts();
  const { events } = useEvents();
  const [postsPerPage, setPostsPerPage] = useState(6);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const { categories } = useCategory();

  const [isOpenEvent, setIsOpenEvent] = useState<boolean>(false);
  const [selectEventId, setSelectEventId] = useState<number | null>(null);
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const me = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/end-user/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(`${process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME}`)}`,
          },
        });
        setRole(response.data.data.role);
      } catch { /* not logged in */ }
    };
    me();
  }, []);

  const parseEvents = events?.data?.map((event: Event) => ({
    id: event.id.toString(),
    title: event.name,
    start: event.start_date,
    end: event.end_date,
  }));

  const filteredPosts = posts.data
    ?.slice(0, postsPerPage)
    .filter((post) =>
      selectedCategoryId
        ? post.categories?.some((cat) => cat.id === selectedCategoryId)
        : true
    )
    .filter((post) => post.status === "4");

  return (
    <>
      <Head>
        <title>SPAS | Event &amp; Media</title>
        <link rel="icon" href="/asset-logo.png" />
        <meta name="author" content="SPAS" />
        <meta name="title" content="SPAS | Event & Media" />
        <meta name="description" content="Expand your knowledge with our latest information and upcoming events about beauty, spas, and wellness." />
        <meta name="keywords" content="spa, services, event and media" />
        <meta name="robots" content="index, follow" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />
        <meta property="og:title" content="SPAS | Event & Media" />
        <meta property="og:description" content="Expand your knowledge with our latest information and upcoming events about beauty, spas, and wellness." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_BASE_URL}/asset-logo.png`} />
      </Head>

      {/* ── HERO ── */}
      <header className="relative overflow-hidden pt-20">
        <div className="relative bg-[url('/event-media-assets/blur.webp')] bg-center bg-cover min-h-72">
          <div className="absolute inset-0 bg-secondary/70" />
          <div className="relative z-10 container mx-auto px-4 lg:px-8 py-28">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-block bg-white/15 text-white text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider border border-white/20 mb-4"
            >
              Latest Updates
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white"
            >
              Event &amp; Media
            </motion.h1>
          </div>
        </div>
      </header>

      {role !== "operator" ? (
        <main>
          {/* Featured Posts */}
          <section className="py-20 lg:py-28 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                variants={stagger}
              >
                <motion.h2 variants={fadeUp} className="section-heading text-center mb-14">
                  Latest News &amp; Events
                </motion.h2>

                {posts.data?.filter((p) => p.status === "4").length === 0 ? (
                  <div className="text-center py-16 text-slate-400">
                    <p className="text-2xl font-semibold mb-2">No posts yet</p>
                    <p className="text-sm">Check back soon for the latest updates.</p>
                  </div>
                ) : (
                  <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.data
                      ?.slice(0, 3)
                      .filter((post) => post.status === "4")
                      .map((post: Post) => (
                        <PostCard key={post.id} post={post} />
                      ))}
                  </motion.div>
                )}
              </motion.div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4 lg:px-8">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={stagger}
                className="max-w-2xl mx-auto text-center space-y-6"
              >
                <motion.h2 variants={fadeUp} className="section-heading">
                  Looking to stay ahead of the curve?
                </motion.h2>
                <motion.p variants={fadeUp} className="section-subheading">
                  Stay updated with the latest news and gain VIP access to exclusive events. Join our community today and get access to the freshest content, available only to members!
                </motion.p>
                <motion.div variants={fadeUp}>
                  <Link href="/join-us/spa-operator">
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
          {/* ── FEATURED CAROUSEL ── */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
              {posts.data?.filter((p) => p.status === "4").length === 0 ? (
                <div className="text-center py-16 text-slate-400">
                  <p className="text-2xl font-semibold mb-2">No posts yet</p>
                  <p className="text-sm">Content will appear here once published.</p>
                </div>
              ) : (
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Main Swiper */}
                  <div className="lg:w-2/3 relative">
                    <Swiper
                      navigation={{ nextEl: ".arrow-right", prevEl: ".arrow-left" }}
                      modules={[Navigation]}
                      autoplay={{ delay: 3000 }}
                      className="rounded-2xl overflow-hidden"
                    >
                      {posts.data
                        ?.filter((post) => post.status === "4")
                        .map((post: Post) => (
                          <SwiperSlide key={post.id}>
                            <Link href={`/event-media/${post.slug}`}>
                              <div className="relative">
                                <img
                                  className="aspect-video w-full object-cover"
                                  src={post?.cover?.url}
                                  alt={post.title}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
                                  <span className="font-bold text-white text-lg line-clamp-2">{post.title}</span>
                                  <p className="text-white/75 text-sm line-clamp-2 hidden md:block">
                                    {post.content.replace(/<[^>]+>/g, "")}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </SwiperSlide>
                        ))}
                    </Swiper>
                    <button className="arrow-left absolute top-1/2 -translate-y-1/2 left-3 z-20 bg-white/90 hover:bg-white rounded-xl p-2 shadow-md transition-colors">
                      <FaAngleLeft className="w-5 h-5 text-slate-700" />
                    </button>
                    <button className="arrow-right absolute top-1/2 -translate-y-1/2 right-3 z-20 bg-white/90 hover:bg-white rounded-xl p-2 shadow-md transition-colors">
                      <FaAngleRight className="w-5 h-5 text-slate-700" />
                    </button>
                  </div>

                  {/* Side thumbnails */}
                  <div className="lg:w-1/3 flex flex-row lg:flex-col gap-4">
                    {posts.data
                      ?.slice(0, 3)
                      .filter((post) => post.status === "4")
                      .map((post: Post) => (
                        <Link href={`/event-media/${post.slug}`} key={post.id} className="group flex-1">
                          <div className="overflow-hidden rounded-xl">
                            <img
                              src={post?.cover?.url}
                              alt={post.title}
                              className="aspect-video w-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* ── CATEGORY FILTER ── */}
          <section className="py-6 bg-slate-50 sticky top-16 z-10 border-b border-slate-200">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
                <button
                  onClick={() => setSelectedCategoryId(0)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                    selectedCategoryId === 0
                      ? "bg-primary border-primary text-white shadow-sm"
                      : "border-slate-200 text-slate-600 hover:border-primary hover:text-primary bg-white"
                  }`}
                >
                  All
                </button>
                {categories.data?.map((category: Category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategoryId(category.id)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                      category.id === selectedCategoryId
                        ? "bg-primary border-primary text-white shadow-sm"
                        : "border-slate-200 text-slate-600 hover:border-primary hover:text-primary bg-white"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* ── ALL POSTS ── */}
          <section className="py-16 lg:py-24 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                variants={stagger}
              >
                {filteredPosts?.length === 0 ? (
                  <div className="text-center py-16 text-slate-400">
                    <p className="text-2xl font-semibold mb-2">No posts found</p>
                    <p className="text-sm">Try selecting a different category.</p>
                  </div>
                ) : (
                  <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts?.map((post: Post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </motion.div>
                )}

                <div className="flex justify-center mt-12">
                  <button
                    onClick={() => setPostsPerPage(postsPerPage + 3)}
                    className="inline-flex items-center gap-x-2 btn-1"
                  >
                    Load More
                  </button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── EVENT CALENDAR ── */}
          <section className="py-20 lg:py-28 bg-slate-50">
            <div className="container mx-auto px-4 lg:px-8">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                variants={stagger}
              >
                <motion.h2 variants={fadeUp} className="section-heading text-center mb-14">
                  Event Calendar
                </motion.h2>
                <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 md:p-8 text-sm fc-prev-button fc-next-button fc-today-button fc-toolbar fc-day">
                  <FullCalendar
                    plugins={[dayGridPlugin]}
                    headerToolbar={{ right: "prev,next" }}
                    initialView="dayGridMonth"
                    events={parseEvents}
                    eventClick={(event) => {
                      const eventId = parseInt(event.event.id);
                      setSelectEventId(eventId);
                      setIsOpenEvent((prev) => !prev);
                    }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </section>

          <EventModals isOpen={isOpenEvent} setIsOpen={setIsOpenEvent} eventId={selectEventId} />
        </main>
      )}
    </>
  );
}
