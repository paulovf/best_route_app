"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";

const langs = [
  { code: "de", label: "Deutsch", short: "DE" },
  { code: "en", label: "English", short: "EN" },
  { code: "es", label: "Español", short: "ES" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "pt", label: "Português", short: "PT" },
];

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const active = langs.find((l) => l.code === currentLocale) || langs[0];

  const changeLanguage = (nextLocale: string) => {
    if (nextLocale === currentLocale) {
      setOpen(false);
      return;
    }

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        disabled={isPending}
        className={`cursor-pointer flex items-center gap-2 rounded-full border border-white/10 bg-neutral-800 backdrop-blur px-3 py-1.5 text-sm text-[#F8FAFC] hover:bg-[#0F172A]/80 transition ${
          isPending ? "opacity-50 cursor-wait" : ""
        }`}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Globe size={16} />
        <span className="font-medium">{active.short}</span>
        <ChevronDown
          size={14}
          className={`opacity-60 transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-[160px] rounded-xl border border-slate-200 bg-neutral-50 p-1 shadow-xl z-50">
          {langs.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => changeLanguage(l.code)}
              disabled={isPending}
              className={`text-neutral-900 hover:bg-neutral-200 cursor-pointer flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm ${
                currentLocale === l.code ? "font-semibold" : "font-normal"
              }`}
            >
              {l.label}
              {currentLocale === l.code && <Check size={14} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
