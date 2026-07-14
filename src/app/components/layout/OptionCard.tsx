// src/components/ui/OptionCard.tsx
import React, { useState } from "react";
import { ChevronDown, Dot } from "lucide-react";
import { Option } from "@/types/route";
import { formatDuration, formatPrice } from "@/utils/routeFormatters";
import { OptionCardStep } from "./OptionCard/Step";
import { HighlightType } from "@/types/route";

interface OptionCardProps {
  option: Option;
}

const highlights: Record<HighlightType, string> = {
  recommended: "RECOMENDADA",
  cheapest: "ECONÔMICA",
  fastest: "MAIS RÁPIDA",
  most_convenient: "MAIS PRÁTICA",
};

const badgeBorderColor: Record<HighlightType, string> = {
  recommended: "bg-primary-500 text-white",
  fastest: "border border-primary-500 text-primary-600",
  cheapest: "border border-success text-success",
  most_convenient: "border border-success text-success",
};

export const OptionCard = ({ option }: OptionCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const badge = getBadgeDetails(option.highlight);

  return (
    <article
      className={`rounded-[20px] border-2 bg-white p-5 transition-all duration-200 cursor-pointer ${
        isOpen ? "border-neutral-400 shadow-md" : "border-slate-300"
      }`}
    >
      <div
        className="flex items-start justify-between gap-4"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <div>
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${badge.css}`}
          >
            {badge.label}
          </span>
          <div className="mt-3 flex flex-col items-start gap-1">
            <div className="text-[32px] font-semibold text-primary-900 leading-none">
              {formatDuration(option.total_duration_hours)}
            </div>
            <div className="text-sm text-neutral-800/60 font-medium flex flex-row items-center justify-center gap-x-1">
              {option.total_kilometers} km
              <Dot size={22} className="text-neutral-800/60" />
              {formatPrice(option.total_amount)}
            </div>
          </div>
        </div>

        <button
          type="button"
          className={`w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center transition-transform duration-300 ${
            isOpen
              ? "rotate-180 bg-primary-50 border-primary-500 text-primary-600"
              : "text-neutral-800"
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {isOpen && (
        <div className="mt-4 pt-4 border-t border-neutral-100 animate-fadeIn">
          <p className="text-xs text-neutral-700 leading-relaxed bg-neutral-50 p-3 rounded-xl">
            {option.description}
          </p>

          <OptionCardStep steps={option.steps} />
        </div>
      )}
    </article>
  );
};

const getBadgeDetails = (label: HighlightType) => {
  return { label: highlights[label], css: badgeBorderColor[label] };
};
