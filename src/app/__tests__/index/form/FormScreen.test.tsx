import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { FormScreen } from "@/app/[locale]/index/form/FormScreen";
import { useRouter } from "next/navigation";
import { useRoute } from "@/context/RouteContext";
import { searchRoute } from "@/services/routeService";
import {
  CityOption,
  CityFormFieldProps,
  DatePickerFieldProps,
} from "@/types/form";

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

jest.mock("/src/app/[locale]/components/ui/CityFormField", () => ({
  CityFormField: ({
    namePrefix,
    placeholder,
    value,
    onChange,
    error,
  }: CityFormFieldProps) => {
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

        {error && <span className="error-message">{error}</span>}
      </div>
    );
  },
}));

jest.mock("/src/app/[locale]/components/ui/DatePickerField", () => ({
  DatePickerField: ({ value, onChange, error }: DatePickerFieldProps) => (
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

      <button
        type="button"
        data-testid="mock-btn-date-past"
        style={{ display: "none" }}
        onClick={() => {
          const past = new Date();
          past.setDate(past.getDate() - 1);
          onChange(past);
        }}
      >
        Selecionar Data Passada
      </button>

      <button
        type="button"
        data-testid="mock-btn-date-future"
        style={{ display: "none" }}
        onClick={() => {
          const future = new Date();
          future.setFullYear(future.getFullYear() + 1);
          future.setDate(future.getDate() + 2);
          onChange(future);
        }}
      >
        Selecionar Data Futura Excedida
      </button>

      {error && <span className="error-message">{error}</span>}
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
    const infoLabel1 = await screen.getByText(
      "*Usamos dados públicos e consultas em IA para estimar preços, itinerários e tempo.",
    );
    const infoLabel2 = await screen.getByText(
      "*A IA pode sugerir trechos de rotas que não existem devido a mudanças recentes.",
    );
    const infoLabel3 = await screen.getByText(
      "*Utilizamos sua geolocalização apenas para sugerir a cidade de partida atual.",
    );

    expect(title).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(originLabel).toBeInTheDocument();
    expect(destinationLabel).toBeInTheDocument();
    expect(swap).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(infoLabel1).toBeInTheDocument();
    expect(infoLabel2).toBeInTheDocument();
    expect(infoLabel3).toBeInTheDocument();
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

  it("when form is empty, display error messages", async () => {
    const { container } = render(<FormScreen />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const form = await container.querySelector("form");

    const originErrorMsg =
      "Cidade de origem inválida. Por favor, selecione uma opção da lista.";
    const destinationErrorMsg =
      "Cidade de destino inválida. Por favor, selecione uma opção da lista.";
    const dateErrorMsg = "Por favor, selecione uma data de viagem.";

    expect(screen.queryByText(originErrorMsg)).not.toBeInTheDocument();
    expect(screen.queryByText(destinationErrorMsg)).not.toBeInTheDocument();
    expect(screen.queryByText(dateErrorMsg)).not.toBeInTheDocument();

    if (form) {
      fireEvent.submit(form);
    } else {
      const submitButton = await screen.getByRole("button", {
        name: /calcular rota/i,
      });
      fireEvent.click(submitButton);
    }

    const originError = await screen.findByText(originErrorMsg);
    const destinationError = await screen.findByText(destinationErrorMsg);
    const dateError = await screen.findByText(dateErrorMsg);

    expect(originError).toBeInTheDocument();
    expect(destinationError).toBeInTheDocument();
    expect(dateError).toBeInTheDocument();

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

  it("when date is in the past, display error message", async () => {
    render(<FormScreen />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    fireEvent.click(screen.getByTestId("mock-btn-origin"));
    fireEvent.click(screen.getByTestId("mock-btn-destination"));

    fireEvent.click(screen.getByTestId("mock-btn-date-past"));

    const submitButton = await screen.getByRole("button", {
      name: /calcular rota/i,
    });
    fireEvent.click(submitButton);

    const pastDateErrorMsg =
      "A data da viagem não pode ser anterior ao dia de hoje.";
    const dateError = await screen.findByText(pastDateErrorMsg);

    expect(dateError).toBeInTheDocument();
    expect(searchRoute).not.toHaveBeenCalled();
  });

  it("when date is superior to 1 year, display error message", async () => {
    render(<FormScreen />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    fireEvent.click(screen.getByTestId("mock-btn-origin"));
    fireEvent.click(screen.getByTestId("mock-btn-destination"));

    fireEvent.click(screen.getByTestId("mock-btn-date-future"));

    const submitButton = await screen.getByRole("button", {
      name: /calcular rota/i,
    });
    fireEvent.click(submitButton);

    const futureDateErrorMsg =
      "A data da viagem não pode ser superior a 1 ano a partir de hoje.";
    const dateError = await screen.findByText(futureDateErrorMsg);

    expect(dateError).toBeInTheDocument();
    expect(searchRoute).not.toHaveBeenCalled();
  });
});
