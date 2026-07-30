import { NextResponse } from "next/server";
import { NominatimReverseResponse } from "@/features/geolocation/types";

/**
 * @swagger
 * /api/open_street_map/get_location:
 *   get:
 *     summary: Get location by coordinates (Reverse Geocoding)
 *     description: Queries the OpenStreetMap (Nominatim) API to obtain address details based on latitude and longitude.
 *     tags:
 *       - Geolocation
 *     parameters:
 *       - in: query
 *         name: lat
 *         required: true
 *         description: Location latitude
 *         schema:
 *           type: string
 *           example: "-23.5505"
 *       - in: query
 *         name: lon
 *         required: true
 *         description: Location longitude
 *         schema:
 *           type: string
 *           example: "-46.6333"
 *     responses:
 *       200:
 *         description: Geolocation data successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 place_id:
 *                   type: number
 *                 licence:
 *                   type: string
 *                 osm_type:
 *                   type: string
 *                 osm_id:
 *                   type: number
 *                 lat:
 *                   type: string
 *                 lon:
 *                   type: string
 *                 display_name:
 *                   type: string
 *                 address:
 *                   type: object
 *       400:
 *         description: Missing required parameters (lat or lon).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "The 'lat' and 'lon' parameters are required."
 *       500:
 *         description: Internal error while fetching geolocation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal error while fetching geolocation."
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
      return NextResponse.json(
        { error: "The 'lat' and 'lon' parameters are required." },
        { status: 400 },
      );
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_OPEN_STREET_MAP_URL}`;
    const path = `?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`;

    const response = await fetch(`${apiUrl}${path}`, {
      method: "GET",
      headers: {
        "Accept-Language": "pt-BR",
        "User-Agent": "BestRouteApplication/0.1.0 (contact@bestroute.com)",
      },
    });

    if (!response.ok) {
      throw new Error("Error during search geolocation on external api.");
    }

    const data: NominatimReverseResponse = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in get city location by coords:", error);
    return NextResponse.json(
      { error: "Internal error while fetching geolocation." },
      { status: 500 },
    );
  }
}
