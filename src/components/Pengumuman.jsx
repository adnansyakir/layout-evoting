export default function Pengumuman() {
  return (
    <aside className="bg-gray-100 p-2 sm:p-4 rounded-lg shadow-md w-full sm:w-2/3 md:w-1/3">
      <h3 className="bg-blue-700 text-white text-lg font-semibold px-4 py-2 rounded-t">
        Pengumuman
      </h3>
      <div className="bg-blue-600 text-white px-4 py-1 font-semibold mt-4">
        Pengumuman
      </div>
      <ul className="mt-3 space-y-2 text-blue-700">
        <li>
          <a href="#" className="hover:underline">
            Pendaftaran Calon Presiden dan Wakil Presiden Mahasiswa Politeknik
            Negeri Lampung
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline">
            Pendaftaran Calon Gubernur dan Wakil Gubernur Mahasiswa Politeknik
            Negeri Lampung
          </a>
        </li>
      </ul>
    </aside>
  );
}
