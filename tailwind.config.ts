import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0099FF",

        secondary: "#202632",
        accent: "#333F56",

        black: "#000000",
        white: "#FFFFFF",

        "gray-2": "#959595",
        "gray-1": "#E8E8E8",
        "gray-0": "#F2F2F7",

        // 기본 텍스트, 배경 등
        neutral: {
          "900": "#212529",
          "800": "#343A40",
          "700": "#495057",
          "600": "#868E96",
          "500": "#ADB5BD",
          "400": "#CED4DA",
          "300": "#DEE2E6",
          "200": "#E9ECEF",
          "100": "#F1F3F5",
          "50": "#F8F9FA",
        },
      },
      // 2. 폰트 설정
      fontFamily: {
        // 본문용 Pretendard
        sans: ["var(--font-pretendard)", "sans-serif"],
        // 제목용 우리다움체
        heading: ["Wooridaum", "sans-serif"],
      },
      // 3. 모바일 화면 크기 제어
      screens: {
        // => @media (min-width: 640px) { ... }
        sm: "640px",
        // => @media (min-width: 768px) { ... }
        md: "768px",
        // => @media (min-width: 1024px) { ... }
        lg: "1024px",
        // => @media (min-width: 1280px) { ... }
        xl: "1280px",
        // => @media (min-width: 1536px) { ... }
        "2xl": "1536px",
      },
      aspectRatio: {
        "874/402": "874 / 402",
      },
    },
  },
  plugins: [],
};
export default config;
