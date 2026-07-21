import { render, screen, fireEvent } from "@testing-library/react";
import { DatePickerField } from "@/app/[locale]/components/ui/DatePickerField";
import { subDays } from "date-fns";

describe("DatePickerField component", () => {
  const mockOnChange = jest.fn();

  it("when click in input open calendar", () => {
    render(<DatePickerField value={undefined} onChange={mockOnChange} />);

    expect(screen.queryByRole("grid")).not.toBeInTheDocument();

    const input = screen.getByPlaceholderText("dd/mm/aaaa");
    fireEvent.click(input);

    expect(screen.getByRole("grid")).toBeInTheDocument();
  });

  it("disabled old dates", () => {
    render(<DatePickerField value={undefined} onChange={mockOnChange} />);

    fireEvent.click(screen.getByPlaceholderText("dd/mm/aaaa"));

    const ontem = subDays(new Date(), 1);
    const diaDeOntem = ontem.getDate().toString();

    const botoes = screen.getAllByRole("button");

    const botaoOntem = botoes.find((botao) => botao.textContent === diaDeOntem);

    expect(botaoOntem).toBeDefined();
    expect(botaoOntem).toBeDisabled();

    if (botaoOntem) {
      fireEvent.click(botaoOntem);
      expect(mockOnChange).not.toHaveBeenCalled();
    }
  });
});
