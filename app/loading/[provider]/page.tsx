"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { useSetRecoilState } from "recoil";
import { userStateAtom } from "../../recoil/state";
import { getAxios } from "../../services/loginAPI";
import { DynamicRoute } from "@/lib/types";

export default function Loading({ params }: DynamicRoute) {
    const setUserState = useSetRecoilState(userStateAtom);
    const router = useRouter();
    const providerType = params.provider;

    console.log(providerType);
    useEffect(() => {
        const getSocialToken = async (providerType: string) => {
            const CODE = new URL(window.location.href).searchParams.get("code");
            const res = await getAxios.post(`/owner/login`, {
                email: null,
                password: null,
                authCode: CODE,
                providerType: providerType.toUpperCase(),
            });
            if (res.status >= 200 && res.status < 300) {
                const resMyPage = await getAxios.get(`/owner/mypage`);
                const { userId, email: userEmail } = res.data;
                const { nickname: userNickname } = resMyPage.data;
                const userData = {
                    userId,
                    email: userEmail,
                    nickname: userNickname,
                    isLoggedIn: true,
                };
                console.log(setUserState);
                setUserState(userData);
                router.push("/");
                console.log(resMyPage);
                return { userId, userEmail, userNickname };
            } else {
                console.log("api호출 오류");
            }
        };
        if (["kakao", "naver"].includes(providerType)) {
            getSocialToken(providerType);
        }
    }, [providerType, router, setUserState]);

    return (
        <>
            <h2>로딩 페이지</h2>
        </>
    );
}
