"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, CalendarDays, CheckCircle2, Loader2 } from "lucide-react";
import BookingCalendar from "./BookingCalendar";
import { getBlockedDates, createPendingBooking } from "../../lib/firestore";

const WHATSAPP_NUMBER = "61424306604";

function formatDate(d: Date) {
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function nightsBetween(a: Date, b: Date) {
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

export default function BookingSection() {
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getBlockedDates()
      .then((docs) => setBlockedDates(docs.map((d) => d.date)))
      .catch(() => {});
  }, []);

  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;
  const formReady = checkIn && checkOut && name.trim() && phone.trim() && email.trim();

  async function handleWhatsApp() {
    if (!formReady || !checkIn || !checkOut) return;
    setLoading(true);
    setError("");

    const message = [
      "Hello! I'd like to book Premo Heritage Villa.",
      `Name: ${name.trim()}`,
      `Check-in: ${formatDate(checkIn)}`,
      `Check-out: ${formatDate(checkOut)}`,
      `Nights: ${nights}`,
      `Phone: ${phone.trim()}`,
      `Email: ${email.trim()}`,
    ].join("\n");

    try {
      await createPendingBooking({
        guestName: name.trim(),
        guestPhone: phone.trim(),
        guestEmail: email.trim(),
        checkIn: checkIn.toISOString().split("T")[0],
        checkOut: checkOut.toISOString().split("T")[0],
        nights,
        whatsappMessage: message,
      });

      setBooked(true);
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
        "_blank",
      );
    } catch {
      setError("Something went wrong. Please try again or contact us directly.");
    } finally {
      setLoading(false);
    }
  }

  function resetBooking() {
    setCheckIn(null);
    setCheckOut(null);
    setName(""); setPhone(""); setEmail("");
    setBooked(false); setError("");
  }

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <span className="font-secondary text-[11px] uppercase tracking-[0.35em] text-[#C9A84C]">
            Reserve Your Dates
          </span>
          <h2 className="font-primary mt-3 text-4xl font-black text-[#2f2520] md:text-5xl">
            Check Availability
          </h2>
          <div className="mx-auto mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#e7d1c8]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#C9A84C]" />
            <span className="h-px w-10 bg-[#e7d1c8]" />
          </div>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 xl:gap-16">
          {/* Left — Calendar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-4 flex items-center gap-2 font-secondary text-sm text-[#7c6d63]">
              <CalendarDays className="h-4 w-4 text-[#C9A84C]" strokeWidth={1.7} />
              {!checkIn
                ? "Select your check-in date"
                : !checkOut
                  ? "Now select your check-out date"
                  : `${formatDate(checkIn)} → ${formatDate(checkOut)} · ${nights} night${nights !== 1 ? "s" : ""}`}
            </p>
            <BookingCalendar
              blockedDates={blockedDates}
              checkIn={checkIn}
              checkOut={checkOut}
              onChange={(ci, co) => { setCheckIn(ci); setCheckOut(co); setBooked(false); }}
            />
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col"
          >
            <AnimatePresence mode="wait">
              {booked ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center gap-5 rounded-sm border border-[#eee4da] bg-[#fbfaf7] p-10 text-center shadow-[0_4px_20px_rgba(61,38,20,0.06)]"
                >
                  <CheckCircle2 className="h-12 w-12 text-[#C9A84C]" strokeWidth={1.5} />
                  <h3 className="font-primary text-2xl font-bold text-[#2f2520]">
                    WhatsApp Opened!
                  </h3>
                  <p className="font-secondary text-sm leading-7 text-[#7c6d63]">
                    Your booking request has been saved. Complete it by sending the pre-filled
                    message on WhatsApp. We'll confirm your dates shortly.
                  </p>
                  <button
                    onClick={resetBooking}
                    className="mt-2 font-secondary text-xs uppercase tracking-widest text-[#8B1A1A] underline underline-offset-4 hover:text-[#6f1515]"
                  >
                    Start a new inquiry
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-6 rounded-sm border border-[#eee4da] bg-[#fbfaf7] p-7 shadow-[0_4px_20px_rgba(61,38,20,0.06)] sm:p-9"
                >
                  <div>
                    <h3 className="font-primary text-2xl font-bold text-[#2f2520]">
                      Your Details
                    </h3>
                    <p className="mt-1 font-secondary text-sm text-[#9c9188]">
                      Fill in your details, then book via WhatsApp.
                    </p>
                  </div>

                  {/* Date summary */}
                  <div className="rounded-sm border border-[#e7d1c8] bg-white p-4">
                    <p className="font-secondary text-xs uppercase tracking-widest text-[#9c9188]">
                      Selected dates
                    </p>
                    <p className="mt-1 font-primary text-lg font-bold text-[#2f2520]">
                      {checkIn && checkOut
                        ? `${formatDate(checkIn)} → ${formatDate(checkOut)}`
                        : checkIn
                          ? `${formatDate(checkIn)} → select check-out`
                          : "No dates selected yet"}
                    </p>
                    {nights > 0 && (
                      <p className="mt-0.5 font-secondary text-xs text-[#C9A84C]">
                        {nights} night{nights !== 1 ? "s" : ""}
                      </p>
                    )}
                  </div>

                  {/* Inputs */}
                  <AnimatePresence>
                    {checkIn && checkOut && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-col gap-5 overflow-hidden"
                      >
                        <FormField
                          label="Full Name"
                          type="text"
                          placeholder="Your full name"
                          value={name}
                          onChange={setName}
                        />
                        <FormField
                          label="Phone Number"
                          type="tel"
                          placeholder="+94 XX XXX XXXX"
                          value={phone}
                          onChange={setPhone}
                        />
                        <FormField
                          label="Email Address"
                          type="email"
                          placeholder="email@example.com"
                          value={email}
                          onChange={setEmail}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {error && (
                    <p className="font-secondary text-sm text-red-600">{error}</p>
                  )}

                  {/* WhatsApp Button */}
                  <button
                    onClick={handleWhatsApp}
                    disabled={!formReady || loading}
                    className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-sm bg-[#25D366] px-8 py-4 font-secondary text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all duration-500 hover:bg-[#1ebe5d] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[150%]" />
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <MessageCircle className="h-4 w-4" />
                    )}
                    <span className="relative z-10">
                      {loading ? "Saving…" : "Book Now on WhatsApp"}
                    </span>
                  </button>

                  <p className="font-secondary text-[11px] leading-5 text-[#9c9188]">
                    Clicking the button will open WhatsApp with your booking details pre-filled.
                    We'll confirm availability within 24 hours.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label, type, placeholder, value, onChange,
}: {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="font-primary text-[13px] font-bold uppercase tracking-[0.22em] text-[#7c6d63]">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 h-12 w-full border border-[#e7d1c8] bg-white px-4 font-secondary text-base font-medium text-gray-800 outline-none transition placeholder:text-[#c5b9b1] focus:border-[#8B1A1A]"
      />
    </label>
  );
}
