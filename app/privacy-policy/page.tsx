"use client";

import { motion, Variants } from "framer-motion";
import {
  UserCheck,
  Mail,
  Lock,
  Cookie,
  Share2,
  ShieldCheck,
  Database,
  Eye,
  Info,
  Globe,
} from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const dataCollected = [
  {
    icon: UserCheck,
    title: "Personal Details",
    body: "Full name, email address, phone number, and nationality — provided during booking or enquiry submission.",
  },
  {
    icon: Database,
    title: "Booking Information",
    body: "Check-in and check-out dates, number of guests, special requests, and stay preferences.",
  },
  {
    icon: Lock,
    title: "Payment Data",
    body: "Payment is processed via secure third-party gateways. We do not store full card numbers or banking details on our servers.",
  },
  {
    icon: Globe,
    title: "Technical Data",
    body: "IP address, browser type, device information, and pages visited — collected automatically for security and analytics.",
  },
];

const dataUses = [
  "Process and manage your reservation",
  "Send booking confirmations, receipts, and pre-arrival information",
  "Respond to enquiries and provide customer support",
  "Improve our website experience and services",
  "Comply with legal and regulatory obligations",
  "Send occasional updates or offers (only with your consent)",
];

const cookieTypes = [
  {
    name: "Essential Cookies",
    description:
      "Required for the website to function correctly. These cannot be disabled as they enable core features such as page navigation and form submissions.",
    required: true,
  },
  {
    name: "Analytics Cookies",
    description:
      "Help us understand how visitors interact with our website by collecting anonymous usage statistics. You may opt out of these at any time via your browser settings.",
    required: false,
  },
];

