import React from "react";

/**
 * Pension 라우트 그룹의 레이아웃
 */

export default function PensionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="page-container flex flex-col min-h-screen bg-gradient-to-b from-white via-[#CCE1FF] to-[#E0EDFF]">
      {children}
    </main>
  );
}
