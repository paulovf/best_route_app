"use client";

import { forwardRef, FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MapPlus, ArrowUpDown } from "lucide-react";
import { CityFormField } from "@/app/components/ui/CityFormField";
import { CityOption } from "@/types/ibge";
import { DatePickerField } from "@/app/components/ui/DatePickerField";
import { LoadingModal } from "@/app/components/layout/LoadingModal";
import { searchRoute } from "@/services/routeService";
import { useRoute } from "@/context/RouteContext";
import { Fail } from "@/types/fail";
import { usePreventNavigation } from "@/hooks/usePreventNavigation";
import { useGeolocation } from "@/hooks/useGeolocation";

export const FormScreen = forwardRef<HTMLDivElement>((_, ref) => {
  const router = useRouter();
  const { routeData, setRouteData, errorData, setErrorData } = useRoute();
  const [origin, setOrigin] = useState<CityOption | null>(null);
  const [destination, setDestination] = useState<CityOption | null>(null);
  const [travelDate, setTravelDate] = useState<Date | undefined>();
  const [isCalculating, setIsCalculating] = useState(false);
  const { location, loading: isGeolocating } = useGeolocation();

  usePreventNavigation(isCalculating);

  useEffect(() => {
    if (location) {
      setOrigin({
        name: location.city,
        uf: location.uf,
        displayName: `${location.city} - ${location.uf}`,
      });
    }
  }, [location]);

  const handleSwap = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!origin || !destination || !travelDate) {
      alert("Por favor, preencha todos os campos antes de prosseguir.");
      return;
    }

    setIsCalculating(true);

    try {
      const payload = {
        origin_city: origin.name,
        origin_state: origin.uf,
        destination_city: destination.name,
        destination_state: destination.uf,
        travel_date: travelDate.toISOString(),
      };

      const response = await searchRoute(payload);
      setRouteData(response);
      router.push("/result/success");
    } catch (error) {
      console.error("Route calculation failed:", error);
      setErrorData(error as Fail);
      router.push("/result/fail");
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <section
      id="form-screen"
      ref={ref}
      className="screen h-screen bg-neutral-50 flex items-center justify-center px-4 py-12"
    >
      <div className="w-full flex flex-col gap-y-6 items-center">
        <div className="w-full max-w-lg bg-white rounded-[28px] shadow-sm border p-8 md:p-10">
          <header className="flex items-center gap-3 mb-8">
            <div
              className="p-2 flex flex-col items-center justify-center rounded-full border-2 border-neutral-600"
              aria-label="Map plus"
            >
              <MapPlus size={26} className="text-neutral-600" />
            </div>
            <div>
              <h2 className="text-xl text-neutral-600 font-semibold leading-tight">
                Calcule sua melhor rota
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Planeje sua viagem com mais facilidade
              </p>
            </div>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <CityFormField
                placeholder={
                  isGeolocating && routeData == null && errorData == null
                    ? "Buscando sua localização..."
                    : "Onde você está?"
                }
                namePrefix="origin"
                key={origin?.name || "empty"}
                value={origin}
                onChange={setOrigin}
              />
            </div>

            <div className="flex justify-center relative z-10">
              <button
                type="button"
                onClick={handleSwap}
                id="swap"
                className="w-9 h-9 rounded-full bg-white border shadow-sm flex items-center justify-center hover:bg-slate-50 active:scale-95 transition cursor-pointer"
                aria-label="Inverter origem e destino"
              >
                <ArrowUpDown size={20} className="text-neutral-600" />
              </button>
            </div>

            <div className="relative">
              <CityFormField
                placeholder="Para onde você vai?"
                namePrefix="destination"
                key={destination?.name || "empty"}
                value={destination}
                onChange={setDestination}
              />
            </div>

            <div className="relative">
              <DatePickerField value={travelDate} onChange={setTravelDate} />
            </div>

            <button
              type="submit"
              id="btn-calculate"
              className="w-full mt-2 bg-neutral-700 text-neutral-50 rounded-full font-semibold h-12 text-base shadow-sm hover:opacity-50 active:scale-95 transition-all cursor-pointer"
            >
              Calcular rota
            </button>
          </form>
        </div>
        <div className="flex flex-col items-start gap-y-1">
          <p className="text-xs text-slate-500">
            *Usamos dados públicos e consultas em IA para estimar preços,
            itinerários e tempo.
          </p>
          <p className="text-xs text-slate-500">
            *A IA pode sugerir trechos de rotas que não existem devido a
            mudanças recentes.
          </p>
          <p className="text-xs text-slate-500 leading-tight">
            *Utilizamos sua geolocalização apenas para sugerir a cidade de
            partida atual.
          </p>
        </div>
      </div>
      <LoadingModal isOpen={isCalculating} />
    </section>
  );
});

FormScreen.displayName = "FormScreen";
