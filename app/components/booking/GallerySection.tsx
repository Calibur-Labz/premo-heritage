"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, Camera } from "lucide-react";

// All villa images live in /public/room/
const galleryImages = [
  "/room/room1.jpeg",
  "/room/room2.jpeg",
  "/room/room3.jpeg",
  "/room/room4.jpeg",
  "/room/room5.jpeg",
  "/room/room6.jpeg",
  "/room/room7.jpeg",
  "/room/room8.jpeg",
  "/room/room9.jpeg",
  "/room/room10.jpeg",
];

// Banded layout — every band aligns perfectly, all share one 20px gap.
//   Band 1 → rooms 1-6  : landscape tiles
//   Band 2 → rooms 7-9  : portrait tiles
//   Band 3 → room 10    : full-width landscape banner
const LANDSCAPE = galleryImages.slice(0, 6);
const PORTRAIT = galleryImages.slice(6, 9);
const BANNER = galleryImages[9];

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const prev = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length,
      ),
    [],
  );

  const next = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null ? null : (i + 1) % galleryImages.length,
      ),
    [],
  );

  // Keyboard navigation + scroll lock while lightbox is open.
  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };

    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxIndex, closeLightbox, prev, next]);

  // Reusable premium tile
  const Tile = ({
    src,
    index,
    aspect,
    sizes,
  }: {
    src: string;
    index: number;
    aspect: string;
    sizes: string;
  }) => (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08 }}
      onClick={() => openLightbox(index)}
      className={`group relative block w-full overflow-hidden shadow-md ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-2xl ${aspect}`}
    >
      <Image
        src={src}
        alt="Premo Heritage Villa"
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
      {/* Dark overlay + zoom icon on hover */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/35">
        <span className="flex h-12 w-12 scale-75 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
          <ZoomIn className="h-5 w-5" />
        </span>
      </div>
    </motion.button>
  );

  return (
    <section className="relative overflow-hidden bg-[#fbfaf7] py-20 lg:py-28">
      {/* Ambient decorative glows */}
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#C9A84C]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-[#e7d1c8]/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <span className="inline-flex items-center gap-2 font-secondary text-[11px] uppercase tracking-[0.35em] text-[#C9A84C]">
            <Camera className="h-3.5 w-3.5" />
            Inside The Villa
          </span>
          <h2 className="font-primary mt-4 text-4xl font-black text-[#2f2520] md:text-5xl lg:text-6xl">
            Gallery
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-secondary text-sm leading-7 text-[#6b5d52]">
            A closer look at every corner of your heritage stay — from sunlit
            suites to the beachfront terrace.
          </p>
          <div className="mx-auto mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#e7d1c8]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#C9A84C]" />
            <span className="h-px w-10 bg-[#e7d1c8]" />
          </div>
        </motion.div>

        {/* Banded premium layout — one consistent 20px gap throughout */}
        <div className="flex flex-col gap-2">
          {/* Band 1 · landscapes (rooms 1-6) */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {LANDSCAPE.map((src, i) => (
              <Tile
                key={src}
                src={src}
                index={i}
                aspect="aspect-3/2"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ))}
          </div>

          {/* Band 2 · portraits (rooms 7-9) */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {PORTRAIT.map((src, i) => (
              <Tile
                key={src}
                src={src}
                index={6 + i}
                aspect="aspect-3/4"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            ))}
          </div>

          {/* Band 3 · full-width landscape banner (room 10) */}
          <Tile
            src={BANNER}
            index={9}
            aspect="aspect-16/9 lg:aspect-[21/9]"
            sizes="100vw"
          />
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
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
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
              className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 sm:left-6"
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
              transition={{ duration: 0.28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative h-[70vh] w-full max-w-5xl"
            >
              <Image
                src={galleryImages[lightboxIndex]}
                alt="Premo Heritage Villa"
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 sm:right-6"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Thumbnail strip */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="mt-5 flex max-w-full gap-2 overflow-x-auto px-2 pb-1"
            >
              {galleryImages.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setLightboxIndex(i)}
                  className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-md ring-2 transition ${
                    i === lightboxIndex
                      ? "ring-[#C9A84C]"
                      : "opacity-50 ring-transparent hover:opacity-100"
                  }`}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>

            {/* Counter */}
            <div className="mt-3 font-secondary text-xs tracking-widest text-white/60">
              {lightboxIndex + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
