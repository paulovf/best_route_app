import { NextResponse } from "next/server";

const path = "/api/v1/routes/search";
const TIMEOUT_MS = 50000;

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
