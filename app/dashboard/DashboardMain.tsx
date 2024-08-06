"use client";
import { content } from "@/app/recoil/state";
import DashboardMypageMain from "./DashboardMypageMain";
import React, { ReactNode } from "react";
import { useRecoilValue } from "recoil";
import MenuSet from "./menu/MenuSet";

interface DashboardMainProps {
    children: ReactNode;
}

interface MenuComponentType {
    menuSet: JSX.Element;
    [key: string]: JSX.Element;
}

export default function DashboardMain({ children }: DashboardMainProps) {
    const selectMenu = useRecoilValue(content);

    const menuComponent: MenuComponentType = {
        menuSet: <MenuSet onClose={() => console.log("메뉴 닫힘")} />,
    };

    const showContent = menuComponent[selectMenu] || <DashboardMypageMain />;
    return <div className="flex-1 bg-[#F7F7F7]">{showContent}</div>;
}
