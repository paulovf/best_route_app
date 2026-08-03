"use client";

import { useEffect } from "react";
import { initializeFaro, getWebInstrumentations } from "@grafana/faro-web-sdk";
import { ReactIntegration } from "@grafana/faro-react";

export default function FaroProvider() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (process.env.NEXT_PUBLIC_ENVIRONMENT !== "production") return;

    const hasConsented = localStorage.getItem("cookie-consent") === "granted";

    if (hasConsented) {
      try {
        initializeFaro({
          url: process.env.NEXT_PUBLIC_FARO_URL,
          app: {
            name: "best-route-frontend",
            version: "1.0.0",
            environment: "production",
          },
          instrumentations: [
            ...getWebInstrumentations(),
            new ReactIntegration(),
          ],
        });
      } catch {}
    }
  }, []);

  return null;
}
