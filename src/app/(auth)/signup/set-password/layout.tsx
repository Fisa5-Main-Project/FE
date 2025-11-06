import React from "react";

export default function SetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="page-container flex flex-col min-h-screen">
      {children}
    </main>
  );
}
