import type { Meta, StoryObj } from "@storybook/react";
import LanguageSwitcher from "./LanguageSwitcher";
import { NextIntlClientProvider } from "next-intl";

const meta: Meta<typeof LanguageSwitcher> = {
  title: "UI/LanguageSwitcher",
  component: LanguageSwitcher,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story, context) => {
      const locale = context.parameters.locale || "pt";

      return (
        <NextIntlClientProvider locale={locale} messages={{}}>
          <div
            style={{
              padding: "3rem",
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#171717",
            }}
          >
            <Story />
          </div>
        </NextIntlClientProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof LanguageSwitcher>;

export const DefaultPT: Story = {
  parameters: {
    locale: "pt",
  },
};

export const ActiveEnglish: Story = {
  parameters: {
    locale: "en",
  },
};

export const ActiveGerman: Story = {
  parameters: {
    locale: "de",
  },
};

export const ActiveSpanish: Story = {
  parameters: {
    locale: "es",
  },
};

export const ActiveFrance: Story = {
  parameters: {
    locale: "fr",
  },
};
