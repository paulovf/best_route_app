"use client";

import React from "react";
import Image from "next/image";
import HomeScreen from "@/app/index/home/HomeScreen";

export default function Page() {

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Main Content Area */}
      <main className="pt-0">
        <HomeScreen />
      </main>
    </div>
  );
}
