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
            Based in Melbourne, Australia,{" "}
            <span className="font-semibold">Chef Premo</span> is a graduate
            of the prestigious{" "}
            <span className="font-semibold">William Angliss Institute</span>{" "}
            and has served as{" "}
            <span className="font-semibold">
              Executive Chef at Scicluna&apos;s since 2015
            </span>.
          </Paragraph>

          <Paragraph>
            His journey across continents from Melbourne&apos;s celebrated kitchens to
            the coastal soul of southern Sri Lanka inspired the creation of Premo
            Heritage Villa, where every detail reflects his devotion to authentic
            flavors and heritage hospitality.
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
                <p className="font-primary text-[18px] font-bold text-primary">
                  The Premo Brand
                </p>
                <p className="font-secondary text-[14px] text-[#6f655b]">
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