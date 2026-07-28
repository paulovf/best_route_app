import type { Meta, StoryObj } from "@storybook/react";
import { OptionCard } from "@/features/routing/components/OptionCard";
import { Option } from "@/features/routing/types";

const meta = {
  title: "Components/OptionCard",
  component: OptionCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    option: {
      control: "object",
      description: "The travel route option data containing summary and steps",
    },
  },
} satisfies Meta<typeof OptionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockOption: Option = {
  order: 1,
  highlight: "recommended",
  total_duration_hours: 4.5,
  total_kilometers: 350,
  total_amount: 150.0,
  description:
    "Esta é uma rota recomendada combinando ônibus e trem, oferecendo um excelente custo-benefício.",
  steps: [
    {
      order: 1,
      origin_departure_type: "bus_station",
      destination_arrival_type: "train_station",
      origin_departure: "Terminal Rodoviário Central",
      destination_arrival: "Estação Ferroviária Norte",
      origin_city: "São Paulo",
      origin_state: "SP",
      destination_city: "Campinas",
      destination_state: "SP",
      transport_type: "bus",
      duration_hours: 2.0,
      kilometers: 100,
      average_amount: 50.0,
    },
    {
      order: 2,
      origin_departure_type: "train_station",
      destination_arrival_type: "home",
      origin_departure: "Estação Ferroviária Norte",
      destination_arrival: "Destino Final",
      origin_city: "Campinas",
      origin_state: "SP",
      destination_city: "Ribeirão Preto",
      destination_state: "SP",
      transport_type: "train",
      duration_hours: 2.5,
      kilometers: 250,
      average_amount: 100.0,
    },
  ],
};

export const Default: Story = {
  args: {
    option: mockOption,
  },
};

export const Fastest: Story = {
  args: {
    option: {
      ...mockOption,
      highlight: "fastest",
      total_duration_hours: 1.5,
      total_kilometers: 320,
      total_amount: 280.0,
      description: "A rota mais rápida utilizando avião e carro.",
      steps: [
        {
          order: 1,
          origin_departure_type: "airport",
          destination_arrival_type: "airport",
          origin_departure: "Aeroporto de Congonhas",
          destination_arrival: "Aeroporto de Viracopos",
          origin_city: "São Paulo",
          origin_state: "SP",
          destination_city: "Campinas",
          destination_state: "SP",
          transport_type: "plane",
          duration_hours: 1.5,
          kilometers: 320,
          average_amount: 280.0,
        },
      ],
    },
  },
};
