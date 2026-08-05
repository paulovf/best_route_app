import type { Meta, StoryObj } from "@storybook/nextjs";
import FaroProvider from "./FaroProvider";

const meta: Meta<typeof FaroProvider> = {
  title: "Observability/FaroProvider",
  component: FaroProvider,
  decorators: [
    (Story) => (
      <div className="p-6 border rounded-lg bg-slate-50 font-mono text-sm">
        <h3 className="font-bold mb-4 text-slate-800">
          FaroProvider (Invisible Component)
        </h3>
        <p className="text-slate-600 mb-2">
          This component renders <code>null</code>, but injects the Grafana Faro
          script into the frontend if the following criteria are met:
        </p>
        <ul className="list-disc pl-5 text-slate-600 mb-4">
          {/* prettier-ignore */}
          <li>
            Production environment (<code>NEXT_PUBLIC_ENVIRONMENT === &quot;production&quot;</code>)
          </li>
          {/* prettier-ignore */}
          <li>
            Consent granted (<code>localStorage.getItem(&quot;cookie-consent&quot;) === &quot;granted&quot;</code>)
          </li>
        </ul>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FaroProvider>;

export const Documentation: Story = {};
