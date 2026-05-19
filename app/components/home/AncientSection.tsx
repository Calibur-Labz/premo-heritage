import Link from "next/link";

export default function AncientSection() {
  return (
    <section className="relative w-full h-[480px] overflow-hidden border-y-4">
      
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/home/Fallback.png')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
            <div className="max-w-4xl">
                
                <h2 className="font-primary text-5xl font-black text-white md:text-6xl leading-tight">
                Taste the Flavors of Ancient Sri Lanka
                </h2>

                <p className="mx-auto mt-6 max-w-xl font-lato text-sm leading-7 text-gray-200 md:text-base">
                Every meal is a ceremony — cooked over firewood, served on banana
                leaves, seasoned with hand-ground spices grown in our garden.
                </p>

              <Link href="/booking" className="mt-10 flex w-full justify-center sm:w-auto">
                  <button className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-sm bg-[#8B1A1A] px-10 py-4 font-secondary text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all duration-500 hover:bg-[#6f1515] sm:w-auto">
                  
                  {/* Shine Element */}
                  <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[150%]" />
                  
                  <span className="relative z-10 flex items-center gap-3">
                    Explore Our Menus
                  </span>
                </button>
              </Link>

            </div>
        </div>
    </section>
  );
}