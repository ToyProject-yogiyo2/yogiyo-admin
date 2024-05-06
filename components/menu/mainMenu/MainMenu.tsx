"use client";

import { menuItemAtom, shopIdAtom } from "@/app/recoil/state";
import { getAxios } from "@/app/services/loginAPI";
import MainMenuModal from "@/app/test/page";
import { MenuItem, ModalProps } from "@/lib/types";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const MainMenu = ({ onClose }: ModalProps) => {
    const shopId = useRecoilValue(shopIdAtom);
    const menuGroups = useRecoilValue(menuItemAtom);
    console.log(shopId);
    console.log(menuGroups);
    const groupId = menuGroups.map((item) => item.id);
    console.log(groupId);
    const setMainMenu = async () => {
        try {
            const res = await getAxios.put("/owner/signature-menu/set", {
                shopId: shopId,
                menuIds: groupId,
            });
            if (res.status === 204) {
                console.log(res);
                console.log(res.data);
            } else {
                console.error("대표메뉴조회실패");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const [openModal, setOpenModal] = useState({
        MainMenuModal: false,
    });

    const handleModalOpen = (modalName: string, id?: number) => {
        setOpenModal((prevModal) => ({
            ...prevModal,
            [modalName]: true,
        }));
    };
    const handleModalClose = (modalName: string) => {
        setOpenModal((prevModal) => ({
            ...prevModal,
            [modalName]: false,
        }));
    };

    return (
        <div>
            <div className="border rounded-lg w-full h-auto">
                <div className="flex justify-between py-4 px-4">
                    <span className="font-bold text-lg">대표메뉴</span>
                    <div className="flex text-sm text-custom-gray">
                        <button className="px-2 py-2">순서 변경</button>
                        <button
                            className="border rounded-lg bg-yogiyo-blue px-2 py-2 text-white"
                            onClick={() => handleModalOpen("MainMenuModal")}
                        >
                            대표 메뉴 설정
                        </button>
                    </div>
                </div>
            </div>
            <div>{/* 대표 메뉴 영역 */}</div>
            {openModal.MainMenuModal && (
                <MainMenuModal onClose={() => handleModalOpen("MainMenuModal")} />
            )}
        </div>
    );
};

export default MainMenu;