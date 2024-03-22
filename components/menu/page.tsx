
import { MenuNav } from "@/components/menu/menuNavbar";
import MenuGroup from "../menuSidebar/menuGroup";
import MenuSet from "@/components/menu/menuSet";
import MenuSoldout from "@/components/menu/menuSoldout";
import DashboardMain from "@/components/common/DashboardMain";
import { useRecoilValue } from "recoil";
import { menuState } from "@/app/recoil/state";
import React, { ReactNode, useEffect } from "react";

interface DashboardMainProps {
    children: ReactNode;
}

export default function MenuPage() {
    console.log("menupage");
    const selectMenu = useRecoilValue(menuState);
    console.log(selectMenu);

    useEffect(() => {
        console.log(selectMenu);
    }, [selectMenu]);
    return (
        <div>
            <DashboardMain>
                <MenuNav />
                <MenuGroup>
                    {selectMenu === "menuSet" && <MenuSet key="menuSet" />}
                    {selectMenu === "menuSoldout" && <MenuSoldout />}
                </MenuGroup>
            </DashboardMain>
        </div>
    );
}
