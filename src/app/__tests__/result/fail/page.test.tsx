import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorPage from "@/app/result/fail/page";

describe("ErrorPage Screen", () => {
  it("should render the main elements of the error screen", () => {
    render(<ErrorPage />);

    expect(screen.getByText("Ops! Algo deu errado")).toBeInTheDocument();

    expect(
      screen.getByText(/Não foi possível gerar um itinerário válido/i),
    ).toBeInTheDocument();
  });

  it("should contain the link to go back and restart the search pointing to the home page", () => {
    render(<ErrorPage />);

    const backLink = screen.getByRole("link", { name: /Refazer Nova Busca/i });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute("href", "/#form-screen");
  });

  it("should not display technical details by default", () => {
    render(<ErrorPage />);

    expect(screen.queryByText("/api/v1/routes/search")).not.toBeInTheDocument();
  });
});
