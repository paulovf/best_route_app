"use client";

import React, { useEffect } from "react";
import { useRoute } from "@/features/routing/context/RouteContext";
import { useRouter, Link } from "@/i18n/routing";
import { CircleAlert } from "lucide-react";
import Topbar from "@/components/layout/Topbar";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useTranslations } from "next-intl";
import { useResultLink } from "@/features/routing/hooks/useResultLink";
import { Footer } from "@/components/layout/Footer";

const listHttpStatusCodeMapping = new Set([400, 422, 504]);

/**
 * Renders the error page when route calculation fails.
 * It displays a friendly message based on the error status code.
 *
 * @returns The rendered error page component or null if there's no error data.
 */
export default function ErrorPage() {
  const { errorData } = useRoute();
  const router = useRouter();
  const isMounted = useIsMounted();
  const resultHref = useResultLink();
  const t = useTranslations("ErrorPage");

  useEffect(() => {
    if (!errorData) {
      router.replace("/#form-screen");
    }
  }, [errorData, router]);

  if (!isMounted || !errorData) {
    return null;
  }

  const getFriendlyMessage = (status: number) => {
    if (listHttpStatusCodeMapping.has(status)) {
      return t(`messages.${status}`);
    }
    return t("messages.default");
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <main className="pt-0">
        <div className="relative min-h-screen text-white selection:bg-emerald-500">
          <Topbar show={true} resultHref={resultHref} />
          <section
            id="result-screen"
            className="relative min-h-screen screen flex flex-col bg-neutral-50 gap-y-8 overflow-hidden pt-8"
          >
            <div className="w-full flex flex-col gap-y-6 items-center">
              <div className="max-w-2xl mx-auto px-6 py-12 rounded-xl border border-neutral-200 bg-white shadow-sm">
                <div className="mx-auto mb-4 flex h-[80px] w-[80px] items-center justify-center rounded-full bg-red-50">
                  <CircleAlert size={64} className="text-red-600" />
                </div>

                <h1 className="text-xl font-semibold text-neutral-700">
                  {t("title")}
                </h1>

                <p className="mt-3 text-sm text-neutral-600 text-center">
                  {getFriendlyMessage(errorData.status || 500)}
                </p>

                <Link
                  href="/#form-screen"
                  id="btn-new-route"
                  className="flex flex-row items-center justify-center w-full mt-6 bg-neutral-700 text-neutral-50 rounded-full font-semibold h-12 text-base shadow-sm hover:opacity-50 active:scale-95 transition-all cursor-pointer"
                >
                  {t("button")}
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer resultHref={resultHref} />
    </div>
  );
}

ErrorPage.displayName = "ErrorPage";
