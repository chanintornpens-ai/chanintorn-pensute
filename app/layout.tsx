import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import { siteEn } from "./site-config";
import { LangProvider } from "./components/LangProvider";

// ฟอนต์ชุดเดียวกับ Life Tracker: Plus Jakarta Sans (ละติน) + Noto Sans Thai
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const notoThai = Noto_Sans_Thai({
  variable: "--font-thai",
  subsets: ["thai", "latin"],
});

export const metadata: Metadata = {
  title: `${siteEn.name} — ${siteEn.role}`,
  description: siteEn.subheadline,
  openGraph: {
    title: `${siteEn.name} — ${siteEn.role}`,
    description: siteEn.subheadline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${notoThai.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
