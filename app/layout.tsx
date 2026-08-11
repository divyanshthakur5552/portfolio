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
  title: "Divyansh Thakur | Full-Stack Developer",
  description: "Portfolio of Divyansh Thakur — Full-Stack Developer specializing in MERN Stack, React, Next.js, and GenAI Workflows.",
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", type: "image/x-icon" },
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Divyansh Thakur | Full-Stack Developer",
    description: "Portfolio of Divyansh Thakur — Full-Stack Developer specializing in MERN Stack, React, Next.js, and GenAI Workflows.",
    siteName: "Divyansh Thakur Portfolio",
    images: [
      {
        url: "/profile.png",
        width: 1200,
        height: 630,
        alt: "Divyansh Thakur Portfolio",
      },
    ],
    locale: "en_US",
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
      className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
