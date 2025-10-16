import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // 우리은행 공식 색상
                primary: {
                    DEFAULT: '#0067AC', // Main Color
                    dark: '#00538A',
                    light: '#E6F0F7',
                },
                secondary: '#27374D',
                accent: '#526D82',
                // 기본 텍스트, 배경 등
                neutral: {
                    '900': '#212529',
                    '800': '#343A40',
                    '700': '#495057',
                    '600': '#868E96',
                    '500': '#ADB5BD',
                    '400': '#CED4DA',
                    '300': '#DEE2E6',
                    '200': '#E9ECEF',
                    '100': '#F1F3F5',
                    '50': '#F8F9FA',
                },
            },
            // 2. 폰트 설정
            fontFamily: {
                // 본문용 Pretendard
                sans: ['var(--font-pretendard)', 'sans-serif'],
                // 제목용 우리다움체
                heading: ['Wooridaum', 'sans-serif'],
            },
            // 3. 모바일 화면 크기 제어
            screens: {
                mobile: '360px', // 최소 지원 모바일 너비 (일반적인 값)
            },
        },
    },
    plugins: [],
};
export default config;
