"use client";

import { menuItemAtom, shopIdAtom } from "@/app/recoil/state";
import { getAxios } from "@/app/services/loginAPI";
import { ModalProps } from "@/lib/types";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import MainMenuModal from "./MainMenuModal";
import { MenusItem } from "../menu/menu";

const MainMenu = ({ onClose }: ModalProps) => {
    const shopId = useRecoilValue(shopIdAtom);
    const [mainMenus, setMainMenus] = useState([]);
    const [openModal, setOpenModal] = useState({
        MainMenuModal: false,
    });

    const handleModalOpen = (modalName: string) => {
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

    const getSignatureMenu = useCallback(async () => {
        try {
            const res = await getAxios.get(`/owner/signature-menu/shop/${shopId}`);
            if (res.status === 200) {
                console.log(res.data);

                setMainMenus(
                    res.data.signatureMenus.map((sm: any) => ({
                        ...sm,
                        picture: `https://yogiyo-clone.shop${sm.picture}`,
                    }))
                );
            }
        } catch (error) {
            console.error("대표 메뉴 조회 실패", error);
        }
    }, []);

    const deleteMainMenu = useCallback(async (menuId: number) => {
        const response = await getAxios.delete(`/owner/signature-menu/delete/${menuId}`);
        if (response.status === 204) {
            const updateMainMenu = mainMenus.filter((menu: MenusItem) => menu.id !== menuId);
            setMainMenus(updateMainMenu);
            getSignatureMenu();
            console.log(updateMainMenu);
        } else {
            console.log("삭제 요청 실패");
        }
    }, []);

    const memoizedMainMenu = useMemo(() => {
        return mainMenus;
    }, [mainMenus]);

    useEffect(() => {
        getSignatureMenu();
    }, [shopId, menuItemAtom]);
    console.log(mainMenus);

    const ifMainMenuNull = () => {
        // 만약 대표메뉴가 없을 때 렌더하기 위한 요소
        return (
            <div className="flex flex-col items-center my-28">
                <img
                    src="/Icons/대표메뉴없을때.svg"
                    alt="대표메뉴없을때"
                    className="w-[160px] h-[160px]"
                />
                <span className="flex justify-center">설정한 대표메뉴가 없습니다</span>
            </div>
        );
    };

    return (
        <div className="my-8 mx-4">
            <div className="border rounded-lg bg-white w-full h-auto">
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
            <div className="border rounded-lg bg-white w-full h-auto mt-4 px-2 py-2">
                <div>
                    {mainMenus.length === 0 ? (
                        ifMainMenuNull()
                    ) : (
                        <>
                            {memoizedMainMenu.map((item: MenusItem) => (
                                <div className="" key={item.id}>
                                    <div className="flex items-center justify-between border-b">
                                        <div className="flex">
                                            <img
                                                src={item.picture}
                                                className="border rounded-lg mx-1 my-1 w-[48px] h-[48px]"
                                            />
                                            <div className="flex flex-col">
                                                <span className="text-xl font-bold">
                                                    {item.name}
                                                </span>
                                                <span className="text-lg text-custom-gray">
                                                    {item.price}
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <button
                                                className="flex items-center mr-4 px-4 border rounded-xl"
                                                value={item.id}
                                                onClick={() => deleteMainMenu(item.id)}
                                            >
                                                해제
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
            {openModal.MainMenuModal && (
                <MainMenuModal
                    onClose={() => handleModalClose("MainMenuModal")}
                    fetchedMainMenu={getSignatureMenu}
                />
            )}
        </div>
    );
};

export default MainMenu;
