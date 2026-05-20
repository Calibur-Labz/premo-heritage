"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function DestinationImage({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Track asset loading states
  const [loadedCount, setLoadedCount] = useState(0);
  
  // Important change: we only need to wait for the OTHER images (excluding the 1st one)
  const totalExtraImages = images.length - 1;
  const extraImagesLoaded = loadedCount >= totalExtraImages;

  // Handle the slideshow interval cycling
  useEffect(() => {
    if (!isHovered || images.length <= 1 || !extraImagesLoaded) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 1300);

    return () => clearInterval(id);
  }, [isHovered, images.length, extraImagesLoaded]);

  // Reset safely back to the original image preview when cursor leaves
  useEffect(() => {
    if (!isHovered) {
      setIndex(0);
      // Optional: Reset loaded count if you want to force reload, 
      // but keeping it means it stays cached for the next hover!
    }
  }, [isHovered]);

  return (
    <div
      className="group relative h-[220px] w-full overflow-hidden rounded-[10px] shadow-[0_12px_35px_rgba(0,0,0,0.18)] sm:h-[300px] md:h-[430px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 
        HYBRID PRELOADER: 
        Only gets injected into the DOM the moment the user hovers.
        It fetches images 1 to N on-demand.
      */}
      {isHovered && images.length > 1 && (
        <div className="absolute hidden">
          {images.slice(1).map((src, i) => (
            <img
              key={`preload-${i}`}
              src={src}
              alt=""
              onLoad={() => setLoadedCount((prev) => prev + 1)}
            />
          ))}
        </div>
      )}

      {/* LOADING OVERLAY */}
      <AnimatePresence>
        {isHovered && !extraImagesLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[4px] text-white gap-2"
          >
            <div className="h-7 w-7 animate-spin rounded-full border-3 border-white/20 border-t-white" />
            <span className="text-[11px] font-medium tracking-wide animate-pulse">
              Loading...
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORE DISPLAY CANVAS */}
      <AnimatePresence mode="sync">
        <motion.div
          key={images[index]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[index]}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 100vw, 520px"
            className="object-cover transition-transform duration-700"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* PAGINATION DOTS */}
      {images.length > 1 && extraImagesLoaded && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index ? "w-5 bg-white" : "w-1.5 bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
