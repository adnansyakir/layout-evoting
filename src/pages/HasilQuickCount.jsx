import { useState, useEffect } from "react";
import { suaraAPI } from "../services/api";

export default function HasilQuickCount() {
  const [presmaData, setPresmaData] = useState({
    kandidats: [],
    total_suara: 0,
  });
  const [gubmaData, setGubmaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await suaraAPI.getResultsPublic();

      if (response.data) {
        setPresmaData(
          response.data.presma || { kandidats: [], total_suara: 0 }
        );
        setGubmaData(response.data.gubma || []);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Gagal memuat data hasil");
    } finally {
      setLoading(false);
    }
  };

  // Cari pemenang dari array kandidat berdasarkan jumlah_suara
  const findWinner = (kandidats) => {
    if (!kandidats || kandidats.length === 0) return null;
    return kandidats.reduce((winner, k) => {
      const winnerSuara = winner?.jumlah_suara || 0;
      const currentSuara = k.jumlah_suara || 0;
      return currentSuara > winnerSuara ? k : winner;
    }, kandidats[0]);
  };

  // Render Card Kandidat Pemenang
  const renderCardWithResult = (kandidat) => {
    return (
      <div
        key={kandidat.id}
        className="bg-white rounded-xl shadow-lg p-6 w-80 text-center border-2 border-blue-500"
      >
        <img
          src={kandidat.foto_pasangan || "/img/default.png"}
          alt={kandidat.nama_ketua}
          className="rounded-xl w-full h-56 object-cover mb-4"
          onError={(e) => {
            e.target.src = "/img/default.png";
          }}
        />
        <p className="font-bold text-lg text-gray-800">{kandidat.nama_ketua}</p>
        <p className="font-bold text-lg text-gray-800">&</p>
        <p className="font-bold text-lg text-gray-800">{kandidat.nama_wakil}</p>
        {(kandidat.npm_ketua || kandidat.npm_wakil) && (
          <p className="mt-2 text-sm font-bold text-gray-600">
            ({kandidat.npm_ketua || "-"} / {kandidat.npm_wakil || "-"})
          </p>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat hasil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchData}
            className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  const presmaKandidats = presmaData.kandidats || [];
  const presmaWinner = findWinner(presmaKandidats);

  // Custom order untuk jurusan
  const jurusanOrder = [
    "Jurusan Budidaya Tanaman Pangan",
    "Jurusan Budidaya Tanaman Perkebunan",
    "Jurusan Teknologi Pertanian",
    "Jurusan Peternakan",
    "Jurusan Ekonomi dan Bisnis",
    "Jurusan Teknik",
    "Jurusan Perikanan dan Kelautan",
    "Jurusan Teknologi Informasi",
  ];

  const sortedGubmaData = [...gubmaData].sort((a, b) => {
    const indexA = jurusanOrder.indexOf(a.jurusan_nama);
    const indexB = jurusanOrder.indexOf(b.jurusan_nama);
    if (indexA === -1 && indexB === -1)
      return a.jurusan_nama?.localeCompare(b.jurusan_nama);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 md:px-10">
      {/* PRESMA Section */}
      {presmaKandidats.length > 0 && (
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-8 md:p-10 mb-6 sm:mb-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
              📊 Hasil Quick Count E-Voting
            </h1>
            <h2 className="text-2xl font-bold text-gray-700">
              Presiden dan Wakil Presiden Mahasiswa
            </h2>
          </div>
          {/* Hanya tampilkan 1 card pemenang */}
          {presmaWinner && (
            <div className="flex justify-center">
              {renderCardWithResult(presmaWinner)}
            </div>
          )}
        </div>
      )}

      {/* GUBMA Section - Per Jurusan */}
      {sortedGubmaData.length > 0 && (
        <>
          <div className="max-w-7xl mx-auto mb-6 sm:mb-10">
            <div className="border-t-4 border-gray-800 w-2/3 sm:w-3/4 mx-auto"></div>
          </div>

          <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-8 md:p-10">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
                📊 Hasil Quick Count E-Voting
              </h1>
              <h2 className="text-2xl font-bold text-gray-700">
                Gubernur dan Wakil Gubernur Mahasiswa
              </h2>
            </div>

            {sortedGubmaData.map((item, idx) => {
              const winner = findWinner(item.kandidats);

              return (
                <div key={idx} className="mb-10 sm:mb-16 last:mb-0">
                  <div className="border-t border-gray-300 w-1/2 mx-auto mb-4 sm:mb-6"></div>
                  <h3 className="text-lg sm:text-xl font-bold text-center text-gray-800 mb-4 sm:mb-6">
                    {item.jurusan_nama}
                  </h3>

                  {/* Hanya tampilkan 1 card pemenang */}
                  {winner && (
                    <div className="flex justify-center">
                      {renderCardWithResult(winner)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Jika tidak ada data */}
      {presmaKandidats.length === 0 && sortedGubmaData.length === 0 && (
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-4 sm:p-8 md:p-10 text-center">
          <p className="text-gray-600">Belum ada data hasil voting.</p>
        </div>
      )}
    </div>
  );
}
