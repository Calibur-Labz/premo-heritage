"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BLUR_DATA_URL } from "@/app/lib/blur";

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
          src="/hero/destinationPage.jpeg"
          alt="Luxury tropical destination at Premo Heritage Villa"
          fill
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl"
        >
          <h1 className="font-primary text-5xl font-black leading-tight text-white md:text-6xl">
            Discover Enchanting
            <br />
            Destinations
          </h1>

          <p className="mx-auto mt-6 max-w-2xl font-secondary text-sm leading-7 text-gray-200 md:text-base">
            From pristine beaches to ancient cultural sites, explore the
            breathtaking beauty of Sri Lanka with curated experiences designed
            for unforgettable adventures.
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 animate-bounce sm:bottom-8 md:bottom-10">
        <div className="flex flex-col items-center">
          <span className="mb-3 font-secondary text-xs uppercase tracking-[0.3em] text-white/80">
            Scroll Down
          </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white md:h-8 md:w-8"
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