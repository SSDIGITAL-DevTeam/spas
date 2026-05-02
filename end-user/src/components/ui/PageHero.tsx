import React, { JSX, ReactNode } from "react";
import { motion } from "framer-motion";

type PageHeroProps = {
  badgeText?: string;
  title: string;
  subtitle: ReactNode;
  imagePath?: string;
  children?: ReactNode;
};

export default function PageHero({
  badgeText,
  title,
  subtitle,
  imagePath,
  children,
}: PageHeroProps): JSX.Element {
  if (imagePath) {
    return (
      <header className="relative">
        <div
          className="relative bg-center bg-cover"
          style={{ backgroundImage: `url('${imagePath}')` }}
        >
          <div className="absolute inset-0 bg-secondary/70" />
          <div className="relative z-10 text-white text-center pt-40 pb-20 lg:pt-48 lg:pb-28 space-y-6 px-4">
            {badgeText && (
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block bg-white/15 text-white text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider border border-white/20"
              >
                {badgeText}
              </motion.span>
            )}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold"
            >
              {title}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:w-3/5 mx-auto text-white/85 leading-relaxed text-lg"
            >
              {subtitle}
            </motion.div>
            {children}
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="pt-32 lg:pt-40 pb-16 lg:pb-24 border-b border-slate-200 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col gap-y-5">
          {badgeText && (
            <span className="inline-flex w-max items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              {badgeText}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 max-w-3xl">
            {title}
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
          {children}
        </div>
      </div>
    </header>
  );
}
