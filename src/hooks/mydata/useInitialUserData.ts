import { useEffect } from 'react';
// import { useMyDataContext } from '@/context/MyDataContext';
import { useMyDataStore } from '@/stores/mydata/useMyDataStore';

/**
 * 마이데이터 플로우 시작 시 필요한 초기 사용자 데이터를 설정하는 훅입니다.
 */
export const useInitialUserData = () => {
    const setUserName = useMyDataStore(state => state.setUserName);

    useEffect(() => {
        // 이 곳에서 서버 API를 호출하거나 로컬 저장소에서 초기 데이터를 로드합니다.
        console.log('Fetching initial user data...');
        setUserName('홍길동');
    }, [setUserName]);
};