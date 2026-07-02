'use client';

import React from 'react';
import Image from 'next/image';
import { GitBranch, Code2, ExternalLink } from 'lucide-react';

interface HomeScreenProps {
  onCalculateRoute: () => void;
}

export default function HomeScreen({ onCalculateRoute }: HomeScreenProps) {
  return (
    <section className="relative flex min-h-[calc(100vh-56px)] flex-col bg-neutral-900 overflow-hidden">
      {/* Imagem de Fundo com Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/plane.avif"
          alt="Plane"
          fill
          loading="eager"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-neutral-900/70" />
      </div>

      {/* Header Interno da Home */}
      <header className="relative z-10 px-6 pt-8 md:px-10 flex items-center gap-3">
        {/* Logo Customizado da Marca */}
        <Image 
          src="/images/logo.png"
          alt="Best Route Logo"
          width={48}
          height={48}
          className="object-contain"
          priority
        />
        <span className="text-neutral-50 font-semibold text-xl tracking-tight">Best Route</span>
      </header>

      {/* Conteúdo Principal (Hero Section) */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 -mt-10">
        <h1 className="text-neutral-50 text-[clamp(32px,5vw,56px)] font-bold leading-[1.05] tracking-tight max-w-3xl">
          Encontre a melhor rota em segundos
        </h1>
        <p className="text-neutral-50/80 mt-5 max-w-xl text-[17px] md:text-lg leading-relaxed">
          Compare caminhos, pedágios e tempo de viagem entre qualquer cidade do Brasil
        </p>
        <button
          onClick={onCalculateRoute}
          className="mt-10 bg-neutral-50 text-neutral-900 rounded-full font-semibold px-10 py-3.5 text-[15px] shadow-sm hover:bg-neutral-200 active:scale-95 transition-all"
        >
          Calcular rota
        </button>
      </div>

      {/* Footer com Ícones Convertidos para Lucide */}
      <footer className="relative z-10 pb-10 flex justify-center gap-5">
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="w-10 h-10 rounded-full border border-neutral-50/25 flex items-center justify-center text-neutral-50 hover:bg-white/10 transition"
          aria-label="GitHub API"
        >
          <GitBranch size={18} />
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="w-10 h-10 rounded-full border border-neutral-50/25 flex items-center justify-center text-neutral-50 hover:bg-white/10 transition"
          aria-label="GitHub Front"
        >
          <Code2 size={18} />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noreferrer"
          className="w-10 h-10 rounded-full border border-neutral-50/25 flex items-center justify-center text-neutral-50 hover:bg-white/10 transition"
          aria-label="LinkedIn"
        >
          <ExternalLink size={18} />
        </a>
      </footer>
    </section>
  );
}
