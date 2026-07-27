import { GET } from "./route";
import { CityOption } from "@/types/form";

jest.mock("next/server", () => ({
  NextResponse: {
    json: (body: unknown, init?: ResponseInit) => ({
      status: init?.status || 200,
      body,
    }),
  },
}));

describe("GET /api/ibge/search_cities", () => {
  let fetchMock: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_API_IBGE_URL = "https://mock-ibge.com";
    fetchMock = jest.spyOn(global, "fetch");
  });

  afterEach(() => {
    fetchMock.mockRestore();
  });

  it("should successfully fetch, format, and return cities from IBGE", async () => {
    const mockIbgeResponse = [
      {
        nome: "São Paulo",
        microrregiao: { mesorregiao: { UF: { sigla: "SP" } } },
      },
      {
        nome: "Rio de Janeiro",
        microrregiao: { mesorregiao: { UF: { sigla: "RJ" } } },
      },
      {
        nome: "City Without State",
      },
    ];

    fetchMock.mockResolvedValueOnce({
      json: async () => mockIbgeResponse,
    });

    const response = (await GET()) as unknown as {
      status: number;
      body: CityOption[];
    };

    expect(fetchMock).toHaveBeenCalledWith("https://mock-ibge.com", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { name: "São Paulo", uf: "SP", displayName: "São Paulo - SP" },
      { name: "Rio de Janeiro", uf: "RJ", displayName: "Rio de Janeiro - RJ" },
      { name: "City Without State", uf: "", displayName: "City Without State" },
    ]);
  });

  it("should return status 500 and empty array on API error", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    fetchMock.mockRejectedValueOnce(new Error("Network Error"));

    const response = (await GET()) as unknown as {
      status: number;
      body: CityOption[];
    };

    expect(response.status).toBe(500);
    expect(response.body).toEqual([]);

    expect(consoleSpy).toHaveBeenCalledWith(
      "Error during search city on IBGE api:",
      expect.any(Error),
    );

    consoleSpy.mockRestore();
  });
});
