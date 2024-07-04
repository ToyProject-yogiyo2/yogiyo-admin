import { menuItemAtom } from "@/app/recoil/state";
import { Button } from "@/components/common/Button";
import { Header } from "@/components/common/Header";
import { ModalProps } from "@/lib/types";
import { useState } from "react";
import { useRecoilValue } from "recoil";

export const OptionMenuLinkModal = ({ onClose }: ModalProps) => {
    const menuGroups = useRecoilValue(menuItemAtom);
    const [selectMenu, setSelectMenu] = useState([]);

    console.log(menuGroups);
    return (
        <div className="flex flex-col items-center justify-center bg-black bg-opacity-50 fixed inset-0">
            <div className="flex flex-col bg-white divide-y px-4 border rounded-2xl  w-[32rem] h-fit m-20 overflow-y-auto">
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
                        <div className="py-4" key={menuGroups.id}>
                            <div className="">
                                <input type="checkbox" />
                                <span className="px-2 font-medium">{menuGroups.name}</span>
                                <div className="px-4">
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
                <Button text={"저장"} color="submit" size="wideButton"></Button>
            </div>
        </div>
    );
};
