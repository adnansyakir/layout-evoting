import logo from "../assets/logo.png";

export default function Banner() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left mt-1 px-6 mb-1">
      <div className="md:w-1/3 flex justify-center md:justify-end mb-2 md:mb-0 -ml-96">
        <img
          src={logo}
          alt="Banner Pemira"
          className="w-[150px] h-[150px] object-cover"
        />
      </div>

      <div className="md:w-2/3 md:pl-4">
        <h2 className="text-[24px] font-bold text-teal-900">
          E-Voting Pemilihan Umum Raya Politeknik Negeri Lampung
        </h2>
        <p className="text-gray-700 mt-2 italic text-[14px]">
          Pemilihan Umum Raya Calon Presiden dan Wakil Presiden Mahasiswa
          Politeknik Negeri Lampung
        </p>
        <p className="text-gray-700 italic mt-1 text-[14px]">
          Pemilihan Umum Raya Calon Gubernur dan Wakil Gubernur Mahasiswa
          Politeknik Negeri Lampung
        </p>
      </div>
    </div>
  );
}
