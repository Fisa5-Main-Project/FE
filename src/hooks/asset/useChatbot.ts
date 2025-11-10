'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useAssetRouter } from './useAssetRouter';

// --- 타입 정의 (확장) ---
export interface ChatProduct {
    id: string;
    icon: string;
    type: string;
    name: string;
    bank: string;
    features: string[];
    stat: string;
}
export interface Message {
    id: string;
    sender: 'user' | 'bot';
    text: string;
    keywords?: string[];
    products?: ChatProduct[];
}
type ConversationState = 'START' | 'AWAITING_PERIOD' | 'AWAITING_HOBBY' | 'AWAITING_INVESTMENT_TYPE';

// --- Speech API 타입 정의 (any 제거) ---
// 1. 브라우저의 비표준 API에 대한 타입 정의
interface ISpeechRecognitionResult {
    [index: number]: { transcript: string };
}
interface ISpeechRecognitionEvent {
    results: ISpeechRecognitionResult[];
}
interface ISpeechRecognition {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    onstart: () => void;
    onend: () => void;
    onresult: (event: ISpeechRecognitionEvent) => void;
    start: () => void;
    stop: () => void;
}
// 2. 생성자 타입 정의
interface ISpeechRecognitionConstructor {
    new (): ISpeechRecognition;
}

// 3. [수정] (window as any) 대신 Window 타입 확장
// TypeScript가 window 객체에 해당 속성이 존재할 수 있음을 인지시킴
declare global {
    interface Window {
        SpeechRecognition?: ISpeechRecognitionConstructor;
        webkitSpeechRecognition?: ISpeechRecognitionConstructor;
    }
}
// ------------------------------------

// 4. (window as any) 구문 제거
const SpeechRecognition =
    (typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)) || null;
const getPensionProducts = (): ChatProduct[] => [
    {
        id: 'p_pension1',
        icon: '💰',
        type: '연금저축',
        name: '우리 연금저축 펀드',
        bank: '우리은행',
        features: ['• 연 최대 900만원 세액공제', '• 다양한 펀드 선택', '• 전문가 포트폴리오 관리'],
        stat: '세액공제 16.5%',
    },
    {
        id: 'p_pension2',
        icon: '🎯',
        type: '연금저축',
        name: '우리 연금저축 보험',
        bank: '우리은행',
        features: ['• 원금 보장형', '• 세액공제 혜택', '• 사망보장 추가'],
        stat: '연 3.2% + 세액공제',
    },
];
const getFundProducts = (): ChatProduct[] => [
    {
        id: 'p_fund1',
        icon: '📈',
        type: '펀드',
        name: '우리 배당성장 펀드',
        bank: '우리은행',
        features: ['• 국내외 우량 배당주 투자', '• 분기 배당금 지급', '• 3년 평균 수익률 12.3%'],
        stat: '수익률 12.3%',
    },
    {
        id: 'p_fund2',
        icon: '🌏',
        type: '펀드',
        name: '우리 글로벌 인컴 펀드',
        bank: '우리은행',
        features: ['• 매월 안정적 배당', '• 글로벌 분산투자', '• 원금 손실 위험 중위'],
        stat: '월배당 약 0.4%',
    },
];
const getInsuranceProduct = (): ChatProduct[] => [
    {
        id: 'p_ins1',
        icon: '🩺',
        type: '보험',
        name: '우리 건강관리 보험',
        bank: '우리은행',
        features: ['• 건강검진 지원', '• 의료비 할인 혜택', '• 장기요양 보장'],
        stat: '연 2.8% + 건강혜택',
    },
];

// [수정 1] 재사용을 위해 ID를 제거하고 'CONTENT'로 변경
const START_MESSAGE_CONTENT = {
    sender: 'bot' as const,
    text: '어떤 서비스를 제공받고 싶으신가요?',
    keywords: ['예금/적금 상품 추천', '연금저축 상품 추천', '펀드 상품 추천'],
};

/**
 * 챗봇 페이지 로직 (상태 머신 기반으로 수정)
 */
