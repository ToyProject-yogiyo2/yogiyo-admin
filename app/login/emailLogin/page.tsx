"use client";

import { HomeLogo } from "@/components/common/HomeLogo";
import React, { KeyboardEvent, useState } from "react";
import { emailLogin } from "@/app/services/loginAPI";
import { useSetRecoilState } from "recoil";
import { userStateAtom } from "@/app/recoil/state";
import { useRouter } from "next/navigation";
import Popup from "@/components/common/Popup";

const EmailLogin = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const setUserState = useSetRecoilState(userStateAtom);
    const [popupMessage, setPopupMessage] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.id == "email") {
            setEmail(e.target.value);
        } else if (e.target.id == "password") {
            setPassword(e.target.value);
        }
    };

    const handleSubmit = async () => {
        try {
            const res = await emailLogin(email, password);
            setLoading(true);
            setPopupMessage("");

            if (res) {
                setUserState({
                    userId: res.userId,
                    nickname: res.userNickname,
                    email: res.userEmail,
                    isLoggedIn: true,
                });

                router.push("/");
            } else {
                setPopupMessage("서버연결에 문제가 생겼습니다.");
                setIsPopupOpen(true);
            }
        } catch (error) {
            setPopupMessage("아이디 혹은 비밀번호를 확인해주세요.");
            setIsPopupOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13) {
            handleSubmit();
        }
    };

    return (
        <div className="flex-auto">
            <div className="flex flex-col m-auto pt-[60px] px-[20px] max-w-[480px]">
                <div className="flex items-center justify-center mb-11">
                    <HomeLogo />
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-lg font-normal text-font-black">이메일</p>
                    <input
                        placeholder="이메일을 입력하시요."
                        id="email"
                        type="email"
                        value={email}
                        onChange={handleChange}
                        className="border rounded-xl mt-2 p-4 w-full h-[60px] text-custom-gray text-xl"
                    ></input>
                    <p className="text-lg font-normal text-font-black">비밀번호</p>
                    <input
                        placeholder="비밀번호를 입력하시요."
                        id="password"
                        type="password"
                        onKeyDown={onKeyDown}
                        value={password}
                        onChange={handleChange}
                        className="border rounded-xl mt-2 p-4 w-full h-[60px] text-xl"
                    ></input>
                </div>
                <div>
                    <button
                        className="w-full h-[60px] mt-10 border-none rounded-xl text-xl font-bold text-white bg-yogiyo-blue"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        로그인
                    </button>
                </div>
                {isPopupOpen && <Popup message={popupMessage} onClose={closePopup} />}
            </div>
        </div>
    );
};

export default EmailLogin;
