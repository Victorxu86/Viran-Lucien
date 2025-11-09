import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader, Tangerine } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-headline",
  subsets: ["latin"],
});

const tangerine = Tangerine({
  variable: "--font-brand",
  weight: "700",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Viran Lucien — Official Site",
  description:
    "Viran Lucien：独立服装设计品牌官方网站。探索新品、造型与品牌故事，订阅获取上新通知。",
  metadataBase: new URL("https://viranlucien.com"),
  openGraph: {
    title: "Viran Lucien",
    description:
      "独立服装设计品牌官方网站。探索新品、造型与品牌故事，订阅获取上新通知。",
    url: "https://viranlucien.com",
    siteName: "Viran Lucien",
    images: [{ url: "/og.svg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Viran Lucien",
    description:
      "独立服装设计品牌官方网站。探索新品、造型与品牌故事，订阅获取上新通知。",
    images: ["/og.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} ${tangerine.variable} antialiased`}>
        <Header />
        <main className="page pt-40">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
