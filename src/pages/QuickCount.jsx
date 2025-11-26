import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function QuickCount() {
  const data = [
    { name: "Rahmad & Rayhan", value: 45.45 },
    { name: "Bagus & Iskandar", value: 54.55 },
  ];

  const COLORS = ["#FCA5A5", "#93C5FD"];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-10">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-2">
          Quick Count E-Voting
        </h1>
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-10">
          Calon Presiden dan Wakil Presiden Mahasiswa
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-10">
          {/* === CARD PASLON 01 === */}
          <div className="bg-white rounded-xl shadow-md p-4 w-80 text-center">
            <img
              src="/img/paslon1.png"
              alt="Bagus & Iskandar"
              className="rounded-xl w-full h-56 object-cover mb-4"
            />
            <p className="font-semibold text-gray-800">Bagus Eka Saputra</p>
            <p className="font-semibold text-gray-800">&</p>
            <p className="font-semibold text-gray-800">Iskandar Ibnu Pailis</p>
            <p className="mt-2 text-sm font-bold text-gray-600">
              (Peternakan / Ekonomi dan Bisnis)
            </p>
          </div>

          {/* === PIE CHART === */}
          <div className="bg-white rounded-xl shadow-md p-6 w-[360px] h-[360px] flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, value }) => `${value}%`}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* === CARD PASLON 02 === */}
          <div className="bg-white rounded-xl shadow-md p-4 w-80 text-center">
            <img
              src="/img/paslon2.png"
              alt="Rahmad & Rayhan"
              className="rounded-xl w-full h-56 object-cover mb-4"
            />
            <p className="font-semibold text-gray-800">Rahmad Perwira Adha</p>
            <p className="font-semibold text-gray-800">&</p>
            <p className="font-semibold text-gray-800">
              Rayhan Annanda Pratama
            </p>
            <p className="mt-2 text-sm font-bold text-gray-600">
              (Peternakan / Teknik)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
