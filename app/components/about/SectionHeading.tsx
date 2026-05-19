"use client";

export default function SectionHeading({
  label,
  title,
  description,
}: {
  label?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      {label && (
        <p className="mb-4 font-secondary text-sm uppercase tracking-[0.3em] text-[#C9A84C]">
          {label}
        </p>
      )}

      <h2 className="mb-6 font-primary text-5xl font-black leading-tight text-primary md:text-6xl">
        {title}
      </h2>

      {description && (
        <p className="font-secondary leading-relaxed text-gray-600 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}