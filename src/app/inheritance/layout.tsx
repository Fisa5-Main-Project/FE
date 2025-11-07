import React from "react";

export default function InheritancePlanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="flex flex-col">{children}</main>;
}
