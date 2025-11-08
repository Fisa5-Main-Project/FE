'use client';

import {
    Page,
    PageHeader,
    PageContent,
    PageActions,
} from '@/components/common/Page';
import Button from '@/components/common/Button';
import { useAssetRouter } from '@/hooks/asset/useAssetRouter';

export default function AssetManagementStartPage() {
    const { goTo } = useAssetRouter();
    const userName = '양유진'; // 추후 사용자 데이터에 따라 동적으로 변경될 수 있습니다.

    return (
        <Page>
            <PageContent>
                <h1 className="text-tossgray text-3xl font-['Pretendard'] whitespace-pre-line">
                    <span className='font-bold'>{userName}</span>
                    <span className='font-medium'>
                        {'님의 든든한 노후,\n저희가 책임지고\n설계합니다.'}
                    </span>
                </h1>
            </PageContent>
            <PageActions>
                <Button variant='primary' onClick={() => goTo('info')}>
                    확인
                </Button>
            </PageActions>
        </Page>
    );
}
