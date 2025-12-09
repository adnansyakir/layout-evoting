import wadir from "../assets/wadir.png";

export default function Sambutan() {
  return (
    <div className="px-4 sm:px-6 md:px-24 py-6">
      <div className="bg-white rounded-xl shadow-md flex flex-col md:flex-row p-4 sm:p-6 gap-4 sm:gap-6">
        <img
          src={wadir}
          alt="Wakil Direktur Bidang Kemahasiswaan"
          className="h-40 w-32 sm:h-64 sm:w-48 object-cover rounded-lg mx-auto md:mx-0"
        />
        <div className="text-justify leading-relaxed mt-4 md:mt-0">
          <p>Assalamualaikum warahmatullahi wabarakatuh,</p>
          <p className="mt-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p className="mt-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p className="mt-3">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <p className="mt-3">Wassalamualaikum warahmatullahi wabarakatuh.</p>
          <p className="mt-3 font-semibold">
            Wakil Direktur Bidang Kemahasiswaan Politeknik Negeri Lampung
          </p>
          <p className="italic">Agung Adi Candra, S.Kh., M.Si.</p>
        </div>
      </div>
    </div>
  );
}
