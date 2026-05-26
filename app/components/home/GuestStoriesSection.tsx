"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import type { Settings } from "react-slick";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PopupReviews from "./popupReviews";

const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] animate-pulse rounded-2xl bg-gray-100" />
  ),
});

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

const testimonials: Testimonial[] = [
  {
    id: "Buddhima-1",
    quote:
      "Even as a Sri Lankan, staying at Premo Heritage felt truly special. The villa beautifully preserves our culture and traditions while offering modern comfort. The peaceful atmosphere and warm hospitality made it a perfect family getaway.",
    name: "Buddhima Vilochana",
    location: "Galle, Sri Lanka",
    avatar: "/home/stories/buddhima.png",
    initials: "BV",
  },
  {
    id: "olivia-1",
    quote:
      "Premo Heritage exceeded every expectation. The villa blends timeless Sri Lankan heritage with modern comfort beautifully. Waking up to the peaceful garden views and enjoying traditional breakfasts was unforgettable.",
    name: "Olivia Bennett",
    location: "London, United Kingdom",
    avatar: "/home/stories/olivia.png",
    initials: "OB",
  },
  {
    id: "ethan-1",
    quote:
      "One of the most relaxing stays we've ever had. The architecture, antique interiors, and calm atmosphere made us feel like we stepped into another era. The hospitality was exceptional from start to finish.",
    name: "Ethan Mitchell",
    location: "Melbourne, Australia",
    avatar: "/home/stories/ethan.png",
    initials: "EM",
  },
  {
    id: "camila-1",
    quote:
      "A hidden gem in Sri Lanka. Every corner of Premo Heritage tells a story — from the handcrafted wooden details to the beautiful courtyard. The staff made us feel completely at home.",
    name: "Camila Fernández",
    location: "Barcelona, Spain",
    avatar: "/home/stories/camila.png",
    initials: "CF",
  },
  {
    id: "noah-1",
    quote:
      "The perfect balance of luxury and cultural charm. We especially loved the authentic Sri Lankan cuisine and peaceful evenings by the garden. Highly recommended for couples and families alike.",
    name: "Noah Richardson",
    location: "Toronto, Canada",
    avatar: "/home/stories/noah.png",
    initials: "NR",
  },
  {
    id: "hannah-1",
    quote:
      "Premo Heritage gave us a truly authentic experience. The villa is beautifully maintained, spotless, and incredibly serene. It felt more personal and memorable than any hotel we've stayed at.",
    name: "Hannah Müller",
    location: "Munich, Germany",
    avatar: "/home/stories/hannah.png",
    initials: "HM",
  },
  {
    id: "leo-1",
    quote:
      "Absolutely stunning property with warm and attentive hosts. The traditional design, natural surroundings, and relaxing atmosphere made this the highlight of our Sri Lanka trip.",
    name: "Léo Dubois",
    location: "Paris, France",
    avatar: "/home/stories/leo.png",
    initials: "LD",
  },
];

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

      <blockquote className="flex-1 text-left font-primary text-[15px] font-semibold italic leading-6 text-gray-800 sm:mb-8 sm:text-[16px] sm:leading-7 md:text-[17px]">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <footer className="mt-auto text-center">
        <p className="text-[16px] font-semibold leading-tight text-gray-800">
          {testimonial.name}
        </p>
        <p className="mt-1 text-[13px] text-[#C9A84C]">{testimonial.location}</p>
      </footer>
    </article>
  );
}

export default function GuestStoriesSection() {
  const slidesToShow = useSlidesToShow();
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);

  useEffect(() => {
    if (!isReviewsOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsReviewsOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isReviewsOpen]);

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
          className="text-5xl md:text-6xl font-black font-primary text-primary"
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

      <div className="flex justify-center mt-2">
        <button
          type="button"
          onClick={() => setIsReviewsOpen(true)}
          className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-sm bg-[#8B1A1A] px-10 py-4 font-secondary text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all duration-500 hover:bg-[#6f1515] focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:ring-offset-2 focus:ring-offset-[#FAF6EF] sm:w-auto"
          aria-haspopup="dialog"
          //aria-expanded={isReviewsOpen}
        >
          <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[150%]" />

          <span className="relative z-10 flex items-center gap-3">
            More Reviews
          </span>
        </button>
      </div>

      {isReviewsOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-4 py-6 backdrop-blur-sm sm:px-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="guest-reviews-popup-heading"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsReviewsOpen(false);
            }
          }}
        >
          <div className="relative max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-2xl border border-[#ede8df] bg-white shadow-2xl">
            <button
              type="button"
              onClick={() => setIsReviewsOpen(false)}
              className="group absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center overflow-hidden rounded-sm bg-[#8B1A1A] text-white shadow-sm transition-all duration-500 hover:bg-[#6f1515] focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:ring-offset-2 focus:ring-offset-white"
              aria-label="Close reviews popup"
            >
              <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[150%]" />
              <X
                aria-hidden="true"
                className="relative z-10 h-5 w-5 transition-transform duration-300"
              />
            </button>

            <PopupReviews variant="modal" />
          </div>
        </div>
      )}

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
