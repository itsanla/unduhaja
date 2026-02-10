"use client";

import React from "react";
import EventContentCard from "@/components/event-content-card";

const TABS = ["Konversi File", "Audio ke Teks", "Hapus Background"];

const EVENT_CONTENT = [
  {
    title: "Pengubah File Universal (File Converter)",
    des: "Alat untuk mengubah format file apa saja menjadi format yang diinginkan. Dokumen, gambar, hingga video bisa diubah dalam hitungan detik. Mengatasi masalah file yang tidak bisa dibuka karena format salah. Mendukung PDF, DOCX, PNG, JPG, WEBP, MP4, dan puluhan format lainnya.",
    name: "unduhaja.me",
    position: "Alat Konversi File",
    panel: "Layanan Utama",
    img: "/image/blog-1.svg",
  },
  {
    title: "Pencatat Suara Otomatis (Audio to Text)",
    des: "Pengguna cukup mengunggah rekaman suara, dan website kami akan otomatis mengetikkannya menjadi teks yang rapi. Sangat membantu untuk notulen rapat, transkrip wawancara, atau tugas kuliah. Semua proses berjalan di browser — rekaman Anda tidak pernah meninggalkan perangkat Anda.",
    name: "unduhaja.me",
    position: "Alat Transkripsi Audio",
    panel: "Layanan Utama",
    img: "/image/blog2.svg",
  },
  {
    title: "Penghapus Latar Belakang Foto (Background Remover)",
    des: "Cukup satu klik, latar belakang foto hilang otomatis. Objek utama (orang/barang) terpotong rapi, siap dipakai untuk desain, jualan online, atau pas foto. Hasil berkualitas tinggi tanpa perlu skill editing — cocok untuk UMKM dan konten kreator.",
    name: "unduhaja.me",
    position: "Alat Edit Foto",
    panel: "Layanan Utama",
    img: "/image/blog3.svg",
  },
];

export default function EventContent() {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <section id="layanan" className="py-8 px-8 lg:py-20">
      {/* Tabs */}
      <div className="mb-8 flex w-full flex-col items-center">
        <div className="flex h-12 w-72 items-center rounded-lg bg-blue-gray-50 p-1 md:w-[28rem]">
          {TABS.map((tab, idx) => (
            <button
              key={tab}
              onClick={() => setActiveTab(idx)}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                activeTab === idx
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto">
        {EVENT_CONTENT.map((props, idx) => (
          <EventContentCard key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}
