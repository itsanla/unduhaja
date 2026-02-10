"use client";

import React from "react";
import {
  Bars3Icon,
  XMarkIcon,
  RectangleStackIcon,
  InformationCircleIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/solid";

const NAV_MENU = [
  { name: "Beranda", icon: RectangleStackIcon, href: "/" },
  { name: "Konversi File", icon: WrenchScrewdriverIcon, href: "/converter" },
  { name: "Tentang", icon: InformationCircleIcon, href: "/#tentang" },
];

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [isScrolling, setIsScrolling] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolling(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full border-0 transition-all duration-300 ${
        isScrolling ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <a
          href="#"
          className={`text-lg font-bold ${
            isScrolling ? "text-blue-gray-900" : "text-white"
          }`}
        >
          unduhaja.me
        </a>

        {/* Desktop nav */}
        <ul
          className={`ml-10 hidden items-center gap-6 lg:flex ${
            isScrolling ? "text-gray-900" : "text-white"
          }`}
        >
          {NAV_MENU.map(({ name, icon: Icon, href }) => (
            <li key={name}>
              <a
                href={href}
                className="flex items-center gap-2 font-medium transition-colors hover:text-orange-500"
              >
                <Icon className="h-5 w-5" />
                <span>{name}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="#faq"
            className={`rounded-lg px-4 py-2 font-medium transition-colors ${
              isScrolling
                ? "text-gray-900 hover:bg-gray-100"
                : "text-white hover:bg-white/10"
            }`}
          >
            FAQ
          </a>
          <a
            href="#mulai"
            className={`rounded-lg px-4 py-2 font-medium ${
              isScrolling
                ? "bg-gray-900 text-white hover:bg-gray-800"
                : "bg-white text-gray-900 hover:bg-gray-100"
            }`}
          >
            Mulai Sekarang
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className={`ml-auto inline-block rounded-lg p-2 lg:hidden ${
            isScrolling
              ? "text-gray-900 hover:bg-gray-100"
              : "text-white hover:bg-white/10"
          }`}
        >
          {open ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile collapse */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="container mx-auto mt-2 rounded-lg bg-white px-6 py-5 shadow-lg">
          <ul className="flex flex-col gap-4 text-gray-900">
            {NAV_MENU.map(({ name, icon: Icon, href }) => (
              <li key={name}>
                <a
                  href={href}
                  className="flex items-center gap-2 font-medium hover:text-orange-500"
                  onClick={() => setOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  {name}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center gap-4">
            <a
              href="#faq"
              className="rounded-lg px-4 py-2 font-medium text-gray-900 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              FAQ
            </a>
            <a
              href="#mulai"
              className="rounded-lg bg-gray-900 px-4 py-2 font-medium text-white hover:bg-gray-800"
              onClick={() => setOpen(false)}
            >
              Mulai Sekarang
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
