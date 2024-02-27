import { JSX, useEffect, useState } from "react";
import moment from "moment";
import axios, { Axios } from "axios";
import Head from "next/head";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Link from "next/link";

//Swiper
import { register } from "swiper/element/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import { usePosts } from "@/hooks/usePosts";
import { Post, Event, Tag, Category } from "@/@types";
import { useEvents } from "@/hooks/useEvents";
import { useCategory } from "@/hooks/useCategory";

register();

export default function EventMedia(): JSX.Element {
  const { posts } = usePosts();
  const { events } = useEvents();
  const [postsPerPage, setPostsPerPage] = useState(6);
  const [categoryPost, setCategoryPost] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1);
  const { categories } = useCategory();

  const getCategoryPost = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/end-user/posts`
    );
    setCategoryPost(response.data?.data);

    //  console.log(response.data);
  };

  useEffect(() => {
    getCategoryPost();
  }, []);

  const parseEvents = events?.data?.map((event: Event, index: number) => ({
    title: event.name,
    start: event.start_date,
    end: event.end_date,
  }));

  const loadMore = () => {
    setPostsPerPage(postsPerPage + 3);
  };

  return (
    <>
      <Head>
        <title>SPAS | Event & Media</title>
        <meta name="author" content="SPAS" />

        <meta name="title" content="Event and Media" />

        <meta name="description" content="event and media" />

        <meta name="keywords" content="spa, services, event and media" />

        <meta name="robots" content="index, follow" />

        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />

        <meta property="og:title" content="event and media" />

        <meta property="og:description" content="Event And Media" />

        <meta property="og:type" content="website" />

        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/asset-special-offer.webp`}
        />
      </Head>
      <main>
        {/* BLOG TOP */}
        <section className="pb-18 lg:pb-0 pt-32">
          <div className="container">
            <div className="flex flex-col md:flex-row gap-5">
              <div className="grid grid-cols-1 gap-8 w-full lg:w-3/4">
                <div className="relative w-full">
                  <Link href="/details">
                    <Swiper
                      pagination={{
                        dynamicBullets: true,
                      }}
                      navigation={{
                        nextEl: ".arrow-right",
                        prevEl: ".arrow-left",
                      }}
                      modules={[Navigation]}
                      autoplay={{ delay: 2000 }}
                      className="mySwiper"
                    >
                      {posts.data
                        ?.filter((post) => post.status === "PUBLISHED")
                        .map(
                          (post: Post, index: number): JSX.Element => (
                            <SwiperSlide key={post.id}>
                              <Link href={`/event-media/${post.slug}`}>
                                <div className="relative rounded-md h-max">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    className="aspect-video w-full rounded-xl object-cover"
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${post.cover.url}`}
                                    alt={post.title}
                                  />
                                  <div className="bg-white/80 absolute bottom-5 mx-5 space-y-4 p-2 rounded-md">
                                    <span className="text-black font-bold">
                                      {post.title}
                                    </span>
                                    <p className="text-black text-xs md:text-base md:text-md line-clamp-3 w-full">
                                      {post.content.replace(/<[^>]+>/g, "")}
                                    </p>
                                  </div>
                                </div>
                              </Link>
                            </SwiperSlide>
                          )
                        )}
                    </Swiper>
                  </Link>

                  <div className="bg-black">
                    <button className="arrow-left absolute top-[50%] mx-5 z-20 bg-white rounded-lg md:p-0.5">
                      <FaAngleLeft className="text-black z-10 w-8 h-8 " />
                    </button>
                    <button className="arrow-right absolute z-20 top-[50%] mx-5 right-0 bg-white rounded-lg md:p-0.5">
                      <FaAngleRight className="text-black z-10 w-8 h-8 " />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6 lg:w-1/4 flex-1">
                <div className="grid grid-cols-1 gap-4 w-full">
                  {posts.data
                    ?.slice(0, 3)
                    .filter((post) => post.status === "PUBLISHED")
                    .map(
                      (post: Post, index: number): JSX.Element => (
                        <Link href={`/event-media/${post.slug}`} key={post.id}>
                          <div className="relative">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${post.cover.url}`}
                              alt="PostImg2"
                              className="aspect-video w-full rounded-xl object-cover"
                            />
                            <div className="bg-white/80 absolute bottom-5 mx-3 space-y-4 p-2 rounded-md">
                              <span className="text-black font-bold">
                                {post.title}
                              </span>
                            </div>
                          </div>
                        </Link>
                      )
                    )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORY BUTTON */}
        <section className="pb-18 lg:pb-0 pt-12">
          <div className="md:container">
            <div className="flex justify-between gap-x-8 whitespace-nowrap overflow-scroll md:overflow-auto mb-4 p-5 bg-[#F5F5F5] rounded-lg shadow-xl">
              {categories.data?.map((category: Category, index: number) => (
                <button
                  key={category.id}
                  className={`p-3 border-1 font-bold py-2 px-4 duration-100 rounded-lg text-black border-2 hover:bg-primary hover:text-white transition-all ease-out w-40
									${category.id == selectedCategoryId ? "bg-primary text-white" : ""}`}
                  onClick={() => setSelectedCategoryId(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* BLOG BOTTOM */}
        <section className="pb-14 lg:pb-24 pt-12">
          <div className="container">
            <div className="flex flex-col gap-y-8">
              <div className="flex flex-col lg:flex-row text-center">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {posts.data?.length === 0 && (
                    <div className="text-center">
                      <p className="text-4xl font-semibold">Opps..</p>
                      <p>Blog not found</p>
                    </div>
                  )}
                  {posts.data
                    ?.slice(0, postsPerPage)
                    .filter((categoryPost) =>
                      selectedCategoryId
                        ? categoryPost.categories?.some(
                            (category) => category.id === selectedCategoryId
                          )
                        : true
                    )
                    .filter((post) => post.status === "PUBLISHED")
                    .map(
                      (post: Post, index: number): JSX.Element => (
                        <div
                          className="p-3 bg-white border-1 shadow-lg rounded-lg transition duration-200 hover:bg-black/10"
                          key={post.id}
                        >
                          <Link href={`/event-media/${post.slug}`}>
                            <div className="grid justify-center">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                className="aspect-video w-full rounded-xl object-cover"
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${post.cover.url}`}
                                alt={post.title}
                              />
                            </div>
                            <div className="mt-5 space-y-3 text-left h-[130px]">
                              <h2 className="font-semibold text-[#3E3232]">
                                {post.title}
                              </h2>
                              <p className="text-secondary text-black/80 line-clamp-3">
                                {post.content.replace(/<[^>]+>/g, "")}
                              </p>
                            </div>
                          </Link>
                          <div className="bg-[#F5F5F5] p-5 mt-5 rounded-lg">
                            <div className="flex flex-wrap gap-4">
                              {post.categories
                                ?.slice(0, 3)
                                .map((category: Category, index: number) => (
                                  <p
                                    className="bg-[#dee9f9] w-max text-sm p-2 rounded-full flex-grow"
                                    key={category.id}
                                  >
                                    {category.name}
                                  </p>
                                ))}
                            </div>
                            <div className="text-sm text-secondary text-left p-2">
                              <p>
                                Last update : <br />
                                <label
                                  className="text-primary"
                                  htmlFor="{moment(post.published_at).format('ddd, MMMM Do YYYY')}"
                                >
                                  {moment(post.published_at).format(
                                    "ddd, MMMM Do YYYY"
                                  )}
                                </label>
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                </div>
              </div>

              <div className="flex justify-center mt-10">
                <button onClick={loadMore}>
                  <span className="btn-1 block my-4 w-full text-center lg:w-max hover:bg-primary transition-colors ease-out">
                    Load more
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CALENDER */}
        <section className="pb-14 lg:pb-0 lg:pt-0">
          <div className="bg-[url('/event-media-assets/blur.webp')] bg-cover">
            <div className="container">
              <div className="md:py-10 py-10">
                <div className="md:p-10 p-5 bg-white rounded-lg text-sm fc-prev-button fc-next-button fc-today-button fc-toolbar fc-day">
                  <header className="flex flex-col gap-y-4 text-center">
                    <h2 className="mx-auto text-2xl leading-snug md:leading-normal lg:text-3xl xl:text-5xl lg:leading-tight text-black font-semibold md:mb-10 mb-3">
                      Event Calendar
                    </h2>
                  </header>

                  <FullCalendar
                    plugins={[dayGridPlugin]}
                    headerToolbar={{
                      right: "prev,next",
                    }}
                    events={parseEvents}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
