import React from "react";

export default function InheritancePlanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="page-container flex flex-col">{children}</main>;
}
