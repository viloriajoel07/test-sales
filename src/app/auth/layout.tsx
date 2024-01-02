"use client";
import { useState } from "react";
import { SideBar } from "@/components";
import clsx from "clsx";
import HorizontalBar from "@/components/HorizonalBar";

export default function DashboarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [active, setActive] = useState(false);

  return (
    <div className="flex overflow-hidden">
      <SideBar setActive={setActive} active={active} />
      <HorizontalBar />
      <main
        className={clsx(
          "flex lg:ml-20 py-8 px-4 md:px-16 transition-all bg-gray-100 w-full min-h-screen pb-24 lg:mb-0",
          {
            "lg:!ml-56": active,
          }
        )}
      >
        {children}
      </main>
    </div>
  );
}