const yourRights = [
  {
    icon: Eye,
    title: "Right to Access",
    body: "You may request a copy of the personal data we hold about you at any time.",
  },
  {
    icon: UserCheck,
    title: "Right to Correction",
    body: "If any information we hold is inaccurate or incomplete, you have the right to have it corrected.",
  },
  {
    icon: Database,
    title: "Right to Deletion",
    body: 'You may request that we delete your personal data ("right to be forgotten"), subject to legal retention requirements.',
  },
  {
    icon: Info,
    title: "Right to Object",
    body: "You may object to the processing of your data for direct marketing purposes at any time.",
  },
];

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white text-[#433227]">

      {/* ── HERO ── */}
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

      {/* ── INTRODUCTION ── */}
      <section className="bg-[#fffdf9] px-6 py-20 md:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-4 font-secondary text-sm uppercase tracking-[0.3em] text-[#C9A84C]">
            Introduction
          </p>
          <h2 className="mb-6 font-primary text-4xl font-black leading-tight text-primary md:text-5xl">
            How We Handle Your Data
          </h2>
          <p className="font-secondary text-[17px] leading-8 text-[#6f655b]">
            Premo Heritage Villa (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) operates the website
            premoheritage.com and provides luxury villa accommodation in Talpe,
            Sri Lanka. This Privacy Policy explains what personal data we
            collect, why we collect it, how it is used, and the rights you have
            regarding your information. By using our website or making a
            reservation, you consent to the practices described herein.
          </p>
        </motion.div>
      </section>

      {/* ── INFORMATION WE COLLECT ── */}
      <section className="bg-white px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-12"
          >
            <p className="mb-3 font-secondary text-sm uppercase tracking-[0.3em] text-[#C9A84C]">
              Data Collection
            </p>
            <h2 className="mb-5 font-primary text-4xl font-black leading-tight text-primary md:text-5xl">
              Information We Collect
            </h2>
            <p className="max-w-2xl font-secondary text-[17px] leading-8 text-[#6f655b]">
              We collect only the information necessary to provide our services
              and improve your experience. Data is collected directly from you
              or automatically when you visit our website.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {dataCollected.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="rounded-[12px] border border-[#e8e0d4] bg-white px-7 py-9 text-center transition-all duration-500 hover:-translate-y-1 hover:border-[#d4c4a8] hover:shadow-[0_18px_40px_rgba(61,38,20,0.1)]"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#f4f0e8] text-primary">
                  <item.icon className="h-6 w-6" strokeWidth={1.7} />
                </div>
                <h3 className="mb-3 font-primary text-[22px] font-bold text-[#2f2520]">
                  {item.title}
                </h3>
                <p className="font-secondary text-[15px] leading-7 text-[#6f655b]">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HOW WE USE YOUR DATA ── */}
      <section className="bg-[#f8f6f2] px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-10"
          >
            <p className="mb-3 font-secondary text-sm uppercase tracking-[0.3em] text-[#C9A84C]">
              Data Usage
            </p>
            <h2 className="mb-5 font-primary text-4xl font-black leading-tight text-primary md:text-5xl">
              How We Use Your Data
            </h2>
            <p className="max-w-2xl font-secondary text-[17px] leading-8 text-[#6f655b]">
              Your data is used solely to deliver and improve our services. We
              will never sell your personal information to third parties.
            </p>
          </motion.div>

          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {dataUses.map((use) => (
              <motion.li
                key={use}
                variants={fadeUp}
                className="flex items-start gap-4 rounded-[10px] border border-[#e8e0d4] bg-white px-6 py-5"
              >
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={1.7} />
                <span className="font-secondary text-[16px] leading-7 text-[#5d5148]">
                  {use}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ── COOKIE POLICY ── */}
      <section className="bg-white px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-12"
          >
            <p className="mb-3 font-secondary text-sm uppercase tracking-[0.3em] text-[#C9A84C]">
              Cookies
            </p>
            <h2 className="mb-5 font-primary text-4xl font-black leading-tight text-primary md:text-5xl">
              Cookie Policy
            </h2>
            <p className="max-w-2xl font-secondary text-[17px] leading-8 text-[#6f655b]">
              Our website uses cookies to ensure it functions correctly and to
              help us understand how it is used. We do not use tracking cookies
              for advertising, and we never sell cookie data to third parties.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-6 sm:grid-cols-2"
          >
            {cookieTypes.map((c) => (
              <motion.div
                key={c.name}
                variants={fadeUp}
                className="flex gap-5 rounded-[12px] border border-[#e8e0d4] bg-[#fffdf9] p-8"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f4f0e8] text-primary">
                  <Cookie className="h-5 w-5" strokeWidth={1.7} />
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-3">
                    <h3 className="font-primary text-[22px] font-bold text-[#2f2520]">
                      {c.name}
                    </h3>
                    <span
                      className={`rounded-full px-2.5 py-0.5 font-secondary text-[11px] uppercase tracking-[0.15em] ${
                        c.required
                          ? "bg-[#f4f0e8] text-primary"
                          : "bg-[#f0f9f4] text-[#2a6b3c]"
                      }`}
                    >
                      {c.required ? "Required" : "Optional"}
                    </span>
                  </div>
                  <p className="font-secondary text-[16px] leading-7 text-[#6f655b]">
                    {c.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── DATA SHARING ── */}
      <section className="bg-[#f8f6f2] px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-8 md:grid-cols-2"
          >
            <motion.div variants={fadeUp} className="rounded-[12px] border border-[#e8e0d4] bg-white p-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#f4f0e8] text-primary">
                <Share2 className="h-5 w-5" strokeWidth={1.7} />
              </div>
              <h3 className="mb-4 font-primary text-[26px] font-bold text-[#2f2520]">
                Data Sharing
              </h3>
              <p className="font-secondary text-[16px] leading-7 text-[#6f655b]">
                We do not sell, trade, or rent your personal data. Your
                information may be shared with trusted third-party payment
                processors solely to complete your transaction. We may also
                disclose data when required by law, a court order, or to protect
                the safety of our guests and staff.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="rounded-[12px] border border-[#e8e0d4] bg-white p-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#f4f0e8] text-primary">
                <Database className="h-5 w-5" strokeWidth={1.7} />
              </div>
              <h3 className="mb-4 font-primary text-[26px] font-bold text-[#2f2520]">
                Data Retention
              </h3>
              <p className="font-secondary text-[16px] leading-7 text-[#6f655b]">
                Booking and transaction records are retained for 7 years to
                comply with financial and legal requirements in Sri Lanka.
                General enquiry data and contact form submissions are deleted
                after 2 years from the date of last interaction unless required
                for an ongoing matter.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── DATA SECURITY ── */}
      <section className="bg-white px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-12"
          >
            <p className="mb-3 font-secondary text-sm uppercase tracking-[0.3em] text-[#C9A84C]">
              Security
            </p>
            <h2 className="mb-5 font-primary text-4xl font-black leading-tight text-primary md:text-5xl">
              Data Security
            </h2>
            <p className="max-w-2xl font-secondary text-[17px] leading-8 text-[#6f655b]">
              We take the security of your personal data seriously and implement
              industry-standard measures to protect it.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-6 sm:grid-cols-3"
          >
            {[
              {
                icon: Lock,
                title: "HTTPS Encryption",
                body: "All data transmitted between your browser and our website is protected using SSL/TLS encryption.",
              },
              {
                icon: ShieldCheck,
                title: "Access Controls",
                body: "Access to customer data is restricted to authorised personnel only, on a strict need-to-know basis.",
              },
              {
                icon: Globe,
                title: "Secure Hosting",
                body: "Our website is hosted on secure, reputable infrastructure with regular security updates and monitoring.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="rounded-[12px] border border-[#e8e0d4] bg-[#fffdf9] px-7 py-9 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(61,38,20,0.08)]"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#f4f0e8] text-primary">
                  <item.icon className="h-6 w-6" strokeWidth={1.7} />
                </div>
                <h3 className="mb-3 font-primary text-[22px] font-bold text-[#2f2520]">
                  {item.title}
                </h3>
                <p className="font-secondary text-[15px] leading-7 text-[#6f655b]">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── YOUR RIGHTS ── */}
      <section className="bg-[#f1eee9] px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-12"
          >
            <p className="mb-3 font-secondary text-sm uppercase tracking-[0.3em] text-[#C9A84C]">
              Your Rights
            </p>
            <h2 className="mb-5 font-primary text-4xl font-black leading-tight text-primary md:text-5xl">
              Your Privacy Rights
            </h2>
            <p className="max-w-2xl font-secondary text-[17px] leading-8 text-[#6f655b]">
              You have the following rights regarding your personal data. To
              exercise any of these rights, please contact us at the email
              address below.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {yourRights.map((right) => (
              <motion.div
                key={right.title}
                variants={fadeUp}
                className="rounded-[12px] border border-[#e8e0d4] bg-white px-7 py-9 transition-all duration-500 hover:-translate-y-1 hover:border-[#d4c4a8] hover:shadow-[0_18px_40px_rgba(61,38,20,0.1)]"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#f4f0e8] text-primary">
                  <right.icon className="h-6 w-6" strokeWidth={1.7} />
                </div>
                <h3 className="mb-3 font-primary text-[22px] font-bold text-[#2f2520]">
                  {right.title}
                </h3>
                <p className="font-secondary text-[15px] leading-7 text-[#6f655b]">
                  {right.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="bg-white px-6 py-20 md:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f4f0e8] text-primary">
            <Mail className="h-7 w-7" strokeWidth={1.7} />
          </div>
          <p className="mb-3 font-secondary text-sm uppercase tracking-[0.3em] text-[#C9A84C]">
            Privacy Enquiries
          </p>
          <h2 className="mb-6 font-primary text-4xl font-black leading-tight text-primary md:text-5xl">
            Contact Us
          </h2>
          <p className="mb-4 font-secondary text-[17px] leading-8 text-[#6f655b]">
            If you have any questions about this Privacy Policy or wish to
            exercise your data rights, please reach out to us directly.
          </p>
          <a
            href="mailto:premoheritage@gmail.com"
            className="group inline-flex items-center gap-2 border-b border-primary pb-1 font-secondary text-[15px] uppercase tracking-[0.08em] text-primary transition hover:text-[#6f1111] hover:border-[#6f1111]"
          >
            premoheritage@gmail.com
          </a>
        </motion.div>
      </section>

      {/* ── LAST UPDATED ── */}
      <section className="bg-[#f8f6f2] px-6 py-10 text-center md:px-10">
        <p className="font-secondary text-[14px] text-[#9c9188]">
          Last updated: May 2025 &nbsp;·&nbsp; This policy applies to all guests and
          visitors of premoheritage.com
        </p>
      </section>

    </main>
  );
}
