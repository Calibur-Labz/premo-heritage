"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="bg-[#f8f6f2] px-6 pb-20 pt-0 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mx-auto max-w-6xl rounded-2xl bg-[#7a1a1a] px-6 py-20 text-center shadow-[0_20px_50px_rgba(0,0,0,0.12)] md:px-14 md:py-18"
      >
        <h2 className="font-primary text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
          Begin Your Heritage Journey
        </h2>

        <p className="mx-auto mt-3 max-w-2xl font-secondary text-sm leading-7 text-white/85 md:text-base">
          Reserve your stay and immerse yourself in the soul of Sri Lanka
        </p>

        <div className="mt-6 flex justify-center">
          <Link href="/booking">
            <button className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-sm border border-white/40 bg-white/5 px-10 py-4 font-secondary text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all duration-500 hover:bg-black/30 sm:w-auto">

              <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[150%]" />

              <span className="relative z-10 flex items-center gap-3">
                Book Your Stay
                <Mail size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}