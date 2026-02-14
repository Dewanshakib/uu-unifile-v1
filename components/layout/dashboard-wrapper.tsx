"use client";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

export default function DashboardWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const pathName = usePathname();

  return (
    <div className={pathName.startsWith("/dashboard") ? "p-0" : "p-4"}>
      {children}
    </div>
  );
}