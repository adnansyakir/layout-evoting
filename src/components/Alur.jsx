export default function Alur() {
  return (
    <section className="px-8 py-6">
      <h3 className="bg-teal-700 text-white text-lg font-semibold px-4 py-2 w-fit rounded">
        ALUR PEMILIHAN UMUM RAYA 2025
      </h3>
      <ol className="list-decimal pl-6 mt-4 space-y-1">
        <li>Mahasiswa datang membawa KTM untuk absensi.</li>
        <li>Mahasiswa diberikan kode voting gubernur per jurusan.</li>
        <li>
          Mahasiswa melakukan voting gubernur dengan menginput nama dan kode.
        </li>
        <li>Mahasiswa melanjutkan ke bagian voting presiden.</li>
        <li>Mahasiswa diberikan kode untuk voting presiden.</li>
        <li>
          Mahasiswa melakukan voting presiden dengan menginput nama dan kode.
        </li>
        <li>Selesai.</li>
      </ol>

      <p className="text-red-600 font-semibold mt-4">
        CATATAN: Apabila peserta terbukti melakukan kecurangan selama proses
        e-voting, maka suara dianggap tidak sah dan akan dikenakan sanksi!
      </p>
    </section>
  );
}
