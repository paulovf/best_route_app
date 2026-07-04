"use client";

import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { Calendar } from "lucide-react";
import { format, addYears, startOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import "react-day-picker/dist/style.css";

interface DatePickerFieldProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
}

export function DatePickerField({ value, onChange }: DatePickerFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const today = startOfDay(new Date());
  const maxDate = addYears(today, 1);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex flex-col w-full" ref={wrapperRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center cursor-pointer"
      >
        <Calendar
          className={`w-5 h-5 absolute left-3 pointer-events-none ${
            value ? "text-neutral-900" : "text-slate-400"
          }`}
        />
        <input
          type="text"
          readOnly
          placeholder="dd/mm/aaaa"
          value={value ? format(value, "dd/MM/yyyy") : ""}
          className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-400 bg-white text-sm text-neutral-900 focus-primary focus:border-neutral-900 transition placeholder-slate-400 focus:outline-none"
        />
      </div>

      <input
        type="hidden"
        name="travel_date"
        value={value ? format(value, "yyyy-MM-dd") : ""}
      />

      {isOpen && (
        <div className="absolute z-50 mt-2 top-full left-0 bg-white border border-slate-200/60 p-4 rounded-2xl shadow-xl animate-in fade-in-50 duration-150">
          <DayPicker
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange(date);
              setIsOpen(false);
            }}
            locale={ptBR}
            disabled={[{ before: today }, { after: maxDate }]}
          />
        </div>
      )}
    </div>
  );
}
