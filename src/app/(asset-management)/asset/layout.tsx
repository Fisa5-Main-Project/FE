'use client';

import AssetProgressBar from '@/components/common/AssetProgressBar';
import { useAssetFunnelProgress } from '@/hooks/asset/useAssetFunnelProgress';

export default function AssetLayout({ children }: { children: React.ReactNode }) {
    const { isFunnelStep, progress } = useAssetFunnelProgress();

    return (
        <div className="flex flex-col min-h-screen bg-[linear-gradient(to_bottom,#FFFFFF_0%,#CCE1FF_17%,#E0EDFF_50%,#FFFFFF_79%,#FFFFFF_100%)]">
            <main className="page-container flex flex-col flex-grow">
                {isFunnelStep && (
                    <div className="mb-10">
                        <AssetProgressBar progress={progress} />
                    </div>
                )}

                {children}
            </main>
        </div>
    );
}
