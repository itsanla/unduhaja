import {
  GlobeAltIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";

export default function BlogFooter() {
  const CURRENT_YEAR = new Date().getFullYear();
  const LINKS = [
    { name: "Beranda", href: "/" },
    { name: "Layanan", href: "/#layanan" },
    { name: "Tentang", href: "/#tentang" },
    { name: "Blog", href: "/blog" },
    { name: "FAQ", href: "/#faq" },
  ];
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
    <footer className="border-t border-gray-100 px-4 md:px-6 lg:px-12 xl:px-16 py-10 pb-5 md:pt-10">
      <div className="container mx-auto flex flex-col">
        {/* Footer links */}
        <div className="flex flex-col items-center justify-between md:flex-row">
          <a
            href="/"
            className="text-lg font-semibold text-gray-900"
          >
            unduhaja.me
          </a>
          <ul className="mx-auto my-4 flex w-max items-center justify-center gap-4 md:my-0">
            {LINKS.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-sm font-normal text-gray-700 transition-colors hover:text-gray-900"
                >
                  {link.name}
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
