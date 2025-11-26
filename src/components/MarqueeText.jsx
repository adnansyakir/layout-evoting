export default function MarqueeText() {
  return (
    <div className="relative w-full overflow-hidden border-t border-b border-gray-300 py-2 my-4 bg-teal-800">
      <div className="animate-marquee whitespace-nowrap ">
        <span className="text-white font-semibold text-lg mx-4">
          Selamat datang di situs resmi Pemilihan Umum Raya (PEMIRA) 👋 Calon
          Presiden dan Wakil Presiden Mahasiswa serta Calon Gubernur dan
          Wakil Gubernur Mahasiswa Politeknik Negeri Lampung. AYO, GUNAKAN HAK
          PILIH ANDA! #PEMIRAPOLINELA
        </span>
      </div>
    </div>
  );
}

