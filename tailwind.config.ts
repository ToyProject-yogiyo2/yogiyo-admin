import type { Config } from "tailwindcss";

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            screens: {
                "max-lg": { max: "1024px" },
            },
            fontFamily: {
                sans: ["var(--noto_sans_kr)"],
                roboto: ["var(--roboto)"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                "yogiyo-blue": "#007aff", // yogiyo Login Button Color
                "yogiyo-gray": "rgba(0, 0, 0, 0.05)",
                "custom-gray": "rgba(0, 0, 0, 0.6)",
                "box-gray": "rgba(0,0,0,0.1)",
                "font-black": "rgba(0,0,0,0.8)",
                "swiper-num": "rgba(0, 0, 0, 0.4)",
                "sin-blue": "#0c7fe4",
                kakao: "#ffe800",
                naver: "#03C75A",
            },
            margin: {
                "15": "60px",
            },
        },
    },
    plugins: [require("tailwind-scrollbar-hide")],
};
