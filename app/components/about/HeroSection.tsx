"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/hero/aboutPage.jpeg"
          alt="Premo Heritage Villa luxury beachfront view"
          fill
          priority
          className="hidden object-cover md:block"
        />

        {/* Mobile Image */}
        <Image
          src="/hero/mobile/aboutUsMob.jpeg"
          alt="Premo Heritage Villa luxury beachfront view"
          fill
          priority
          className="object-cover md:hidden"
        />
      </motion.div>

      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-3xl"
        >
          <h1 className="font-primary text-5xl font-black leading-tight text-white md:text-6xl">
            A Legacy of Culture and Hospitality
          </h1>

          <p className="mx-auto mt-6 max-w-2xl font-secondary text-sm leading-7 text-gray-200 md:text-base">
            Discover the story behind Premo Heritage Villa, where colonial
            elegance meets Sri Lankan tradition, creating an unforgettable
            sanctuary of luxury and culture.
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center">
          <span className="mb-3 font-secondary text-xs uppercase tracking-[0.3em] text-white/80">
            Scroll Down
          </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
