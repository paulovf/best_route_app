import type { Meta, StoryObj } from "@storybook/react";
import { getLocationIcon } from "@/components/ui/icons/Location";

const meta = {
  title: "Icons/Location",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllTypes: Story = {
  render: () => {
    const types = [
      "airport",
      "bus_station",
      "train_station",
      "boat_station",
      "home",
      "street",
    ] as const;
    return (
      <div className="flex flex-col gap-4 p-4 bg-white rounded-xl shadow-sm border border-neutral-200">
        <h3 className="text-sm font-semibold text-neutral-800 mb-2">
          Location Icon Types
        </h3>
        {types.map((type) => (
          <div key={type} className="flex items-center gap-3">
            <div className="p-2 border rounded-lg bg-neutral-50 shadow-sm flex items-center justify-center">
              {getLocationIcon({ type, className: "w-6 h-6 text-neutral-800" })}
            </div>
            <span className="text-sm font-medium text-neutral-700">{type}</span>
          </div>
        ))}
      </div>
    );
  },
};
