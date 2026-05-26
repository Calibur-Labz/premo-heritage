"use client";

import { MapPin, ArrowRight } from "lucide-react";

const villaAddressLines = [
  "Premo Heritage Villa,",
  "Heenatigala, Talpe, ",
  "Galle, Sri Lanka",
];

const villaMapEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.877004170163!2d80.27816!3d6.0116216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae16d24d19205f5%3A0x2b2ea07b710ad9c8!2sPremo%20Heritage%20Villa!5e0!3m2!1sen!2slk!4v1779358571833!5m2!1sen!2slk";

const villaDirectionsUrl =
  "https://maps.app.goo.gl/73vQBTYxdccDLSNp6";

export default function VillaLocationSection() {
  return (
    <section className="bg-[#f1eee9] px-6 py-14 sm:py-16 md:px-10 lg:px-0 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.62fr_1.38fr] lg:gap-20">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="mb-4 flex h-9 w-9 items-center justify-center text-primary md:mb-5">
            <MapPin className="h-7 w-7" strokeWidth={1.8} />
          </div>

          <h2 className="font-primary text-4xl font-black text-primary md:text-5xl tracking-tight">
            The Villa Location
          </h2>

          <address className="mt-4 not-italic font-secondary text-[16px] font-medium leading-relaxed text-gray-800 sm:text-[18px] sm:leading-8 md:mt-6">
            {villaAddressLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </address>

          <a
            href={villaDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center gap-2 border-b border-primary pb-1 font-secondary font-semibold text-[15px] uppercase tracking-[0.08em] text-primary transition duration-300 hover:text-[#6f1111] hover:border-[#6f1111] md:mt-8 md:text-[16px]"
          >
            Get Directions
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        <div className="w-full overflow-hidden rounded-[4px] shadow-[0_12px_32px_rgba(61,38,20,0.08)] md:shadow-[0_18px_45px_rgba(61,38,20,0.12)]">
          <iframe
            title="Premo Heritage Villa location on Google Maps"
            src={villaMapEmbedUrl}
            className="h-[280px] w-full border-0 sm:h-[340px] md:h-[380px]"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
