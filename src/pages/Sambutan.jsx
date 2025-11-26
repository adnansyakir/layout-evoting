import wadir from "../assets/wadir.png";

export default function Sambutan() {
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-md flex p-6 gap-6 mr-24 ml-24">
        <img
          src={wadir}
          alt="Wakil Direktur Bidang Kemahasiswaan"
          className="h-64 w-48 object-cover rounded-lg"
        />
        <div className="text-justify leading-relaxed">
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
