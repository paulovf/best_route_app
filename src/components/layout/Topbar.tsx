"use client";

import Image from "next/image";

interface TopbarProps {
  show: boolean;
}

export default function Topbar({ show }: TopbarProps) {
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur border-b border-neutral-900/10 ${
        show
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-full pointer-events-none"
      }`}
    >
      <div className="w-full mx-auto px-10 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Best Route topbar logo"
            width={28}
            height={28}
            className="w-7 h-7 object-contain"
            priority
          />
          <span className="font-semibold tracking-tight text-neutral-900">
            Best Route
          </span>
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
    </header>
  );
}
