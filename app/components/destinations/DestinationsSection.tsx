"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import DestinationImage from "./DestinationImage";

const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const destinations = [
  {
    category: "GARDEN",
    title: "Raju Herbal and Spice Garden",
    description:
      "Discover the natural healing traditions of Sri Lanka at Raju Herbal and Spice Garden. Wander through lush greenery filled with aromatic spices, medicinal herbs, and tropical plants while learning about Ayurveda, local remedies, and the island’s rich herbal heritage.",
    location: "https://maps.app.goo.gl/TPAAF4NoEYUGkcjv5",
    images: [
      "/destinations/raju3.png",
      "/destinations/raju2.jpg",
      "/destinations/raju.jpg",
    ],
  },
  {
    category: "BEACH",
    title: "Mirissa Beach",
    description:
      "Experience the majestic dance of blue whales or simply lose yourself in the golden hues of a Mirissa sunset. A coastal sanctuary known for its laid-back atmosphere and crystal-clear waters, perfect for soul-searching and ocean adventures.",
    location: "https://maps.google.com/?q=Mirissa+Beach",
    images: [
      "/destinations/mirissa.png",
      "/destinations/mirissa2.png",
      "/destinations/mirissa3.png",
    ],
  },
  {
    category: "BEACH",
    title: "Unawatuna Beach",
    description:
      "Relax on golden sands surrounded by turquoise waters, vibrant beach cafes, snorkeling spots, and one of the most lively coastal atmospheres in southern Sri Lanka.",
    location: "https://maps.google.com/?q=Unawatuna+Beach",
    images: [
      "/destinations/unawatuna.png",
      "/destinations/unawatuna2.png",
      "/destinations/unawatuna3.png",
    ],
  },
  {
    category: "BEACH",
    title: "Thalpe Beach",
    description:
      "A peaceful coastal escape known for its iconic natural rock pools, swaying palm trees, quiet golden shoreline, and relaxing atmosphere away from busy tourist crowds.",
    location: "https://maps.google.com/?q=Thalpe+Beach",
    images: [
      "/destinations/thalpe.png",
      "/destinations/thalpe2.png",
      "/destinations/thalpe3.png",
    ],
  },
  {
    category: "HIDDEN BEACH",
    title: "Jungle Beach",
    description:
      "A secluded tropical beach surrounded by dense forest and calm turquoise waters, ideal for peaceful swimming, snorkeling, and relaxing away from the crowds.",
    location: "https://maps.google.com/?q=Jungle+Beach+Unawatuna",
    images: [
      "/destinations/junglebeach.png",
      "/destinations/junglebeach2.png",
      "/destinations/junglebeach3.png",
    ],
  },
  {
    category: "CULTURAL",
    title: "Galle Fort",
    description:
      "A UNESCO World Heritage site filled with colonial charm, cobblestone streets, oceanfront ramparts, boutique cafes, and centuries of Sri Lankan history blended with Dutch architecture.",
    location: "https://maps.google.com/?q=Galle+Fort",
    images: [
      "/destinations/fort.png",
      "/destinations/fort2.png",
      "/destinations/fort3.png",
    ],
  },
  {
    category: "TEMPLE",
    title: "Japanese Peace Pagoda",
    description:
      "A stunning white pagoda perched above the coastline offering breathtaking panoramic views of the Indian Ocean and surrounding jungle landscapes.",
    location: "https://maps.google.com/?q=Japanese+Peace+Pagoda+Unawatuna",
    images: [
      "/destinations/pagoda.png",
      "/destinations/pagoda2.png",
      "/destinations/pagoda3.png",
    ],
  },
  {
    category: "NATURE",
    title: "Sinharaja Forest Reserve",
    description:
      "Explore Sri Lanka’s world-famous tropical rainforest, home to rare endemic birds, lush biodiversity, mist-covered trails, waterfalls, and immersive eco-adventures deep in nature.",
    location: "https://maps.google.com/?q=Sinharaja+Forest+Reserve",
    images: [
      "/destinations/sinharaja.png",
      "/destinations/sinharaja2.png",
      "/destinations/sinharaja3.png",
    ],
  },
  {
    category: "RAINFOREST",
    title: "Kanneliya Forest Reserve",
    description:
      "Discover hidden waterfalls, tropical jungle trails, rich biodiversity, and peaceful rainforest scenery in one of Sri Lanka’s most beautiful protected forest reserves.",
    location: "https://maps.google.com/?q=Kanneliya+Forest+Reserve",
    images: [
      "/destinations/kanneliya.png",
      "/destinations/kanneliya2.png",
      "/destinations/kanneliya3.png",
    ],
  },
  {
    category: "RIVER SAFARI",
    title: "Madu Ganga",
    description:
      "Cruise through tranquil mangroves, cinnamon islands, and scenic waterways while experiencing one of Sri Lanka’s most iconic river safari adventures filled with wildlife and nature.",
    location: "https://maps.google.com/?q=Madu+Ganga",
    images: [
      "/destinations/maduganga.png",
      "/destinations/maduganga2.png",
      "/destinations/maduganga3.png",
    ],
  },
  {
    category: "RIVER SAFARI & ISLAND",
    title: "Madol Duwa",
    description:
      "Discover the legendary island of Madol Duwa, surrounded by serene waters, mangrove scenery, and rich Sri Lankan folklore. A peaceful escape perfect for boat rides, nature exploration, and experiencing the timeless beauty of the southern coast.",
    location: "https://maps.google.com/?q=Madol+Duwa+Sri+Lanka",
    images: [
      "/destinations/madol.png",
      "/destinations/madol2.png",
      "/destinations/madol3.png",
    ],
  },
  {
    category: "WILDLIFE",
    title: "Sea Turtle Hatchery",
    description:
      "Visit a coastal conservation center dedicated to protecting endangered sea turtles, where guests can observe rescued turtles and newly hatched baby turtles.",
    location: "https://maps.google.com/?q=Sea+Turtle+Hatchery+Habaraduwa",
    images: [
      "/destinations/turtle.png",
      "/destinations/turtle2.png",
      "/destinations/turtle3.jpg",
    ],
  },
  {
    category: "SAFARI",
    title: "Yala National Park",
    description:
      "Embark on an unforgettable wildlife safari through Sri Lanka’s most famous national park, home to leopards, elephants, sloth bears, exotic birds, and breathtaking natural landscapes.",
    location: "https://maps.google.com/?q=Yala+National+Park",
    images: [
      "/destinations/yala.png",
      "/destinations/yala2.png",
      "/destinations/yala3.png",
    ],
  },
];

