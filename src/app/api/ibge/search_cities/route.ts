import { NextResponse } from "next/server";
import { IBGECity } from "@/types/ibge";
import { CityOption } from "@/types/form";

/**
 * Get a brazilian cities list by external IBGE api.
 *
 * @returns a brazilian cities list.
 */
export async function GET() {
  try {
    const apiIbgeUrl = `${process.env.NEXT_PUBLIC_API_IBGE_URL}`;

    const response = await fetch(apiIbgeUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: IBGECity[] = await response.json();
    const formattedCities = formatCities(data);

    return NextResponse.json(formattedCities);
  } catch (error) {
    console.error("Error during search city on IBGE api:", error);
    return NextResponse.json([], { status: 500 });
  }
}

function formatCities(ibgeCities: Array<IBGECity>): Array<CityOption> {
  return ibgeCities
    .map((city) => {
      const ufSigla = city.microrregiao?.mesorregiao?.UF?.sigla || "";

      return {
        name: city.nome,
        uf: ufSigla,
        displayName: ufSigla ? `${city.nome} - ${ufSigla}` : city.nome,
      };
    })
    .filter((c) => c.name);
}
