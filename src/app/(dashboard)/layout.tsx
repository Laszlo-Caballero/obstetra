import Aside from "@/components/layout/aside/Aside";
import React, { PropsWithChildren } from "react";

export default function LayoutDashboard({ children }: PropsWithChildren) {
  return (
    <main className="flex">
      <Aside />
      <div className="flex flex-col min-h-screen w-full">{children}</div>
    </main>
  );
}
