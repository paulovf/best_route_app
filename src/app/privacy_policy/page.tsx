import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Topbar from "@/app/components/layout/Topbar";

export default function PrivacyPolicyPage() {
  return (
    <section className="min-h-screen bg-neutral-50 text-neutral-800 px-6 py-12 md:py-20">
      <Topbar show={true} />
      <div id="privacy-policy-screen" className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-neutral-900 transition mb-8 group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Voltar para o início
        </Link>

        <article className="bg-white rounded-3xl border p-8 md:p-10 shadow-sm space-y-6">
          <header className="border-b pb-6">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900">
              Política de Privacidade
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              Última atualização: Julho de 2026
            </p>
          </header>

          <section className="space-y-3">
            <p className="leading-relaxed text-slate-600 text-sm md:text-base">
              A sua privacidade é uma prioridade para nós. Esta política de
              privacidade esclarece de forma transparente como o{" "}
              <strong>Best Route</strong> lida com as suas informações.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-neutral-900">
              1. Uso de Geolocalização
            </h2>
            <p className="leading-relaxed text-slate-600 text-sm md:text-base">
              Nosso aplicativo solicita acesso à geolocalização do seu
              dispositivo exclusivamente para preencher de forma automática o
              campo de cidade de origem no formulário de buscas. Essa
              funcionalidade visa apenas otimizar a sua experiência de
              navegação.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-neutral-900">
              2. Armazenamento e Retenção de Dados
            </h2>
            <p className="leading-relaxed text-slate-600 text-sm md:text-base">
              <strong>Não armazenamos</strong> os seus dados de localização, o
              seu endereço IP ou os históricos das rotas pesquisadas em bancos
              de dados. As informações preenchidas no formulário são processadas
              em tempo real apenas para calcular e exibir as opções de trajetos,
              sendo descartadas imediatamente após a requisição.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-neutral-900">
              3. Cookies e Rastreamento de Terceiros
            </h2>
            <p className="leading-relaxed text-slate-600 text-sm md:text-base">
              Este ambiente digital é livre de ferramentas de rastreamento de
              terceiros, cookies de marketing ou pixels de redes sociais.
              Utilizamos apenas o armazenamento local estritamente necessário
              para o funcionamento técnico da aplicação.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-neutral-900">
              4. Segurança
            </h2>
            <p className="leading-relaxed text-slate-600 text-sm md:text-base">
              Todo o tráfego de dados entre o seu navegador e nossos serviços é
              criptografado utilizando o protocolo HTTPS, garantindo que suas
              consultas viagem de forma segura.
            </p>
          </section>
        </article>
      </div>
    </section>
  );
}
