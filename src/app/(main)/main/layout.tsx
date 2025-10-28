export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-sm">{children}</div>
        </div>
    );
}
