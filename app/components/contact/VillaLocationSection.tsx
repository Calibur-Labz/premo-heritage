"use client";

import { MapPin, ArrowRight } from "lucide-react";

const villaAddressLines = [
  "Henagedara,",
  "Heenatigala, Talpe 80615,",
  "Sri Lanka",
];

const villaMapEmbedUrl =
  "https://maps.google.com/maps?q=Henagedara,Heenatigala,276H%2BM65,Talpe+80615&ll=5.9908,80.2747&z=12&output=embed";

const villaDirectionsUrl = "https://maps.app.goo.gl/CvsWjBJspztTKFcv7";

export default function VillaLocationSection() {
  return (
    // Mobile & Tab: Softened vertical paddings (py-14) and added protective side margins (px-6)
    <section className="bg-[#f1eee9] px-6 py-14 sm:py-16 md:px-10 lg:px-0 lg:py-24">
      {/* Mobile & Tab: Decreased spacing gap between content and the map iframe block from 12 to 8 */}
      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.62fr_1.38fr] lg:gap-20">
        
        {/* Text Details Box */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          {/* Mobile & Tab: Balanced top margin icon spacing */}
          <div className="mb-4 flex h-9 w-9 items-center justify-center text-primary md:mb-5">
            <MapPin className="h-7 w-7" strokeWidth={1.8} />
          </div>

          <h2 className="font-primary text-4xl font-black text-primary md:text-5xl tracking-tight">
  The Villa Location
</h2>

          {/* Mobile & Tab: Slightly reduced font size on phones (text-[16px]) for clean breaks, matches original 18px on tablets up */}
          <address className="mt-4 not-italic font-secondary text-[16px] font-medium leading-relaxed text-gray-800 sm:text-[18px] sm:leading-8 md:mt-6">
            {villaAddressLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </address>

          {/* Touch CTA Link Element */}
          <a
            href={villaDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center gap-2 border-b border-primary pb-1 font-secondary font-semibold text-[15px] uppercase tracking-[0.08em] text-primary transition duration-300 hover:text-[#6f1111] hover:border-[#6f1111] md:mt-8 md:text-[16px]"
          >
            Get Directions
            {/* Added standard interactive hover transition effect smoothly translating the arrow forward */}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Map Container Wrapper */}
        <div className="w-full overflow-hidden rounded-[4px] shadow-[0_12px_32px_rgba(61,38,20,0.08)] md:shadow-[0_18px_45px_rgba(61,38,20,0.12)]">
          <iframe
            title="Premo Heritage Villa location on Google Maps"
            src={villaMapEmbedUrl}
            /* Mobile & Tab: Fluid responsive scaling heights handling compact devices smoothly */
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