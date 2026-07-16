import { POST } from "../../../api/search/route";

jest.mock("next/server", () => ({
  NextResponse: {
    json: (body: unknown, init?: { status?: number }) => ({
      status: init?.status ?? 200,
      json: async () => body,
    }),
  },
}));

describe("API Route - Search Proxy", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = {
      ...originalEnv,
      API_URL: "https://api.backend.mock",
      X_API_KEY: "super-secret-key",
    };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("should forward payload to backend and return data with correct status on success", async () => {
    const mockRequestBody = {
      origin_city: "Belo Horizonte",
      origin_state: "MG",
      destination_city: "Vitória",
      destination_state: "ES",
      travel_date: "2026-12-25T00:00:00.000Z",
    };

    const mockBackendResponse = {
      origin_city: "Belo Horizonte",
      destination_city: "Vitória",
      options: [],
    };

    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue(mockBackendResponse),
    });

    const request = {
      json: async () => mockRequestBody,
    } as unknown as Request;

    const response = await POST(request);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(mockBackendResponse);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.backend.mock/api/v1/routes/search",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "super-secret-key",
        },
        body: JSON.stringify(mockRequestBody),
        signal: AbortSignal.timeout(1000),
      },
    );
  });

  it("should forward the exact error status and payload when the backend returns a business failure", async () => {
    const mockBackendError = {
      status: 422,
      error: "Unprocessable Entity",
      message: "Unable to generate a valid itinerary",
      path: "/api/v1/routes/search",
    };

    global.fetch = jest.fn().mockResolvedValue({
      status: 422,
      json: jest.fn().mockResolvedValue(mockBackendError),
    });

    const request = {
      json: async () => ({}),
    } as unknown as Request;

    const response = await POST(request);

    expect(response.status).toBe(422);
    expect(await response.json()).toEqual(mockBackendError);
  });

  it("should fall back to a 500 Internal Server Error when fetch crashes or throws an exception", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    global.fetch = jest
      .fn()
      .mockRejectedValue(new Error("Network connection failed"));

    const request = {
      json: async () => ({}),
    } as unknown as Request;

    const response = await POST(request);

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      status: 500,
      error: "Internal Server Error",
      message: "Failed to communicate with the internal proxy.",
      path: "/api/v1/routes/search",
    });

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
