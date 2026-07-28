import type { Meta, StoryObj } from "@storybook/nextjs";
import Topbar from "@/components/layout/Topbar";

const meta = {
  title: "Components/Topbar",
  component: Topbar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    show: {
      control: "boolean",
      description:
        "Controls whether the topbar is visible or translated out of view",
    },
    resultHref: {
      control: "text",
      description: "The URL for the Results link in the navigation",
    },
  },
} satisfies Meta<typeof Topbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    show: true,
    resultHref: "/#result-screen",
  },
};

export const Hidden: Story = {
  args: {
    show: false,
    resultHref: "/#result-screen",
  },
};
