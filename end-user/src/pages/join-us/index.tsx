import React, { JSX } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaUserTie, FaCheckCircle } from "react-icons/fa";
import { FaBuilding, FaArrowRight } from "react-icons/fa6";
import PageHero from "@/components/ui/PageHero";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function JoinUs(): JSX.Element {
  return (
    <>
      <Head>
        <title>SPAS | Join Us</title>
        <link rel="icon" href="/asset-logo.png" />
        <meta name="author" content="SPAS" />
        <meta name="title" content="Become a Member | Join SPAS Community" />
        <meta
          name="description"
          content="Our community membership gives you access to first-hand information and networking within the industry. Sign-up now!"
        />
        <meta name="keywords" content="spa, services, membership, join us" />
      </Head>

      <main className="bg-slate-50 min-h-screen pb-10">
        <PageHero
          badgeText="Join The Community"
          title="Become a Member"
          subtitle="Choose your path below and gain access to first-hand industry information, exclusive events, and vast networking opportunities."
        />

        <section className="py-20 lg:py-28 relative overflow-hidden">
          {/* Subtle background decorators */}
          <div className="absolute top-10 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            >
              {/* Spa Therapist Card */}
              <motion.div variants={cardVariants} className="h-full">
                <Link
                  href="/join-us/spa-therapist"
                  className="group flex flex-col h-full bg-white rounded-3xl p-8 lg:p-12 border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150" />
                  
                  <div className="relative z-10 flex-1 flex flex-col items-start">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-400 group-hover:-translate-y-1">
                      <FaUserTie className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-400" />
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 transition-colors group-hover:text-primary">
                      Spa Therapist
                    </h3>
                    <p className="text-slate-500 mb-8 leading-relaxed">
                      Validate your skills, gain industry recognition, and explore endless opportunities to grow your career as a professional spa therapist.
                    </p>
                    
                    <ul className="mb-10 space-y-3">
                      {["Professional Networking", "Career Opportunities", "Skill Validation", "Expert Resources"].map((item) => (
                        <li key={item} className="flex items-center gap-x-3 text-sm text-slate-600">
                          <FaCheckCircle className="text-primary/70 w-4 h-4" /> {item}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-6 border-t border-slate-100 w-full">
                      <span className="inline-flex items-center gap-x-2 text-primary font-semibold group-hover:gap-x-4 transition-all duration-300">
                        Sign Up as Therapist <FaArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Spa Operator Card */}
              <motion.div variants={cardVariants} className="h-full">
                <Link
                  href="/join-us/spa-operator"
                  className="group flex flex-col h-full bg-white rounded-3xl p-8 lg:p-12 border border-slate-100 shadow-sm hover:shadow-xl hover:border-secondary/20 transition-all duration-500 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-secondary/5 transition-transform duration-500 group-hover:scale-150" />
                  
                  <div className="relative z-10 flex-1 flex flex-col items-start">
                    <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-8 group-hover:bg-secondary group-hover:shadow-lg group-hover:shadow-secondary/30 transition-all duration-400 group-hover:-translate-y-1">
                      <FaBuilding className="w-7 h-7 text-secondary group-hover:text-white transition-colors duration-400" />
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 transition-colors group-hover:text-secondary">
                      Spa Operator
                    </h3>
                    <p className="text-slate-500 mb-8 leading-relaxed">
                      Elevate your spa & wellness business. Expand your network, protect your business entities, and connect with fellow industry leaders.
                    </p>

                    <ul className="mb-10 space-y-3">
                      {["Business Protection", "Industry Representation", "Marketing Opportunities", "Exclusive Partnerships"].map((item) => (
                        <li key={item} className="flex items-center gap-x-3 text-sm text-slate-600">
                          <FaCheckCircle className="text-secondary/70 w-4 h-4" /> {item}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-6 border-t border-slate-100 w-full">
                      <span className="inline-flex items-center gap-x-2 text-secondary font-semibold group-hover:gap-x-4 transition-all duration-300">
                        Sign Up as Operator <FaArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-16 text-center bg-white border border-slate-200 py-8 px-6 rounded-2xl max-w-xl mx-auto shadow-sm"
            >
              <h4 className="text-lg font-semibold text-slate-900 mb-2">Already a member?</h4>
              <p className="text-slate-500 text-sm mb-4">Log in to access your dashboard and profile.</p>
              <Link
                href="/auth/sign-in"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-primary transition-colors"
              >
                Sign in to your account
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}