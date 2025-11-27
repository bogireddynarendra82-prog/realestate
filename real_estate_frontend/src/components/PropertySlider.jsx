import React, { useRef, useEffect } from "react";
import PropertyCard from "./PropertyCard";

export default function PropertySlider({ properties }) {
  const sliderRef = useRef();
  const autoScrollRef = useRef();

  // Auto scroll every 4 seconds
  useEffect(() => {
    autoScrollRef.current = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.scrollBy({
          left: 300,
          behavior: "smooth",
        });
      }
    }, 4000);

    return () => clearInterval(autoScrollRef.current);
  }, []);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full z-10"
      >
        ◀
      </button>

      {/* Slider Container */}
      <div
        ref={sliderRef}
        className="flex overflow-x-auto gap-6 scroll-smooth py-4 px-1"
        style={{ scrollBehavior: "smooth" }}
      >
        {properties.map((p) => (
          <div key={p._id} className="min-w-[280px] max-w-[280px] shrink-0">
            <PropertyCard property={p} />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full z-10"
      >
        ▶
      </button>
    </div>
  );
}
