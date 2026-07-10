import { getCites } from "../../ibge/serach_cities";

global.fetch = jest.fn();

describe("getCites", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_API_IBGE_URL: "https://api.test.com",
    };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("should return a formatted list of cities when the API responds successfully", async () => {
    const mockApiResponse = [
      {
        nome: "Belo Horizonte",
        microrregiao: { mesorregiao: { UF: { sigla: "MG" } } },
      },
      {
        nome: "Vitória",
        microrregiao: { mesorregiao: { UF: { sigla: "ES" } } },
      },
    ];

    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockApiResponse),
    });

    const result = await getCites();

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      name: "Belo Horizonte",
      uf: "MG",
      displayName: "Belo Horizonte - MG",
    });
    expect(fetch).toHaveBeenCalledWith(
      "https://api.test.com",
      expect.any(Object),
    );
  });

  it("should handle cities without UF correctly", async () => {
    const mockApiResponse = [
      {
        nome: "City Without State",
        microrregiao: null,
      },
    ];

    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockApiResponse),
    });

    const result = await getCites();

    expect(result[0]).toEqual({
      name: "City Without State",
      uf: "",
      displayName: "City Without State",
    });
  });

  it("should return an empty array and log an error when the API fails", async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error("API Down"));

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const result = await getCites();

    expect(result).toEqual([]);
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
