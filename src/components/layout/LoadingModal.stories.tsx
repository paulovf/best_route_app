import type { Meta, StoryObj } from "@storybook/nextjs";
import { LoadingModal } from "@/components/layout/LoadingModal";

const meta = {
  title: "Components/LoadingModal",
  component: LoadingModal,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          position: "relative",
          height: "80px",
          overflow: "hidden",
          transform: "translateZ(0)",
        }}
      >
        <Story />
      </div>
    ),
  ],
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
