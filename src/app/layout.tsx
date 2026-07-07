import type { Metadata } from "next";
import { RouteProvider } from "@/context/RouteContext";
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
  title: "Best Route",
  description: "Otimizador inteligente de rotas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased font-sans antialiased bg-neutral-50 text-neutral-800`}
    >
      <body className="min-h-full flex flex-col">
        <RouteProvider>
          {children}
        </RouteProvider>
      </body>
    </html>
  );
}
