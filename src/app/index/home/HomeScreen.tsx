"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { GitBranch, ExternalLink } from "lucide-react";
import Topbar from "@/app/components/layout/Topbar";
import { FormScreen } from "../form/FormScreen";

export default function HomeScreen() {
  const [showTopbar, setShowTopbar] = useState(false);
  const formSectionRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const currentFormSection = formSectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowTopbar(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      },
    );

    if (currentFormSection) {
      observer.observe(currentFormSection);
    }

    return () => {
      if (currentFormSection) {
        observer.unobserve(currentFormSection);
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-neutral-900 text-white selection:bg-emerald-500">
      <Topbar show={showTopbar} />

      <section
        id="home-screen"
        className="relative flex h-screen flex-col bg-neutral-900 overflow-hidden"
      >
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

        <header className="relative z-10 px-6 pt-8 md:px-10 flex items-center gap-3">
          <Image
            src="/images/logo_v2.png"
            alt="Best Route home logo"
            width={48}
            height={48}
            className="w-12 h-12 object-contain"
            priority
          />
          <span className="text-neutral-50 font-semibold text-xl tracking-tight">
            Best Route
          </span>
        </header>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 -mt-10">
          <h1 className="text-neutral-50 text-[clamp(32px,5vw,56px)] font-bold leading-[1.05] tracking-tight max-w-3xl">
            Encontre a melhor rota para sua viagem
          </h1>
          <p className="text-neutral-50/80 mt-5 max-w-xl text-base md:text-lg leading-relaxed">
            Compare caminhos, formas de transporte, preços e tempo de viagem
            entre cidades de todo o Brasil
          </p>
          <button
            onClick={scrollToForm}
            className="mt-10 bg-neutral-50 text-neutral-900 rounded-full font-semibold px-10 py-3.5 text-sm shadow-sm hover:bg-neutral-200 active:scale-95 transition-all cursor-pointer"
          >
            Comece aqui
          </button>
        </div>

        <div
          id="home-group-buttons"
          className="relative z-10 pb-10 flex justify-center gap-5"
        >
          <a
            href="https://github.com/paulovf/best_route_api"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub API"
          >
            <div className="flex flex-col items-center gap-y-2">
              <div className="w-10 h-10 rounded-full border border-neutral-50/25 flex items-center justify-center text-neutral-50 hover:bg-white/10 transition">
                <GitBranch size={18} />
              </div>
              <span className="text-sm text-neutral-50/80">GitHub API</span>
            </div>
          </a>
          <a
            href="https://github.com/paulovf/best_route_app"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub App"
          >
            <div className="flex flex-col items-center gap-y-2">
              <div className="w-10 h-10 rounded-full border border-neutral-50/25 flex items-center justify-center text-neutral-50 hover:bg-white/10 transition">
                <GitBranch size={18} />
              </div>
              <span className="text-sm text-neutral-50/80">GitHub App</span>
            </div>
          </a>
          <a
            href="https://www.linkedin.com/in/paulo-vitor-francisco"
            target="_blank"
            rel="noreferrer"
            aria-label="Meu Linkedin"
          >
            <div className="flex flex-col items-center gap-y-2">
              <div className="w-10 h-10 rounded-full border border-neutral-50/25 flex items-center justify-center text-neutral-50 hover:bg-white/10 transition">
                <ExternalLink size={18} />
              </div>
              <span className="text-sm text-neutral-50/80">Meu Linkedin</span>
            </div>
          </a>
        </div>
      </section>

      <FormScreen ref={formSectionRef} />
    </div>
  );
}

HomeScreen.displayName = "HomeScreen";
