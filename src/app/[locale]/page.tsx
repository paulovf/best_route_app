"use client";

import HomeScreen from "@/app/[locale]/index/home/HomeScreen";

/**
 * The main entry page for the application.
 *
 * @returns The rendered main page which contains the HomeScreen.
 */
export default function Page() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <main className="pt-0">
        <HomeScreen />
      </main>
    </div>
  );
}
