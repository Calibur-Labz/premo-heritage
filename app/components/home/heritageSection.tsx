export default function HeritageSection() {
  return (
    <>
      <section className="bg-[#f5f5f5] py-12 px-5 md:py-20 md:px-12 lg:px-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
            <img
              src="/home/lipa.png"
              alt="Heritage cooking"
              className="h-[220px] sm:h-[280px] md:h-auto w-full md:w-[85%] mx-auto object-cover rounded-[10px]"
            />

          <div>
            <p className="font-secondary text-sm tracking-[0.3em] text-[#C9A84C] uppercase mb-4">
              Our Heritage
            </p>

            <h2 className="text-5xl md:text-6xl font-black font-primary text-primary leading-\[1\] mb-6">
              A Villa Born from Tradition
            </h2>

            <p className="text-gray-600 text-[18px] mb-4 leading-relaxed max-w-2xl">
              Premo Heritage Villa blends Sri Lankan tradition with modern luxury, offering a peaceful stay surrounded by authentic heritage charm. The villa reflects traditional architecture, wooden craftsmanship, and a warm cultural atmosphere inspired by village life.
            </p>

            <p className="text-gray-600 text-[18px] mb-6 leading-relaxed max-w-2xl">
              Guests can enjoy authentic Sri Lankan cuisine prepared using clay pots, firewood stoves, and traditional cooking methods that bring rich local flavors to every meal. From traditional rice and curry to local delicacies, each dish offers a true taste of Sri Lankan culture.
            </p>

            <p className="text-gray-600 text-[18px] mb-6 leading-relaxed max-w-2xl">
              Surrounded by tropical tranquility, the villa provides a relaxing and luxurious escape filled with comfort, culture, and unforgettable experiences.
            </p>

            <div className="w-36 h-\[2px\] bg-[#b89b5e]"></div>

          </div>
        </div>
      </section>

      <section className="bg-[#8B1A1A] py-8 px-5 md:py-10 md:px-10">

        <div className="flex items-center justify-center gap-6 md:gap-10">
          <span className="text-[#C9A84C] text-2xl opacity-80 shrink-0">
            ✦
          </span>

          <p className="font-primary text-center text-white italic text-xl md:text-2xl leading-relaxed max-w-\[54rem\]">
            A living sanctuary rooted in Sri Lankan heritage — crafted for those who seek culture,
            comfort, and authenticity.
          </p>

          <span className="text-[#C9A84C] text-2xl opacity-80 shrink-0">
            ✦
          </span>
        </div>
      </section>

    </>
  );
}