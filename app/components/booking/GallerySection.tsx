"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

// Replace these with your actual villa gallery images placed in /public/gallery/
const galleryImages = [
  { src: "/about/villa1.png", alt: "Premo Heritage Villa — Living Area" },
  { src: "/about/villa2.png", alt: "Premo Heritage Villa — Bedroom" },
  { src: "/about/villa3.png", alt: "Premo Heritage Villa — Pool" },
  { src: "/about/villa4.jpeg", alt: "Premo Heritage Villa — Garden" },
  { src: "/hero/bookingPage.jpeg", alt: "Premo Heritage Villa — Exterior" },
  { src: "/hero/aboutPage.jpeg", alt: "Premo Heritage Villa — Surroundings" },
];

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length,
    );

  const next = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % galleryImages.length,
    );

  return (
    <section className="bg-[#fbfaf7] py-20 lg:py-28">
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
            The Villa
          </span>
          <h2 className="font-primary mt-3 text-4xl font-black text-[#2f2520] md:text-5xl">
            Gallery
          </h2>
          <div className="mx-auto mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#e7d1c8]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#C9A84C]" />
            <span className="h-px w-10 bg-[#e7d1c8]" />
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {galleryImages.map((img, index) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              onClick={() => openLightbox(index)}
              className="group relative aspect-[4/3] cursor-pointer overflow-hidden bg-[#f0ebe3]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
                <ZoomIn className="h-8 w-8 scale-0 text-white transition-transform duration-300 group-hover:scale-100" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 sm:left-6"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative h-[75vh] w-full max-w-5xl"
            >
              <Image
                src={galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 sm:right-6"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-secondary text-xs tracking-widest text-white/60">
              {lightboxIndex + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
