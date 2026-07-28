import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "@/components/layout/Footer";

const meta = {
  title: "Components/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    resultHref: {
      control: "text",
      description: "The URL to navigate to when the Result link is clicked",
    },
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    resultHref: "/#result-screen",
  },
};
