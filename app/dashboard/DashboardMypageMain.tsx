"use client";
import { useRecoilState } from "recoil";
import { userStateAtom } from "@/app/recoil/state";
import { useRouter } from "next/navigation";
import { LogoutBtn, getAxios } from "@/app/services/loginAPI";
import NickChange from "@/app/my/NicknameChange";
import { useState } from "react";

export const DashboardMypageMain = () => {
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
            console.log("user 정보가 없다.");
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
        <div
            className="relative overflow-auto bg-[#F7F7F7]"
            style={{ flex: "1 1 auto", overscrollBehavior: "none" }}
        >
            <div className="relative">
                <div className="flex flex-col z-10 mx-auto p-10 max-w-[936px] lg:p-[40px]">
                    <p
                        className="text-xl font-bold mb-4"
                        style={{ lineHeight: "27px", color: "rgba(0, 0, 0, 0.8)" }}
                    >
                        내 정보
                    </p>
                    {showComponent ? (
                        <NickChange toggleComponent={toggleComponent} />
                    ) : (
                        <div>
                            {/* Member Information Button */}
                            <div
                                className="w-full flex cursor-pointer mb-4 bg-white p-8"
                                style={{
                                    border: "1px solid rgba(0, 0, 0, 0.1)",
                                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 6px",
                                    borderRadius: "16px",
                                }}
                                onClick={toggleComponent}
                            >
                                <div
                                    className="w-12 h-12 rounded-md bg-gray-100 flex justify-center items-center"
                                    style={{
                                        borderRadius: "8px",
                                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                                    }}
                                ></div>
                                <div className="ml-4">
                                    <div className="flex items-center mb-1">
                                        <span
                                            className="text-lg font-bold"
                                            style={{
                                                lineHeight: "24px",
                                                color: "rgba(0, 0, 0, 0.8)",
                                            }}
                                        >
                                            회원 정보
                                        </span>
                                    </div>
                                    <p
                                        className="text-sm font-normal text-gray-600"
                                        style={{
                                            lineHeight: "19px",
                                            wordBreak: "keep-all",
                                            color: "rgba(0, 0, 0, 0.6)",
                                        }}
                                    >
                                        아이디, 이름, 비밀번호, 휴대폰번호, 이메일을 확인/변경 할 수
                                        있습니다
                                    </p>
                                </div>
                            </div>
                            {/* 문구 부분 */}
                            <div className="mt-2">
                                <div className="flex items-center">
                                    <div className="flex mt-0 ml-auto">
                                        <div
                                            onClick={handleDeleteUser}
                                            className="text-sm font-normal cursor-pointer"
                                            style={{
                                                lineHeight: "19px",
                                                color: "rgba(0, 0, 0, 0.8)",
                                            }}
                                        >
                                            회원탈퇴
                                        </div>
                                        <div
                                            className="border-l border-gray-200"
                                            style={{
                                                borderColor: "rgba(0, 0, 0, 0.1)",
                                                height: "16px",
                                                margin: "0 12px",
                                            }}
                                        ></div>
                                        <div
                                            onClick={handleLogout}
                                            className="text-sm font-normal cursor-pointer"
                                            style={{
                                                lineHeight: "19px",
                                                color: "rgba(0, 0, 0, 0.8)",
                                            }}
                                        >
                                            로그아웃
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardMypageMain;
