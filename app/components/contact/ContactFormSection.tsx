"use client";

import { useState, type FormEvent } from "react";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  WhatsappIcon,
  TripadvisorIcon,
} from "./icons/SocialIcons";

const contactDetails = [
  {
    title: "Our Location",
    lines: ["Premo Heritage,", "Heenatigala, Talpe 80615,", "Sri Lanka"],
    Icon: MapPin,
  },
  {
    title: "Phone Number",
    lines: ["+61 424 306 604"],
    Icon: Phone,
  },
  {
    title: "Email Address",
    lines: ["premoheritage@gmail.com"],
    Icon: Mail,
  },
];

const socialLinks = [
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  // { label: "Tripadvisor", href: "#", Icon: TripadvisorIcon },
  // { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "WhatsApp", href: "+61 424 306 604", Icon: WhatsappIcon },
];

export default function ContactFormSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    setStatus("sending");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? "Unable to send your message.");
      }

      form.reset();
      setStatus("success");
      setStatusMessage("Thank you. Your message has been sent.");
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Unable to send your message. Please try again.",
      );
    }
  }

  return (
    <section className="bg-[#fbfaf7] py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl overflow-hidden border border-[#eee4da] bg-white shadow-[0_12px_35px_rgba(61,38,20,0.05)] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="px-8 py-12 sm:px-12 lg:px-16">
          <h2 className="font-primary text-3xl font-black text-primary md:text-4xl">
            Contact Details
          </h2>

          <div className="mt-10 space-y-8">
            {contactDetails.map((detail) => {
              const { Icon } = detail;
              return (
                <div key={detail.title} className="flex gap-5">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[8px] bg-[#f4f1ec] text-primary">
                    <Icon className="h-6 w-6" strokeWidth={1.7} />
                  </div>

                  <div className="pt-1">
                    <h3 className="font-primary text-[24px] font-bold leading-none text-[#2f2520]">
                      {detail.title}
                    </h3>

                    <div className="mt-2 font-secondary text-[18px] font-medium leading-8 text-gray-800">
                      {detail.lines.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-14">
            <p className="font-secondary text-[15px] font-bold uppercase tracking-[0.18em] text-[#5d5148]">
              Follow the Journey
            </p>

            <div className="mt-4 flex gap-4">
              {socialLinks.map((link) => {
                const { Icon } = link;
                return (
                <a  
                    key={link.label}
                    href={link.href}
                    aria-label={link.label}
                    className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-[#ead8d0] text-[#2f2520] transition duration-300 hover:border-[#8B1A1A] hover:bg-[#8B1A1A] hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-[#f5f2ed] px-8 py-12 sm:px-12 lg:px-16">
          <h2 className="font-primary text-3xl font-black text-primary md:text-4xl">
            Send a Message
          </h2>

          <form className="mt-9 space-y-7" onSubmit={handleSubmit}>
            <div className="grid gap-7 md:grid-cols-2">
              <label className="block">
                <span className="font-primary text-[15px] font-bold uppercase tracking-[0.22em] text-[#7c6d63]">
                  Full Name
                </span>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Your Name"
                  autoComplete="name"
                  required
                  className="mt-2 h-12 w-full border border-[#e7d1c8] bg-transparent px-4 font-secondary text-base font-medium text-gray-800 outline-none transition placeholder:text-[#9c9188] focus:border-primary"
                />
              </label>

              <label className="block">
                <span className="font-primary text-[15px] font-bold uppercase tracking-[0.22em] text-[#7c6d63]">
                  Email Address
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="email@example.com"
                  autoComplete="email"
                  required
                  className="mt-2 h-12 w-full border border-[#e7d1c8] bg-transparent px-4 font-secondary text-base font-medium text-gray-800 outline-none transition placeholder:text-[#9c9188] focus:border-primary"
                />
              </label>
            </div>

            <label className="block">
              <span className="font-primary text-[15px] font-bold uppercase tracking-[0.22em] text-[#7c6d63]">
                Phone Number
              </span>
              <input
                type="tel"
                name="phone"
                placeholder="+94 XX XXX XXXX"
                autoComplete="tel"
                required
                className="mt-2 h-12 w-full border border-[#e7d1c8] bg-transparent px-4 font-secondary text-base font-medium text-gray-800 outline-none transition placeholder:text-[#9c9188] focus:border-primary"
              />
            </label>

            <label className="block">
              <span className="font-primary text-[15px] font-bold uppercase tracking-[0.22em] text-[#7c6d63]">
                Message
              </span>
              <textarea
                name="message"
                placeholder="How can we assist you today?"
                rows={5}
                required
                className="mt-2 w-full resize-none border border-[#e7d1c8] bg-transparent px-4 py-3 font-secondary text-base font-medium text-gray-800 outline-none transition placeholder:text-[#9c9188] focus:border-primary"
              />
            </label>

            <button
              type="submit"
              disabled={status === "sending"}
              className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-sm bg-[#8B1A1A] px-10 py-4 font-secondary text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all duration-500 hover:bg-[#6f1515] sm:w-auto"
            >
              <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[150%]" />

              <span className="relative z-10 flex items-center gap-3">
                {status === "sending" ? "Sending..." : "Send Inquiry"}
                <ArrowRight className="h-4 w-4" />
              </span>
            </button>

            {statusMessage ? (
              <p
                className={`font-secondary text-sm font-semibold ${
                  status === "success" ? "text-green-700" : "text-red-700"
                }`}
                role="status"
              >
                {statusMessage}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
