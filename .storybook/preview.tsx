import type { Preview } from "@storybook/nextjs-vite";
import { NextIntlClientProvider } from "next-intl";
import messages from "../messages/pt.json";
// @ts-ignore
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: "error",
    },
  },
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="pt-BR" messages={messages}>
        <Story />
      </NextIntlClientProvider>
    ),
  ],
};

export default preview;
