"use client";
import { useRecoilState } from "recoil";
import { userStateAtom } from "../recoil/state";
import { useRouter } from "next/navigation";
import { LogoutBtn, getAxios } from "../services/loginAPI";
import NickChange from "../my/NicknameChange";
import { useState } from "react";

export const OwnerInfo = () => {
    const router = useRouter();
    const [user, setUser] = useRecoilState(userStateAtom);
    const [showComponent, setShowComponent] = useState<boolean>(false);

    const toggleComponent = (): void => {
        setShowComponent(!showComponent);
    };

    const handleLogout = async () => {
        if (user) {
            const res = await LogoutBtn(user.userId);
            sessionStorage.clear();
            setUser(null);
            router.push("/");
        } else {
            console.log("user정보가 없다.");
        }
    };
    const handleDeleteUser = async () => {
        const res = await getAxios.delete("/owner/delete");
        if (res.status >= 200 && res.status < 300) {
            console.log(res);
            console.log(user);
            setUser(null);
            router.push("/");
        }
    };
    return (
        <div>
            {showComponent ? (
                <NickChange toggleComponent={toggleComponent} />
            ) : (
                <div className="flex flex-col mt-12 p-10 m-auto">
                    <p className="text-xl font-bold text-font-black mb-4">내 정보</p>
                    <div className="flex flex-col w-auto gap-4">
                        <div className="border rounded-lg bg-white shadow py-8 px-6 ">
                            <div
                                className="text-xl text-font-black font-bold"
                                onClick={toggleComponent}
                            >
                                회원 정보
                                <div className="text-sm text-custom-gray">
                                    아이디, 이름, 비밀번호, 휴대폰번호, 이메일을 확인/변경 할 수
                                    있습니다.
                                </div>
                            </div>
                        </div>
                        <div className="border rounded-lg bg-white shadow py-8 px-6">
                            <div className="text-xl text-font-black font-bold">
                                사장님 승인 알람
                                <div className="text-sm text-custom-gray">
                                    사장님의 승인이 필요한 요청을 확인하고 처리할 수 있습니다.
                                </div>
                            </div>
                        </div>
                        <div className="border rounded-lg bg-white shadow py-8 px-6">
                            <div className="text-xl text-font-black font-bold">
                                사업자 정보
                                <div className="text-sm text-custom-gray">
                                    사업자 등록증 정보를 확인/변경 할 수 있습니다.
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <span className="text-sm text-custom-gray">
                                가게 직원 정보는 운영정보에서 추가해주세요
                                <a className="ml-1 text-sin-blue underline">직원정보 추가하기</a>
                            </span>
                            <div className="flex text-sm text-custom-gray ml-auto mt-0">
                                <button onClick={handleDeleteUser}>회원탈퇴</button>
                                <p className="mx-[10px]">|</p>
                                <button onClick={handleLogout}>로그아웃</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
