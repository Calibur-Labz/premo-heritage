"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { MapPin } from "lucide-react";

type Destination = {
  category: string;
  title: string;
  location: string;
  image: string;
};

type SlotStyle = {
  x: number;
  scale: number;
  zIndex: number;
  opacity: number;
};

const AUTOPLAY_INTERVAL = 2000;

const slugify = (str: string) =>
  str.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

const destinations: Destination[] = [
  { category: "BEACH", title: "Mirissa Beach", location: "Matara", image: "/mobile/mirissa.jpeg" },
  { category: "BEACH", title: "Unawatuna Beach", location: "Galle", image: "/mobile/unawatuna.jpeg" },
  { category: "BEACH", title: "Thalpe Beach", location: "Galle", image: "/mobile/thalpe.jpeg" },
  { category: "HIDDEN BEACH", title: "Jungle Beach", location: "Unawatuna", image: "/mobile/junglebeach.jpeg" },
  { category: "CULTURAL", title: "Galle Fort", location: "Galle", image: "/mobile/fort.jpeg" },
  { category: "TEMPLE", title: "Japanese Peace Pagoda", location: "Unawatuna", image: "/mobile/pagoda.jpeg" },
  { category: "NATURE", title: "Sinharaja Forest Reserve", location: "Sabaragamuwa", image: "/mobile/sinharaja.jpeg" },
  { category: "RAINFOREST", title: "Kanneliya Forest Reserve", location: "Galle", image: "/mobile/kanneliya.jpeg" },
  { category: "RIVER SAFARI", title: "Madu Ganga", location: "Balapitiya", image: "/mobile/maduganga.jpeg" },
  { category: "WILDLIFE", title: "Sea Turtle Hatchery", location: "Habaraduwa", image: "/mobile/turtle.jpeg" },
  { category: "SAFARI", title: "Yala National Park", location: "Kataragama", image: "/mobile/yala.jpeg" },
];

const SLOT_STYLES: SlotStyle[] = [
  { x: -440, scale: 0.7, zIndex: 1, opacity: 0.85 }, // far left
  { x: -230, scale: 0.85, zIndex: 2, opacity: 1 },   // mid left
  { x: 0, scale: 1.05, zIndex: 5, opacity: 1 },      // center
  { x: 230, scale: 0.85, zIndex: 2, opacity: 1 },    // mid right
  { x: 440, scale: 0.7, zIndex: 1, opacity: 0.85 },  // far right
];

const getVisibleCount = (width: number) => width < 768 ? 3 : 5;

const getSpacingScale = (width: number): number => {
  if (width < 480) return 0.42;
  if (width < 768) return 0.55;
  if (width < 1280) return 0.78;
  return 1;
};

