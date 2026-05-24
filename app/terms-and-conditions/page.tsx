"use client";

import { motion } from "framer-motion";
import {
  FileText,
  CalendarCheck,
  PawPrint,
  Volume2,
  Clock,
  CalendarX2,
  UserCheck,
  Ban,
  Shield,
  Scale,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const rules = [
  {
    icon: PawPrint,
    title: "No Pets Allowed",
    body: "To protect guests with allergies and maintain the villa's condition, pets of any kind are strictly not permitted on the property.",
  },
  {
    icon: Volume2,
    title: "Quiet Hours",
    body: "Quiet hours are observed between 10 PM and 8 AM. Loud music, amplified sound, or events require prior written permission from management.",
  },
  {
    icon: Ban,
    title: "No Smoking Indoors",
    body: "Smoking is prohibited inside all indoor spaces including bedrooms, bathrooms, and common areas. Designated outdoor areas are available.",
  },
  {
    icon: UserCheck,
    title: "Occupancy Limit",
    body: "The villa has a strict maximum occupancy as stated in your booking confirmation. Exceeding this limit is not permitted without prior approval.",
  },
];

const checkPolicy = [
  {
    icon: Clock,
    title: "Check-In",
    body: "Standard check-in time is 2:00 PM. Early check-in may be arranged subject to availability and may incur an additional fee.",
  },
  {
    icon: Clock,
    title: "Check-Out",
    body: "Check-out is at 11:00 AM. Late check-out requests must be made in advance and are subject to availability and an additional fee.",
  },
];

const cancellationTiers = [
  {
    label: "30+ Days Before",
    detail: "Full refund of the booking amount, less any transaction fees.",
    color: "bg-[#f0faf3] border-[#b7dfc4]",
    textColor: "text-[#2a6b3c]",
  },
  {
    label: "14–29 Days Before",
    detail: "50% refund of the total booking amount.",
    color: "bg-[#fffbeb] border-[#f0d080]",
    textColor: "text-[#7a5c00]",
  },
  {
    label: "Less Than 14 Days",
    detail: "Non-refundable. The full booking amount is retained.",
    color: "bg-[#fff4f4] border-[#f0b0b0]",
    textColor: "text-primary",
  },
];

const prohibited = [
  "Commercial photography, film, or media production without written consent",
  "Sub-letting or re-renting the property to third parties",
  "Illegal activities of any nature on the premises",
  "Unauthorized gatherings or events beyond the confirmed guest count",
  "Alteration or removal of any villa furnishings or fixtures",
];

export default function TermsAndConditions() {
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
            Legal Information
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-primary text-5xl font-black leading-tight text-white md:text-6xl"
          >
            Terms &amp; Conditions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 font-secondary text-[17px] leading-7 text-white/75"
          >
            Please read these terms carefully before making a reservation at
            Premo Heritage Villa.
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
            Overview
          </p>
          <h2 className="mb-6 font-primary text-4xl font-black leading-tight text-primary md:text-5xl">
            Our Agreement With You
          </h2>
          <p className="font-secondary text-[17px] leading-8 text-[#6f655b]">
            These Terms &amp; Conditions govern your use of the Premo Heritage
            Villa website (premoheritage.com) and your stay at our property
            located in Talpe, Sri Lanka. By making a reservation or accessing
            our website, you agree to be bound by these terms. Premo Heritage
            Villa reserves the right to update these terms at any time; the
            version in effect at the time of your booking will apply to your
            stay.
          </p>
        </motion.div>
      </section>

      {/* ── BOOKING & RESERVATIONS ── */}
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
              Reservations
            </p>
            <h2 className="mb-5 font-primary text-4xl font-black leading-tight text-primary md:text-5xl">
              Booking &amp; Reservations
            </h2>
            <p className="max-w-2xl font-secondary text-[17px] leading-8 text-[#6f655b]">
              All bookings are subject to availability and are confirmed only
              upon receipt of a deposit and written confirmation from Premo
              Heritage Villa management.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-6 sm:grid-cols-2"
          >
            {[
              {
                icon: CalendarCheck,
                title: "Age Requirement",
                body: "The primary guest making the reservation must be at least 18 years of age. A valid government-issued ID may be required at check-in.",
              },
              {
                icon: FileText,
                title: "Booking Confirmation",
                body: "A booking is only confirmed upon receipt of the required deposit and a written confirmation email from our team. Verbal agreements are not binding.",
              },
              {
                icon: Shield,
                title: "Security Deposit",
                body: "A refundable security deposit is required at check-in. This will be returned within 5 business days of check-out, less any deductions for damages or policy violations.",
              },
              {
                icon: CalendarCheck,
                title: "Minimum Stay",
                body: "A minimum stay of 2 nights applies for all bookings. During peak seasons and holidays, a longer minimum stay may be required.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="flex gap-5 rounded-[12px] border border-[#e8e0d4] bg-white p-7 shadow-[0_8px_30px_rgba(61,38,20,0.05)]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f4f0e8] text-primary">
                  <item.icon className="h-5 w-5" strokeWidth={1.7} />
                </div>
                <div>
                  <h3 className="mb-2 font-primary text-[22px] font-bold text-[#2f2520]">
                    {item.title}
                  </h3>
                  <p className="font-secondary text-[16px] leading-7 text-[#6f655b]">
                    {item.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROPERTY RULES ── */}
      <section className="bg-[#f8f6f2] px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-12"
          >
            <p className="mb-3 font-secondary text-sm uppercase tracking-[0.3em] text-[#C9A84C]">
              House Rules
            </p>
            <h2 className="mb-5 font-primary text-4xl font-black leading-tight text-primary md:text-5xl">
              Property Rules
            </h2>
            <p className="max-w-2xl font-secondary text-[17px] leading-8 text-[#6f655b]">
              These rules exist to preserve the villa&apos;s character, protect all
              guests, and ensure a peaceful experience for everyone on and near
              the property.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {rules.map((rule) => (
              <motion.div
                key={rule.title}
                variants={fadeUp}
                className="rounded-[12px] border border-[#e8e0d4] bg-white px-7 py-9 text-center transition-all duration-500 hover:-translate-y-1 hover:border-[#d4c4a8] hover:shadow-[0_18px_40px_rgba(61,38,20,0.1)]"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#f4f0e8] text-primary">
                  <rule.icon className="h-6 w-6" strokeWidth={1.7} />
                </div>
                <h3 className="mb-3 font-primary text-[22px] font-bold text-[#2f2520]">
                  {rule.title}
                </h3>
                <p className="font-secondary text-[15px] leading-7 text-[#6f655b]">
                  {rule.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CHECK-IN / CHECK-OUT ── */}
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
              Arrival &amp; Departure
            </p>
            <h2 className="mb-5 font-primary text-4xl font-black leading-tight text-primary md:text-5xl">
              Check-In &amp; Check-Out
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-6 sm:grid-cols-2"
          >
            {checkPolicy.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex gap-5 rounded-[12px] border border-[#e8e0d4] bg-[#fffdf9] p-8"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                  <item.icon className="h-5 w-5" strokeWidth={1.7} />
                </div>
                <div>
                  <h3 className="mb-2 font-primary text-[22px] font-bold text-primary">
                    {item.title}
                  </h3>
                  <p className="font-secondary text-[16px] leading-7 text-[#6f655b]">
                    {item.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CANCELLATION POLICY ── */}
      <section className="bg-[#f8f6f2] px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-12"
          >
            <p className="mb-3 font-secondary text-sm uppercase tracking-[0.3em] text-[#C9A84C]">
              Refunds
            </p>
            <h2 className="mb-5 font-primary text-4xl font-black leading-tight text-primary md:text-5xl">
              Cancellation Policy
            </h2>
            <p className="max-w-2xl font-secondary text-[17px] leading-8 text-[#6f655b]">
              Cancellations must be submitted in writing via email to
              premoheritage@gmail.com. The following schedule applies based on
              the number of days prior to the check-in date.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mb-10 grid gap-5 sm:grid-cols-3"
          >
            {cancellationTiers.map((tier) => (
              <motion.div
                key={tier.label}
                variants={fadeUp}
                className={`rounded-[12px] border p-7 ${tier.color}`}
              >
                <div className="mb-1 flex items-center gap-2">
                  <CalendarX2 className={`h-5 w-5 ${tier.textColor}`} strokeWidth={1.7} />
                  <span className={`font-secondary text-sm font-semibold uppercase tracking-[0.15em] ${tier.textColor}`}>
                    {tier.label}
                  </span>
                </div>
                <p className="mt-3 font-secondary text-[16px] leading-7 text-[#5d5148]">
                  {tier.detail}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-[12px] border border-[#ddd6cb] bg-white p-7 shadow-[0_8px_30px_rgba(61,38,20,0.06)]"
          >
            <h3 className="mb-3 font-primary text-[22px] font-bold text-[#2f2520]">
              Force Majeure
            </h3>
            <p className="font-secondary text-[16px] leading-7 text-[#6f655b]">
              In the event of cancellation due to circumstances beyond our
              reasonable control — including but not limited to natural
              disasters, government travel restrictions, or public health
              emergencies — Premo Heritage Villa will offer guests a full credit
              note valid for 12 months from the original booking date, or a
              refund at management&apos;s discretion.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── GUEST RESPONSIBILITIES ── */}
      <section className="bg-white px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-10"
          >
            <p className="mb-3 font-secondary text-sm uppercase tracking-[0.3em] text-[#C9A84C]">
              Guest Conduct
            </p>
            <h2 className="mb-5 font-primary text-4xl font-black leading-tight text-primary md:text-5xl">
              Guest Responsibilities
            </h2>
            <p className="max-w-2xl font-secondary text-[17px] leading-8 text-[#6f655b]">
              Guests are responsible for the care of the property during their
              stay. Any damage caused by guests or their visitors will be
              assessed and deducted from the security deposit, with any excess
              costs billed directly to the lead guest.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── PROHIBITED ACTIVITIES ── */}
      <section className="bg-[#f1eee9] px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-10"
          >
            <p className="mb-3 font-secondary text-sm uppercase tracking-[0.3em] text-[#C9A84C]">
              Restrictions
            </p>
            <h2 className="mb-6 font-primary text-4xl font-black leading-tight text-primary md:text-5xl">
              Prohibited Activities
            </h2>
          </motion.div>

          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-4"
          >
            {prohibited.map((item) => (
              <motion.li
                key={item}
                variants={fadeUp}
                className="flex items-start gap-4 rounded-[10px] border border-[#e8e0d4] bg-white px-6 py-5"
              >
                <Ban className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={1.7} />
                <span className="font-secondary text-[16px] leading-7 text-[#5d5148]">
                  {item}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ── LIABILITY & GOVERNING LAW ── */}
      <section className="bg-white px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-8 md:grid-cols-2"
          >
            <motion.div variants={fadeUp} className="rounded-[12px] border border-[#e8e0d4] bg-[#fffdf9] p-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#f4f0e8] text-primary">
                <Shield className="h-5 w-5" strokeWidth={1.7} />
              </div>
              <h3 className="mb-4 font-primary text-[26px] font-bold text-[#2f2520]">
                Limitation of Liability
              </h3>
              <p className="font-secondary text-[16px] leading-7 text-[#6f655b]">
                Premo Heritage Villa shall not be liable for any personal injury,
                loss of property, or other damages sustained by guests or their
                visitors during their stay, except where caused by our gross
                negligence or willful misconduct. Guests are encouraged to
                obtain travel insurance to cover personal belongings and medical
                emergencies.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="rounded-[12px] border border-[#e8e0d4] bg-[#fffdf9] p-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#f4f0e8] text-primary">
                <Scale className="h-5 w-5" strokeWidth={1.7} />
              </div>
              <h3 className="mb-4 font-primary text-[26px] font-bold text-[#2f2520]">
                Governing Law
              </h3>
              <p className="font-secondary text-[16px] leading-7 text-[#6f655b]">
                These Terms &amp; Conditions are governed by and construed in
                accordance with the laws of Sri Lanka. Any disputes arising out
                of or in connection with these terms shall be subject to the
                exclusive jurisdiction of the courts of Sri Lanka. By making a
                reservation, you agree to submit to this jurisdiction.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── LAST UPDATED ── */}
      <section className="bg-[#f8f6f2] px-6 py-10 text-center md:px-10">
        <p className="font-secondary text-[14px] text-[#9c9188]">
          Last updated: May 2025 &nbsp;·&nbsp; For enquiries, contact us at{" "}
          <a
            href="mailto:premoheritage@gmail.com"
            className="text-primary underline underline-offset-2 hover:opacity-75"
          >
            premoheritage@gmail.com
          </a>
        </p>
      </section>

    </main>
  );
}
