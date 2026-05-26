import Script from "next/script";

const rawWidgetId = process.env.NEXT_PUBLIC_ELFSIGHT_GOOGLE_REVIEWS_WIDGET_ID;
const widgetClassName = rawWidgetId?.startsWith("elfsight-app-")
  ? rawWidgetId
  : rawWidgetId
    ? `elfsight-app-${rawWidgetId}`
    : "";

interface PopupReviewsProps {
  variant?: "section" | "modal";
}

export default function PopupReviews({ variant = "section" }: PopupReviewsProps) {
  const isModal = variant === "modal";
  const headingId = isModal
    ? "guest-reviews-popup-heading"
    : "guest-stories-heading";

  return (
    <section
      aria-labelledby={headingId}
      className={
        isModal
          ? "overflow-hidden bg-white px-4 py-6 sm:px-6 md:px-8 md:py-8"
          : "overflow-hidden bg-[#FAF6EF] px-5 py-12 sm:px-8 md:px-12 md:py-20 lg:px-20"
      }
    >
      <header className={isModal ? "mb-6 text-center" : "mb-8 text-center md:mb-12"}>
        <h2
          id={headingId}
          className={
            isModal
              ? "font-primary text-3xl font-black text-primary sm:text-4xl"
              : "font-primary text-5xl font-black text-primary md:text-6xl"
          }
        >
          More Reviews
        </h2>
        <p
          className={
            isModal
              ? "mx-auto mt-3 max-w-2xl font-secondary text-sm font-medium leading-6 text-gray-800 sm:text-base"
              : "mx-auto mt-3 max-w-2xl font-secondary text-base font-medium leading-6 text-gray-800 sm:text-[17px] sm:leading-7 md:text-[18px]"
          }
        >
          Discover heartfelt experiences shared by guests who embraced the
          warmth, heritage, and timeless charm of Premo Heritage Villa.
        </p>
      </header>

      <div className={isModal ? "mx-auto min-h-[360px] max-w-5xl" : "mx-auto min-h-[320px] max-w-6xl"}>
        {widgetClassName ? (
          <>
            <Script
              id="elfsight-platform"
              src="https://static.elfsight.com/platform/platform.js"
              strategy="lazyOnload"
            />
            <div className={widgetClassName} data-elfsight-app-lazy />
          </>
        ) : (
          <div className="mx-auto max-w-2xl rounded-lg border border-[#e4dacb] bg-white px-6 py-8 text-center shadow-sm">
            <p className="font-secondary text-base font-semibold text-gray-900">
              Google Reviews widget is ready to connect.
            </p>
            <p className="mt-2 font-secondary text-sm leading-6 text-gray-700">
              Add your Elfsight widget ID to
              {" "}
              <code className="rounded bg-[#FAF6EF] px-1.5 py-0.5 text-[#8B1A1A]">
                NEXT_PUBLIC_ELFSIGHT_GOOGLE_REVIEWS_WIDGET_ID
              </code>
              {" "}
              and restart the Next.js server.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
