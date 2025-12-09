import logo from "../assets/logo.png";

export default function Banner() {
  return (
    <div className="flex flex-col md:flex-row items-center text-center md:text-left mt-1 px-4 sm:px-8 mb-1 ml-2 sm:ml-8 lg:ml-24 mr-2 sm:mr-12">
      <div className="flex justify-center md:justify-start mb-2 md:mb-0">
        <img
          src={logo}
          alt="Banner Pemira"
          className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] object-cover"
        />
      </div>

      <div className="md:pl-10">
        <h2 className="text-[18px] sm:text-[24px] font-bold text-blue-900">
          E-Voting Pemilihan Umum Raya Politeknik Negeri Lampung
        </h2>
        <p className="text-gray-700 mt-2 italic text-[12px] sm:text-[14px]">
          Pemilihan Umum Raya Calon Presiden dan Wakil Presiden Mahasiswa
          Politeknik Negeri Lampung
        </p>
        <p className="text-gray-700 italic mt-1 text-[12px] sm:text-[14px]">
          Pemilihan Umum Raya Calon Gubernur dan Wakil Gubernur Mahasiswa
          Politeknik Negeri Lampung
        </p>
      </div>
    </div>
  );
}
