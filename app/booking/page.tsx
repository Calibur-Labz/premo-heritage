"use client";

import HeroSection from "../components/booking/HeroSection";
import GallerySection from "../components/booking/GallerySection";
import BookingSection from "../components/booking/BookingSection";

export default function BookingPage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <GallerySection />
      <BookingSection />
    </main>
  );
}
