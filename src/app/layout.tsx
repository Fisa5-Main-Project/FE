import type { Metadata } from "next";
import "@/styles/globals.css";
import AppLifecycleManager from "@/components/common/AppLifecycleManager";

export const metadata: Metadata = {
  title: "Woori",
  description: "Main Project Client with Next.js",
  manifest: "/manifest.webmanifest", // Next.js 14부터는 ts파일을 webmanifest로 자동 변환
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="font-sans">
      <body className="bg-white sm:bg-neutral-200">
        <div className="sm:flex sm:items-center sm:justify-center sm:min-h-screen">
          <main className="relative w-full bg-white sm:max-w-[402px] sm:h-screen h-screen sm:shadow-lg sm:rounded-2xl overflow-y-auto">
            <AppLifecycleManager>{children}</AppLifecycleManager>
          </main>
        </div>
      </body>
    </html>
  );
}
