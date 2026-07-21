import type { Metadata } from "next";
import { RouteProvider } from "@/context/RouteContext";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "./components/layout/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";

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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased font-sans bg-neutral-50 text-neutral-800`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <RouteProvider>
            {children}
            <Footer />
          </RouteProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
