"use client";

import { navContent } from "@/app/recoil/state";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export const MenuNav = () => {
    const [selectedNav, setSelectedNav] = useState("menuSet");
    const [content, setContent] = useRecoilState(navContent);

    const handleSetContent = (showContent: string) => {
        setSelectedNav(showContent);
        console.log("핸들러 작동");
    };

    useEffect(() => {
        setContent(selectedNav);
        console.log("menuNav useEffect");
    }, [selectedNav]);
    return (
        <div className="flex bg-white border-none divide-y-0">
            <div className="flex text-xl text-font-black gap-6 px-8 py-4 ">
                <button onClick={() => handleSetContent("menuSet")}>메뉴설정</button>
                <button onClick={() => handleSetContent("optionMenu")}>옵션설정</button>
                <button onClick={() => handleSetContent("mainMenu")}>대표메뉴</button>
            </div>
        </div>
    );
};
