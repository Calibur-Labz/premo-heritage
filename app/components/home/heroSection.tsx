import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Mail } from "lucide-react";
import Link from "next/link";
import { BLUR_DATA_URL } from "@/app/lib/blur";

export default function heroSection() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden">
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/hero/homePage.jpeg"
          alt="Premo Heritage Villa luxury beachfront view"
          fill
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          sizes="100vw"
          className="hidden object-cover md:block"
        />

        <Image
          src="/hero/mobile/homePageMob.png"
          alt="Premo Heritage Villa luxury beachfront view"
          fill
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          sizes="100vw"
          className="object-cover md:hidden"
        />
      </motion.div>

      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 flex flex-1 items-center justify-center px-5 pb-20 pt-16 text-center sm:pt-24 md:px-10 md:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-5xl"
        >
          <h1 className="font-primary text-5xl font-black leading-tight text-white sm:text-5xl md:text-7xl">
            Welcome to Premo Heritage
            <br />
            Villa
          </h1>

          <p className="mx-auto mt-6 max-w-3xl font-secondary text-sm leading-8 text-gray-200 md:text-lg">
            Immerse yourself in the timeless elegance of colonial architecture
            blended with authentic Sri Lankan hospitality and modern luxury.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8 md:mt-12">
            <Link href="/booking">
              <button className="group relative flex w-[270px] cursor-pointer items-center justify-center overflow-hidden rounded-sm bg-[#8B1A1A] px-10 py-4 font-secondary text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all duration-500 hover:bg-[#6f1515]">
                <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[150%]" />

                <span className="relative z-10 flex items-center gap-3">
                  Book Your Stay
                  <Calendar
                    size={18}
                    className="transition-transform duration-300"
                  />
                </span>
              </button>
            </Link>

            <Link href="/contact">
              <button className="group relative flex w-[270px] cursor-pointer items-center justify-center overflow-hidden rounded-sm border border-white/30 bg-white/5 px-10 py-4 font-secondary text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all duration-500 hover:bg-black/60">
                <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[150%]" />

                <span className="relative z-10 flex items-center gap-3">
                  Contact Us
                  <Mail
                    size={18}
                    className="transition-transform duration-300"
                  />
                </span>
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-3"
        >
          <span className="font-secondary text-[10px] uppercase tracking-[0.3em] text-white/60">
            Scroll Down
          </span>
          <div className="h-12 w-[1px] bg-gradient-to-b from-white/60 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
