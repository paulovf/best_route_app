"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useRoute } from "@/context/RouteContext";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useTranslations } from "next-intl";

export /**
 * Renders the footer component for the application.
 *
 * @return {*} The rendered footer component.
 */
function Footer() {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();
  const { routeData, errorData } = useRoute();
  const isMounted = useIsMounted();

  let resultHref = "/#form-screen";

  if (isMounted) {
    if (routeData && routeData.options && routeData.options.length > 0) {
      resultHref = "/result/success";
    } else if (errorData) {
      resultHref = "/result/fail";
    }
  }

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
                  href="/privacy_policy"
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
            bold: (chunks) => <b>{chunks}</b>,
            italic: (chunks) => <i>{chunks}</i>,
          })}
        </p>
      </div>
    </footer>
  );
}
