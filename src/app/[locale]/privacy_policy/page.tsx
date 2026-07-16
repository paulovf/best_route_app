import { Link } from "@/i18n/routing"; 
import { ArrowLeft } from "lucide-react";
import Topbar from "@/app/[locale]/components/layout/Topbar";
import { useTranslations } from "next-intl";

export default function PrivacyPolicyPage() {
  const t = useTranslations("PrivacyPolicy");

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
          {t("backToHome")}
        </Link>

        <article className="bg-white rounded-3xl border p-8 md:p-10 shadow-sm space-y-6">
          <header className="border-b pb-6">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900">
              {t("title")}
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              {t("lastUpdated")}
            </p>
          </header>

          <section className="space-y-3">
            <p className="leading-relaxed text-slate-600 text-sm md:text-base">
              {t.rich("intro", {
                bold: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-neutral-900">
              {t("sections.geolocation.title")}
            </h2>
            <p className="leading-relaxed text-slate-600 text-sm md:text-base">
              {t("sections.geolocation.content")}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-neutral-900">
              {t("sections.data.title")}
            </h2>
            <p className="leading-relaxed text-slate-600 text-sm md:text-base">
              {t.rich("sections.data.content", {
                bold: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-neutral-900">
              {t("sections.cookies.title")}
            </h2>
            <p className="leading-relaxed text-slate-600 text-sm md:text-base">
              {t("sections.cookies.content")}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-neutral-900">
              {t("sections.security.title")}
            </h2>
            <p className="leading-relaxed text-slate-600 text-sm md:text-base">
              {t("sections.security.content")}
            </p>
          </section>
        </article>
      </div>
    </section>
  );
}
