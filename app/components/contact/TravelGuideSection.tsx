"use client";

import Link from "next/link";
import {
  Clock,
  ArrowRight,
  Bus,
  Car,
  TrainFront,
  Navigation,
} from "lucide-react";

const travelOptions = [
  {
    title: "Public Bus Route",
    description:
      "Travel by public bus to Galle Bus Station. From there, take a local bus, tuk-tuk, or taxi to Unawatuna and easily reach Premo Heritage Villa within minutes.",
    Icon: Bus,
  },
  {
    title: "Train Journey",
    description:
      "Take the coastal train to Galle Railway Station and continue to Unawatuna by tuk-tuk or taxi. The villa is a short drive from the station.",
    Icon: TrainFront,
  },
  {
    title: "Via Southern Expressway",
    description:
      "Driving via the Southern Expressway then Exit from Pinnaduwa Interchange and continue toward Unawatuna to reach the villa comfortably.",
    Icon: Navigation,
  },
  {
    title: "Taxi or Tuk-Tuk",
    description:
      "Guests traveling from nearby cities can directly reach Unawatuna using a taxi or traditional three-wheeler (tuk-tuk). Easy access to the villa is available from the main road.",
    Icon: Car,
  },
];

export default function TravelGuideSection() {
  return (
    <section className="bg-white py-12 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-secondary text-sm uppercase tracking-[0.3em] text-[#C9A84C]">
            Travel Guide
          </p>

          <h2 className="mt-2 text-5xl md:text-6xl font-black font-primary text-primary">
            Getting to Premo Heritage Villa
          </h2>

          <p className="mx-auto mt-4 max-w-2xl font-secondary text-sm font-medium leading-7 text-gray-800 sm:text-base">
            Explore the most convenient ways to reach us and begin your
            journey with ease. Whether by rail, road, or private chauffeur,
            the path to heritage is seamless.
          </p>

          <div className="mx-auto mt-5 h-px w-24 bg-[#a87d2d]" />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {travelOptions.map((option) => {
            const { Icon } = option;
            return (
              <article
                key={option.title}
                className="rounded-[6px] border border-[#ebe4dc] bg-[#f7f4ee] px-5 py-7 transition duration-300 hover:bg-white hover:shadow-[0_12px_30px_rgba(61,38,20,0.08)] sm:px-7 sm:py-8 md:px-8 md:py-10"
              >
                <div className="mb-5 text-primary sm:mb-8">
                  <Icon className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" strokeWidth={1.6} />
                </div>

                <h3 className="font-primary text-xl font-bold leading-tight text-[#2f2520] sm:text-2xl">
                  {option.title}
                </h3>

                <p className="mt-4 font-secondary text-sm font-medium leading-7 text-gray-800 sm:text-base">
                  {option.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-16 flex flex-col gap-4 rounded-[6px] border border-[#ebe4dc] bg-[#f7f4ee] px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-8 sm:py-8 md:px-10">
          <div className="flex items-center gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] bg-[#f0d8cf] text-primary">
              <Clock className="h-5 w-5" strokeWidth={1.7} />
            </div>

            <div>
              <p className="font-secondary text-[10px] font-bold uppercase tracking-[0.22em] text-[#a87d2d] sm:text-xs">
                Estimated Journey
              </p>
              <p className="mt-1 font-primary text-lg font-medium leading-8 text-gray-800 sm:text-xl md:text-2xl">
                Travel time from Colombo: approximately 2-2.5 hours.
              </p>
            </div>
          </div>

          <Link href="/booking">
            <button className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-sm bg-[#8B1A1A] px-6 py-3 font-secondary text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all duration-500 hover:bg-[#6f1515] sm:w-auto sm:px-10 sm:py-4">
              <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[150%]" />

              <span className="relative z-10 flex items-center gap-3">
                Arrange Your Transfer
                <ArrowRight className="h-4 w-4" />
              </span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}