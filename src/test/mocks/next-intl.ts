import React from "react";
import { translate, getCurrentLocale } from "@/test/i18n";

interface TranslationFunction {
  (key: string, values?: Record<string, unknown>): string;

  rich(
    key: string,
    tags: Record<string, (chunks: React.ReactNode) => React.ReactNode>,
  ): React.ReactNode;

  raw(key: string): string;

  has(key: string): boolean;
}

jest.mock("next-intl", () => ({
  useLocale: () => getCurrentLocale(),

  useTranslations: (namespace: string) => {
    const t: TranslationFunction = (
      key: string,
      values?: Record<string, unknown>,
    ) => {
      let text = translate(namespace, key);

      if (values) {
        Object.entries(values).forEach(([k, v]) => {
          text = text.replaceAll(`{${k}}`, String(v));
        });
      }

      return text;
    };

    t.rich = (
      key: string,
      tags: Record<string, (chunks: React.ReactNode) => React.ReactNode>,
    ) => {
      const text = translate(namespace, key);

      const parse = (value: string): React.ReactNode => {
        const match = value.match(/^<(\w+)>([\s\S]*)<\/\1>$/);

        if (!match) {
          return value;
        }

        const [, tag, content] = match;

        if (tags[tag]) {
          return tags[tag](content);
        }

        return content;
      };

      return parse(text);
    };

    t.raw = (key: string) => translate(namespace, key);

    t.has = (key: string) => {
      try {
        return !!translate(namespace, key);
      } catch {
        return false;
      }
    };

    return t;
  },
}));
