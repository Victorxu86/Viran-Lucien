import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-background/60 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <a href="/" className="text-lg font-semibold tracking-widest">
              Viran Lucien
            </a>
            <nav className="hidden items-center gap-6 text-sm sm:flex">
              <a className="hover:opacity-70" href="/shop">
                Shop
              </a>
              <a className="hover:opacity-70" href="/lookbook">
                Lookbook
              </a>
              <a className="hover:opacity-70" href="/about">
                About
              </a>
              <a className="hover:opacity-70" href="/contact">
                Contact
              </a>
            </nav>
          </div>
        </header>
        <main className="pt-20">{children}</main>
        <footer className="border-t border-black/10 py-10 text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} Viran Lucien. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
