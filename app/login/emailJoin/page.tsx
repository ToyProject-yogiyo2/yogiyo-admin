"use client";
import React, { useState } from "react";
import { emailJoin } from "@/app/services/loginAPI";
import Footer from "@/components/home/Footer";

import { HomeLogo } from "@/components/common/HomeLogo";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { userStateAtom } from "@/app/recoil/state";

const EmailJoin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const setUserState = useSetRecoilState(userStateAtom);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.id == "email") {
            setEmail(e.target.value);
        } else if (e.target.id == "password") {
            setPassword(e.target.value);
        } else if (e.target.id == "nickname") {
            setNickname(e.target.value);
        }
    };

    const handleEmailJoin = async () => {
        console.log(email, password, nickname);
        const data = await emailJoin(email, password, nickname);
        if (data) {
            setUserState({
                email: email,
                nickname: nickname,
                userId: data.userId,
                isLoggedIn: true,
            });
            await router.push("/");
            console.log(data);
        } else {
            console.log(data);
            console.log("회원가입 실패");
        }
    };

    return (
        <div className="flex flex-col flex-1 max-w-[328px] mx-auto pt-[200px] md:max-w-[480px]">
            <div className="flex flex-col justify-center items-center mb-15 h-6">
                <HomeLogo />
                <h2 className="mt-5 text-base font-normal">회원가입</h2>
            </div>
            <div className="flex flex-col mb-4">
                <div className="inline-flex flex-col">
                    <p className="pl-2.5 pb-2 text-normal text-font-black">이메일 주소</p>
                    <div className="inline-flex flex-row justify-between items-center relative min-w-[120px] h-12 border rounded-[10px]">
                        <input
                            className="flex flex-auto items-center pl-3 outline-0 text-base font-normal"
                            name="email"
                            type="email"
                            id="email"
                            value={email}
                            placeholder="이메일 주소 입력"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mt-3">
                        <p className="pl-2.5 pb-2 text-normal text-font-black">비밀번호</p>
                        <div className="flex flex-row justify-between items-center relative min-w-[120px] h-12 border rounded-[10px]">
                            <input
                                className="flex flex-auto items-center pl-3 outline-0 text-base"
                                name="password"
                                type="password"
                                id="password"
                                value={password}
                                placeholder="영문,숫자,특수문자 포함 8자리 이상"
                                onChange={handleChange}
                            />
                            <div className="flex flex-none items-center px-2 text-xs font-bold">
                                보기
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <p className="pl-2.5 pb-2 text-normal text-font-black">닉네임</p>
                        <div className="flex flex-row justify-between items-center relative min-w-[120px] h-12 border rounded-[10px]">
                            <input
                                className="flex flex-auto items-center pl-3 outline-0 text-base"
                                name="nickname"
                                type="nickname"
                                id="nickname"
                                value={nickname}
                                placeholder="닉네임"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="relative flex items-center justify-center w-full max-w-[480px] h-12 bg-yogiyo-blue border rounded-[10px] outline-none mt-15">
                        <button
                            className="text-base font-bold text-white"
                            type="submit"
                            onClick={handleEmailJoin}
                        >
                            회원가입
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailJoin;
