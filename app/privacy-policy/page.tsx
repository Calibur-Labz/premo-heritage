"use client";

import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const policies = [
  {
    label: "Welcome",
    body: "Welcome to Premo Heritage Villa. We respect your privacy and are committed to protecting your personal information.",
  },
  {
    label: "Information We Collect",
    body: "We may collect guest details such as name, phone number, email address, identification details, and booking information for reservation and customer service purposes.",
  },
  {
    label: "Data Sharing",
    body: "Your information will not be sold or shared with third parties except when required for payment processing, legal compliance, or booking management.",
  },
  {
    label: "Cookies",
    body: "Our website may use cookies and analytics tools to improve user experience.",
  },
  {
    label: "Agreement",
    body: "By using our website or booking our villa, you agree to this Privacy Policy.",
  },
];

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white text-[#433227]">
      <section className="relative bg-primary px-6 py-32 text-center md:py-40">
        <div className="absolute inset-0 bg-[#6f1515] opacity-40" />
        <div className="relative mx-auto max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 font-secondary text-sm uppercase tracking-[0.3em] text-[#C9A84C]"
          >
            Your Privacy Matters
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-primary text-5xl font-black leading-tight text-white md:text-6xl"
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 font-secondary text-[17px] leading-7 text-white/75"
          >
            We are committed to protecting your personal information and being
            transparent about how we use it.
          </motion.p>
        </div>
      </section>

      <section className="bg-[#fffdf9] px-6 py-20 md:px-10 md:py-24">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {policies.map((item, index) => (
            <motion.div
              key={item.label}
              variants={fadeUp}
              className={`flex flex-col gap-5 rounded-xl border border-[#e8e0d4] bg-white p-8 transition-shadow duration-300 hover:shadow-[0_10px_36px_rgba(61,38,20,0.09)]${
                index === policies.length - 1
                  ? " sm:col-span-2 lg:col-span-1"
                  : ""
              }`}
            >
              <div>
                <h3 className="mb-3 font-primary text-[22px] font-bold tracking-[0.08em] text-[#6f1515]">
                  {item.label}
                </h3>
                <div className="h-[2px] w-8 bg-[#C9A84C]" />
              </div>
              <p className="font-secondary text-[16px] leading-7 text-[#6f655b]">
                {item.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="bg-[#f8f6f2] px-6 py-10 text-center md:px-10">
        <p className="font-secondary text-[14px] text-[#9c9188]">
          Last updated: May 2025 &nbsp;·&nbsp; This policy applies to all guests
          and visitors of premoheritage.com
        </p>
      </section>
    </main>
  );
}
