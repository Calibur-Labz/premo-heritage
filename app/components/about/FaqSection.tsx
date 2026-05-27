"use client";

import Link from "next/link";

const faqItems = [
  {
    question:
      "What makes Premo Heritage Villa different from other luxury stays?",
    answer:
      "The villa is designed as a quiet heritage retreat. Guests stay close to nature while still experiencing refined hospitality, curated interiors, and a slower, more intentional rhythm of travel.",
  },
  {
    question:
      "Is the villa suitable for family stays and small private groups?",
    answer:
      "Yes. The property works well for couples, families, and intimate gatherings looking for privacy, generous shared spaces, and a more personal hospitality experience.",
  },
  {
    question: "Do you offer experiences beyond accommodation?",
    answer:
      "We arrange culturally rooted and locally informed experiences, from relaxed nature-led activities to tailored recommendations that help guests connect with the region more meaningfully.",
  },
  {
    question: "When is the best time to visit?",
    answer:
      "The villa is welcoming year-round. The ideal time depends on whether you prefer sunnier days for outdoor lounging or a greener seasonal atmosphere with softer, misty landscapes.",
  },
  {
    question: "Can the team help with transport or itinerary planning?",
    answer:
      "Yes. Guests can receive support with transfers, day planning, and nearby recommendations so the stay feels seamless from arrival to departure.",
  },
  {
    question:
      "Is the property focused on relaxation or exploration?",
    answer:
      "Both. Some guests come to fully switch off, while others use the villa as a base for discovering nearby scenery, culture, and slower local experiences.",
  },
];

export default function FaqSection() {
  return (
    <section className="px-6 py-12 md:px-10">
      <div className="mx-auto max-w-7xl">

        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 font-primary text-5xl font-black leading-tight text-primary md:text-6xl">
            Frequently Asked Questions
          </h2>

          <p className="mx-auto mt-3 max-w-2xl font-secondary text-[18px] font-medium leading-7 text-gray-800">
            A few common questions about the villa and experience.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-6xl rounded-[22px] border border-[#ddd6cb] bg-[#fdfcf9] px-8 py-6 shadow-[0_8px_30px_rgba(61,38,20,0.06)]">
          {faqItems.map((item, index) => (
            <details
              key={item.question}
              open={index === 0}
              className="group border-b border-[#cfc7bc] last:border-b-0"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6">

                <span className="font-primary text-[22px] text-[#433227]">
                  {item.question}
                </span>

                <span className="font-primary text-3xl leading-none text-[#b9924c] transition-transform duration-500 ease-out group-open:rotate-45">
                  +
                </span>
              </summary>

              <div className="grid grid-rows-[0fr] overflow-hidden transition-all duration-500 ease-in-out group-open:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="max-w-5xl pb-8 pr-10 font-secondary text-[18px] leading-8 text-[#6f655b]">
                    {item.answer}
                  </p>
                </div>
              </div>
            </details>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="mb-4 font-primary text-[18px] font-bold text-gray-800">
            Still have questions? We&apos;re here to help.
          </p>

            <Link href="/contact" className="flex justify-center">
                <button className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-sm bg-[#8B1A1A] px-10 py-4 font-secondary text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all duration-500 hover:bg-[#6f1515] sm:w-auto">

                <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[150%]" />

                <span className="relative z-10 flex items-center gap-3">
                  Contact Our Concierge
                </span>
              </button>
            </Link>

        </div>
      </div>
    </section>
  );
}