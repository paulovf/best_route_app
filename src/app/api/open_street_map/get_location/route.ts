import { NextResponse } from "next/server";
import { NominatimReverseResponse } from "@/features/geolocation/types";

/**
 * Get a city location by coords in Open Street map external api.
 *
 * @param request - The incoming HTTP request containing lat and lon search params.
 * @returns a city location by cords.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
      return NextResponse.json(
        { error: "Os parâmetros 'lat' e 'lon' são obrigatórios." },
        { status: 400 },
      );
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_OPEN_STREET_MAP_URL}`;
    const path = `?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`;

    const response = await fetch(`${apiUrl}${path}`, {
      method: "GET",
      headers: { "Accept-Language": "pt-BR" },
    });

    if (!response.ok) {
      throw new Error("Error during search geolocation on external api.");
    }

    const data: NominatimReverseResponse = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in get city location by coords:", error);
    return NextResponse.json(
      { error: "Erro interno ao buscar geolocalização." },
      { status: 500 },
    );
  }
}
