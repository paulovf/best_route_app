import { TransportType } from "@/types/utils";

/**
 * Get transport label for display in Step component.
 *
 * @param type - transport type.
 * @param t - intl key for display transport label by selected language.
 * @returns a translated transport label by transport type.
 */
export const getTransportTypeLabel = (
  type: TransportType,
  t: (key: string) => string,
) => {
  switch (type) {
    case "bus":
      return t("bus");
    case "plane":
      return t("plane");
    case "car":
      return t("car");
    case "boat":
      return t("boat");
    case "train":
      return t("train");
    case "app_mobile":
      return t("app_mobile");
    default:
      return t("default");
  }
};

/**
 * Format a time travel to display in OptionCard and Step components
 *
 * @param decimalHours - a decimal travel time
 * @returns a travel time formatted (e.g.: '02h 30m')
 */
export const formatDuration = (decimalHours: number): string => {
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);

  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
};

/**
 * Format a travel amount to display in OptionCard and Step components
 *
 * @param value - amount valur
 * @param locale - currency locale
 * @returns a travel amount formatted (e.g.: R$ 1,00)
 */
export const formatPrice = (
  value: number,
  locale: string = "pt-BR",
): string => {
  return value.toLocaleString(locale, { style: "currency", currency: "BRL" });
};
