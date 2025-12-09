import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { suaraAPI } from "../services/api";

const COLORS = [
  "#FCA5A5",
  "#86EFAC",
  "#93C5FD",
  "#FDE047",
  "#C4B5FD",
  "#F9A8D4",
];

export default function QuickCount() {
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
      setError("Gagal memuat data quick count");
    } finally {
      setLoading(false);
    }
  };

  // Render Card Kandidat dengan persentase dan outline sesuai warna
  const renderCard = (kandidat, index = 0, totalKandidat = 1) => {
    // Jika hanya 1 kandidat, warna biru. Jika lebih, sesuai warna donut
    const borderColor =
      totalKandidat === 1 ? "#3B82F6" : COLORS[index % COLORS.length];

    return (
      <div
        key={kandidat.id}
        className="bg-white rounded-xl shadow-md p-4 w-80 text-center border-2 relative"
        style={{ borderColor: borderColor }}
      >
        {/* Container gambar dengan posisi relative untuk badge */}
        <div className="relative">
          {kandidat.nomor_urut && (
            <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 font-bold w-12 h-12 flex items-center justify-center rounded-full shadow-lg border-2 border-white z-10">
              {kandidat.nomor_urut}
            </div>
          )}
          <img
            src={kandidat.foto_pasangan || "/img/default.png"}
            alt={kandidat.nama_ketua}
            className="rounded-xl w-full h-56 object-cover mb-4"
            onError={(e) => {
              e.target.src = "/img/default.png";
            }}
          />
        </div>
        <p className="font-semibold text-gray-800">{kandidat.nama_ketua}</p>
        <p className="font-semibold text-gray-800">&</p>
        <p className="font-semibold text-gray-800">{kandidat.nama_wakil}</p>
        {(kandidat.npm_ketua || kandidat.npm_wakil) && (
          <p className="mt-2 text-sm font-bold text-gray-600">
            ({kandidat.npm_ketua || "-"} / {kandidat.npm_wakil || "-"})
          </p>
        )}
      </div>
    );
  };

  // Render Pie Chart dengan data real
  const renderPieChart = (kandidats) => {
    const chartData = kandidats.map((k) => ({
      name: k.nomor_urut
        ? `No. ${k.nomor_urut} - ${k.nama_ketua} & ${k.nama_wakil}`
        : `${k.nama_ketua} & ${k.nama_wakil}`,
      value: k.persentase || 0,
      suara: k.jumlah_suara || 0,
    }));

    const totalSuara = kandidats.reduce(
      (sum, k) => sum + (k.jumlah_suara || 0),
      0
    );

    return (
      <div className="bg-white rounded-xl shadow-lg p-6 w-[380px] flex flex-col items-center justify-center">
        {totalSuara > 0 ? (
          <>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  label={({ value }) => `${value}%`}
                  labelLine={{ stroke: "#666", strokeWidth: 1 }}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-center">
                          <p className="font-bold text-gray-800 text-sm">
                            {data.name}
                          </p>
                          <p className="text-gray-600 text-sm mt-1">
                            {data.value}%
                          </p>
                          <p className="text-gray-600 text-sm">
                            ({data.suara} suara)
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Legend Custom - Nama Pasangan */}
            <div className="mt-4 w-full space-y-2">
              {kandidats.map((k, index) => (
                <div
                  key={k.id}
                  className="flex items-center justify-center gap-2"
                >
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <p className="text-sm text-gray-700 font-bold">
                    {k.nomor_urut ? `No. ${k.nomor_urut} - ` : ""}
                    {k.nama_ketua} & {k.nama_wakil}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-500">Belum ada suara</p>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data...</p>
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
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-4 sm:p-8 md:p-10 mb-6 sm:mb-10">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-2">
            Quick Count E-Voting
          </h1>
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-10">
            Calon Presiden dan Wakil Presiden Mahasiswa
          </h2>

          {presmaKandidats.length === 1 ? (
            <div className="flex justify-center">
              {renderCard(presmaKandidats[0], 0, presmaKandidats.length)}
            </div>
          ) : presmaKandidats.length === 2 ? (
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 md:gap-10">
              {renderCard(presmaKandidats[0], 0, presmaKandidats.length)}
              {renderPieChart(presmaKandidats)}
              {renderCard(presmaKandidats[1], 1, presmaKandidats.length)}
            </div>
          ) : (
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 md:gap-10">
              {presmaKandidats.map((k, i) =>
                renderCard(k, i, presmaKandidats.length)
              )}
              {presmaKandidats.length > 1 && renderPieChart(presmaKandidats)}
            </div>
          )}
        </div>
      )}

      {/* GUBMA Section - Per Jurusan */}
      {sortedGubmaData.length > 0 && (
        <>
          <div className="max-w-7xl mx-auto mb-6 sm:mb-10">
            <div className="border-t-4 border-gray-400 w-2/3 sm:w-3/4 mx-auto"></div>
          </div>

          <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-4 sm:p-8 md:p-10">
            <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-2">
              Quick Count E-Voting
            </h1>
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-10">
              Calon Gubernur dan Wakil Gubernur Mahasiswa
            </h2>

            {sortedGubmaData.map((item, idx) => (
              <div key={idx} className="mb-10 sm:mb-16 last:mb-0">
                <div className="border-t-2 border-gray-300 w-2/3 sm:w-3/4 mx-auto mb-4 sm:mb-6"></div>
                <h3 className="text-lg sm:text-xl font-bold text-center text-gray-700 mb-4 sm:mb-6">
                  {item.jurusan_nama}
                </h3>

                {item.kandidats.length === 1 ? (
                  <div className="flex justify-center">
                    {renderCard(item.kandidats[0], 0, item.kandidats.length)}
                  </div>
                ) : item.kandidats.length === 2 ? (
                  <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 md:gap-10">
                    {renderCard(item.kandidats[0], 0, item.kandidats.length)}
                    {renderPieChart(item.kandidats)}
                    {renderCard(item.kandidats[1], 1, item.kandidats.length)}
                  </div>
                ) : (
                  <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 md:gap-10">
                    {item.kandidats.map((k, i) =>
                      renderCard(k, i, item.kandidats.length)
                    )}
                    {item.kandidats.length > 1 &&
                      renderPieChart(item.kandidats)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Jika tidak ada data */}
      {presmaKandidats.length === 0 && sortedGubmaData.length === 0 && (
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-4 sm:p-8 md:p-10 text-center">
          <p className="text-gray-600">Belum ada data kandidat.</p>
        </div>
      )}
    </div>
  );
}
