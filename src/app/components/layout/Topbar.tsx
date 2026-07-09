"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useActiveSection } from "@/hooks/useActiveSection";
import Link from "next/link";
import { useRoute } from "@/context/RouteContext";
import { useIsMounted } from "@/hooks/useIsMounted";

interface TopbarProps {
  show: boolean;
}

export default function Topbar({ show }: TopbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMounted = useIsMounted();

  const activeSection = useActiveSection([
    "home-screen",
    "form-screen",
    "result-screen",
  ]);

  const { routeData, errorData } = useRoute();

  let resultHref = "/#form-screen";

  if (isMounted) {
    if (routeData && routeData.options && routeData.options.length > 0) {
      resultHref = "/result/success";
    } else if (errorData) {
      resultHref = "/result/fail";
    }
  }

  const navLinks = [
    { label: "Home", href: "/", id: "home-screen" },
    { label: "Formulário", href: "/#form-screen", id: "form-screen" },
    { label: "Resultados", href: resultHref, id: "result-screen" },
  ];

  const renderLinks = (isMobile: boolean) => {
    return navLinks.map((link) => {
      const isActive = activeSection === link.id;

      return (
        <Link
          key={link.label}
          href={link.href}
          onClick={() => isMobile && setIsMenuOpen(false)}
          className={`text-sm font-medium transition ${
            isMobile
              ? "px-4 py-3 rounded-xl text-left"
              : "px-3.5 py-1.5 rounded-full"
          } ${
            isActive
              ? "bg-neutral-600 text-white"
              : isMobile
                ? "text-slate-600 hover:bg-slate-50"
                : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          {link.label}
        </Link>
      );
    });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur border-b border-neutral-600/10 ${
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
          <span className="font-semibold tracking-tight text-neutral-600">
            Best Route
          </span>
        </div>
        <nav className="hidden md:flex gap-1">{renderLinks(false)}</nav>

        <button
          className="md:hidden p-2 text-neutral-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-14 left-0 w-full bg-white border-b border-neutral-600/10 shadow-lg p-6 flex flex-col gap-4 animate-in slide-in-from-top-5">
          {renderLinks(true)}
        </div>
      )}
    </header>
  );
}
