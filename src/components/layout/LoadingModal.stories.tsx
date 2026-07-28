import type { Meta, StoryObj } from "@storybook/react";
import { LoadingModal } from "@/components/layout/LoadingModal";

const meta = {
  title: "Components/LoadingModal",
  component: LoadingModal,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Controls the visibility of the modal",
    },
  },
} satisfies Meta<typeof LoadingModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
  },
};
