import pt from "../../messages/pt.json";
import en from "../../messages/en.json";
import es from "../../messages/es.json";
import fr from "../../messages/fr.json";
import de from "../../messages/de.json";

const locales = {
  pt,
  en,
  es,
  fr,
  de,
};

let currentLocale: keyof typeof locales = "pt";

/**
 * Get a current locale.
 *
 * @returns a cuurent locale.
 */
export function getCurrentLocale() {
  return currentLocale;
}

/**
 * Set a new current locale.
 *
 * @param locale - a new locale for updated.
 */
export function setTestLocale(locale: keyof typeof locales) {
  currentLocale = locale;
}

function getMessage(
  obj: Record<string, unknown>,
  path: string,
): string | undefined {
  return path.split(".").reduce<unknown>((acc, part) => {
    if (typeof acc === "object" && acc !== null && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }

    return undefined;
  }, obj) as string | undefined;
}

/**
 * Get a translated message by key.
 *
 * @param namespace - translate namespace in translated file.
 * @param key - translated key.
 * @returns a translated messgae by key.
 */
export function translate(namespace: string, key: string) {
  const value = getMessage(locales[currentLocale], `${namespace}.${key}`);

  if (typeof value !== "string") {
    throw new Error(
      `Translation not found: ${currentLocale}.${namespace}.${key}`,
    );
  }

  return value;
}
