"use client";

import React from "react";
import { MOCK_API_ERROR } from "@/mocks/failMock";
import Link from "next/link";
import { CircleAlert } from "lucide-react";
import Topbar from "@/app/components/layout/Topbar";

export default function ErrorPage() {
  const errorData = MOCK_API_ERROR;

  const getFriendlyMessage = (fullMessage: string) => {
    if (fullMessage.includes("Unable to generate a valid itinerary")) {
      return "Não foi possível gerar um itinerário válido com os locais informados. Verifique os nomes das cidades e tente novamente.";
    }
    return "Houve um problema ao processar a sua rota. Tente mais tarde.";
  };

  return (
    <main className="min-h-screen bg-neutral-50 animate-fadeIn">
      <Topbar show={true} />
      <div
        id="result-screen"
        className="w-screen h-screen flex flex-row items-center justify-center"
      >
        <div className="flex flex-col items-center justify-center max-w-md rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="mx-auto mb-4 flex h-[80px] w-[80px] items-center justify-center rounded-full bg-red-50">
            <CircleAlert size={64} className="text-red-600" />
          </div>

          <h1 className="text-xl font-semibold text-neutral-700">
            Ops! Algo deu errado
          </h1>

          <p className="mt-3 text-sm text-neutral-600 text-center">
            {getFriendlyMessage(errorData.message)}
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
