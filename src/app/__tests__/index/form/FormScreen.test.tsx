import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { FormScreen } from "@/app/index/form/FormScreen";
import { useRouter } from "next/navigation";
import { useRoute } from "@/context/RouteContext";
import { searchRoute } from "@/services/routeService";
import { CityAutocompleteProps, CityOption } from "@/types/ibge";
import { DatePickerFieldProps } from "@/app/components/ui/DatePickerField";

const mockIBGEResponse = [
  {
    id: 1,
    nome: "Belo Horizonte",
    microrregiao: { mesorregiao: { UF: { sigla: "BH" } } },
  },
  {
    id: 2,
    nome: "Vitória",
    microrregiao: { mesorregiao: { UF: { sigla: "ES" } } },
  },
];

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("/src/context/RouteContext", () => ({
  useRoute: jest.fn(),
}));

jest.mock("/src/services/routeService", () => ({
  searchRoute: jest.fn(),
}));

jest.mock("/src/app/components/ui/CityFormField", () => ({
  CityFormField: ({
    namePrefix,
    placeholder,
    value,
    onChange,
  }: CityAutocompleteProps) => {
    const cityString = value ? `${value.name} - ${value.uf}` : "";

    return (
      <div data-testid={`mock-container-${namePrefix}`}>
        <input
          placeholder={placeholder}
          value={cityString}
          onChange={() => {}}
          data-testid={`mock-input-${namePrefix}`}
        />

        {!value && (
          <button
            type="button"
            onClick={() => {
              const mockData: CityOption =
                namePrefix === "origin"
                  ? {
                      name: "Belo Horizonte",
                      uf: "MG",
                      displayName: "Belo Horizonte - MG",
                    }
                  : { name: "Vitória", uf: "ES", displayName: "Vitória - ES" };
              onChange(mockData);
            }}
          >
            {namePrefix === "origin" ? "Belo Horizonte" : "Vitória"}
          </button>
        )}

        <button
          type="button"
          data-testid={`mock-btn-${namePrefix}`}
          style={{ display: "none" }}
          onClick={() =>
            onChange(
              namePrefix === "origin"
                ? {
                    name: "Belo Horizonte",
                    uf: "MG",
                    displayName: "Belo Horizonte - MG",
                  }
                : { name: "Vitória", uf: "ES", displayName: "Vitória - ES" },
            )
          }
        >
          Selecionar {namePrefix}
        </button>
      </div>
    );
  },
}));

jest.mock("/src/app/components/ui/DatePickerField", () => ({
  DatePickerField: ({ value, onChange }: DatePickerFieldProps) => (
    <div>
      <input
        placeholder="Selecione uma data"
        value={value ? value.toISOString() : ""}
        readOnly
      />
      <button
        type="button"
        data-testid="mock-btn-date"
        style={{ display: "none" }}
        onClick={() => onChange(new Date("2026-08-10T00:00:00.000Z"))}
      >
        Selecionar Data
      </button>
    </div>
  ),
}));

