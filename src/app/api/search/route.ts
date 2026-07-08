import { NextResponse } from "next/server";

const path = "/api/v1/routes/search";

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
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.log(error);
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
