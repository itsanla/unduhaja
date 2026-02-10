"use client";

import AboutCard from "@/components/about-card";

const EVENT_INFO = [
  {
    title: "Privasi 100% Terjamin",
    description:
      "File Anda tidak pernah dikirim ke server manapun. Semua proses konversi, transkripsi, dan editing terjadi langsung di browser Anda sendiri — aman dan privat.",
    subTitle: "Keamanan",
  },
  {
    title: "Gratis & Tanpa Batasan",
    description:
      "Tidak ada limit jumlah file, tidak ada biaya langganan. Karena semua diproses di perangkat Anda, kami tidak memerlukan server mahal — jadi semuanya gratis selamanya.",
    subTitle: "Akses Bebas",
  },
];

export default function AboutEvent() {
  return (
    <section
      id="tentang"
      className="container mx-auto flex flex-col items-center px-4 py-10"
    >
      <p className="mb-2 text-center text-sm font-semibold uppercase tracking-wider text-orange-500">
        Tentang Kami
      </p>
      <h3 className="text-center text-3xl font-bold text-blue-gray-900">
        Kenapa Memilih unduhaja.me?
      </h3>
      <p className="mt-2 mb-8 w-full text-center text-lg font-normal text-gray-500 lg:max-w-4xl">
        Kami membuat sebuah website &quot;serba bisa&quot; yang menyediakan
        alat-alat digital untuk mempermudah pekerjaan sehari-hari. Bayangkan
        seperti memiliki pisau lipat Swiss Army, tapi untuk kebutuhan file
        digital — dokumen, foto, dan suara. Yang membuat kami berbeda: semua
        proses terjadi langsung di perangkat pengguna (HP/Laptop), bukan di
        server kami. Ini artinya bekerja lebih cepat dan jauh lebih aman.
      </p>
      <p className="mb-8 w-full text-center text-base font-normal text-gray-500 lg:max-w-3xl">
        Cocok untuk mahasiswa, pekerja kantoran, pedagang online/UMKM, dan
        konten kreator yang butuh alat praktis tanpa ribet install aplikasi.
      </p>
      <div className="mt-8 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        {EVENT_INFO.map((props, idx) => (
          <AboutCard key={idx} {...props} />
        ))}
        <div className="md:col-span-2">
          <AboutCard
            title="Tidak Perlu Install Aplikasi"
            subTitle="Kemudahan"
            description="Cukup buka website unduhaja.me di browser manapun — Chrome, Safari, Firefox — dan langsung gunakan semua alat digital kami. Tanpa download, tanpa registrasi, tanpa ribet."
          />
        </div>
      </div>
    </section>
  );
}
