import img1 from "../assets/foto1.jpg";
import img2 from "../assets/foto2.jpg";
import img3 from "../assets/foto3.jpg";
import img4 from "../assets/p.jpg";
import img5 from "../assets/time.png";

export default function GaleriFoto() {
  const images = [img1, img2, img3, img4, img5];

  return (
    <div className="px-4 sm:px-6 md:px-24 py-6">
      <div className="bg-gray-100 rounded-xl shadow-md p-4 sm:p-6">
        <h2 className="text-center text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
          Dokumentasi Pemira 2024/2025
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {images.map((img, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform duration-300"
            >
              <img
                src={img}
                alt={`Foto ${i + 1}`}
                className="w-full h-32 sm:h-44 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
