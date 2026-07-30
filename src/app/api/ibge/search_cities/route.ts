import { NextResponse } from "next/server";
import { CityOption, IBGECity } from "@/features/city-search/types";

/**
 * @swagger
 * /api/ibge/search_cities:
 *   get:
 *     summary: Get Brazilian cities list
 *     description: Fetches the list of municipalities from the external IBGE API and returns formatted data (name, UF, and display name).
 *     tags:
 *       - Cities
 *     responses:
 *       200:
 *         description: Formatted list of cities successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "São Paulo"
 *                   uf:
 *                     type: string
 *                     example: "SP"
 *                   displayName:
 *                     type: string
 *                     example: "São Paulo - SP"
 *       500:
 *         description: Internal error while fetching cities from the IBGE API.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *               example: []
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
