'use client';

import React from 'react';
import Image from 'next/image';
import HomeScreen from '@/components/HomeScreen';

export default function Page() {
  // Função temporária até criarmos a tela do formulário
  const handleNavigateToForm = () => {

  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <div className="hidden fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur border-b border-neutral-900/10">
        <div className="w-full mx-auto px-10 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image 
              src="/images/logo.png"
              alt="Best Route Logo"
              width={28}
              height={28}
              className="w-7 h-7 object-contain"
              priority
            />
            <span className="font-semibold tracking-tight text-neutral-900">Best Route</span>
          </div>
          <nav className="flex gap-1 overflow-x-auto">
            <button className="px-3.5 py-1.5 rounded-full text-sm font-medium bg-neutral-900 text-white transition">
              Home
            </button>
            <button className="px-3.5 py-1.5 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-100 transition">
              Formulário
            </button>
            <button className="px-3.5 py-1.5 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-100 transition">
              Loading
            </button>
            <button className="px-3.5 py-1.5 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-100 transition">
              Resultados
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="pt-0">
        <HomeScreen onCalculateRoute={handleNavigateToForm} />
      </main>
    </div>
  );
}