export default function DestinationsSection() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;

    if (!hash) {
      setIsReady(true);
      return;
    }

    const id = hash.replace("#", "");
    const timer = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "instant", block: "center" });
      }
      setIsReady(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-[#f8f6f2] px-4 py-16 sm:px-6 sm:py-20 md:py-24 md:px-10">
      <div className="mx-auto max-w-7xl space-y-16 sm:space-y-24 md:space-y-32">
        {destinations.map((item, index) => (
          <motion.div
            key={`${item.title}-${index}`}
            id={slugify(item.title)}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`scroll-mt-24 grid items-center gap-6 sm:gap-8 md:gap-10 lg:grid-cols-2 ${
              index % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <DestinationImage images={item.images} alt={item.title} />

            <div className="max-w-xl">
              <p className="mb-4 font-secondary text-xs uppercase tracking-[0.4em] text-primary">
                {item.category}
              </p>

              <h2 className="font-primary text-5xl font-black text-primary md:text-6xl">
                {item.title}
              </h2>

              <p className="mt-4 font-secondary leading-8 text-[#5f5a54]">
                {item.description}
              </p>

              <a
                href={item.location}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 font-secondary text-sm uppercase tracking-[0.15em] text-[#9c7a32] transition hover:text-[#7d5f24]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0L6.343 16.657a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                View Location
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
