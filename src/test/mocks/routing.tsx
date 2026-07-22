import React from "react";
export const mockPush = jest.fn();
export const mockReplace = jest.fn();

export const mockRouter = {
  push: mockPush,
  replace: mockReplace,
  prefetch: jest.fn(),
  back: jest.fn(),
};

jest.mock("/src/i18n/routing", () => ({
  Link: ({
    children,
    href,
    ...rest
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
  useRouter: jest.fn(() => mockRouter),

  usePathname: jest.fn(() => "/"),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
