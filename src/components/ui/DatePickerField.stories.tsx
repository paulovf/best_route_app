import type { Meta, StoryObj } from "@storybook/nextjs";
import { DatePickerField } from "./DatePickerField";
import { DatePickerFieldProps } from "@/types/form";
import { useState } from "react";
import { NextIntlClientProvider } from "next-intl";

const mockMessages = {
  DatePickerField: {
    placeholder: "Selecione a data de ida",
    format: "dd/MM/yyyy",
  },
};

const meta: Meta<typeof DatePickerField> = {
  title: "UI/DatePickerField",
  component: DatePickerField,
  tags: ["autodocs"],
  argTypes: {
    error: { control: "text" },
  },
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="pt" messages={mockMessages}>
        <div style={{ padding: "1rem", maxWidth: "400px" }}>
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DatePickerField>;

const InteractiveDatePicker = (args: DatePickerFieldProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  return <DatePickerField {...args} value={date} onChange={setDate} />;
};

export const Default: Story = {
  render: (args) => <InteractiveDatePicker {...args} />,
};

export const WithError: Story = {
  render: (args) => <InteractiveDatePicker {...args} />,
  args: {
    error: "A data da viagem não pode ser anterior ao dia de hoje.",
  },
};
