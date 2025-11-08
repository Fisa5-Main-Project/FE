import React from 'react';

/**
 * 페이지의 전체적인 '하단 고정 버튼' 레이아웃을 구성하는 루트 컴포넌트입니다.
 */
export function Page({ children }: { children: React.ReactNode }) {
    return <div className='flex flex-col flex-grow h-full'>{children}</div>;
}

/**
 * 페이지의 제목(h1)을 표준 스타일로 렌더링하는 컴포넌트입니다.
 */
export function PageHeader({ children }: { children: React.ReactNode }) {
    return (
        <h1 className="text-tossgray text-3xl font-bold font-['Pretendard']">
            {children}
        </h1>
    );
}

/**
 * 페이지의 메인 컨텐츠 영역을 구성하는 컴포넌트입니다.
 * 이 컴포넌트가 사용 가능한 모든 수직 공간을 차지하여 하단 버튼을 밀어냅니다.
 */
export function PageContent({ children }: { children: React.ReactNode }) {
    return <div className='flex-grow'>{children}</div>;
}

/**
 * 페이지 하단에 고정되는 버튼 등의 액션 아이템을 위한 컨테이너 컴포넌트입니다.
 */
export function PageActions({ children }: { children: React.ReactNode }) {
    return <div className='flex-shrink-0'>{children}</div>;
}
