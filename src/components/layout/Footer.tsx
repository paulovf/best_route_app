"use client";

import type { ReactNode } from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";

type FooterProps = {
  resultHref: string;
};

function FooterBold(chunks: ReactNode) {
  return <b>{chunks}</b>;
}

function FooterItalic(chunks: ReactNode) {
  return <i>{chunks}</i>;
}

/**
 * Renders the footer component for the application.
 *
 * @returns The rendered footer component.
 */
export function Footer({ resultHref }: Readonly<FooterProps>) {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-800">
      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-14 pb-6 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo_v2.png"
              alt={t("logoAlt")}
              width={24}
              height={24}
              className="w-6 h-6 object-contain"
              priority
            />
            <span className="font-semibold text-lg text-neutral-50">
              Best Route
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-neutral-300 max-w-xs">
            {t("description")}
          </p>
        </div>

        <div className="md:flex md:flex-col md:items-center">
          <div className="md:flex md:flex-col">
            <h4 className="font-semibold text-sm text-neutral-50">
              {t("productTitle")}
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-[#94A3B8]">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  {t("links.home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#form-screen"
                  className="hover:text-white transition-colors"
                >
                  {t("links.calculate")}
                </Link>
              </li>
              <li>
                <Link
                  href={resultHref}
                  className="hover:text-white transition-colors"
                >
                  {t("links.result")}
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/paulovf/best_route_api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GitHub API
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/paulovf/best_route_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GitHub App
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-white transition-colors"
                >
                  {t("links.privacy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-sm text-neutral-50">
            {t("contactsTitle")}
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-[#94A3B8]">
            <li>
              <Link
                href="https://www.linkedin.com/in/paulo-vitor-francisco"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                {t("links.linkedin")}
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/paulovf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                {t("links.github")}
              </Link>
            </li>
            <li>
              <Link
                href="mailto:paulovfrancisco@gmail.com"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                {t("links.email")}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-neutral-700 mx-6 md:mx-10"></div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 pb-6 flex justify-center text-xs text-[#334155]">
        <p className="mt-8 text-xs text-neutral-400">
          {t.rich("copyright", {
            year: currentYear,
            bold: FooterBold,
            italic: FooterItalic,
          })}
        </p>
      </div>
    </footer>
  );
}
