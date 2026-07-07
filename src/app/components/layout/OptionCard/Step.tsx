import React from "react";
import { Step } from "@/types/route";
import { MoveRight, Dot } from "lucide-react";
import {
  getTransportIcon,
  getTransportTypeLabel,
  getLocationIcon,
  formatDuration,
  formatPrice,
} from "@/utils/routeFormatters";

interface OptionStepsTimelineProps {
  steps: Step[];
}

export const OptionCardStep = ({ steps }: OptionStepsTimelineProps) => {
  const sortedSteps = [...steps].sort((a, b) => a.order - b.order);

  return (
    <div className="relative mt-6 pl-8 space-y-6 animate-fadeIn">
      {sortedSteps.map((step, index) => (
        <div key={`${step.order}-${index}`} className="relative">
          {index < sortedSteps.length - 1 && (
            <div className="absolute left-[-20px] top-6 bottom-[-26px] w-[2px] bg-neutral-200" />
          )}

          <div className="absolute -left-[31px] top-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center bg-white border-neutral-400 text-neutral-800 z-10">
            {index == 0
              ? getLocationIcon(step.origin_departure_type, "w-3 h-3")
              : getLocationIcon(step.destination_arrival_type, "w-3 h-3")}
          </div>

          <div>
            <div className="text-sm font-bold text-primary-900 balance flex flex-row items-center justify-start gap-x-2">
              {step.origin_departure}
              <MoveRight
                size={18}
                className="text-neutral-800/40 font-normal"
              />
              {step.destination_arrival}
            </div>

            <p className="text-xs text-neutral-800/50 mt-0.5">
              {step.origin_city} ({step.origin_state}) até{" "}
              {step.destination_city} ({step.destination_state})
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-1 text-xs text-neutral-800/60">
              <span className="flex items-center gap-1 bg-primary-50 text-primary-700 px-1.5 py-0.5 rounded font-medium">
                {getTransportIcon(step.transport_type, "w-3 h-3")}
                <span>{getTransportTypeLabel(step.transport_type)}</span>
              </span>
              <Dot size={20} className="text-neutral-800/60" />
              <span>{formatDuration(step.duration_hours)}</span>
              <Dot size={20} className="text-neutral-800/60" />
              <span>{step.kilometers} km</span>
              <Dot size={20} className="text-neutral-800/60" />
              <span className="font-semibold text-primary-700">
                {formatPrice(step.average_amount)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
