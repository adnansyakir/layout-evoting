import timeline from "../assets/time.png";

export default function Timeline() {
  return (
    <section className="px-8 py-6">
      <h3 className="bg-teal-700 text-white text-lg font-semibold px-4 py-2 w-fit rounded">
        TIMELINE PEMILIHAN UMUM RAYA 2025
      </h3>
      <div className="flex justify-center mt-4">
        <img
          src={timeline}
          alt="Timeline Sertifikasi Kompetensi"
          className="rounded-lg shadow-md"
        />
      </div>
    </section>
  );
}
