"use client";

import React, { useEffect } from "react";
import { useRoute } from "@/context/RouteContext";
import { useRouter } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import { CircleAlert } from "lucide-react";
import Topbar from "@/app/[locale]/components/layout/Topbar";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useTranslations } from "next-intl";

export default function ErrorPage() {
  const { errorData } = useRoute();
  const router = useRouter();
  const t = useTranslations("ErrorPage");
  const isMounted = useIsMounted();

  useEffect(() => {
    if (!errorData) {
      router.replace("/");
    }
  }, [errorData, router]);

  if (!isMounted || !errorData) return null;

  const getFriendlyMessage = (status: number) => {
    switch (status) {
      case 400: return t("messages.400");
      case 422: return t("messages.422");
      case 504: return t("messages.504");
      default: return t("messages.default");
    }
  };

  return (
    <main className="min-h-screen bg-neutral-50 animate-fadeIn">
      <Topbar show={true} />
      <div id="result-screen" className="h-screen flex flex-row items-center justify-center">
        <div className="flex flex-col items-center justify-center max-w-md rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="mx-auto mb-4 flex h-[80px] w-[80px] items-center justify-center rounded-full bg-red-50">
            <CircleAlert size={64} className="text-red-600" />
          </div>
          <h1 className="text-xl font-semibold text-neutral-700">{t("title")}</h1>
          <p className="mt-3 text-sm text-neutral-600 text-center">
            {getFriendlyMessage(errorData.status || 500)}
          </p>
          <Link href="/" id="btn-new-route" className="flex items-center justify-center w-full mt-6 bg-neutral-700 text-neutral-50 rounded-full font-semibold h-12 text-base hover:opacity-50 transition-all">
            {t("button")}
          </Link>
        </div>
      </div>
    </main>
  );
}