export default function NearbyDestinationsSection() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(1200);

  // Track viewport size for responsive spacing
  useEffect(() => {
    const update = () => setViewportWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Autoplay loop — runs continuously, never pauses
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % destinations.length);
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const spacingScale = getSpacingScale(viewportWidth);
  const visibleCount = getVisibleCount(viewportWidth);
  const centerSlot = Math.floor(visibleCount / 2);
  const activeSlotStyles = visibleCount === 3 ? SLOT_STYLES.slice(1, 4) : SLOT_STYLES;

  const getSlotForCard = useCallback(
    (cardIndex: number): number => {
      const total = destinations.length;
      let diff = (cardIndex - activeIndex + total) % total;
      if (diff > total / 2) diff -= total;

      if (diff >= -centerSlot && diff <= centerSlot) {
        return diff + centerSlot;
      }
      return -1;
    },
    [activeIndex, centerSlot]
  );

  const goTo = (index: number) => {
    setActiveIndex((index + destinations.length) % destinations.length);
  };

  const handleCardClick = (dest: Destination, index: number, isCenter: boolean) => {
    if (isCenter) {
      router.push(`/destinations#${slugify(dest.title)}`);
    } else {
      goTo(index);
    }
  };

  return (
    <section className="best-destinations-wrapper overflow-hidden bg-white py-12 md:py-24">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="px-5 text-center md:px-10"
      >
        <h2 className="font-primary text-5xl font-black text-primary md:text-6xl">
          Nearby Destinations
        </h2>
        <p className="mx-auto mt-3 max-w-2xl px-6 font-secondary text-[16px] font-medium leading-7 text-gray-800">
          Explore breathtaking beaches, cultural landmarks, rainforests, and unforgettable experiences located near Premo Heritage Villa.
        </p>
      </motion.div>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        viewport={{ once: true }}
        className="best-dest-stage"
      >
        <div className="best-dest-track">
          {destinations.map((dest, index) => {
            const slot = getSlotForCard(index);
            const isVisible = slot !== -1;
            const isCenter = slot === centerSlot;

            const total = destinations.length;
            const distance = (index - activeIndex + total) % total;
            const offstageX = distance > total / 2 ? -640 : 640;

            const target = isVisible
              ? {
                  x: activeSlotStyles[slot].x * spacingScale,
                  scale: activeSlotStyles[slot].scale,
                  opacity: activeSlotStyles[slot].opacity,
                }
              : {
                  x: offstageX * spacingScale,
                  scale: 0.55,
                  opacity: 0,
                };

            const zIndex = isVisible ? activeSlotStyles[slot].zIndex : 0;

            return (
              <motion.div
                key={dest.title}
                className="best-dest-slot"
                style={{ zIndex }}
                animate={target}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className={`best-dest-card ${isCenter ? "is-center" : ""}`}
                  onClick={() => handleCardClick(dest, index, isCenter)}
                >
                  <div className="best-dest-img-wrap">
                    <Image
                      src={dest.image}
                      alt={dest.title}
                      fill
                      sizes="(max-width: 768px) 60vw, 22vw"
                      className="best-dest-img"
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  <div className="best-dest-overlay" />

                  {isCenter && (
                    <div className="best-dest-badge-wrap">
                      <span className="best-dest-badge">{dest.category}</span>
                    </div>
                  )}

                  <div className="best-dest-content">
                    <div className="best-dest-location">
                      <MapPin size={12} strokeWidth={2} />
                      <span>{dest.location}</span>
                    </div>
                    <h3 className="best-dest-title">{dest.title}</h3>
                    <p className="best-dest-sub">COLONIAL HERITAGE</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="best-dest-dots">
          {destinations.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              className={`best-dest-dot ${i === activeIndex ? "active" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </motion.div>

      <style jsx global>{`
        .best-destinations-wrapper {
          overflow: hidden !important;
        }

        .best-dest-stage {
          position: relative;
          padding: 10px 20px 30px;
        }

        .best-dest-track {
          position: relative;
          height: 480px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .best-dest-slot {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 280px;
          height: 420px;
          margin-left: -140px;
          margin-top: -210px;
          will-change: transform, opacity;
        }

        .best-dest-card {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 22px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          transition: box-shadow 0.4s ease;
        }

        .best-dest-card.is-center {
          box-shadow: 0 28px 70px rgba(0, 0, 0, 0.32);
        }

        .best-dest-img-wrap {
          position: absolute;
          inset: 0;
        }

        .best-dest-img {
          transition: transform 0.7s ease;
        }

        .best-dest-card:hover .best-dest-img {
          transform: scale(1.05);
        }

        .best-dest-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.85) 0%,
            rgba(0, 0, 0, 0.25) 50%,
            transparent 100%
          );
          border-radius: 22px;
        }

        .best-dest-badge-wrap {
          position: absolute;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 5;
        }

        .best-dest-badge {
          display: inline-block;
          background: rgba(110, 40, 40, 0.9);
          backdrop-filter: blur(6px);
          color: #fff;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 5px 16px;
          border-radius: 999px;
          font-family: sans-serif;
          white-space: nowrap;
        }

        .best-dest-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px 20px 24px;
          z-index: 5;
        }

        .best-dest-location {
          display: flex;
          align-items: center;
          gap: 5px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 11px;
          font-family: sans-serif;
          margin-bottom: 6px;
        }

        .best-dest-title {
          font-family: Georgia, serif;
          font-size: 24px;
          font-weight: 900;
          color: #fff;
          line-height: 1.2;
          margin: 0 0 4px;
        }

        .best-dest-sub {
          font-family: sans-serif;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.55);
          margin: 0;
        }

        .best-dest-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 24px;
        }

        .best-dest-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #c9a96e;
          opacity: 0.4;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .best-dest-dot.active {
          background: #9c7a32;
          opacity: 1;
          width: 24px;
        }

        @media (max-width: 1280px) {
          .best-dest-track {
            height: 440px;
          }
          .best-dest-slot {
            width: 240px;
            height: 380px;
            margin-left: -120px;
            margin-top: -190px;
          }
        }

        @media (max-width: 768px) {
          .best-dest-track {
            height: 400px;
          }
          .best-dest-slot {
            width: 220px;
            height: 340px;
            margin-left: -110px;
            margin-top: -170px;
          }
          .best-dest-title {
            font-size: 20px;
          }
        }

        @media (max-width: 480px) {
          .best-dest-track {
            height: 360px;
          }
          .best-dest-slot {
            width: 190px;
            height: 300px;
            margin-left: -95px;
            margin-top: -150px;
          }
          .best-dest-title {
            font-size: 18px;
          }
        }
      `}</style>
    </section>
  );
}