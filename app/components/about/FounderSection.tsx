"use client";

import Image from "next/image";
import SectionHeading from "./SectionHeading";
import Paragraph from "./Paragraph";

export default function FounderSection() {
  return (
    <section className="px-6 py-24 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-4">
        <div className="flex justify-center">
          <img
            src="/about/founder.jpeg"
            alt="Preminda Kalansooriya — Chef Premo, Founder of Premo Heritage Villa"
            className="h-[575px] w-full object-cover rounded-xl md:h-[625px]"
          />
        </div>

        <div className="lg:pl-6">
          <SectionHeading
            label="The Founder"
            title="Preminda Kalansooriya (Chef Premo)"
          />

          <Paragraph>
            Melbourne-based <span className="font-semibold">Chef Premo</span>, a
            graduate of the prestigious{" "}
            <span className="font-semibold">William Angliss Institute</span>,
            brings over two decades of culinary excellence to Premo Heritage
            Villa.
          </Paragraph>

          <Paragraph>
            Having worked with renowned names including{" "}
            <span className="font-semibold">Hilton Melbourne CBD</span>,{" "}
            <span className="font-semibold">Red Cherry Group</span>, and{" "}
            <span className="font-semibold">Scicluna&apos;s</span>, he now
            serves as{" "}
            <span className="font-semibold">
              Chef Manager at Big Watermelon Bushy Park
            </span>
            .
          </Paragraph>

          <Paragraph>
            Inspired by Sri Lanka&apos;s southern charm, Chef Premo created
            Premo Heritage Villa as a place where heritage, flavour, and warm
            hospitality come together.
          </Paragraph>

          {/* Premo Brand Logo */}
          <div className="mt-10 flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/about/premo.png"
                alt="Premo brand logo"
                width={60}
                height={60}
                className="h-auto w-[150px] object-contain"
              />
              <div>
                <p className="font-primary text-[22px] font-bold text-primary">
                  The Premo Brand
                </p>
                <p className="font-secondary text-[16px] text-[#6f655b]">
                  A legacy of culinary craft & heritage hospitality
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
