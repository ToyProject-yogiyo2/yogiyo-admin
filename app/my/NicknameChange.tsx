"use client";

import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { userStateAtom } from "../recoil/state";
import { getAxios } from "../services/loginAPI";

interface NickChangeProps {
    toggleComponent: () => void;
}

const NickChange = ({ toggleComponent }: NickChangeProps) => {
    const [userNickname, setUserNickname] = useRecoilState(userStateAtom);
    const [newNickname, setNewNickname] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewNickname(e.target.value);
    };

    const submitNickname = async () => {
        try {
            const res = await getAxios.patch("/owner/update", {
                nickname: newNickname,
            });
            console.log("저장성공");
            console.log(res);
            if (res.status === 204) {
                setUserNickname((prev) => {
                    if (prev) {
                        return { ...prev, nickname: newNickname };
                    }
                    return prev;
                });
            }
        } catch (error) {
            console.error("닉네임 변경 중 오류가 발생", error);
        }
    };
    return (
        <div className="flex flex-col p-10 m-auto mt-12 gap-4 relative">
            <span className="flex justify-center items-center text-xl font-bold">
                닉네임 변경하기
            </span>
            <span className="flex justify-center items-center text-base text-font-gray">
                닉네임 변경 시 5글자 아래로 유지해주세요!
            </span>
            <button
                onClick={toggleComponent}
                className="border rounded-lg bg-white px-4 py-2 absolute right-10"
            >
                뒤로 가기
            </button>
            <div className="flex flex-col items-center justify-center h-[480px] border rounded-lg gap-4 bg-white">
                {userNickname && <p className="mt-5">현재 닉네임: {userNickname.nickname}</p>}
                <div className="flex px-6 py-4">
                    <input
                        placeholder="변경할 닉네임을 작성해주세요."
                        value={newNickname}
                        type="text"
                        onChange={handleChange}
                        className="border rounded pl-3 py-1.5"
                    ></input>
                    <button
                        onClick={submitNickname}
                        className="border rounded-lg px-2 ml-4 cursor-pointer"
                    >
                        닉네임 변경
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NickChange;
