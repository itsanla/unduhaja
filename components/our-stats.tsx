"use client";

import StatsCard from "@/components/stats-card";

const STATS = [
  {
    count: "10.000+",
    title: "Pengguna Aktif",
  },
  {
    count: "500.000+",
    title: "File Diproses",
  },
  {
    count: "100%",
    title: "Privasi Terjamin",
  },
  {
    count: "Rp 0",
    title: "Gratis Selamanya",
  },
];

export default function OurStats() {
  return (
    <section className="container mx-auto grid gap-10 px-8 py-44 lg:grid-cols-1 lg:gap-20 xl:grid-cols-2 xl:place-items-center">
      <div>
        <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-orange-500">
          Statistik Kami
        </p>
        <h2 className="text-4xl font-bold leading-tight text-blue-gray-900 lg:w-3/4 lg:text-5xl">
          Angka yang Berbicara
        </h2>
        <p className="mt-3 w-full text-lg text-gray-500 lg:w-9/12">
          unduhaja.me telah membantu ribuan pengguna menyelesaikan pekerjaan
          digital mereka dengan cepat dan aman — semuanya gratis, langsung dari
          browser.
        </p>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-8 gap-x-28">
          {STATS.map((props, key) => (
            <StatsCard key={key} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
