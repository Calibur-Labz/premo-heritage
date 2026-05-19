"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import type { Settings } from "react-slick";
import { useEffect, useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] animate-pulse rounded-2xl bg-gray-100" />
  ),
});

/* ============================================================
   TYPES
   ============================================================ */
interface Testimonial {
  id: string;
  quote: string;
  name: string;
  location: string;
  avatar: string;
  initials: string;
}

interface AvatarProps {
  avatar: string;
  name: string;
  initials: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

/* ============================================================
   DATA
   ============================================================ */
const testimonials: Testimonial[] = [
  {
    id: "sarah-1",
    quote:
      "An authentic experience like no other. The traditional cooking and warm hospitality made my stay unforgettable. Every detail reflects true Sri Lankan heritage.",
    name: "Sarah Williams",
    location: "United Kingdom",
    avatar: "/home/test.png",
    initials: "SW",
  },
  {
    id: "michael-1",
    quote:
      "The villa is a masterpiece of colonial architecture. We loved the open courtyards, hand-carved details, and the connection to nature. A true sanctuary.",
    name: "Michael Chen",
    location: "Singapore",
    avatar: "/home/test.png",
    initials: "MC",
  },
  {
    id: "isabella-1",
    quote:
      "From the wood-fired meals to the Ayurvedic wellness sessions, every moment was magical. This is heritage tourism at its finest. We'll definitely return.",
    name: "Isabella Martinez",
    location: "Spain",
    avatar: "/home/test.png",
    initials: "IM",
  },
  {
    id: "sarah-2",
    quote:
      "An authentic experience like no other. The traditional cooking and warm hospitality made my stay unforgettable. Every detail reflects true Sri Lankan heritage.",
    name: "Sarah Williams",
    location: "United Kingdom",
    avatar: "/home/test.png",
    initials: "SW",
  },
  {
    id: "michael-2",
    quote:
      "The villa is a masterpiece of colonial architecture. We loved the open courtyards, hand-carved details, and the connection to nature. A true sanctuary.",
    name: "Michael Chen",
    location: "Singapore",
    avatar: "/home/test.png",
    initials: "MC",
  },
  {
    id: "isabella-2",
    quote:
      "From the wood-fired meals to the Ayurvedic wellness sessions, every moment was magical. This is heritage tourism at its finest. We'll definitely return.",
    name: "Isabella Martinez",
    location: "Spain",
    avatar: "/home/test.png",
    initials: "IM",
  },
];

/* ============================================================
   HOOK: Get current screen size reactively
   ============================================================ */
function useSlidesToShow(): number {
  const [slides, setSlides] = useState(3);

  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setSlides(1);
      } else if (width < 1024) {
        setSlides(2);
      } else {
        setSlides(3);
      }
    };

    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  return slides;
}

/* ============================================================
   AVATAR COMPONENT
   ============================================================ */
function Avatar({ avatar, name, initials }: AvatarProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="mb-5 mt-2 flex justify-center sm:mb-6">
      <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-[3px] border-[#C9A84C] bg-[#e8ddd0] sm:h-20 sm:w-20">
        {hasError ? (
          <span className="text-base font-semibold text-[#8B1A1A] sm:text-lg">
            {initials}
          </span>
        ) : (
          <img
            src={avatar}
            alt={name}
            className="h-full w-full object-cover"
            onError={() => setHasError(true)}
            loading="lazy"
          />
        )}
      </div>
    </div>
  );
}

/* ============================================================
   TESTIMONIAL CARD
   ============================================================ */
function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className="relative mx-auto flex h-full w-full max-w-md flex-col rounded-2xl border border-[#ede8df] bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-7 md:p-8">
      <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
        <Image
          src="/home/quote.png"
          alt=""
          aria-hidden="true"
          width={40}
          height={40}
          className="h-8 w-8 opacity-20 sm:h-10 sm:w-10"
        />
      </div>

      <Avatar
        avatar={testimonial.avatar}
        name={testimonial.name}
        initials={testimonial.initials}
      />

      <blockquote className="mb-6 flex-1 text-left font-primary text-[15px] font-semibold italic leading-6 text-gray-800 sm:mb-8 sm:text-[16px] sm:leading-7 md:text-[17px]">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <footer className="mt-auto text-center">
        <p className="text-sm font-semibold leading-tight text-gray-800">
          {testimonial.name}
        </p>
        <p className="mt-1 text-xs text-[#C9A84C]">
          {testimonial.location}
        </p>
      </footer>
    </article>
  );
}

