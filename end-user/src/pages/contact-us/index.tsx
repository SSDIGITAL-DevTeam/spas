/* eslint-disable @next/next/no-img-element */
import { FormEvent, JSX, useState } from "react";
import Head from "next/head";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import axios, { AxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import FormInput from "@/components/ui/FormInput";

const topics = [
  { id: 0, name: "Membership" },
  { id: 1, name: "How To Join?" },
  { id: 2, name: "Where do I register?" },
  { id: 3, name: "Is there any requirements?" },
  { id: 4, name: "Any consultations that should I get?" },
];

type ErrorResponse = { errors: { topic: string; fullname: string; email: string; message: string } };

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const inputClass = "w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white";

export default function Contact(): JSX.Element {
  const [selectedTopic, setSelectedTopic] = useState("Membership");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState<ErrorResponse>({} as ErrorResponse);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/end-user/contacts`, {
        topic: selectedTopic,
        fullname,
        email,
        message,
      });
      toast("Form Submitted", {
        position: "bottom-right",
        icon: "✅",
        style: { backgroundColor: "#1975FF", color: "#ffffff", paddingBlock: 12 },
      });
      setSelectedTopic("Membership");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      const err = error as AxiosError;
      setErrMsg(err.response?.data as ErrorResponse);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>SPAS | Contact Us</title>
        <link rel="icon" href="/asset-logo.png" />
        <meta name="author" content="SPAS" />
        <meta name="title" content="SPAS | Contact Us" />
        <meta name="description" content="Let's build something great together. So please do not hesitate to contact us and we will get back to you shortly." />
        <meta name="keywords" content="spa, services, contact-us" />
        <meta name="robots" content="index, follow" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />
        <meta property="og:title" content="SPAS | Contact Us" />
        <meta property="og:description" content="Let's build something great together. So please do not hesitate to contact us and we will get back to you shortly." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_BASE_URL}/asset-logo.png`} />
      </Head>

      <Toaster />

      {/* ── HERO ── */}
      <header className="relative overflow-hidden pt-20">
        <div className="relative bg-[url('/contact-assets/contact.png')] bg-center bg-cover min-h-72">
          <div className="absolute inset-0 bg-secondary/65" />
          <div className="relative z-10 container mx-auto px-4 lg:px-8 py-28">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-block bg-white/15 text-white text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider border border-white/20 mb-4"
            >
              Get In Touch
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white"
            >
              Contact Us
            </motion.h1>
          </div>
        </div>
      </header>

      <main>
        {/* ── CONTACT FORM + INFO ── */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={stagger}
              className="grid grid-cols-1 lg:grid-cols-2 gap-14"
            >
              {/* Form */}
              <motion.div variants={fadeUp} className="space-y-8">
                <div>
                  <p className="text-primary font-semibold text-sm mb-1">Tell Us!</p>
                  <h2 className="section-heading">I want to ask about topic...</h2>
                </div>

                {/* Topic chips */}
                <div className="flex flex-wrap gap-3">
                  {topics.map((topic) => (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => setSelectedTopic(topic.name)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                        topic.name === selectedTopic
                          ? "bg-primary border-primary text-white shadow-sm"
                          : "border-slate-200 text-slate-600 hover:border-primary hover:text-primary"
                      }`}
                    >
                      {topic.name}
                    </button>
                  ))}
                </div>

                <form onSubmit={submitForm} className="space-y-4">
                  <div>
                    {errMsg?.errors?.fullname && <p className="text-xs text-red-500 mb-1">{errMsg.errors.fullname}</p>}
                    <input
                      type="text"
                      placeholder="Full Name"
                      onChange={(e) => setFullname(e.target.value)}
                      name="fullname"
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    {errMsg?.errors?.email && <p className="text-xs text-red-500 mb-1">{errMsg.errors.email}</p>}
                    <input
                      type="email"
                      placeholder="Email Address"
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    {errMsg?.errors?.message && <p className="text-xs text-red-500 mb-1">{errMsg.errors.message}</p>}
                    <textarea
                      rows={5}
                      placeholder="Tell us more about your concern"
                      onChange={(e) => setMessage(e.target.value)}
                      name="message"
                      className={`${inputClass} resize-y min-h-[120px]`}
                    />
                  </div>
                  {errMsg?.errors?.topic && (
                    <p className="text-xs text-red-500">{errMsg.errors.topic}</p>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-secondary text-white font-semibold rounded-xl hover:bg-primary transition-colors disabled:opacity-60"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Now"}
                  </button>
                </form>
              </motion.div>

              {/* Info + Map */}
              <motion.div variants={fadeUp} className="space-y-8">
                <div>
                  <h2 className="section-heading mb-6">Our Company</h2>
                  <ul className="space-y-4">
                    <li>
                      <a href="mailto:hello@spas.com.sg" className="flex items-center gap-x-3 group">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                          <MdOutlineMailOutline className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-slate-600 text-sm group-hover:text-primary transition-colors">hello@spas.com.sg</span>
                      </a>
                    </li>
                    <li>
                      <a href="tel:+6588002950" className="flex items-center gap-x-3 group">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                          <FaPhone className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-slate-600 text-sm group-hover:text-primary transition-colors">+65 8800 2950</span>
                      </a>
                    </li>
                    <li className="flex items-start gap-x-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <IoLocationOutline className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-slate-600 text-sm leading-relaxed pt-2">
                        1100 Lower Delta Rd #02-02B EPL Building Singapore 169206
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8225881637272!2d103.81935817406989!3d1.2800925617979801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da197d54065a13%3A0xceac47e82adb29de!2sEpl%20Building!5e0!3m2!1sen!2sen!4v1710209553304!5m2!1sen!2sen"
                    className="w-full h-80"
                    style={{ border: 0 }}
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
