import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "unduhaja.me — Alat Digital Serba Bisa",
  description:
    "Alat digital serba bisa untuk konversi file, transkripsi audio, dan hapus background foto. Semua proses di perangkat Anda sendiri — cepat, aman, dan gratis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="shortcut icon" href="/icon.webp" type="image/webp" />
        {/* Preload hero background for faster LCP */}
        <link
          rel="preload"
          href="/image/event.webp"
          as="image"
          type="image/webp"
        />
        {/* Preload Font Awesome without blocking render */}
        <link
          rel="preload"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
          as="style"
          crossOrigin="anonymous"
        />
      </head>
      <body className={roboto.className + " antialiased"}>
        {children}
        {/* Load Font Awesome CSS asynchronously after page render */}
        <Script id="load-font-awesome" strategy="afterInteractive">
          {`
            (function(){
              var link = document.createElement('link');
              link.rel = 'stylesheet';
              link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css';
              link.integrity = 'sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==';
              link.crossOrigin = 'anonymous';
              link.referrerPolicy = 'no-referrer';
              document.head.appendChild(link);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