export function useChatbot() {
    const { goTo } = useAssetRouter();

    // [수정 2] 초기 메시지에도 고유 ID 할당
    const [messages, setMessages] = useState<Message[]>([
        {
            id: crypto.randomUUID(), // 고유 ID
            ...START_MESSAGE_CONTENT,
        },
    ]);

    const [input, setInput] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [conversationState, setConversationState] = useState<ConversationState>('START');
    const recognitionRef = useRef<ISpeechRecognition | null>(null);

    // --- 1. 봇 응답 로직 (상태 머신) ---
    const getBotResponse = useCallback(
        (userText: string): Message => {
            const text = userText.toLowerCase();

            // [수정 3] 피드백/초기화 시, START_MESSAGE_CONTENT에 새 ID를 부여하여 반환
            if (text.includes('도움이 됐어요') || text.includes('마음에 안들어요') || text.includes('상품 보러가기')) {
                setConversationState('START');
                return {
                    id: crypto.randomUUID(), // <-- 키 중복 해결
                    ...START_MESSAGE_CONTENT,
                };
            }

            let response: Message = {
                id: crypto.randomUUID(),
                sender: 'bot',
                text: '죄송합니다. 잘 이해하지 못했어요.',
                keywords: ['예금/적금 상품 추천', '연금저축 상품 추천', '펀드 상품 추천'],
            };

            switch (conversationState) {
                case 'START':
                    if (text.includes('예금/적금')) {
                        response = {
                            id: crypto.randomUUID(),
                            sender: 'bot',
                            text: '예금/적금 상품을 찾고 계시군요! 고객님의 목표 기간을 알려주시겠어요?',
                            keywords: ['1년 이내 (단기)', '1~3년 (중기)', '3년 이상 (장기)'],
                        };
                        setConversationState('AWAITING_PERIOD');
                    } else if (text.includes('연금저축')) {
                        response = {
                            id: crypto.randomUUID(),
                            sender: 'bot',
                            text: '연금저축 상품을 추천해드리겠습니다.',
                            products: getPensionProducts(),
                            keywords: ['상품 보러가기', '도움이 됐어요', '마음에 안들어요'],
                        };
                        setConversationState('START');
                    } else if (text.includes('펀드')) {
                        response = {
                            id: crypto.randomUUID(),
                            sender: 'bot',
                            text: '펀드 투자를 고려중이시군요! 고객님의 투자 성향을 선택해주세요.',
                            keywords: ['공격투자형', '적극투자형', '안정추구형'],
                        };
                        setConversationState('AWAITING_INVESTMENT_TYPE');
                    } else if (text.includes('포트폴리오')) {
                        goTo('portfolio');
                        response.text = '포트폴리오 페이지로 이동합니다.';
                        response.keywords = [];
                    }
                    break;

                case 'AWAITING_PERIOD':
                    response = {
                        id: crypto.randomUUID(),
                        sender: 'bot',
                        text: '좋습니다! 노후에 어떤 활동이나 취미를 하고 싶으세요?',
                        keywords: ['자산모으기', '여가/여행', '성취/학습', '건강관리'],
                    };
                    setConversationState('AWAITING_HOBBY');
                    break;

                case 'AWAITING_HOBBY':
                    response = {
                        id: crypto.randomUUID(),
                        sender: 'bot',
                        text: `${userText}을(를) 즐기시는 고객님께 추천드리는 상품입니다.`,
                        products: getInsuranceProduct(),
                        keywords: ['도움이 됐어요', '마음에 안들어요'],
                    };
                    setConversationState('START');
                    break;

                case 'AWAITING_INVESTMENT_TYPE':
                    response = {
                        id: crypto.randomUUID(),
                        sender: 'bot',
                        text: `${userText} 성향에 맞는 펀드 상품을 추천해드립니다.`,
                        products: getFundProducts(),
                        keywords: ['상품 보러가기', '도움이 됐어요', '마음에 안들어요'],
                    };
                    setConversationState('START');
                    break;
            }

            return response;
        },
        [conversationState, goTo]
    );

    // --- 2. 메시지 전송 함수 ---
    const sendMessage = useCallback(
        (text: string) => {
            if (!text.trim()) return;

            const userMessage: Message = {
                id: crypto.randomUUID(),
                sender: 'user',
                text: text,
            };
            setMessages((prev) => [...prev, userMessage]);
            setInput('');

            setTimeout(() => {
                const botMessage = getBotResponse(text);
                setMessages((prev) => [...prev, botMessage]);
            }, 1000);
        },
        [getBotResponse]
    );

    // --- 3. 음성 인식 설정 (이전과 동일, 타입 적용) ---
    useEffect(() => {
        if (!SpeechRecognition) return;

        const recognition = new SpeechRecognition(); // 5. 생성자로 인스턴스화
        recognition.lang = 'ko-KR';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);

        // 6. event 타입에 any 대신 정의한 ISpeechRecognitionEvent 적용
        recognition.onresult = (event: ISpeechRecognitionEvent) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
            sendMessage(transcript);
        };
        recognitionRef.current = recognition;
    }, [sendMessage]);

    const handleMicClick = () => {
        if (!recognitionRef.current) return;
        if (isListening) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current.start();
        }
    };

    const handleKeywordClick = (keyword: string) => {
        sendMessage(keyword);
    };

    return {
        messages,
        input,
        setInput,
        isListening,
        handleMicClick,
        sendMessage,
        handleKeywordClick,
    };
}
