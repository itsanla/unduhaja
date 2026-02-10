"use client";

import Image from "next/image";

const SPONSORS = [
  "coinbase",
  "spotify",
  "pinterest",
  "google",
  "amazon",
  "netflix",
];

export default function SponsoredBy() {
  return (
    <section className="py-8 px-8 lg:py-20">
      <div className="container mx-auto text-center">
        <p className="mb-8 text-sm font-semibold uppercase tracking-wider text-blue-gray-700">
          Dipercaya Oleh
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 opacity-60 grayscale">
          {SPONSORS.map((logo, key) => (
            <Image
              width={256}
              height={256}
              key={key}
              src={`/logos/logo-${logo}.svg`}
              alt={logo}
              className="w-40"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
