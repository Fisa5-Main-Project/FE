import React from "react";

export default function InheritanceInfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="page-container flex flex-col h-screen bg-primary text-white">
      {children}
    </main>
  );
}
