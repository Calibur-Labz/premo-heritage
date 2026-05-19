"use client";

import { motion } from "framer-motion";
import { Car, Waves, ChefHat, Wine } from "lucide-react";

const services = [
  {
    title: "Free Private Parking",
    description: "Complimentary on-site parking, no reservation required.",
    Icon: Car,
  },
  {
    title: "Private Swimming Pool",
    description: "Refreshing pool surrounded by tropical garden views.",
    Icon: Waves,
  },
  {
    title: "Fully Equipped Kitchen",
    description: "Modern kitchen for preparing home-cooked meals.",
    Icon: ChefHat,
  },
  {
    title: "Minibar",
    description: "Stocked minibar with beverages and local treats.",
    Icon: Wine,
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-[#f8f6f2] px-6 py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 font-secondary text-sm uppercase tracking-[0.3em] text-[#C9A84C]">
            What We Offer
          </p>

          <h2 className="mb-6 font-primary text-5xl font-black leading-tight text-primary md:text-6xl">
            Our Services & Amenities
          </h2>

          <p className="mx-auto mt-3 max-w-3xl font-secondary text-[18px] font-medium leading-7 text-gray-800">
            Featuring tranquil garden views and refined island comforts, Premo Heritage Villa
            offers everything you need for an authentic and relaxing stay.
          </p>

          <div className="mx-auto mt-6 h-px w-24 bg-[#a87d2d]" />
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const { Icon } = service;
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group rounded-[12px] border border-[#e8e0d4] bg-white px-7 py-9 text-center transition-all duration-500 hover:-translate-y-1 hover:border-[#d4c4a8] hover:shadow-[0_18px_40px_rgba(61,38,20,0.1)]"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f4f0e8] text-primary transition-colors duration-500 group-hover:bg-primary group-hover:text-white">
                  <Icon className="h-7 w-7" strokeWidth={1.6} />
                </div>

                <h3 className="font-primary text-[24px] font-bold leading-tight text-[#2f2520]">
                  {service.title}
                </h3>

                <p className="mt-3 font-secondary text-[18px] leading-7 text-[#6f655b]">
                  {service.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}