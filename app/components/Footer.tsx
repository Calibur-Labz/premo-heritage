import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Destinations", href: "/destinations" },
  { label: "Contact", href: "/contact" },
];

const policyLinks = [
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

export default function Footer() {
  return (
    <>
      <footer className="relative overflow-hidden bg-primary text-white">
        {/* Soft warm glow at top */}
        <div className="absolute inset-0 bg-[#8B1A1A]" />

        {/* MAIN — matches header's max-w-7xl container */}
        {/* Mobile: reduced pt-20 to pt-12 and added pb-2 to compress height */}
        <div className="relative mx-auto max-w-7xl px-6 pt-12 pb-2 md:pt-20 lg:px-0">
          {/* Mobile: reduced gap-y-12 to gap-y-8 */}
          <div className="grid gap-x-16 gap-y-8 pb-6 md:grid-cols-2 md:gap-y-12 xl:grid-cols-[1.35fr_1fr_1.05fr_0.9fr]">

            {/* COLUMN 1 — Logo + Tagline */}
            <div className="max-w-sm">
              <Link href="/" className="inline-flex items-center">
                <Image
                  src="/logo.png"
                  alt="Premo Heritage Villa"
                  width={120}
                  height={120}
                  className="h-auto w-[86px] object-contain"
                />
              </Link>
              {/* Mobile: reduced margin top from mt-8 to mt-5 */}
              <h3 className="mt-5 font-primary text-[24px] font-bold text-white md:mt-8">
                Premo Heritage Villa
              </h3>
              <p className="max-w-[300px] font-secondary text-[16px] leading-8 text-white/70">
                A timeless retreat blending colonial heritage with the warmth of
                Sri Lankan hospitality.
              </p>
            </div>

            {/* COLUMN 2 — Address */}
            <div>
              <h3 className="font-primary text-[24px] font-bold text-white">
                Our Location
              </h3>
              {/* Mobile: reduced margin top from mt-4 to mt-2.5 */}
              <address className="mt-2.5 space-y-2 font-secondary text-[16px] not-italic leading-7 text-white/70 md:mt-4">
                <p>Premo Heritage Villa,</p>
                <p>Heenatigala,</p>
                <p>Talpe 80615,</p>
                <p>Sri Lanka</p>
              </address>
            </div>

            {/* COLUMN 3 — Call Centre */}
            <div>
              <h3 className="font-primary text-[24px] font-bold text-white">
                Call Centre
              </h3>
              {/* Mobile: reduced margin top from mt-4 to mt-2.5 */}
              <div className="mt-2.5 space-y-2 font-secondary text-[16px] leading-7 text-white/70 md:mt-4">
                <p>
                  <span className="text-white/90">WhatsApp</span> : +61 424 306 604
                </p>
                <p className="break-all">
                  <span className="text-white/90">Email</span> : premoheritage@gmail.com
                </p>
              </div>
            </div>

            {/* COLUMN 4 — Quick Links */}
            <div>
              <h3 className="font-primary text-[24px] font-bold text-white">
                Quick Links
              </h3>
              {/* Mobile: reduced margin top from mt-4 to mt-2.5 and space-y from 3 to 2 */}
              <div className="mt-2.5 space-y-2 md:mt-4 md:space-y-3">
                {footerLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="group flex items-center gap-2 font-secondary text-[16px] text-white/70 transition hover:text-white"
                  >
                    <span className="inline-block h-px w-3 bg-current transition-all duration-300 group-hover:w-5" />
                    {link.label}
                  </Link>
                ))}

                {policyLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="group flex items-center gap-2 font-secondary text-[16px] text-white/70 transition hover:text-white"
                  >
                    <span className="inline-block h-px w-3 bg-current transition-all duration-300 group-hover:w-5" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Decorative divider */}
          {/* Mobile: reduced mt-12 to mt-6 for cleaner spacing before copyright */}
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <span className="font-primary text-[10px] uppercase tracking-[0.4em] text-white/60">
              Premo
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/30 to-transparent" />
          </div>
        </div>
      </footer>

      {/* BOTTOM BAR */}
      <div className="bg-primary">
        {/* Mobile: reduced px-12 to px-6, removed excessive pb-7 on mobile, changed text alignment to center for narrow viewports */}
        <div className="font-poppins mx-auto flex max-w-7xl flex-col gap-2.5 px-6 py-5 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left md:pb-7 lg:px-0">
          <p className="text-[14px] tracking-wide text-white/60">
            All Copyrights Reserved © {new Date().getFullYear()} Premo Heritage Villa
          </p>

          <p className="font- poppins text-[14px] tracking-wide text-white/60">
            Design &amp; Developed by{" "}
            <a
              href="http://caliburlabz.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer font-semibold text-white/80 transition-colors duration-300 hover:text-white"
            >
              xCaliburLabs Pvt Ltd
            </a>
          </p>
        </div>
      </div>
    </>
  );
}