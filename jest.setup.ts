import "@testing-library/jest-dom";
import { setTestLocale } from "@/test/i18n";
import "@/test/setup/next-intl";
import "@/test/setup/routing";

global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
  takeRecords: jest.fn(),
  root: null,
  rootMargin: "",
  thresholds: [],
})) as unknown as typeof IntersectionObserver;

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  }),
) as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
  setTestLocale("pt");
});
