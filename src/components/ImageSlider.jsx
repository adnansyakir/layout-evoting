import { useState, useEffect } from "react";
import slide1 from "../assets/foto1.jpg";
import slide2 from "../assets/foto2.jpg";
import slide3 from "../assets/foto3.jpg";
import slide4 from "../assets/p.jpg";

const images = [slide1, slide2, slide3, slide4];

export default function ImageSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-xl shadow-lg mt-8">
      <img
        src={images[index]}
        alt={`slide-${index}`}
        className="w-full h-[450px] object-cover transition-all duration-700"
      />
    </div>
  );
}
