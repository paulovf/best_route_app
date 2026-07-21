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

export /**
 * Get a current locale.
 *
 * @return {*} a cuurent locale.
 */
function getCurrentLocale() {
  return currentLocale;
}

export /**
 * Set a new current locale.
 *
 * @param {keyof typeof locales} locale - a new locale for updated.
 */
function setTestLocale(locale: keyof typeof locales) {
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

export /**
 * Get a translated message by key.
 *
 * @param {string} namespace - translate namespace in translated file.
 * @param {string} key - translated key.
 * @return {*} a translated messgae by key.
 */
function translate(namespace: string, key: string) {
  const value = getMessage(locales[currentLocale], `${namespace}.${key}`);

  if (typeof value !== "string") {
    throw new Error(
      `Translation not found: ${currentLocale}.${namespace}.${key}`,
    );
  }

  return value;
}
