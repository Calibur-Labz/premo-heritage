"use client";

import Image from "next/image";
import { BLUR_DATA_URL } from "@/app/lib/blur";
import SectionHeading from "./SectionHeading";
import Paragraph from "./Paragraph";

const galleryImages = [
  {
    src: "/about/villa1.png",
    alt: "Tropical villa exterior and infinity pool",
  },
  {
    src: "/about/villa2.png",
    alt: "Traditional heritage hospitality experience",
  },
  {
    src: "/about/villa3.png",
    alt: "Villa view framed by warm evening light",
  },
  {
    src: "/about/villa4.jpeg",
    alt: "Warm balcony hospitality setting",
  },
];

export default function HeritageSection() {
  return (
    <section className="px-6 py-12 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-8">

        <div className="order-1 max-w-2xl lg:order-1 lg:pr-20">
          <SectionHeading
            label="Who We Are"
            title="A Sanctuary Rooted in Sri Lankan Heritage"
          />

          <Paragraph>
            Nestled in the peaceful coastal village of Talpe, Premo Heritage Villa is a
            private sanctuary inspired by the timeless beauty of Sri Lankan tradition.
            Rooted in heritage and authentic island hospitality, our villa offers guests
            a warm and soulful escape just moments away from Galle Fort and the golden
            beaches of Unawatuna.
          </Paragraph>

          <Paragraph>
            From handcrafted wooden interiors and traditional architectural details to
            homemade Sri Lankan cuisine prepared with authentic local recipes, every
            experience at Premo reflects the true spirit of island living. Wake up to the
            scent of tropical gardens, enjoy traditional flavors passed down through
            generations, and immerse yourself in the calm rhythm, culture, and charm of
            southern Sri Lanka.
          </Paragraph>
        </div>

        <div className="order-2 lg:order-2">
          <div className="grid grid-cols-2 gap-5">
            {galleryImages.map((image, index) => (
              <div
                key={`${image.alt}-${index}`}
                className="overflow-hidden rounded-[16px] shadow-[0_18px_40px_rgba(61,38,20,0.14)] min-h-[240px] sm:min-h-[300px] group"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={900}
                  height={700}
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 420px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

