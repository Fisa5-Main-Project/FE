import '@/styles/globals.css';
export const metadata = { title: '본인확인 실습'};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <section className="min-h-screen">{children}</section>;
}
