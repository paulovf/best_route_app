import type { Meta, StoryObj } from "@storybook/nextjs";
import CookieBanner from "./CookieBanner";
import { NextIntlClientProvider } from "next-intl";

const meta: Meta<typeof CookieBanner> = {
  title: "Components/Layout/CookieBanner",
  component: CookieBanner,
  decorators: [
    (Story) => (
      <NextIntlClientProvider
        locale="pt"
        messages={{
          CookieBanner: {
            message:
              "Utilizamos cookies e ferramentas de monitoramento para analisar o tráfego e melhorar sua experiência. Os dados só serão coletados com o seu aceite.",
            accept: "Aceitar e continuar",
            decline: "Recusar",
          },
        }}
      >
        <div className="h-screen w-full bg-neutral-100 flex items-center justify-center">
          <p className="text-slate-400">Conteúdo da página de fundo...</p>
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CookieBanner>;

export const Default: Story = {
  beforeEach: () => {
    localStorage.removeItem("cookie-consent");
  },
};
