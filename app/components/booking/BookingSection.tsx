"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, CalendarDays, CheckCircle2, Loader2, AlertCircle, BedDouble, Users } from "lucide-react";
import BookingCalendar from "./BookingCalendar";
import { getBlockedDates, createPendingBooking } from "../../lib/firestore";

const WHATSAPP_NUMBER = "61424306604";

// Villa: 3 Bedroom · sleeps 6
// $60 per night — reduced to $50 per night for stays longer than 7 nights.
const STANDARD_NIGHTLY_RATE = 60;
const LONG_STAY_NIGHTLY_RATE = 50;
const LONG_STAY_THRESHOLD_NIGHTS = 7;

// Published rates shown on the pricing card.
const SINGLE_ROOM_NIGHTLY_RATE = 35;
const FULL_VILLA_NIGHTLY_RATE = 105;
const FULL_VILLA_LONG_STAY_RATE = 95;

function nightlyRate(nights: number) {
  return nights > LONG_STAY_THRESHOLD_NIGHTS ? LONG_STAY_NIGHTLY_RATE : STANDARD_NIGHTLY_RATE;
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function nightsBetween(a: Date, b: Date) {
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

function toLocalDateStr(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// Validation Helpers
const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone: string) => /^\+?[0-9\s\-]{7,15}$/.test(phone);

export default function BookingSection() {
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);

  // Form Fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Touch/Blur States for UX validation
  const [touched, setTouched] = useState({ name: false, phone: false, email: false });

  // System States
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getBlockedDates()
      .then((docs) => setBlockedDates(docs.map((d) => d.date)))
      .catch(() => {});
  }, []);

  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;
  const rate = nightlyRate(nights);
  const total = rate * nights;

  // Validation Logic
  const isNameValid = name.trim().length >= 2;
  const isPhoneValid = validatePhone(phone);
  const isEmailValid = validateEmail(email);
  
  const datesSelected = !!(checkIn && checkOut);
  const formValid = isNameValid && isPhoneValid && isEmailValid && datesSelected;

  async function handleWhatsApp() {
    if (!formValid || !checkIn || !checkOut) {
      // Force trigger all validation errors if they somehow bypass disabled state
      setTouched({ name: true, phone: true, email: true });
      return;
    }
    setLoading(true);
    setError("");

    const message = [
      "Hello! I'd like to book Premo Heritage Villa.",
      `Name: ${name.trim()}`,
      `Check-in: ${formatDate(checkIn)}`,
      `Check-out: ${formatDate(checkOut)}`,
      `Nights: ${nights}`,
      `Rate: $${rate}/night`,
      `Total: $${total}`,
      `Phone: ${phone.trim()}`,
      `Email: ${email.trim()}`,
    ].join("\n");

    try {
      await createPendingBooking({
        guestName: name.trim(),
        guestPhone: phone.trim(),
        guestEmail: email.trim(),
        checkIn: toLocalDateStr(checkIn),
        checkOut: toLocalDateStr(checkOut),
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
    setName(""); 
    setPhone(""); 
    setEmail("");
    setTouched({ name: false, phone: false, email: false });
    setBooked(false); 
    setError("");
  }

  return (
    <section className="bg-white py-20 lg:py-24">
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

        {/* Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl overflow-hidden rounded-sm border border-[#eee4da] bg-[#fbfaf7] shadow-[0_4px_20px_rgba(61,38,20,0.06)]"
        >
          {/* Villa summary */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-b border-[#eee4da] bg-white px-6 py-4">
            <span className="flex items-center gap-2 font-secondary text-s font-medium text-[#7c6d63]">
              <BedDouble className="h-8 w-8 text-[#C9A84C]" strokeWidth={1.7} /> 3 Bedroom Villa
            </span>
            <span className="flex items-center gap-2 font-secondary text-s font-medium text-[#7c6d63]">
              <Users className="h-8 w-8 text-[#C9A84C]" strokeWidth={1.7} /> Sleeps 6
            </span>
          </div>

          {/* Rates */}
          <div className="grid grid-cols-1 divide-y divide-[#eee4da] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="px-5 py-6 text-center">
              <p className="font-secondary text-[13px] uppercase tracking-[0.2em] text-[#9c9188]">
                One Room
              </p>
              <p className="mt-2 font-primary text-3xl font-black text-[#2f2520] lg:text-4xl">
                ${SINGLE_ROOM_NIGHTLY_RATE}
                <span className="ml-1 text-[17px] font-medium text-[#9c9188]">/ night</span>
              </p>
              <p className="mt-1 font-secondary text-s text-[#9c9188]">
                Per bedroom, per night
              </p>
            </div>
            <div className="px-5 py-6 text-center">
              <p className="font-secondary text-[13px] uppercase tracking-[0.2em] text-[#C9A84C]">
                Full Villa
              </p>
              <p className="mt-2 font-primary text-3xl font-black text-[#2f2520] lg:text-4xl">
                ${FULL_VILLA_NIGHTLY_RATE}
                <span className="ml-1 text-[17px] font-medium text-[#9c9188]">/ night</span>
              </p>
              <p className="mt-1 font-secondary text-s text-[#9c9188]">
                All 3 bedrooms
              </p>
            </div>
            <div className="px-5 py-6 text-center">
              <p className="font-secondary text-[13px] uppercase tracking-[0.2em] text-[#4a7c59]">
                Long-Stay Rate
              </p>
              <p className="mt-2 font-primary text-3xl font-black text-[#2f2520] lg:text-4xl">
                ${FULL_VILLA_LONG_STAY_RATE}
                <span className="ml-1 text-[17px] font-medium text-[#9c9188]">/ night</span>
              </p>
              <p className="mt-1 font-secondary text-s text-[#4a7c59]">
                Stays over {LONG_STAY_THRESHOLD_NIGHTS} nights
              </p>
            </div>
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
            <p className="mb-4 flex items-center gap-2 font-secondary text-sm font-medium text-[#7c6d63]">
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
                    className="mt-2 font-secondary text-xs uppercase tracking-widest text-[#8B1A1A] underline underline-offset-4 hover:text-[#6f1515] transition"
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
                  <div className={`rounded-sm border p-4 transition-colors duration-300 ${datesSelected ? 'border-[#e7d1c8] bg-white' : 'border-amber-200 bg-amber-50/50'}`}>
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
                    {nights > 0 ? (
                      <p className="mt-0.5 font-secondary text-xs text-[#C9A84C] font-medium">
                        {nights} night{nights !== 1 ? "s" : ""}
                      </p>
                    ) : (
                      <p className="mt-0.5 font-secondary text-xs text-amber-700 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" /> Please select your dates on the calendar first
                      </p>
                    )}

                    {nights > 0 && (
                      <div className="mt-3 border-t border-[#eee4da] pt-3">
                        <div className="flex items-center justify-between font-secondary text-sm text-[#7c6d63]">
                          <span>
                            ${rate} × {nights} night{nights !== 1 ? "s" : ""}
                          </span>
                          <span className="font-primary text-lg font-bold text-[#2f2520]">
                            ${total}
                          </span>
                        </div>
                        {nights > LONG_STAY_THRESHOLD_NIGHTS && (
                          <p className="mt-1 font-secondary text-[11px] font-medium text-[#4a7c59]">
                            Long-stay rate applied — ${LONG_STAY_NIGHTLY_RATE}/night for stays over {LONG_STAY_THRESHOLD_NIGHTS} nights
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Inputs Container */}
                  <div className="relative">
                    {/* Visual overlay covering inputs if dates aren't selected to nudge user to calendar */}
                    {!datesSelected && (
                      <div className="absolute inset-0 z-10 bg-[#fbfaf7]/60 backdrop-blur-[1px] cursor-not-allowed flex items-center justify-center p-4 text-center" />
                    )}

                    <div className="flex flex-col gap-5">
                      <FormField
                        label="Full Name"
                        type="text"
                        placeholder="Your full name"
                        value={name}
                        onChange={setName}
                        onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
                        error={touched.name && !isNameValid ? "Please enter your name (min 2 characters)" : ""}
                        disabled={!datesSelected}
                      />
                      <FormField
                        label="Phone Number"
                        type="tel"
                        placeholder="+94 XX XXX XXXX"
                        value={phone}
                        onChange={setPhone}
                        onBlur={() => setTouched(prev => ({ ...prev, phone: true }))}
                        error={touched.phone && !isPhoneValid ? "Please enter a valid phone number" : ""}
                        disabled={!datesSelected}
                      />
                      <FormField
                        label="Email Address"
                        type="email"
                        placeholder="email@example.com"
                        value={email}
                        onChange={setEmail}
                        onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                        error={touched.email && !isEmailValid ? "Please enter a valid email address" : ""}
                        disabled={!datesSelected}
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="font-secondary text-sm text-red-600 flex items-center gap-1.5 font-medium bg-red-50 p-3 rounded-sm border border-red-100">
                      <AlertCircle className="h-4 w-4 shrink-0" /> {error}
                    </p>
                  )}

                  {/* WhatsApp Button */}
                  <button
                    onClick={handleWhatsApp}
                    disabled={!formValid || loading}
                    className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-sm bg-[#25D366] px-8 py-4 font-secondary text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#1ebe5d] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                  >
                    <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[150%]" />
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : null}
                    <span className="relative z-10">
                      {loading ? "Saving…" : "Book Now on WhatsApp"}
                    </span>
                  </button>

                  <p className="font-secondary text-[12px] leading-5 text-[#9c9188] text-center sm:text-left">
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

interface FormFieldProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  error?: string;
  disabled?: boolean;
  onChange: (v: string) => void;
  onBlur: () => void;
}

function FormField({
  label, type, placeholder, value, error, disabled, onChange, onBlur
}: FormFieldProps) {
  return (
    <label className="block w-full">
      <div className="flex justify-between items-center mb-2">
        <span className={`font-primary text-[12px] font-bold uppercase tracking-[0.22em] ${disabled ? 'text-gray-400' : 'text-[#7c6d63]'}`}>
          {label}
        </span>
        <AnimatePresence>
          {error && (
            <motion.span 
              initial={{ opacity: 0, x: 5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 5 }}
              className="text-xs font-secondary font-medium text-red-600"
            >
              {error}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        disabled={disabled}
        className={`h-12 w-full border bg-white px-4 font-secondary text-base font-medium text-gray-800 outline-none transition-all placeholder:text-[#c5b9b1]
          ${error 
            ? "border-red-500 focus:border-red-600 bg-red-50/10 focus:ring-1 focus:ring-red-500" 
            : "border-[#e7d1c8] focus:border-[#8B1A1A]"
          } 
          disabled:bg-gray-50 disabled:border-gray-200 disabled:placeholder:text-gray-300 disabled:cursor-not-allowed`}
      />
    </label>
  );
}