'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAssetStore } from '@/stores/asset/useAssetStore';
import { FUNNEL_STEPS_ARRAY } from '@/constants/asset';

export function useAssetFunnelProgress() {
    const pathname = usePathname();

    const funnelSteps = useAssetStore((state) => state.funnelSteps);
    const currentStepIndex = useAssetStore((state) => state.currentStepIndex);
    const setFunnelSteps = useAssetStore((state) => state.setFunnelSteps);
    const setCurrentStepIndex = useAssetStore((state) => state.setCurrentStepIndex);

    useEffect(() => {
        if (funnelSteps.length === 0) {
            setFunnelSteps(FUNNEL_STEPS_ARRAY);
        }
    }, [funnelSteps.length, setFunnelSteps]);

    useEffect(() => {
        const index = funnelSteps.indexOf(pathname);
        setCurrentStepIndex(index);
    }, [pathname, funnelSteps, setCurrentStepIndex]);

    const isFunnelStep = currentStepIndex !== -1;
    const progress = isFunnelStep ? ((currentStepIndex + 1) / funnelSteps.length) * 100 : 0;

    return { isFunnelStep, progress };
}
