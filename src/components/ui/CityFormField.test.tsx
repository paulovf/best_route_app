import { render, screen, fireEvent } from "@testing-library/react";
import { CityFormField } from "@/components/ui/CityFormField";

const mockContextCities = [
  {
    name: "Curitiba",
    uf: "PR",
    displayName: "Curitiba - PR",
  },
  {
    name: "Curitibanos",
    uf: "SC",
    displayName: "Curitibanos - SC",
  },
];

describe("CityFormField component", () => {
  const mockOnChange = jest.fn();

  it("when user input any text search and display cities suggestions", async () => {
    render(
      <CityFormField
        placeholder="Digite a cidade"
        namePrefix="origin"
        value={null}
        onChange={mockOnChange}
        cities={mockContextCities}
        isLoadingCities={false}
      />,
    );

    const input = screen.getByPlaceholderText("Digite a cidade");

    fireEvent.change(input, { target: { value: "Curi" } });

    const curitibaOption = await screen.findByText("Curitiba");
    const ufOption = await screen.findByText("- PR");

    expect(curitibaOption).toBeInTheDocument();
    expect(ufOption).toBeInTheDocument();

    expect(screen.getByText("Curitibanos")).toBeInTheDocument();
  });

  it("when click in item list, select a city and clean list", async () => {
    render(
      <CityFormField
        placeholder="Digite a cidade"
        namePrefix="origin"
        value={null}
        onChange={mockOnChange}
        cities={mockContextCities}
        isLoadingCities={false}
      />,
    );

    const input = screen.getByPlaceholderText("Digite a cidade");
    fireEvent.change(input, { target: { value: "Curi" } });

    const curitibaOption = await screen.findByText("Curitiba");

    fireEvent.click(curitibaOption);

    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Curitiba",
        uf: "PR",
        displayName: "Curitiba - PR",
      }),
    );

    expect(screen.queryByText("Curitibanos")).not.toBeInTheDocument();
  });

  it("should trigger onChange when user types a full city name", async () => {
    render(
      <CityFormField
        placeholder="Digite a cidade"
        namePrefix="origin"
        value={null}
        onChange={mockOnChange}
        cities={mockContextCities}
        isLoadingCities={false}
      />,
    );

    const input = screen.getByPlaceholderText("Digite a cidade");

    fireEvent.change(input, { target: { value: "Curitiba" } });

    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Curitiba",
        uf: "PR",
      }),
    );
  });
});
