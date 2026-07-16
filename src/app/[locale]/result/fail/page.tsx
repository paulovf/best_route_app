"use client";

import React, { useEffect } from "react";
import { useRoute } from "@/context/RouteContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CircleAlert } from "lucide-react";
import Topbar from "@/app/[locale]/components/layout/Topbar";
import { useIsMounted } from "@/hooks/useIsMounted";
import { Fail } from "@/types/fail";

const errorMessages: Record<number, string> = {
  400: "A cidade e/ou estado informado não é um campo válido.",
  422: "Não foi possível gerar um itinerário válido com os locais informados. Verifique os nomes das cidades e tente novamente.",
  504: "A IA que utilizamos para calcular a sua rota está com alta demanda neste momento. Tente novamente mais tarde.",
};

const listHttpStatusCodeMapping = [400, 422, 504];

export default function ErrorPage() {
  const { errorData } = useRoute();
  const router = useRouter();
  const isMounted = useIsMounted();
  const errorDataResult: Fail = errorData || {
    status: 500,
    error: "Internal Server Error",
    message: "An unexpected error occurred.",
    path: "",
  };

  useEffect(() => {
    if (!errorData) {
      router.replace("/#form-screen");
    }
  }, [errorData, router]);

  if (!isMounted || !errorData) {
    return null;
  }

  const getFriendlyMessage = (status: number) => {
    if (listHttpStatusCodeMapping.includes(status)) {
      return errorMessages[status];
    }
    return "Houve um problema ao processar a sua rota. Tente mais tarde.";
  };

  return (
    <main className="min-h-screen bg-neutral-50 animate-fadeIn">
      <Topbar show={true} />
      <div
        id="result-screen"
        className="h-screen flex flex-row items-center justify-center"
      >
        <div className="flex flex-col items-center justify-center max-w-md rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="mx-auto mb-4 flex h-[80px] w-[80px] items-center justify-center rounded-full bg-red-50">
            <CircleAlert size={64} className="text-red-600" />
          </div>

          <h1 className="text-xl font-semibold text-neutral-700">
            Ops! Algo deu errado
          </h1>

          <p className="mt-3 text-sm text-neutral-600 text-center">
            {getFriendlyMessage(errorDataResult?.status || 500)}
          </p>

          <Link
            href="/#form-screen"
            id="btn-new-route"
            className="flex flex-row items-center justify-center w-full mt-6 bg-neutral-700 text-neutral-50 rounded-full font-semibold h-12 text-base shadow-sm hover:opacity-50 active:scale-95 transition-all cursor-pointer"
          >
            Refazer Nova Busca
          </Link>
        </div>
      </div>
    </main>
  );
}

ErrorPage.displayName = "ErrorPage";
