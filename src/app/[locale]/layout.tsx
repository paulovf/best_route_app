import type { Metadata } from "next";
import Script from "next/script";
import { RouteProvider } from "@/features/routing/context/RouteContext";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import FaroProvider from "@/features/observability/components/FaroProvider";
import CookieBannerWrapper from "@/components/layout/CookieBannerWrapper";
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
        <FaroProvider />
        <NextIntlClientProvider messages={messages}>
          <RouteProvider>{children}</RouteProvider>
          <CookieBannerWrapper />
        </NextIntlClientProvider>

        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "xxo4pr0bv8");
          `}
        </Script>
      </body>
    </html>
  );
}
