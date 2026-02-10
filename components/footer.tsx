import {
  GlobeAltIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";

export default function Footer() {
  const CURRENT_YEAR = new Date().getFullYear();
  const LINKS = ["Beranda", "Layanan", "Tentang", "FAQ", "Kontak"];
  const SOCIAL_LINKS = [
    {
      icon: GlobeAltIcon,
      url: "https://anla.my.id",
      label: "Portfolio",
      title: "Portfolio",
    },
    {
      icon: EnvelopeIcon,
      url: "mailto:me@anla.my.id",
      label: "Email",
      title: "Email",
    },
  ];

  return (
    <footer className="p-10 pb-5 md:pt-10">
      <div className="container mx-auto flex flex-col">
        {/* CTA Banner */}
        <div
          id="mulai"
          className="mx-auto mb-5 flex w-full max-w-6xl flex-col items-center justify-center rounded-2xl bg-gray-900 p-5 py-10 md:mb-20"
        >
          <h2 className="text-center text-2xl font-bold text-white md:text-3xl">
            Mulai Gunakan unduhaja.me — Gratis!
          </h2>
          <p className="my-3 text-center text-base text-white/80 md:w-7/12">
            Konversi file, transkripsi audio, dan hapus background foto langsung
            dari browser Anda. Tanpa install, tanpa daftar, tanpa biaya.
          </p>
          <div className="mt-2 flex w-full flex-col gap-3 md:w-fit md:flex-row">
            <a
              href="/converter"
              className="rounded-lg bg-white px-6 py-3 text-center font-medium text-gray-900 transition-colors hover:bg-gray-100"
            >
              Coba Konversi File
            </a>
          </div>
        </div>

        {/* Footer links */}
        <div className="flex flex-col items-center justify-between md:flex-row">
          <a
            href="#"
            className="text-lg font-semibold text-gray-900"
          >
            unduhaja.me
          </a>
          <ul className="mx-auto my-4 flex w-max items-center justify-center gap-4 md:my-0">
            {LINKS.map((link, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="text-sm font-normal text-gray-700 transition-colors hover:text-gray-900"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex w-fit justify-center gap-2">
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.title}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
            <a
              href="https://www.linkedin.com/in/anlaharpanda"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              <i className="fa-brands fa-linkedin text-lg" />
            </a>
            <a
              href="https://github.com/itsanla"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              <i className="fa-brands fa-github text-lg" />
            </a>
          </div>
        </div>

        {/* Copyright & Developer Info */}
        <div className="mt-12 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm font-semibold text-gray-900">
            © {CURRENT_YEAR} unduhaja.me - Alat Digital Serba Bisa
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Developed by{" "}
            <a
              href="https://anla.my.id"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gray-900 hover:text-orange-500 transition-colors"
            >
              Anla Harpanda
            </a>
          </p>
          <p className="mt-1 text-sm text-gray-600">
            Padang, Indonesia • {" "}
            <a
              href="mailto:me@anla.my.id"
              className="font-medium text-gray-900 hover:text-orange-500 transition-colors"
            >
              me@anla.my.id
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
