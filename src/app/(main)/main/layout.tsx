import React from "react";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="w-[402px] flex flex-col h-full">
            {children}
        </main>
    );
}