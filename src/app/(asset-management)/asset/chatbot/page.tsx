'use client';

import React, { useRef, useEffect } from 'react';
// import Image from 'next/image';
import { Page, PageContent, PageActions } from '@/components/common/Page';
import { useAssetRouter } from '@/hooks/asset/useAssetRouter';
import { useChatbot } from '@/hooks/asset/useChatbot';
import ChatMessage from '@/components/asset/chatbot/ChatMessage';
import { ArrowLeft, Mic } from 'lucide-react';
import clsx from 'clsx';

/**
 * AI 자산 관리 챗봇 페이지
 */
export default function ChatbotPage() {
    const { goTo } = useAssetRouter();
    const { messages, input, setInput, isListening, handleMicClick, sendMessage, handleKeywordClick } = useChatbot();

    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
    };

    return (
        <Page>
            {/* 1. 헤더 (이전과 동일) */}
            <div className="relative flex items-center justify-center h-14 px-4 border-b border-gray-100 flex-shrink-0">
                <button
                    onClick={() => goTo('portfolio')}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center z-10"
                    aria-label="뒤로가기"
                >
                    <ArrowLeft className="w-6 h-6 text-black" />
                </button>
                <h1 className="relative text-center text-lg font-semibold text-secondary">AI 자산 관리 상담</h1>
            </div>

            {/* 2. PageContent (채팅 내역) (이전과 동일) */}
            <PageContent ref={chatContainerRef} className="overflow-y-auto px-4 pt-4">
                <div className="flex flex-col gap-2">
                    {messages.map((msg) => (
                        <ChatMessage key={msg.id} message={msg} onKeywordClick={handleKeywordClick} />
                    ))}
                </div>
            </PageContent>

            {/* [수정] 3. PageActions (입력창) */}
            <PageActions>
                {/* [수정]
                  - p-2 -> p-4: 입력창 상/하/좌/우 여백을 늘려 하단에 공간을 줍니다.
                  - border-t 제거: 디자인 시안과 일치시킵니다.
                */}
                <form onSubmit={handleSubmit} className="flex w-full items-center gap-2 p-4">
                    {/* 입력창 'pill' 컨테이너 (이전과 동일) */}
                    <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-full shadow-sm pr-1.5 h-[56px]">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={isListening ? '듣고 있어요...' : '메시지를 입력해주세요.'}
                            className="flex-1 px-5 py-3 text-base bg-transparent rounded-full outline-none placeholder:text-neutral-400"
                            disabled={isListening}
                        />

                        {/* 마이크 버튼 (이전과 동일) */}
                        <button
                            type="button"
                            onClick={handleMicClick}
                            className={clsx(
                                'w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-full transition-all',
                                !isListening && 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200',
                                isListening && 'bg-red-500 text-white animate-pulse ring-4 ring-red-500/30'
                            )}
                            aria-label="음성으로 입력하기"
                        >
                            <Mic className="w-5 h-5" />
                        </button>
                    </div>
                </form>
            </PageActions>
        </Page>
    );
}
