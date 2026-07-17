import { render, screen, waitFor } from "@testing-library/react";
import { CityProvider, useCity } from "../CityContext";
import { getCites } from "@/app/api/ibge/search_cities";

jest.mock("/src/app/[locale]/api/ibge/search_cities");

const DummyConsumer = () => {
  const { cities, isLoadingCities } = useCity();
  return (
    <div>
      <span data-testid="loading-status">{isLoadingCities.toString()}</span>
      <ul data-testid="city-list">
        {cities.map((city) => (
          <li key={city.name}>{city.name}</li>
        ))}
      </ul>
    </div>
  );
};

describe("CityContext", () => {
  const mockApiCities = [
    { name: "Belo Horizonte", uf: "MG", displayName: "Belo Horizonte - MG" },
    { name: "Vitória", uf: "ES", displayName: "Vitória - ES" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  it("should throw an error if useCity is used outside of CityProvider", () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const ComponentOutsideProvider = () => {
      useCity();
      return null;
    };

    expect(() => render(<ComponentOutsideProvider />)).toThrow(
      "useCity must be used within a CityProvider",
    );

    consoleSpy.mockRestore();
  });

  it("should fetch cities from API and save to sessionStorage if cache is empty", async () => {
    (getCites as jest.Mock).mockResolvedValueOnce(mockApiCities);

    render(
      <CityProvider>
        <DummyConsumer />
      </CityProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Belo Horizonte")).toBeInTheDocument();
      expect(screen.getByText("Vitória")).toBeInTheDocument();
    });

    expect(getCites).toHaveBeenCalledTimes(1);

    const savedCache = sessionStorage.getItem("best_route_cities");
    expect(savedCache).toEqual(JSON.stringify(mockApiCities));

    expect(screen.getByTestId("loading-status")).toHaveTextContent("false");
  });

  it("should load cities straight from sessionStorage and NOT call the API", () => {
    const cachedCities = [
      { name: "Fortaleza", uf: "CE", displayName: "Fortaleza - CE" },
    ];

    sessionStorage.setItem("best_route_cities", JSON.stringify(cachedCities));

    render(
      <CityProvider>
        <DummyConsumer />
      </CityProvider>,
    );

    expect(screen.getByText("Fortaleza")).toBeInTheDocument();

    expect(getCites).not.toHaveBeenCalled();
  });

  it("should handle API errors gracefully and stop loading", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    (getCites as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

    render(
      <CityProvider>
        <DummyConsumer />
      </CityProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading-status")).toHaveTextContent("false");
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      "Failed to fetch cities globally:",
      expect.any(Error),
    );

    expect(sessionStorage.getItem("best_route_cities")).toBeNull();

    consoleSpy.mockRestore();
  });
});
