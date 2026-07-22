import { useState, useEffect } from "react";
import { getByCoords } from "@/app/api/open_street_map/get_location";
import { LocationData, NominatimAddress } from "@/types/openStreetMap";

/**
 * Get current gelolocation user browser.
 *
 * @returns a gelolocation user browser formatted (e.g.: São Paulo - SP).
 */
export function useGeolocation() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initializeGeolocation = async () => {
      await Promise.resolve();

      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser.");
        return;
      }

      setLoading(true);

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const data = await getByCoords(latitude, longitude);
            const { address } = data;

            const city = extractCityFromResponse(address);
            const uf = extractuFFromResponse(address);

            if (city && uf) {
              setLocation({ city, uf });
            } else {
              setError("City or state could not be found in the response.");
            }
          } catch (err) {
            console.error("Failed to fetch city from coordinates.", err);
          } finally {
            setLoading(false);
          }
        },
        () => {
          setError("Geolocation permission denied by the user.");
          setLoading(false);
        },
      );
    };

    initializeGeolocation();
  }, []);

  return { location, loading, error };
}

function extractCityFromResponse(address: NominatimAddress) {
  return (
    address.city ||
    address.town ||
    address.village ||
    address.municipality ||
    ""
  );
}

function extractuFFromResponse(address: NominatimAddress) {
  const isoState = address["ISO3166-2-lvl4"] || address["ISO3166-2"] || "";
  return isoState.includes("BR-") ? isoState.split("-")[1] : "";
}
