import { menuItemAtom } from "@/app/recoil/state";
import { getAxios } from "@/app/services/loginAPI";
import { Button } from "@/components/common/Button";
import { Checkbox } from "@/components/common/Checkbox";
import { Header } from "@/components/common/Header";
import { ModalLayout } from "@/components/common/ModalLayout";
import { ModalProps } from "@/lib/types";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";

interface IlinkMenu extends ModalProps {
    optionId?: number | null | undefined;
}

export const OptionMenuLinkModal = ({ onClose, optionId }: IlinkMenu) => {
    const menuGroups = useRecoilValue(menuItemAtom);
    const [checkMenu, setCheckMenu] = useState<Array<number>>([]);

    const checkItemHandler = (id: number, isChecked: boolean) => {
        if (isChecked) {
            setCheckMenu((prev) => [...prev, id]);
        } else if (!isChecked) {
            setCheckMenu(checkMenu.filter((el) => el !== id));
        }
    };
    console.log(checkMenu);
    console.log(optionId);

    const linkMenuButton = async () => {
        try {
            const res = await getAxios.put(`/owner/menu-option-group/${optionId}/link-menu`, {
                menuIds: checkMenu,
            });
            if (res.status === 204) console.log(res.data, "link요청 성공");
        } catch (error) {
            console.error("link fail", error);
        }
    };
    return (
        <ModalLayout>
            <div className="flex flex-col w-full">
                <div className="relative">
                    <Header onClick={onClose}>
                        <button className="absolute left-4" onClick={onClose}>
                            X
                        </button>
                        연결 메뉴 설정
                    </Header>
                </div>
                <div className="py-4 px-2 divide-y">
                    {menuGroups.map((menuGroups) => (
                        <div className="px-2 py-4" key={menuGroups.id}>
                            <div>
                                <Checkbox
                                    key={menuGroups.id}
                                    id={menuGroups.id}
                                    checkItemHandler={checkItemHandler}
                                    checked={checkMenu.includes(menuGroups.id) ? true : false}
                                />
                                <span className="px-2 font-medium">{menuGroups.name}</span>
                                <div className="px-6">
                                    {menuGroups.menus?.map((menus) => (
                                        <div className="flex flex-col text-sm text-custom-gray">
                                            <span>{menus.content}</span>
                                            <span>{menus.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Button
                    text={"저장"}
                    color="submit"
                    size="wideButton"
                    className="sticky bottom-0"
                    onClick={() => linkMenuButton()}
                ></Button>
            </div>
        </ModalLayout>
    );
};
