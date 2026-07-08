"use client";

import React, { useState, useEffect } from "react";
import { useRoute } from "@/context/RouteContext";
import { useRouter } from "next/navigation";
import { OptionCard } from "../../components/layout/OptionCard";
import Topbar from "@/app/components/layout/Topbar";
import { Signpost, Info, MoveRight, Dot } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  const { routeData } = useRoute();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if (!routeData || !routeData.options || routeData.options.length === 0) {
      router.replace("/#form-screen");
    }
  }, [routeData, router]);

  if (!isMounted || !routeData || !routeData.options || routeData.options.length === 0) {
    return null; 
  }

  const data = isMounted && routeData ? routeData : {
    origin_city: "-",
    origin_state: "",
    destination_city: "-",
    destination_state: "",
    travel_date: "",
    options: [],
  };

  const sortedOptions = [...data.options].sort((a, b) => a.order - b.order);

  const formatDate = (isoString: string) => {
    if (!isoString || isoString === "-") return "-";

    const dateObj = new Date(isoString);
    if (isNaN(dateObj.getTime())) return "-";

    return dateObj.toLocaleDateString("pt-BR", {
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
            <div className="flex flex-row justify-center items-center gap-x-1">
              <h1 className="text-lg font-bold text-primary-700 leading-tight">
                {data.origin_city} {data.origin_state ? `(${data.origin_state})` : ""}
              </h1>
              <MoveRight size={16} className="text-primary-700" />
              <h1 className="text-lg font-bold text-primary-700 leading-tight">
                {data.destination_city} {data.destination_state ? `(${data.destination_state})` : ""}
              </h1>
              <Dot size={26} className="text-primary-700" />
              <h1 className="text-lg font-bold text-neutral-700 leading-tight">
                {formatDate(data.travel_date)}
              </h1>
            </div>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">
              {data.options.length > 1
                ? `${data.options.length} opções encontradas`
                : `${data.options.length} opção encontrada`}
            </p>
          </div>
        </header>

        <div className="mb-6 flex items-start gap-2.5 p-3.5 bg-neutral-100 rounded-xl border border-neutral-200/60">
          <Info size={16} className="text-neutral-500 shrink-0 mt-0.5" />
          <p className="text-xs leading-relaxed text-neutral-600 font-medium">
            <span className="font-bold text-neutral-700">Nota:</span> Valores,
            distâncias e tempos de viagem são estimados por Inteligência
            Artificial e podem divergir dos dados reais praticados por
            aplicativos, sites ou guichês oficiais.
          </p>
        </div>

        <div className="space-y-4">
          {sortedOptions.map((option) => (
            <OptionCard key={option.order} option={option} />
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Link
            href="/#form-screen"
            id="btn-recalculate"
            className="flex flex-row items-center justify-center w-full mt-2 bg-neutral-700 text-neutral-50 rounded-full font-semibold h-12 text-base shadow-sm hover:opacity-50 active:scale-95 transition-all cursor-pointer"
          >
            Nova consulta
          </Link>
        </div>
      </div>
    </main>
  );
}

SuccessPage.displayName = "SuccessPage";
