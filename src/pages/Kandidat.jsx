import React, { useState, useEffect } from "react";
import { kandidatAPI, jurusanAPI } from "../services/api";

export default function Kandidat() {
  const [activeTab, setActiveTab] = useState("presma");
  const [selected, setSelected] = useState(null);
  const [kandidatPresma, setKandidatPresma] = useState([]);
  const [kandidatGubma, setKandidatGubma] = useState([]);
  const [jurusans, setJurusans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [kandidatResponse, jurusanResponse] = await Promise.all([
        kandidatAPI.getAll(),
        jurusanAPI.getAll(),
      ]);

      const kandidats = kandidatResponse.data || [];
      const jurusanList = jurusanResponse.data || [];

      const presma = kandidats.filter((k) => k.kategori === "presma");
      const gubma = kandidats.filter((k) => k.kategori === "gubma");

      setKandidatPresma(presma);
      setKandidatGubma(gubma);
      setJurusans(jurusanList);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Gagal memuat data kandidat. Silakan refresh halaman.");
    } finally {
      setLoading(false);
    }
  };

  const kandidatGubmaGrouped = jurusans
    .map((jurusan) => ({
      jurusan: jurusan.nama_jurusan,
      jurusan_id: jurusan.id,
      data: kandidatGubma.filter((k) => k.jurusan_id === jurusan.id),
    }))
    .filter((group) => group.data.length > 0);

  const renderCard = (data) => (
    <div
      key={data.id}
      className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer w-80 border border-gray-100"
      onClick={() => setSelected(data)}
    >
      <div className="relative h-64 overflow-hidden">
        {data.foto_pasangan ? (
          <img
            src={data.foto_pasangan}
            alt={`${data.nama_ketua} & ${data.nama_wakil}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}
        <div
          className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 font-medium"
          style={{ display: data.foto_pasangan ? "none" : "flex" }}
        >
          <span className="text-lg">Tidak Ada Foto</span>
        </div>
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80"></div>
        
        {/* Nomor Urut Badge */}
        <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 font-bold w-12 h-12 flex items-center justify-center rounded-full shadow-lg border-2 border-white z-10">
          {data.nomor_urut || "0"}
        </div>

        {/* Nama di atas gambar (mobile friendly) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <p className="text-sm font-light opacity-90 mb-1">Kandidat</p>
          <h3 className="text-lg font-bold leading-tight shadow-black drop-shadow-md">
            {data.nama_ketua}
          </h3>
          <h3 className="text-lg font-bold leading-tight shadow-black drop-shadow-md">
            & {data.nama_wakil}
          </h3>
        </div>
      </div>

      <div className="p-5">
        {data.jurusan && (
          <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full mb-3">
            {data.jurusan.nama_jurusan}
          </div>
        )}
        <button className="w-full mt-2 py-2 bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 font-semibold rounded-lg transition-colors text-sm flex items-center justify-center gap-2 group-hover:bg-blue-600 group-hover:text-white">
          <span>Lihat Visi & Misi</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
        <p className="text-gray-600 font-medium animate-pulse">Memuat data kandidat...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Terjadi Kesalahan</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchData}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-blue-500/30"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Kenali <span className="text-blue-600">Kandidatmu</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pelajari visi, misi, dan program kerja calon pemimpin masa depan.
            Pilihanmu menentukan arah organisasi.
          </p>
        </div>

        {/* Custom Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-1.5 rounded-xl shadow-sm border border-gray-200 inline-flex">
            <button
              className={`px-8 py-3 rounded-lg font-bold text-sm md:text-base transition-all duration-200 ${
                activeTab === "presma"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("presma")}
            >
              Presiden Mahasiswa
            </button>
            <button
              className={`px-8 py-3 rounded-lg font-bold text-sm md:text-base transition-all duration-200 ${
                activeTab === "gubma"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("gubma")}
            >
              Gubernur Mahasiswa
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="min-h-[400px]">
          {activeTab === "presma" && (
            <div className="animate-fade-in-up">
              {kandidatPresma.length > 0 ? (
                <>
                  <div className="flex flex-wrap justify-center gap-8 mb-12">
                    {kandidatPresma.map(renderCard)}
                  </div>
                  <div className="text-center">
                    <p className="inline-block bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                      💡 Klik kartu kandidat untuk melihat detail lengkap
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                  <img src="/img/empty-box.png" alt="Empty" className="w-32 h-32 mx-auto mb-4 opacity-50" onError={(e) => e.target.style.display = 'none'} />
                  <p className="text-xl text-gray-500 font-medium">Belum ada kandidat PRESMA yang terdaftar.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "gubma" && (
            <div className="animate-fade-in-up">
              {kandidatGubmaGrouped.length > 0 ? (
                <>
                  {kandidatGubmaGrouped.map((jur, i) => (
                    <div key={i} className="mb-16 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                      <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-4">
                        <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
                        <h3 className="text-2xl font-bold text-gray-800">
                          Jurusan {jur.jurusan}
                        </h3>
                      </div>
                      <div className="flex flex-wrap justify-center gap-8">
                        {jur.data.map(renderCard)}
                      </div>
                    </div>
                  ))}
                  <div className="text-center mt-8">
                    <p className="inline-block bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                      💡 Klik kartu kandidat untuk melihat detail lengkap
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                  <p className="text-xl text-gray-500 font-medium">Belum ada kandidat GUBMA yang terdaftar.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modern Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelected(null)}
          ></div>
          
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all scale-100">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-gray-500 hover:text-red-500 p-2 rounded-full transition-colors shadow-sm backdrop-blur-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Left Column: Image & Basic Info */}
              <div className="md:w-2/5 bg-gray-50 p-8 flex flex-col items-center text-center border-r border-gray-100">
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-lg mb-6 group">
                  {selected.foto_pasangan ? (
                    <img
                      src={selected.foto_pasangan}
                      alt={`${selected.nama_ketua} & ${selected.nama_wakil}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 font-medium"
                    style={{ display: selected.foto_pasangan ? "none" : "flex" }}
                  >
                    Tidak Ada Foto
                  </div>
                  <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    No. Urut {selected.nomor_urut || "0"}
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selected.nama_ketua}
                </h2>
                <div className="text-gray-400 font-medium text-sm mb-1">&</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {selected.nama_wakil}
                </h2>

                {selected.npm_ketua && selected.npm_wakil && (
                  <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 text-sm text-gray-600 mb-4 w-full">
                    <div className="flex justify-between mb-1">
                      <span>Ketua:</span>
                      <span className="font-mono font-bold">{selected.npm_ketua}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Wakil:</span>
                      <span className="font-mono font-bold">{selected.npm_wakil}</span>
                    </div>
                  </div>
                )}

                {selected.jurusan && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {selected.jurusan.nama_jurusan}
                  </span>
                )}
              </div>

              {/* Right Column: Details */}
              <div className="md:w-3/5 p-8 md:overflow-y-auto max-h-[90vh]">
                <div className="mb-8">
                  <h3 className="flex items-center text-xl font-bold text-gray-900 mb-4">
                    <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </span>
                    Visi
                  </h3>
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-gray-700 leading-relaxed italic">
                    "{selected.visi}"
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="flex items-center text-xl font-bold text-gray-900 mb-4">
                    <span className="bg-green-100 text-green-600 p-2 rounded-lg mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    </span>
                    Misi
                  </h3>
                  <div className="space-y-3">
                    {selected.misi ? (
                      <div className="whitespace-pre-line text-gray-700 leading-relaxed pl-4 border-l-4 border-green-200">
                        {selected.misi}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">Tidak ada data misi.</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="flex items-center text-xl font-bold text-gray-900 mb-4">
                    <span className="bg-purple-100 text-purple-600 p-2 rounded-lg mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </span>
                    Program Kerja
                  </h3>
                  <ul className="space-y-2">
                    {selected.proker && selected.proker.length > 0 ? (
                      selected.proker.map((p, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600 text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-gray-700">{p}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500 italic pl-9">Tidak ada data program kerja.</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
