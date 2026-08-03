"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function CookieBanner() {
  const t = useTranslations("CookieBanner");

  const [showBanner, setShowBanner] = useState(() => {
    if (typeof window === "undefined") return false;
    const consent = localStorage.getItem("cookie-consent");
    if (consent === "granted") {
      window.dispatchEvent(new Event("cookie-consent-granted"));
      return false;
    }
    return !consent;
  });

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "granted");
    setShowBanner(false);
    window.dispatchEvent(new Event("cookie-consent-granted"));
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "denied");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-[100] p-2 animate-in slide-in-from-bottom-full duration-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
        <p className="text-sm text-slate-600 flex-1 leading-relaxed">
          {t("message")}
        </p>
        <div className="flex gap-3 w-full md:w-auto shrink-0">
          <button
            type="button"
            onClick={handleDecline}
            className="flex-1 md:flex-none px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
          >
            {t("decline")}
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="flex-1 md:flex-none px-4 py-2 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition"
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
