import { IBGECity, CityOption } from "@/types/ibge";

export async function getCites() {
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

    return formattedCities;
  } catch (error) {
    console.error("Error during serach city on IBGE api:", error);
    return [];
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
