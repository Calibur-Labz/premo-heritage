"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { BLUR_DATA_URL } from "@/app/lib/blur";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Animation */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0"
      >
        {/* <Image
          src="/hero/contactPage.jpeg"
          alt="Premo Heritage Villa luxury beachfront view"
          fill
          priority
          className="object-cover"
        /> */}

        {/* Desktop Image */}
        <Image
          src="/hero/contactPage.jpeg"
          alt="Premo Heritage Villa luxury beachfront view"
          fill
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          sizes="100vw"
          className="hidden object-cover md:block"
        />

        {/* Mobile Image */}
        <Image
          src="/hero/mobile/contactPageMob.jpeg"
          alt="Premo Heritage Villa luxury beachfront view"
          fill
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          sizes="100vw"
          className="object-cover md:hidden"
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl"
        >
          <h1 className="font-primary text-5xl font-black leading-tight text-white md:text-6xl">
            We&apos;re Here to Help
          </h1>

          <p className="mx-auto mt-6 max-w-2xl font-secondary text-sm leading-7 text-gray-200 md:text-base">
            Have questions about your stay? Our dedicated team is ready to
            assist you with reservations, special requests, and any inquiries
            about Premo Heritage Villa.
          </p>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center">
          <span className="mb-3 font-secondary text-[15px] uppercase tracking-[0.3em] text-white/80">
            Scroll Down
          </span>

          <ChevronDown className="h-8 w-8 text-white" strokeWidth={1.5} />
        </div>
      </div>
    </section>
  );
}
