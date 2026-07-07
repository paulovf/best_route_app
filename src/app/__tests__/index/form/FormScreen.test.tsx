import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { FormScreen } from "@/app/index/form/FormScreen";

const mockIBGEResponse = [
  {
    id: 1,
    nome: "São Paulo",
    microrregiao: { mesorregiao: { UF: { sigla: "SP" } } },
  },
  {
    id: 2,
    nome: "Rio de Janeiro",
    microrregiao: { mesorregiao: { UF: { sigla: "RJ" } } },
  },
];

describe("Form page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockIBGEResponse),
      }),
    ) as jest.Mock;
  });

  it("Render form page", async () => {
    render(<FormScreen />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const title = screen.getByText("Calcule sua melhor rota");
    const label = screen.getByText("Planeje sua viagem com mais facilidade");
    const originLabel = screen.getByPlaceholderText("Onde você está?");
    const destinationLabel = screen.getByPlaceholderText("Para onde você vai?");
    const swap = screen.getByRole("button", {
      name: /Inverter origem e destino/i,
    });
    const button = screen.getByRole("button", {
      name: /Calcular rota/i,
    });
    const infoLabel = screen.getByText(
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

    const origemInput = screen.getByPlaceholderText(
      /Onde você está\?/i,
    ) as HTMLInputElement;
    const destinoInput = screen.getByPlaceholderText(
      /Para onde você vai\?/i,
    ) as HTMLInputElement;

    fireEvent.change(origemInput, { target: { value: "São" } });
    const spOption = await screen.findByText("São Paulo");
    fireEvent.click(spOption);

    fireEvent.change(destinoInput, { target: { value: "Rio" } });
    const rjOption = await screen.findByText("Rio de Janeiro");
    fireEvent.click(rjOption);

    const swapButton = screen.getByRole("button", { name: /inverter/i });
    fireEvent.click(swapButton);

    await waitFor(() => {
      const origemInput = screen.getByPlaceholderText(
        /Onde você está\?/i,
      ) as HTMLInputElement;
      const destinoInput = screen.getByPlaceholderText(
        /Para onde você vai\?/i,
      ) as HTMLInputElement;

      expect(origemInput.value).toBe("Rio de Janeiro - RJ");
      expect(destinoInput.value).toBe("São Paulo - SP");
    });
  });
});
