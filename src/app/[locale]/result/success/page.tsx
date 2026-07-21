"use client";

import React, { useEffect } from "react";
import { useRoute } from "@/context/RouteContext";
import { useRouter, Link } from "@/i18n/routing";
import { OptionCard } from "../../components/layout/OptionCard";
import Topbar from "@/app/[locale]/components/layout/Topbar";
import { Signpost, Info, MoveRight, Dot } from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useTranslations, useLocale } from "next-intl";

export default function SuccessPage() {
  const { routeData } = useRoute();
  const router = useRouter();
  const t = useTranslations("SuccessPage");
  const locale = useLocale();
  const isMounted = useIsMounted();

  useEffect(() => {
    if (!routeData?.options?.length) router.replace("/#form-screen");
  }, [routeData, router]);

  if (!isMounted || !routeData?.options?.length) return null;

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-neutral-50 animate-fadeIn">
      <Topbar show={true} />
      <div
        id="result-screen"
        className="mt-14 max-w-3xl mx-auto px-4 py-8 md:py-12"
      >
        <header className="flex items-center gap-4 mb-6">
          <div className="relative w-[46px] h-[46px] flex items-center justify-center rounded-full border-2 border-neutral-600">
            <Signpost size={32} className="text-neutral-700" />
          </div>
          <div>
            <div className="flex flex-row items-center gap-x-1">
              <h1 className="text-lg font-bold text-primary-700">
                {routeData.origin_city} ({routeData.origin_state})
              </h1>
              <MoveRight size={16} />
              <h1 className="text-lg font-bold text-primary-700">
                {routeData.destination_city} ({routeData.destination_state})
              </h1>
              <Dot size={26} />
              <h1 className="text-lg font-bold text-neutral-700">
                {formatDate(routeData.travel_date)}
              </h1>
            </div>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">
              {t("found", { count: routeData.options.length })}
            </p>
          </div>
        </header>

        <div className="mb-6 flex items-start gap-2.5 p-3.5 bg-neutral-100 rounded-xl border border-neutral-200/60">
          <Info size={16} className="text-neutral-500 shrink-0 mt-0.5" />
          <p className="text-xs text-neutral-600 font-medium leading-relaxed">
            <span className="font-bold text-neutral-700">{t("note")}</span>{" "}
            {t("disclaimer")}
          </p>
        </div>

        <div className="space-y-4">
          {[...routeData.options]
            .sort((a, b) => a.order - b.order)
            .map((opt) => (
              <OptionCard key={opt.order} option={opt} />
            ))}
        </div>

        <div className="mt-10">
          <Link
            href="/#form-screen"
            className="flex items-center justify-center w-full bg-neutral-700 text-neutral-50 rounded-full font-semibold h-12 hover:opacity-50 transition-all"
          >
            {t("newSearch")}
          </Link>
        </div>
      </div>
    </main>
  );
}
