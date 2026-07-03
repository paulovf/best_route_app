'use client';

import { forwardRef, FormEvent } from 'react';
import { MapPlus, MapPin, Calendar, ArrowUpDown } from "lucide-react";
import { CityFormField } from '@/components/ui/CityFormField';

export const FormScreen = forwardRef<HTMLDivElement>((_, ref) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const originCity = formData.get('origin_city');
    const originUf = formData.get('origin_uf');
    const destCity = formData.get('destination_city');
    const destUf = formData.get('destination_uf');

    console.log('Buscando rotas de:', `${originCity}-${originUf}`, 'para:', `${destCity}-${destUf}`);
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
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <MapPin size={20} className="text-slate-400" />
              </div>
              <CityFormField 
                label="Origem"
                placeholder="Ex: São Paulo, SP"
                namePrefix="origin"
                iconColorClass="text-neutral-500"
              />
            </div>

            <div className="flex justify-center relative z-10">
              <button
                type="button"
                id="swap"
                className="w-9 h-9 rounded-full bg-white border shadow-sm flex items-center justify-center hover:bg-slate-50 active:scale-95 transition cursor-pointer"
                aria-label="invertFields"
              >
                <ArrowUpDown size={20} className="text-neutral-900" />
              </button>
            </div>

            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <MapPin size={20} className="text-slate-400" />
              </div>
              <input
                id="destinationCity" 
                placeholder="Para onde você vai?"
                className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-400 bg-white text-sm text-neutral-900 focus-primary transition placeholder-slate-400 focus:outline-none"
                required 
              />
            </div>

            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <Calendar size={20} className="text-neutral-900" />
              </div>
              <input
                id="data"
                type="date"
                className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-400 bg-white text-sm text-neutral-900 focus-primary transition placeholder-slate-400 focus:outline-none"
                required
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
        <p className="text-center text-xs text-slate-500 mt-6">Usamos dados públicos para estimar pedágios e tempo</p>
      </div>
    </section>
  );
});

FormScreen.displayName = 'FormScreen';
