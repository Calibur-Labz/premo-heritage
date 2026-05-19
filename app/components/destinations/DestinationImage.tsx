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

  useEffect(() => {
    if (!isHovered || images.length <= 1) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 1300);

    return () => clearInterval(id);
  }, [isHovered, images.length]);

  useEffect(() => {
    if (!isHovered) setIndex(0);
  }, [isHovered]);

  return (
    <div
      className="group relative h-[220px] w-full overflow-hidden rounded-[10px] shadow-[0_12px_35px_rgba(0,0,0,0.18)] sm:h-[300px] md:h-[430px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
          />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
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