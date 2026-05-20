"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";

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
        <Image
          src="/hero/bookingPage.jpeg"
          alt="Premo Heritage Villa luxury beachfront view"
          fill
          priority
          className="hidden object-cover md:block"
        />

        {/* Mobile Image */}
        <Image
          src="/hero/mobile/bookingPageMob.jpeg"
          alt="Premo Heritage Villa luxury beachfront view"
          fill
          priority
          className="object-cover md:hidden"
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Decorative subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl"
        >
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-5 py-2 backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#C9A84C]" />
            <span className="font-secondary text-[11px] uppercase tracking-[0.3em] text-white/90">
              Reservations Opening Soon
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-primary text-6xl font-black leading-tight text-white md:text-7xl lg:text-8xl"
          >
            Coming Soon
          </motion.h1>

          {/* Decorative Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mx-auto mt-8 flex items-center justify-center gap-3"
          >
            <span className="h-px w-12 bg-white/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#C9A84C]" />
            <span className="h-px w-12 bg-white/40" />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mx-auto mt-8 max-w-2xl font-secondary text-sm leading-8 text-white/80 md:text-base"
          >
            Our online booking experience is being crafted with the same care
            and attention as the villa itself. In the meantime, please reach out
            to us directly to reserve your heritage stay.
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 animate-bounce sm:bottom-8 md:bottom-10">
        <div className="flex flex-col items-center">
          <span className="mb-3 font-secondary text-xs uppercase tracking-[0.3em] text-white/80 sm:text-sm">
            Scroll Down
          </span>

          <ChevronDown
            className="h-6 w-6 text-white md:h-8 md:w-8"
            strokeWidth={1.5}
          />
        </div>
      </div>
    </section>
  );
}
