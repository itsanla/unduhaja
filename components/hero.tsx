"use client";

import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default function Hero() {
  return (
    <div className="relative min-h-screen w-full bg-[url('/image/event.jpeg')] bg-cover bg-no-repeat bg-center">
      <div className="absolute inset-0 h-full w-full bg-gray-900/60" />
      <div className="grid min-h-screen px-8">
        <div className="container relative z-10 my-auto mx-auto grid place-items-center text-center">
          <p className="mb-2 text-lg font-medium uppercase tracking-wider text-white/80 md:text-xl">
            unduhaja.me — Alat Digital Serba Bisa
          </p>
          <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:max-w-3xl lg:text-5xl">
            Alat Digital Serba Bisa – Semua Proses di Perangkat Anda Sendiri
          </h1>
          <p className="mt-4 mb-12 w-full text-lg font-normal leading-relaxed text-white/90 md:max-w-full lg:max-w-2xl lg:text-xl">
            Konversi file, transkripsi audio, dan hapus background foto — semua
            dilakukan langsung di browser Anda. Cepat, aman, dan 100% gratis
            tanpa batasan.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="/converter"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-gray-900 shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl"
            >
              Coba Sekarang
            </a>
            <a
              href="#tentang"
              className="inline-flex items-center gap-2 rounded-full bg-white p-4 text-gray-900 shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl"
            >
              <ArrowRightIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