describe("Form page", () => {
  const mockPush = jest.fn();
  const mockSetRouteData = jest.fn();
  const mockSetErrorData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockIBGEResponse),
      }),
    ) as jest.Mock;

    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useRoute as jest.Mock).mockReturnValue({
      setRouteData: mockSetRouteData,
      setErrorData: mockSetErrorData,
    });

    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  it("Render form page", async () => {
    const mockApiResponse = { id: "123", options: [] };
    (searchRoute as jest.Mock).mockResolvedValue(mockApiResponse);

    render(<FormScreen />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    fireEvent.click(screen.getByTestId("mock-btn-origin"));
    fireEvent.click(screen.getByTestId("mock-btn-destination"));
    fireEvent.click(screen.getByTestId("mock-btn-date"));

    const title = await screen.getByText("Calcule sua melhor rota");
    const label = await screen.getByText(
      "Planeje sua viagem com mais facilidade",
    );
    const originLabel = await screen.getByPlaceholderText("Onde você está?");
    const destinationLabel = await screen.getByPlaceholderText(
      "Para onde você vai?",
    );
    const swap = await screen.getByRole("button", {
      name: /Inverter origem e destino/i,
    });
    const button = await screen.getByRole("button", {
      name: /Calcular rota/i,
    });
    const infoLabel = await screen.getByText(
      "Usamos dados públicos e consultas em IA para estimar preços, itinerários e tempo",
    );

    expect(title).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(originLabel).toBeInTheDocument();
    expect(destinationLabel).toBeInTheDocument();
    expect(swap).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(infoLabel).toBeInTheDocument();
  });

  it("when click swap button, invert cities", async () => {
    render(<FormScreen />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const origemInput = (await screen.getByPlaceholderText(
      /Onde você está\?/i,
    )) as HTMLInputElement;
    const destinoInput = (await screen.getByPlaceholderText(
      /Para onde você vai\?/i,
    )) as HTMLInputElement;

    fireEvent.change(origemInput, { target: { value: "Belo Hor" } });
    const spOption = await screen.findByText("Belo Horizonte");
    fireEvent.click(spOption);

    fireEvent.change(destinoInput, { target: { value: "Vitór" } });
    const rjOption = await screen.findByText("Vitória");
    fireEvent.click(rjOption);

    const swapButton = await screen.getByRole("button", { name: /inverter/i });
    fireEvent.click(swapButton);

    await waitFor(() => {
      const origemInput = screen.getByPlaceholderText(
        /Onde você está\?/i,
      ) as HTMLInputElement;
      const destinoInput = screen.getByPlaceholderText(
        /Para onde você vai\?/i,
      ) as HTMLInputElement;

      expect(origemInput.value).toBe("Vitória - ES");
      expect(destinoInput.value).toBe("Belo Horizonte - MG");
    });
  });

  it("when form is empty, display an alert message", async () => {
    const { container } = render(<FormScreen />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const form = await container.querySelector("form");

    if (form) {
      fireEvent.submit(form);
    } else {
      const submitButton = await screen.getByRole("button", {
        name: /calcular rota/i,
      });
      fireEvent.click(submitButton);
    }

    expect(window.alert).toHaveBeenCalledWith(
      "Por favor, preencha todos os campos antes de prosseguir.",
    );
    expect(searchRoute).not.toHaveBeenCalled();
  });

  it("when passing form with valid params, save context and redirecy to /result/success page", async () => {
    const mockApiResponse = { id: "123", options: [] };
    (searchRoute as jest.Mock).mockResolvedValue(mockApiResponse);

    render(<FormScreen />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    fireEvent.click(screen.getByTestId("mock-btn-origin"));
    fireEvent.click(screen.getByTestId("mock-btn-destination"));
    fireEvent.click(screen.getByTestId("mock-btn-date"));

    const submitButton = await screen.getByRole("button", {
      name: /calcular rota/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(searchRoute).toHaveBeenCalledWith({
        origin_city: "Belo Horizonte",
        origin_state: "MG",
        destination_city: "Vitória",
        destination_state: "ES",
        travel_date: "2026-08-10T00:00:00.000Z",
      });
      expect(mockSetRouteData).toHaveBeenCalledWith(mockApiResponse);
      expect(mockPush).toHaveBeenCalledWith("/result/success");
    });
  });

  it("when api return error, save an erro in context and redirect to /result/error page", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const mockApiError = {
      status: 500,
      message: "Unable to generate a valid itinerary",
    };
    (searchRoute as jest.Mock).mockRejectedValue(mockApiError);

    render(<FormScreen />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    fireEvent.click(screen.getByTestId("mock-btn-origin"));
    fireEvent.click(screen.getByTestId("mock-btn-destination"));
    fireEvent.click(screen.getByTestId("mock-btn-date"));

    const submitButton = await screen.getByRole("button", {
      name: /calcular rota/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(searchRoute).toHaveBeenCalled();
      expect(mockSetErrorData).toHaveBeenCalledWith(mockApiError);
      expect(mockPush).toHaveBeenCalledWith("/result/fail");

      expect(consoleSpy).toHaveBeenCalledWith(
        "Route calculation failed:",
        mockApiError,
      );
    });

    consoleSpy.mockRestore();
  });
});
