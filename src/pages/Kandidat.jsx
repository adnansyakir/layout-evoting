import React, { useState } from "react";

const kandidatPresma = [
  {
    id: 1,
    nama: "Bagus Eka Saputra & Iskandar Ibnu Pailis",
    jurusan: "(Peternakan / Ekonomi dan Bisnis)",
    foto: "/img/paslon1.png",
    nomor: "01",
    visi: "Revitalisasi Penggerakan, Presentasi, Esensi dan Intelektualisasi dalam Lingkungan Keluarga Besar Mahasiswa Politeknik Negeri Lampung menuju BEM KBM POLINELA yang Unggul dan Bersinergitas.",
    misi: [
      "BEM sebagai sarana pergerakan yang dapat mewujudkan gerakan sosial, pendidikan dan politik, demi terciptanya BEM KBM POLINELA yang unggul dan bersinergitas.",
      "Berkolaborasi dengan seluruh elemen internal dan eksternal kampus, guna mewujudkan manfaat bagi seluruh KBM POLINELA dan elemen masyarakat.",
      "Menjadi wadah aspirasi mahasiswa yang efektif, solutif, dan non-diskriminatif untuk seluruh keluarga besar mahasiswa Politeknik Negeri Lampung.",
    ],
    program: ["Polinela Academic Forum"],
  },
  {
    id: 2,
    nama: "Rahmad Perwira Adha & Rayhan Annanda Pratama",
    jurusan: "(Peternakan / Teknik)",
    foto: "/img/paslon2.png",
    nomor: "02",
    visi: "Mewujudkan BEM KBM POLINELA yang adaptif, kolaboratif, dan responsif terhadap kebutuhan mahasiswa.",
    misi: [
      "Meningkatkan komunikasi antar lembaga kemahasiswaan.",
      "Mendorong partisipasi mahasiswa dalam kegiatan sosial kampus.",
      "Mengembangkan platform digital untuk pelayanan mahasiswa.",
    ],
    program: ["Forum Diskusi Mahasiswa", "Gerakan Peduli Kampus"],
  },
];

const kandidatGubernur = [
  {
    jurusan: "Budidaya Tanaman Pangan",
    data: [
      {
        id: 1,
        nama: "Ibra Alfarizi Pratama & Galih Mahardika Firdaus",
        foto: "/img/gub1.png",
        nomor: "01",
        visi: "Menjadikan HMJ sebagai wadah aspirasi yang aktif dan inovatif bagi mahasiswa Budidaya Tanaman Pangan.",
        misi: [
          "Meningkatkan komunikasi antar mahasiswa jurusan.",
          "Membuat kegiatan yang mendukung akademik dan non-akademik.",
        ],
        program: ["Pelatihan Budidaya Modern", "Forum Mahasiswa Pangan"],
      },
    ],
  },
  {
    jurusan: "Budidaya Tanaman Perkebunan",
    data: [
      {
        id: 1,
        nama: "Rahmad Aldo Melendy & Agus Ramanda",
        foto: "/img/gub2.png",
        nomor: "01",
        visi: "Membangun HMJ yang profesional, kolaboratif, dan transparan.",
        misi: [
          "Meningkatkan solidaritas mahasiswa antar angkatan.",
          "Mendorong kegiatan sosial dan kewirausahaan mahasiswa.",
        ],
        program: ["Green Plantation Movement", "Kelas Wirausaha Tani"],
      },
      {
        id: 2,
        nama: "Zidan Maulana & Bima Muammar Tammam",
        foto: "/img/gub3.png",
        nomor: "02",
        visi: "Menjadikan jurusan Budidaya Tanaman Perkebunan sebagai pelopor inovasi di bidang perkebunan berkelanjutan.",
        misi: [
          "Meningkatkan minat riset mahasiswa.",
          "Mengadakan kolaborasi dengan industri perkebunan.",
        ],
        program: ["Inovasi Perkebunan 4.0", "Pelatihan Lapangan Mahasiswa"],
      },
    ],
  },
  {
    jurusan: "Teknologi Pertanian",
    data: [
      {
        id: 1,
        nama: "Contoh Nama & Pasangan",
        foto: "/img/gub4.png",
        nomor: "01",
        visi: "Mewujudkan mahasiswa Teknologi Pertanian yang aktif, kreatif, dan inovatif.",
        misi: [
          "Menumbuhkan semangat kolaborasi antar mahasiswa.",
          "Meningkatkan kegiatan berbasis teknologi dan lingkungan.",
        ],
        program: ["Techno Agri Camp", "Kompetisi Inovasi Pertanian"],
      },
    ],
  },
];

export default function Kandidat() {
  const [selected, setSelected] = useState(null);

  // Fungsi untuk render card presma dan gubernur
  const renderCard = (data) => (
    <div
      key={data.id}
      className="bg-white shadow-md rounded-2xl w-80 text-center p-4 hover:shadow-lg transition cursor-pointer"
      onClick={() => setSelected(data)}
    >
      <img
        src={data.foto}
        alt={data.nama}
        className="rounded-xl w-full h-56 object-cover"
      />
      <p className="mt-4 font-semibold">{data.nama}</p>
      <p className="text-sm font-bold text-gray-600">{data.jurusan}</p>
    </div>
  );

  return (
    <div className="bg-gray-300 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* PRESMA */}
        <h1 className="text-center text-3xl font-bold mb-8 text-gray-800">
          Calon Presiden dan Wakil Presiden Mahasiswa
        </h1>

        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {kandidatPresma.map(renderCard)}
        </div>

        <p className="text-center text-red-500 italic mb-10">
          Silahkan klik gambar paslon untuk melihat visi dan misi.
        </p>

        {/* GARIS PEMBATAS */}
        <div className="border-t-4 border-gray-400 w-3/4 mx-auto my-10"></div>

        {/* GUBERNUR */}
        <h2 className="text-center text-3xl font-bold mb-8 text-gray-800">
          Calon Gubernur dan Wakil Gubernur Mahasiswa
        </h2>

        {kandidatGubernur.map((jur, i) => (
          <div key={i} className="mb-16">
            <h3 className="text-center text-2xl font-semibold mb-6 text-gray-800">
              Jurusan {jur.jurusan}
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
              {jur.data.map(renderCard)}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL POPUP */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full relative p-6 overflow-y-auto max-h-[90vh]">
            {/* Tombol Close */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-2xl"
            >
              &times;
            </button>

            {/* Isi Modal */}
            <div className="text-center">
              <img
                src={selected.foto}
                alt={selected.nama}
                className="w-60 mx-auto rounded-xl mb-4"
              />
              <h2 className="text-xl font-bold">{selected.nama}</h2>
              {selected.jurusan && (
                <p className="font-semibold text-gray-700 mb-4">
                  {selected.jurusan}
                </p>
              )}

              <div className="text-left">
                <h3 className="font-bold">Visi:</h3>
                <p className="mb-4 text-justify">{selected.visi}</p>

                <h3 className="font-bold">Misi:</h3>
                <ol className="list-decimal pl-5 mb-4 space-y-1 text-justify">
                  {selected.misi?.map((m, idx) => (
                    <li key={idx}>{m}</li>
                  ))}
                </ol>

                <h3 className="font-bold">Program Kerja:</h3>
                <ul className="list-disc pl-5">
                  {selected.program?.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
