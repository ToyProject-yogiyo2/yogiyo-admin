"use client";
import React, { ReactNode, useState } from "react";
import { useRecoilState } from "recoil";
import { content } from "@/app/recoil/state";

type MenuGroupProps = {
    children?: ReactNode;
};

const MenuGroup = ({ children }: MenuGroupProps) => {
    const [showOption, setShowOption] = useState<boolean>(false);
    const [selectMenu, setSelectMenu] = useRecoilState(content);

    const OpenCloseBtn = (): void => {
        setShowOption(!showOption);
    };

    const handleMenuClick = (menuState: "menuSet") => {
        setSelectMenu(menuState);
    };
    console.log(selectMenu);

    return (
        <div className="ml-5 font-bold text-swiper-num cursor-pointer" onClick={OpenCloseBtn}>
            <a className="pl-3  flex flex-row justify-between items-center h-10 decoration-none">
                <span className="text-sm">메뉴관리</span>
                <button>
                    <svg width="20" height="20" viewBox="0 0 24 24" className="mr-2">
                        <path
                            fill="rgba(0,0,0,0.4)"
                            d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6-6-6z"
                        />
                    </svg>
                </button>
            </a>
            {showOption ? (
                <ul className="flex">
                    <li
                        className="flex text-sm pt-2 pl-6"
                        onClick={() => handleMenuClick("menuSet")}
                    >
                        메뉴 관리
                    </li>
                </ul>
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default MenuGroup;
