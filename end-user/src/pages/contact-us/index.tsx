/* eslint-disable @next/next/no-img-element */
import { FormEvent, JSX, useState } from "react";
import Head from "next/head";
import KeepBg from "@/assets/homepage-assets/Keep.webp";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import axios, { AxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";

const topics = [
  {
    id: 0,
    name: "Membership",
  },
  {
    id: 1,
    name: "How To Join?",
  },
  {
    id: 2,
    name: "Where do I register?",
  },
  {
    id: 3,
    name: "Is there any requirements?",
  },
  {
    id: "4",
    name: "Any consultations that should I get?",
  },
];

type ErrorResponse = {
  errors: {
    topic: string;
    fullname: string;
    email: string;
    message: string;
  };
};

type ErrorResponseSubs = {
  errors: {
    email: string;
  };
};

export default function Contact(): JSX.Element {
  const [selectedTopic, setSelectedTopic] = useState<string>("Membership");
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [errMsg, setErrMsg] = useState<ErrorResponse>({} as ErrorResponse);

  const [errMsgSubs, setErrMsgSubs] = useState<ErrorResponseSubs>(
    {} as ErrorResponseSubs
  );
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/end-user/contacts`, {
        topic: selectedTopic,
        fullname: fullname,
        email: email,
        message: message,
      });

      toast("Form Submitted", {
        position: "bottom-right",
        icon: "✅",
        style: {
          backgroundColor: "#1975FF",
          color: "#ffffff",
          paddingBlock: 12,
        },
      });
      setSelectedTopic("");
      const formReset = e.target as HTMLFormElement;
      formReset.reset();
    } catch (error) {
      console.log(error);
      const errorMessage = error as AxiosError;
      setErrMsg(errorMessage.response?.data as ErrorResponse);
    }
  };

  const submitFormSubscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/end-user/subscribes`,
        {
          email: email,
        }
      );

      toast("Subscribed", {
        position: "bottom-right",
        icon: "✅",
        style: {
          backgroundColor: "#1975FF",
          color: "#ffffff",
          paddingBlock: 12,
        },
      });
      const formReset = e.target as HTMLFormElement;
      formReset.reset();
    } catch (error) {
      console.log(error);
      const errorMessage = error as AxiosError;
      setErrMsgSubs(errorMessage.response?.data as ErrorResponseSubs);
    }
  };
  return (
    <>
      <Head>
        <title>SPAS | Contact Us</title>
        <link rel="icon" href="/asset-logo.png" />
        <meta name="author" content="SPAS" />

        <meta name="title" content="SPAS | Contact Us" />

        <meta
          name="description"
          content="Let&laquo;s build something great together. So please do not hesitate to contact us and we will get back to you shortly."
        />

        <meta name="keywords" content="spa, services, contact-us" />

        <meta name="robots" content="index, follow" />

        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />

        <meta property="og:title" content="SPAS | Contact Us" />

        <meta
          property="og:description"
          content="Let&laquo;s build something great together. So please do not hesitate to contact us and we will get back to you shortly."
        />

        <meta property="og:type" content="website" />

        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/asset-logo.png`}
        />
      </Head>

      {/* HERO */}
      <header className="pb-14 md:pb-0 pt-24">
        <div className="bg-[url('/contact-assets/contact.png')] bg-no-repeat bg-center md:bg-cover w-screen min-h-96 py-24 md:py-28">
          <div className="container">
            <div className="grid justify-center item-center">
              <div className="md:p-14 py-14">
                <h1 className="text-4xl font-semibold leading-snug md:leading-normal xl:max-w-xl xl:text-5xl xl:leading-tight ">
                  <span className="text-white">Contact Us</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* TELL US */}
        <section className="pb-14 md:pt-16 lg:pb-0 lg:pt-20">
          <div className="container">
            <div className="flex flex-col">
              <header className="text-left space-y-6">
                <p className="text-secondary font-semibold">Tell Us !</p>

                <h2 className="text-2xl text-black font-bold">
                  I want to ask about topic...
                </h2>
              </header>

              <div className="flex flex-col md:flex-row py-8 md:w-3/5 gap-6 flex-wrap">
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic.name)}
                    className={`p-3 border-2 rounded-lg md:w-max w-full border-secondary font-semibold text-secondary hover:bg-[#1975FF] hover:border-[#1975FF] hover:text-white ${
                      topic.name == selectedTopic
                        ? "bg-[#1975FF] border-[#1975FF] text-white"
                        : ""
                    }`}
                  >
                    {topic.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT INFORMATION */}
        <div className="pb-14 lg:pb-18 lg:pt-20">
          <div className="container">
            <div className="flex flex-col md:flex-row">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  md:gap-x-8 w-full">
                <div className="pb-10">
                  <h2 className="font-bold text-2xl text-secondary text-center md:text-left">
                    Contact Information
                  </h2>
                  <div className="pt-10">
                    <form onSubmit={submitForm} className="grid gap-y-4">
                      <div className="relative w-full">
                        {errMsg?.errors?.fullname && (
                          <p className="text-sm text-red-500">
                            {errMsg.errors.fullname[0]}
                          </p>
                        )}
                        <input
                          type="text"
                          placeholder="Full Name"
                          onChange={(e) => setFullname(e.target.value)}
                          name="fullname"
                          className="border-2 p-2.5 rounded-lg w-full"
                        />
                      </div>

                      <div className="relative w-full">
                        {errMsg?.errors?.email && (
                          <p className="text-sm text-red-500">
                            {errMsg.errors.email[0]}
                          </p>
                        )}
                        <input
                          // type="email"
                          placeholder="Email Address"
                          onChange={(e) => setEmail(e.target.value)}
                          name="email"
                          className="border-2 p-2.5 rounded-lg w-full"
                        />
                      </div>

                      <div className="relative w-full">
                        {errMsg?.errors?.message && (
                          <p className="text-sm text-red-500 ">
                            {errMsg.errors.message[0]}
                          </p>
                        )}

                        <textarea
                          className="border-2 p-2.5 rounded-lg w-full min-h-40"
                          onChange={(e) => setMessage(e.target.value)}
                          name="message"
                          placeholder="Tell us more about your concern"
                        ></textarea>
                      </div>
                      <div className="relative w-full space-y-2">
                        {errMsg?.errors?.topic && (
                          <p className="text-sm text-red-500 text-center ">
                            {errMsg.errors.topic[0]}
                          </p>
                        )}
                        <button
                          type="submit"
                          className="btn-1 w-full hover:bg-primary transition-colors ease-out"
                        >
                          Submit Now
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="lg:pl-20 flex- flex-col justify-end">
                  <h2 className="font-bold text-2xl text-secondary text-center md:text-left">
                    Our Company
                  </h2>
                  <div className="py-8">
                    <ul className="flex flex-col gap-y-2 text-secondary">
                      <li className="flex">
                        <MdOutlineMailOutline className="w-5 h-5 mt-0.5" />
                        <a className="ml-2" href="mailto:hello@spas.com.sg">
                          hello@spas.com.sg
                        </a>
                      </li>
                      <li className="flex">
                        <FaPhone className="w-4 h-4 mt-0.5" />
                        <a
                          className="ml-2"
                          target="_blank"
                          href="tel:+6588002950"
                        >
                          +65 8800 2950
                        </a>
                      </li>

                      <li className="flex">
                        <IoLocationOutline className="w-6 h-6 mt-0.5" />
                        <a className="ml-2">
                          1100 Lower Delta Rd #02-02B EPL Building
                          Singapore 169206
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8225881637272!2d103.81935817406989!3d1.2800925617979801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da197d54065a13%3A0xceac47e82adb29de!2sEpl%20Building!5e0!3m2!1sen!2sen!4v1710209553304!5m2!1sen!2sen"
                      className="w-full min-h-80"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Toaster />

        {/* KEEP UP TO DATE WITH US */}
        <section className="pb-12 lg:pb-14">
          <div className="container">
            <div className="relative lg:flex gap-y-8 bg-[#F0F6FF] rounded-lg">
              <div className="space-y-3 p-9">
                <h2 className="text-2xl leading-snug md:max-w-md md:leading-normal lg:text-3xl xl:max-w-2xl xl:text-5xl xl:leading-tight text-secondary font-semibold">
                  Keep Up-to-Date with Us
                </h2>
                <p className="text-secondary lg:w-3/4">
                  Stay in the loop with the latest industry news, events, and
                  community updates. Follow us on and be a part of the ongoing
                  dialogue in the world of Beauty, Spa, and Wellness.
                </p>
                <div className="">
                  <form onSubmit={submitFormSubscribe} className="mt-8">
                    <div className="lg:flex lg:flex-row lg:gap-x-3 lg:w-3/4">
                      <div className="w-full">
                        <input
                          type="text"
                          required
                          onChange={(e) => setEmail(e.target.value)}
                          name="email"
                          className="p-3 h-max w-full focus:text-secondary rounded-lg border-1 shadow-lg mb-2"
                          placeholder="Your e-mail address"
                        />
                        {errMsgSubs?.errors?.email && (
                          <p className="text-sm text-red-500">
                            {errMsgSubs.errors.email[0]}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          type="submit"
                          value="Subscribe"
                          className="btn-2 text-white lg:w-max w-full mt-5 lg:mt-0 capitalize cursor-pointer hover:bg-secondary transition-colors ease-out"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="absolute right-0 top-0 hidden lg:block">
                <img
                  className="w-72 rounded-lg"
                  src={KeepBg.src}
                  alt="KeepBg"
                />
              </div>
            </div>
          </div>
        </section>
        <Toaster />
      </main>
    </>
  );
}
