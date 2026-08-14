import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "../lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "WolfPN — быстрый и безопасный VPN",
  description:
    "WolfPN — приватный VPN для телефона и компьютера. Быстрое подключение через Telegram, пробный доступ и поддержка 24/7.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "WolfPN",
    url: SITE_URL,
    title: "WolfPN — быстрый и безопасный VPN",
    description: "Приватный VPN для телефона и компьютера с пробным доступом и поддержкой 24/7.",
    images: [{ url: "/media/wolf-brand.webp", width: 640, height: 640, alt: "WolfPN" }],
  },
  verification: process.env.YANDEX_VERIFICATION
    ? { yandex: process.env.YANDEX_VERIFICATION }
    : undefined,
  other: { "codex-preview": "development" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
