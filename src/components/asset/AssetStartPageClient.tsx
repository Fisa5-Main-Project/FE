'use client';

import Button from '@/components/common/Button';
import { PageActions } from '@/components/common/Page';
import { useAssetRouter } from '@/hooks/asset/useAssetRouter';

interface AssetStartPageClientProps {
    // If any static content needs to be passed from the server component
    // For now, the button is the only interactive part
}

export function AssetStartPageClient(props: AssetStartPageClientProps) {
    const { goTo } = useAssetRouter();

    return (
        <PageActions>
            <Button variant="primary" onClick={() => goTo('info')}>
                확인
            </Button>
        </PageActions>
    );
}