/* ============================================================
   MAIN SECTION
   ============================================================ */
export default function GuestStoriesSection() {
  const slidesToShow = useSlidesToShow();

  // Build settings dynamically based on actual window width
  const sliderSettings: Settings = {
    dots: true,
    infinite: true,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 600,
    cssEase: "ease-in-out",
    arrows: false,
    pauseOnHover: true,
    swipe: true,
    draggable: true,
    accessibility: true,
    adaptiveHeight: false,
  };

  return (
    <section
      aria-labelledby="guest-stories-heading"
      className="overflow-hidden bg-[#FAF6EF] px-5 py-12 sm:px-8 md:px-12 md:py-20 lg:px-20"
    >
      <header className="mb-8 text-center md:mb-12">
        <h2
          id="guest-stories-heading"
          className="font-primary text-4xl font-black text-primary sm:text-5xl md:text-6xl"
        >
          Guest Stories
        </h2>
        <p className="mx-auto mt-3 max-w-2xl font-secondary text-base font-medium leading-6 text-gray-800 sm:text-[17px] sm:leading-7 md:text-[18px]">
          Discover heartfelt experiences shared by guests who embraced the
          warmth, heritage, and timeless charm of Premo Heritage Villa.
        </p>
      </header>

      <div className="testimonial-slider mx-auto max-w-6xl pb-16">
        <Slider {...sliderSettings} key={slidesToShow}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="px-2 sm:px-3">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </Slider>
      </div>

      <style jsx global>{`
        .testimonial-slider .slick-slider {
          position: relative;
        }

        .testimonial-slider .slick-list {
          overflow: hidden;
          margin: 0;
        }

        .testimonial-slider .slick-track {
          display: flex !important;
          align-items: stretch;
        }

        .testimonial-slider .slick-slide {
          height: inherit !important;
          float: none;
        }

        .testimonial-slider .slick-slide > div {
          height: 100%;
          width: 100%;
        }

        .testimonial-slider .slick-slide > div > div {
          height: 100%;
        }

        /* DOTS - visible on ALL screen sizes */
        .testimonial-slider .slick-dots {
          display: flex !important;
          justify-content: center;
          align-items: center;
          position: absolute;
          bottom: -2.5rem;
          left: 0;
          right: 0;
          width: 100%;
          padding: 0;
          margin: 0;
          list-style: none;
        }

        @media (min-width: 768px) {
          .testimonial-slider .slick-dots {
            bottom: -3rem;
          }
        }

        .testimonial-slider .slick-dots li {
          position: relative;
          display: inline-block;
          width: 20px;
          height: 20px;
          margin: 0 4px;
          padding: 0;
          cursor: pointer;
        }

        .testimonial-slider .slick-dots li button {
          font-size: 0;
          line-height: 0;
          display: block;
          width: 20px;
          height: 20px;
          padding: 5px;
          cursor: pointer;
          color: transparent;
          border: 0;
          outline: none;
          background: transparent;
        }

        .testimonial-slider .slick-dots li button:before {
          font-family: "slick";
          font-size: 10px;
          line-height: 20px;
          position: absolute;
          top: 0;
          left: 0;
          width: 20px;
          height: 20px;
          content: "•";
          text-align: center;
          color: #c9a84c;
          opacity: 0.4;
          transition: all 0.3s ease;
        }

        .testimonial-slider .slick-dots li.slick-active button:before {
          color: #8b1a1a;
          opacity: 1;
          transform: scale(1.3);
        }

        .testimonial-slider .slick-dots li button:hover:before {
          opacity: 0.7;
        }
      `}</style>
    </section>
  );
}