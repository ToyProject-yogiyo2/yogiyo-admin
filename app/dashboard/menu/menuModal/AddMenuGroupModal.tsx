import { menuListState, shopIdAtom } from "@/app/recoil/state";
import { getAxios } from "@/app/services/loginAPI";
import { Button } from "@/components/common/Button";
import { ModalLayout } from "@/components/common/ModalLayout";
import { ModalProps } from "@/lib/types";

import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

interface fetchGroupListProps extends ModalProps {
    fetchGroupList: () => void;
}

export default function AddMenuGroupModal({ onClose, fetchGroupList }: fetchGroupListProps) {
    const [menuList, setMenuList] = useRecoilState(menuListState);
    const [menuName, setMenuName] = useState("");
    const [content, setContent] = useState("");
    const shopId = useRecoilValue(shopIdAtom);
    // console.log(shopId);
    // console.log(menuData);
    const handleMenuGroup = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.id === "menuName") {
            setMenuName(e.target.value);
        } else {
            setContent(e.target.value);
        }
    };

    const handleAddMenu = async () => {
        if (!menuName.trim() || !content.trim()) {
            console.log("아무것도 없음 입력하셈");
            return;
        }
        try {
            const req = await getAxios.post("/owner/menu-group/add", {
                shopId: shopId,
                name: menuName,
                content: content,
            });
            const newMenuId = req.data.id;
            const newMenuData = {
                id: newMenuId,
                name: menuName,
                content: content,
            };
            console.log(req.data);
            console.log(newMenuData);
            setMenuList((prevMenuList) => [...prevMenuList, newMenuData]);
            fetchGroupList();
            onClose();
        } catch (error) {
            console.error("메뉴 추가 안되고 있음", error);
        }
    };
    return (
        <ModalLayout>
            <div className="flex flex-col h-full">
                <div className="flex-grow overflow-auto scrollbar-hide">
                    <div className="border py-6 px-3 bg- rounded-t-2xl">
                        <div className="flex justify-center text-xl font-bold w-full relative">
                            <span>메뉴 그룹 추가</span>
                            <button className="absolute right-4 pr-6" onClick={onClose}>
                                X
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center mx-8 py-4 ">
                        <div className="flex flex-col text-lg gap-4">
                            <p>메뉴 그룹명</p>
                            <input
                                placeholder="메뉴그룹 입력란"
                                className="border rounded-lg w-[300px] h-[32px] pl-4"
                                value={menuName}
                                type="text"
                                onChange={handleMenuGroup}
                                id="menuName"
                            ></input>
                            <p>0/70</p> {/* 입력 가능한 글자 수 */}
                        </div>
                    </div>
                    <div className="flex items-center mx-8 py-4 ">
                        <div className="flex flex-col w-full gap-4">
                            <span>메뉴그룹 설명(선택)</span>
                            <input
                                placeholder="그룹에 대한 설명을 입력해주세요"
                                className="border rounded-lg w-full h-[32px] px-4"
                                value={content}
                                onChange={handleMenuGroup}
                            ></input>
                            <p>0/250</p> {/* 입력 가능한 글자 수 */}
                        </div>
                    </div>
                    <div className="flex items-center mx-8 py-4">
                        <div className="flex flex-col gap-4">
                            <span>상태설정</span>
                            <div className="flex border rounded-lg p-1 divide-x">
                                <button className="px-2">판매중</button>
                                <button className="px-2">숨김</button>
                            </div>
                        </div>
                    </div>
                </div>

                <Button
                    text={"저장"}
                    color="submit"
                    size="wideButton"
                    onClick={handleAddMenu}
                    disabled={!menuName.trim() || !content.trim()}
                    className="sticky bottom-0"
                />
            </div>
        </ModalLayout>
    );
}
