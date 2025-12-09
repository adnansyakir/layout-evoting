import timeline from "../assets/time.png";

export default function Timeline() {
  return (
    <section className="px-2 sm:px-4 md:px-8 py-4 sm:py-6">
      <h3 className="bg-blue-700 text-white text-lg font-semibold px-4 py-2 w-fit rounded">
        TIMELINE PEMILIHAN UMUM RAYA 2025
      </h3>
      <div className="flex justify-center mt-4">
        <img
          src={timeline}
          alt="Timeline Sertifikasi Kompetensi"
          className="rounded-lg shadow-md w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl lg:max-w-2xl"
        />
      </div>
    </section>
  );
}
