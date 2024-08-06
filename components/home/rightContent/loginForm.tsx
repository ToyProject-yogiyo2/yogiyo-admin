import { userStateAtom } from "@/app/recoil/state";
import { LogoutBtn } from "@/app/services/loginAPI";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export const LoginForm = () => {
    const router = useRouter();
    const [user, setUser] = useRecoilState(userStateAtom);
    useEffect(() => {
        const savedUser = sessionStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);
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

    return (
        <div className="flex pt-6 px-4 pb-5 border border-solid border-[box-gray] rounded-lg">
            <div className="flex flex-col grow ">
                {user && user.isLoggedIn ? (
                    <div className="flex flex-col">
                        <div className="flex justify-between pb-6">
                            <div className="flex flex-col gap-1">
                                <p className="flex items-center text-lg font-bold text-font-black">
                                    {user.nickname}님
                                    <span className="flex-auto px-2 py-1 ml-2 font-semibold text-sm text-sin-blue bg-[#f0f8ff] border-none rounded">
                                        사장님
                                    </span>
                                </p>
                                <div className="text-sm text-custom-gray">{user.userId}</div>
                            </div>
                            <div className="flex flex-row gap-1">
                                <div
                                    className="flex items-center w-auto px-2 h-[28px] border rounded-md text-xs text-font-gray"
                                    onClick={() => router.push("/dashboard")}
                                >
                                    <button>내정보</button>
                                </div>
                                <div className="flex items-center w-auto px-2 h-[28px] border rounded-md text-xs text-font-gray">
                                    <button onClick={handleLogout}>로그아웃</button>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="flex flex-col grow-1 gap-6 pt-6">
                            <div className="grid grid-cols-3">
                                <div className="flex flex-col gap-[3px]">
                                    <span className="text-sm font-bold text-font-black">1번</span>
                                    <span className="text-xs text-custom-gray">보유가게 수</span>
                                </div>
                                <div className="flex flex-col gap-[3px]">
                                    <span className="text-sm font-bold text-font-black">2번</span>
                                    <span className="text-xs text-custom-gray">
                                        이번 주 주문 수
                                    </span>
                                </div>
                                <div className="flex flex-col gap-[3px]">
                                    <span className="text-sm font-bold text-font-black">3번</span>
                                    <span className="text-xs text-custom-gray">승인알람</span>
                                </div>
                            </div>
                            <div
                                className="flex items-center justify-center w-auto max-w-[480px] h-10 border border-sin-blue rounded-lg cursor-pointer"
                                onClick={() => router.push("/dashboard")}
                            >
                                <span className="text-sm text-sin-blue">셀프서비스 바로가기</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="text-sm font-normal pb-6">
                            <a>요기요 사장님 반갑습니다.</a>
                            <br />
                            <a>로그인해주세요 :)</a>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Link
                                href="/login"
                                className="bg-[#0c7fe4] flex items-center justify-center w-full max-w-[480px] h-12 rounded-[10px] px-[18px]"
                            >
                                <span className="text-base text-white font-bold mx-0.5">
                                    사장님 로그인
                                </span>
                            </Link>
                            <div className="flex justify-between text-xs font-bold text-[#d9d9d9]">
                                <div className="flex gap-2">
                                    <Link href="/">
                                        <span>아이디 </span>
                                    </Link>
                                    /
                                    <Link href="/">
                                        <span> 비밀번호 찾기</span>
                                    </Link>
                                </div>
                                <Link href="/login/emailJoin">회원가입</Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
