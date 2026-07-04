'use client';

import { forwardRef, FormEvent, useState } from 'react';
import { MapPlus, Calendar, ArrowUpDown } from "lucide-react";
import { CityFormField, CityOption } from '@/components/ui/CityFormField';
import { DatePickerField } from '@/components/ui/DatePickerField';

export const FormScreen = forwardRef<HTMLDivElement>((_, ref) => {
  const [origin, setOrigin] = useState<CityOption | null>(null);
  const [destination, setDestination] = useState<CityOption | null>(null);
  const [travelDate, setTravelDate] = useState<Date | undefined>();
  
  const handleSwap = () => {
    setOrigin(destination);
    setDestination(origin);
  };
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const originCity = formData.get('origin_city');
    const originState = formData.get('origin_state');
    const destinationCity = formData.get('destination_city');
    const destinationState = formData.get('destination_state');
    const travelDate = formData.get('travel_date');
  };

  return (
    <section
      ref={ref}
      className="screen h-screen bg-neutral-50 flex items-center justify-center px-4 py-12"
    >
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-[28px] shadow-sm border p-8 md:p-10">
          <header className="flex items-center gap-3 mb-8">
            <div className="p-2 flex flex-col items-center justifu-center rounded-full border-2 border-neutral-900">
              <MapPlus size={26} className="text-neutral-900" />
            </div>
            <div>
              <h2 className="text-xl text-neutral-900 font-semibold text-[var(--primary)] leading-tight">Calcule sua melhor rota</h2>
              <p className="text-sm text-slate-500 mt-0.5">Planeje sua viagem com mais facilidade</p>
            </div>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <CityFormField 
                placeholder="Onde você está?"
                namePrefix="origin"
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
                <ArrowUpDown size={20} className="text-neutral-900" />
              </button>
            </div>

            <div className="relative">
              <CityFormField 
                placeholder="Para onde você vai?"
                namePrefix="destination"
                value={destination}
                onChange={setDestination}
              />
            </div>

            <div className="relative">
              <DatePickerField 
                value={travelDate}
                onChange={setTravelDate}
              />
            </div>

            <button
              type="submit"
              id="btn-calcular"
              className="w-full mt-2 bg-neutral-900 text-neutral-80 rounded-full font-semibold h-12 text-[15px] shadow-sm hover:opacity-50 active:scale-95 transition-all cursor-pointer"
            >
              Calcular rota
            </button>
          </form>
        </div>
        <p className="text-center text-xs text-slate-500 mt-6">Usamos dados públicos e consultas em IA para estimar preços, itinerários e tempo</p>
      </div>
    </section>
  );
});

FormScreen.displayName = 'FormScreen';
