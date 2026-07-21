import type { Meta, StoryObj } from "@storybook/react";
import { CityFormField } from "./CityFormField";
import { useState } from "react";
import { NextIntlClientProvider } from "next-intl";
import { CityContext } from "@/context/CityContext";
import { CityOption } from "@/types/form";

const mockMessages = {
  CityFormField: {
    loading: "Carregando cidades...",
    notFound: "Nenhuma cidade encontrada.",
  },
};

const mockCities: CityOption[] = [
  { name: "São Paulo", uf: "SP", displayName: "São Paulo - SP" },
  { name: "Rio de Janeiro", uf: "RJ", displayName: "Rio de Janeiro - RJ" },
  { name: "Belo Horizonte", uf: "MG", displayName: "Belo Horizonte - MG" },
  { name: "Salvador", uf: "BA", displayName: "Salvador - BA" },
  { name: "Curitiba", uf: "PR", displayName: "Curitiba - PR" },
];

const meta: Meta<typeof CityFormField> = {
  title: "Form/CityFormField",
  component: CityFormField,
  tags: ["autodocs"],
  decorators: [
    (Story, context) => {
      const isLoadingCities = context.args.error === "loading";

      return (
        <NextIntlClientProvider locale="pt" messages={mockMessages}>
          <CityContext.Provider value={{ cities: mockCities, isLoadingCities }}>
            <div
              style={{
                padding: "2rem",
                maxWidth: "400px",
                backgroundColor: "#f8fafc",
              }}
            >
              <Story />
            </div>
          </CityContext.Provider>
        </NextIntlClientProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof CityFormField>;

const InteractiveCityField = (args: any) => {
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);
  return (
    <CityFormField {...args} value={selectedCity} onChange={setSelectedCity} />
  );
};

export const Default: Story = {
  render: (args) => <InteractiveCityField {...args} />,
  args: {
    placeholder: "Origem (ex: São Paulo)",
    namePrefix: "origin",
  },
};

export const WithError: Story = {
  render: (args) => <InteractiveCityField {...args} />,
  args: {
    placeholder: "Destino",
    namePrefix: "destination",
    error: "Por favor, selecione uma cidade de destino.",
  },
};

export const LoadingState: Story = {
  render: (args) => <InteractiveCityField {...args} />,
  args: {
    placeholder: "Buscando...",
    namePrefix: "origin",
    error: "loading",
  },
};
