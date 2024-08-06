"use client";
import { HomeLogo } from "@/components/common/HomeLogo";
import Footer from "@/components/home/Footer";
import { useRouter } from "next/navigation";
import { SocialKakao, SocialNaver } from "../services/loginAPI";
import React from "react";

export default function LoginForm() {
    const router = useRouter();
    const handleEmailJoin = () => {
        router.push("/login/emailJoin");
    };
    const handleEmailLogin = () => {
        router.push("/login/emailLogin");
    };
    const handleSocialLogin = (e: React.MouseEvent<HTMLDivElement>) => {
        const provider = e.currentTarget.id;
        localStorage.setItem("provider", provider);
        if (provider === "kakao") {
            SocialKakao();
            console.log("카카오 로그인 실행");
        } else if (provider === "naver") {
            SocialNaver();
            console.log("네이버 로그인 실행");
        }
    };

    return (
        <div className="flex flex-col min-h-[100vh]">
            <div className="flex-auto">
                <div className="flex flex-col m-auto pt-[60px] px-[20px] max-w-[480px]">
                    <div className="flex items-center justify-center mb-11">
                        <HomeLogo />
                    </div>
                    <p className="mb-8 text-center text-[#333333] text-base font-normal">
                        아래 인증 수단에서 하나를 선택해 본인인증을 진행해주세요.
                    </p>
                    <div
                        className="flex justify-center items-center w-full mt-2.5 p-6 border-none rounded-xl bg-kakao cursor-pointer"
                        onClick={handleSocialLogin}
                        id="kakao"
                    >
                        <img src="/Icons/카카오로고.png" className="mr-2.5 w-[32px] h-[32px]" />
                        <span className="text-xl font-semibold">카카오로 연동하기</span>
                    </div>
                    <div
                        className="flex justify-center items-center w-full mt-2.5 p-6 border-none rounded-xl bg-naver text-white cursor-pointer"
                        onClick={handleSocialLogin}
                        id="naver"
                    >
                        <img src="/Icons/네이버로고.png" className="mr-2.5 w-[30px] h-[30px]" />
                        <span className="text-xl font-semibold">네이버로 연동하기</span>
                    </div>
                    <button
                        className="flex justify-center items-center w-full mt-2.5 p-6 border-none rounded-xl bg-[#F5F5F5] cursor-pointer"
                        onClick={handleEmailLogin}
                    >
                        <span className="text-xl font-semibold">이메일 로그인</span>
                        {/* 이메일로 로그인하는 곳 아래 화면에 이메일로 회원가입 만들기 */}
                    </button>
                    <hr className="mt-8" />
                    <button
                        className="flex justify-center items-center border border-[#d9d9d9] rounded-lg mt-5 p-6"
                        onClick={handleEmailJoin}
                    >
                        <p className="text-xl font-semibold">이메일로 회원가입 하기</p>
                        {/* 이메일 회원가입이 될 영역 */}
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}
