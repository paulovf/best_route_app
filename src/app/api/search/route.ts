import { NextResponse } from "next/server";

const path = "/api/v1/routes/search";
const TIMEOUT_MS = 50000;

/**
 * @swagger
 * /api/search:
 *   post:
 *     summary: Calculates routes between cities
 *     description: Requests the calculation of routes between origin and destination from the external API (Best Route) based on the date.
 *     tags:
 *       - Search
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               origin_city:
 *                 type: string
 *                 example: "São Paulo"
 *               origin_state:
 *                 type: string
 *                 example: "SP"
 *               destination_city:
 *                 type: string
 *                 example: "Rio de Janeiro"
 *               destination_state:
 *                 type: string
 *                 example: "RJ"
 *               travel_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-12-25T03:00:00.000Z"
 *     responses:
 *       200:
 *         description: Route list returned successfully
 *       500:
 *         description: Failed to communicate with the internal proxy
 *       504:
 *         description: The server took too long to respond (Timeout)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const backendUrl = `${process.env.API_URL}${path}`;
    const apiKey = process.env.X_API_KEY || "";

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error(error);

    const isTimeout =
      error instanceof Error &&
      (error.name === "TimeoutError" || error.name === "AbortError");

    if (isTimeout) {
      return NextResponse.json(
        {
          status: 504,
          error: "Gateway Timeout",
          message: `The server took more than ${TIMEOUT_MS / 1000}s to respond.`,
          path: path,
        },
        { status: 504 },
      );
    }

    return NextResponse.json(
      {
        status: 500,
        error: "Internal Server Error",
        message: "Failed to communicate with the internal proxy.",
        path: path,
      },
      { status: 500 },
    );
  }
}
