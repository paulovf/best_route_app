import type { Meta, StoryObj } from "@storybook/react";
import { TransportIcon } from "@/components/ui/icons/Transport";

const meta = {
  title: "Icons/Transport",
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
      "bus",
      "plane",
      "boat",
      "train",
      "app_mobile",
      "car",
    ] as const;
    return (
      <div className="flex flex-col gap-4 p-4 bg-white rounded-xl shadow-sm border border-neutral-200">
        <h3 className="text-sm font-semibold text-neutral-800 mb-2">
          Transport Icon Types
        </h3>
        {types.map((type) => (
          <div key={type} className="flex items-center gap-3">
            <div className="p-2 border rounded-lg bg-neutral-50 shadow-sm flex items-center justify-center">
              {TransportIcon({ type, className: "w-6 h-6 text-neutral-800" })}
            </div>
            <span className="text-sm font-medium text-neutral-700">{type}</span>
          </div>
        ))}
      </div>
    );
  },
};
