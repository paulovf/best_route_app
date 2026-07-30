"use client";

import React, { forwardRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "@/i18n/routing";
import { MapPlus, ArrowUpDown } from "lucide-react";
import { startOfDay, addYears } from "date-fns";
import { CityFormField } from "@/features/city-search/components/CityFormField";
import { DatePickerField } from "@/components/ui/DatePickerField";
import { LoadingModal } from "@/components/layout/LoadingModal";
import { searchRoute } from "@/features/routing/services/routeService";
import { useRoute } from "@/features/routing/context/RouteContext";
import { CityOption } from "@/features/city-search/types";
import { Fail } from "@/features/routing/types";
import { usePreventNavigation } from "@/hooks/usePreventNavigation";
import { useGeolocation } from "@/features/geolocation/hooks/useGeolocation";
import { useCity } from "@/features/city-search/context/CityContext";
import { useTranslations } from "next-intl";

const getSameCityErrors = (
  currentOrigin: CityOption | null,
  currentDestination: CityOption | null,
  t: (key: string) => string,
) => {
  if (
    currentOrigin &&
    currentDestination &&
    currentOrigin?.name === currentDestination?.name &&
    currentOrigin?.uf === currentDestination?.uf
  ) {
    return {
      oError: t("errors.originSameAsDest"),
      dError: t("errors.destSameAsOrigin"),
      isValid: false,
    };
  }

  return { oError: null, dError: null, isValid: true };
};

const getDateError = (
  currentDate: Date | undefined,
  t: (key: string) => string,
) => {
  if (!currentDate) {
    return { tError: t("errors.emptyDate"), isValid: false };
  }

  const today = startOfDay(new Date());
  const maxDate = addYears(today, 1);
  const selectedDate = startOfDay(currentDate);

  if (selectedDate < today) {
    return { tError: t("errors.pastDate"), isValid: false };
  }

  if (selectedDate > maxDate) {
    return { tError: t("errors.maxDate"), isValid: false };
  }

  return { tError: null, isValid: true };
};

/**
 * A form screen component for users to input their travel origin, destination, and date
 * to find the best travel route. It includes fields for origin and destination cities,
 * a date picker, and handles form submission and validation.
 *
 * @param _ - The props for the component (unused).
 * @param ref - The ref to forward to the main section element.
 * @returns The rendered form screen component.
 */
export const FormScreen = forwardRef<HTMLDivElement>((_, ref) => {
  const router = useRouter();
  const t = useTranslations("Form");
  const { routeData, setRouteData, errorData, setErrorData } = useRoute();
  const [origin, setOrigin] = useState<CityOption | null>(null);
  const [destination, setDestination] = useState<CityOption | null>(null);
  const [travelDate, setTravelDate] = useState<Date | undefined>();
  const [originError, setOriginError] = useState<string | null>(null);
  const [destinationError, setDestinationError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const { location, loading: isGeolocating } = useGeolocation();
  const { cities, isLoadingCities } = useCity();

  usePreventNavigation(isCalculating);

  useEffect(() => {
    if (location) {
      setOrigin({
        name: location.city,
        uf: location.uf,
        displayName: `${location.city} - ${location.uf}`,
      });
    }
  }, [location]);

  const validateForm = useCallback(
    (
      currentOrigin: CityOption | null,
      currentDestination: CityOption | null,
      currentDate: Date | undefined,
      checkRequired: boolean,
    ): boolean => {
      let isValid = true;
      let oError: string | null = null;
      let dError: string | null = null;
      let tError: string | null = null;

      const sameCityErrors = getSameCityErrors(
        currentOrigin,
        currentDestination,
        t,
      );
      oError = sameCityErrors.oError;
      dError = sameCityErrors.dError;
      isValid = sameCityErrors.isValid;

      if (checkRequired) {
        if (!currentOrigin) {
          oError = oError || t("errors.invalidOrigin");
          isValid = false;
        }
        if (!currentDestination) {
          dError = dError || t("errors.invalidDest");
          isValid = false;
        }
        if (!currentDate) {
          const dateError = getDateError(currentDate, t);
          tError = dateError.tError;
          isValid = dateError.isValid;
        } else {
          const today = startOfDay(new Date());
          const maxDate = addYears(today, 1);
          const selectedDate = startOfDay(currentDate);

          if (selectedDate < today) {
            tError = t("errors.pastDate");
            isValid = false;
          } else if (selectedDate > maxDate) {
            tError = t("errors.maxDate");
            isValid = false;
          }
        }
      }

      setOriginError(oError);
      setDestinationError(dError);
      setDateError(tError);

      return isValid;
    },
    [t],
  );

  useEffect(() => {
    validateForm(origin, destination, travelDate, wasSubmitted);
  }, [origin, destination, travelDate, wasSubmitted, validateForm]);

  const handleSwap = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWasSubmitted(true);

    const isFormValid = validateForm(origin, destination, travelDate, true);

    if (!isFormValid) {
      return;
    }

    setIsCalculating(true);

    try {
      const payload = {
        origin_city: origin!.name,
        origin_state: origin!.uf,
        destination_city: destination!.name,
        destination_state: destination!.uf,
        travel_date: travelDate!.toISOString(),
      };

      const response = await searchRoute(payload);
      setRouteData(response);
      router.push("/result/success");
    } catch (error) {
      console.error("Route calculation failed:", error);
      setErrorData(error as Fail);
      router.push("/result/fail");
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <section
      id="form-screen"
      ref={ref}
      className="screen min-h-[580px] h-screen bg-neutral-50 flex items-center justify-center px-4 py-12"
    >
      <div className="w-full flex flex-col gap-y-6 items-center">
        <div className="w-full max-w-lg bg-white rounded-[28px] shadow-sm border p-8 md:p-10">
          <header className="flex items-center gap-3 mb-8">
            <div
              className="p-2 flex flex-col items-center justify-center rounded-full border-2 border-neutral-600"
              aria-label={t("ariaLabels.mapIcon")}
            >
              <MapPlus size={26} className="text-neutral-600" />
            </div>
            <div>
              <h2 className="text-xl text-neutral-600 font-semibold leading-tight">
                {t("title")}
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">{t("subtitle")}</p>
            </div>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <CityFormField
                placeholder={
                  isGeolocating && routeData == null && errorData == null
                    ? t("inputs.locating")
                    : t("inputs.originPlaceholder")
                }
                namePrefix="origin"
                value={origin}
                onChange={setOrigin}
                error={originError || undefined}
                cities={cities}
                isLoadingCities={isLoadingCities}
              />
            </div>

            <div className="flex justify-center relative z-10">
              <button
                type="button"
                onClick={handleSwap}
                id="swap"
                className="w-9 h-9 rounded-full bg-white border shadow-sm flex items-center justify-center hover:bg-slate-50 active:scale-95 transition cursor-pointer"
                aria-label={t("ariaLabels.swap")}
              >
                <ArrowUpDown size={20} className="text-neutral-600" />
              </button>
            </div>

            <div className="relative">
              <CityFormField
                placeholder={t("inputs.destinationPlaceholder")}
                namePrefix="destination"
                value={destination}
                onChange={setDestination}
                error={destinationError || undefined}
                cities={cities}
                isLoadingCities={isLoadingCities}
              />
            </div>

            <div className="relative">
              <DatePickerField
                value={travelDate}
                onChange={setTravelDate}
                error={dateError || undefined}
              />
            </div>

            <button
              type="submit"
              id="btn-calculate"
              className="w-full mt-2 bg-neutral-700 text-neutral-50 rounded-full font-semibold h-12 text-base shadow-sm hover:opacity-50 active:scale-95 transition-all cursor-pointer"
            >
              {t("calculateButton")}
            </button>
          </form>
        </div>
        <div className="flex flex-col items-start gap-y-1">
          <p className="text-xs text-slate-500">{t("disclaimers.data")}</p>
          <p className="text-xs text-slate-500">{t("disclaimers.ai")}</p>
          <p className="text-xs text-slate-500 leading-tight">
            {t("disclaimers.geolocation")}
          </p>
        </div>
      </div>
      <LoadingModal isOpen={isCalculating} />
    </section>
  );
});

FormScreen.displayName = "FormScreen";
