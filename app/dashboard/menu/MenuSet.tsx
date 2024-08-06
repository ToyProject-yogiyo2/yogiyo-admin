import { useCallback, useEffect, useMemo, useState } from "react";
import { MenuNav } from "./MenuNavbar";
import { useRecoilState, useRecoilValue } from "recoil";
import { menuItemAtom, navContent, shopIdAtom } from "@/app/recoil/state";
import { GroupList } from "@/app/services/menuAPI";
import { getAxios } from "@/app/services/loginAPI";
import { AddMenuItemModal } from "./menuModal/AddMenuItemModal";
import { ModalProps, ViewOption } from "@/lib/types";
import { MenuItemList } from "./MenuItemList";
import OptionMenu from "../option/OptionMenu";
import AddMenuGroup from "./menuModal/AddMenuGroupModal";
import { ReorderModal } from "./menuModal/ReorderModal";
import { ItemLayout } from "../../../components/common/ItemLayout";
import { ItemHeader } from "../../../components/common/ItemHeader";
import MainMenu from "../mainMenu/MainMenu";
import { ReorderItemModal } from "./menuModal/ReorderItemModal";

interface Group {
    id: number;
    content: string;
    name: string;
}

const MenuSet = ({ onClose }: ModalProps) => {
    const [openModal, setOpenModal] = useState({
        addMenuGroup: false,
        addMenuItem: false,
        reorderModal: false,
        reorderItemModal: false,
    });
    const [viewOption, setViewOption] = useState<ViewOption>({});
    const [menuGroup, setMenuGroup] = useRecoilState(menuItemAtom);
    const [selectGroupId, setSelectGroupId] = useState<number | null>(null);
    const selectedNav = useRecoilValue(navContent);
    const shopId = useRecoilValue(shopIdAtom);

    const handleModalOpen = (modalName: string, id?: number) => {
        setOpenModal((prevModal) => ({
            ...prevModal,
            [modalName]: true,
        }));
        if (id !== undefined) {
            setSelectGroupId(id);
            console.log(id);
        }
    };

    const handleModalClose = (modalName: string) => {
        setOpenModal((prevModal) => ({
            ...prevModal,
            [modalName]: false,
        }));
    };

    const toggleViewOption = (id: number) => {
        setViewOption((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
        console.log(id);
    };

    // 메뉴 그룹 제거 api요청부분
    const deleteMenuGroup = async (menuGroupId: number) => {
        if (menuGroupId != null) {
            try {
                const req = await getAxios.delete(`/owner/menu-group/${menuGroupId}`);
                if (req.status === 204) {
                    console.log("삭제 성공", req);
                    fetchGroupList();
                }
            } catch (error) {
                console.log("삭제 실패", error);
            }
        }
    };

    // 메뉴 그룹 전체 조회 부분
    const fetchGroupList = useCallback(async () => {
        try {
            const res = await GroupList(shopId);
            setMenuGroup(
                res.menuGroups.map((data: any) => ({
                    ...data,
                    picture: `https://yogiyo-clone.shop${data.picture}`,
                }))
            );

            console.log(res);
        } catch (error) {
            console.error("리스트 업데이트 실패", error);
        }
    }, []);

    const memoizedGroupList = useMemo(() => {
        return menuGroup;
    }, [menuGroup]);

    useEffect(() => {
        fetchGroupList();
        console.log("menuSet useEffect");
    }, [fetchGroupList]);

    return (
        <div>
            <MenuNav />
            {selectedNav === "menuSet" && (
                <>
                    <ItemLayout>
                        <ItemHeader>
                            <input
                                placeholder="메뉴를 검색하세요"
                                className="border rounded-xl mx-4 px-4 py-2"
                            />
                            {/* 메뉴 검색 영역 */}
                            <div className="text-custom-gray text-sm">
                                <button onClick={() => handleModalOpen("reorderModal")}>
                                    메뉴그룹
                                </button>
                                {/* 메뉴 그룹 드레그 영역 */}
                                <button
                                    className="border rounded-xl px-4 py-2.5 bg-yogiyo-blue text-white font-bold mx-2"
                                    onClick={() => handleModalOpen("addMenuGroup")}
                                >
                                    메뉴 그룹 추가
                                </button>
                                {/* 메뉴 그룹 추가 버튼 */}
                            </div>
                        </ItemHeader>
                        {memoizedGroupList.map((menuItem) => (
                            <div
                                className="flex flex-col border rounded-2xl bg-white p-4 mt-2 "
                                key={menuItem.id}
                            >
                                <div
                                    className="flex justify-between items-center "
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setSelectGroupId(menuItem.id);
                                    }}
                                >
                                    <div className="flex flex-col gap-2 py-4">
                                        <span className="text-base font-bold text-font-black">
                                            {menuItem.name}
                                        </span>
                                        <span className="text-xs text-custom-gray">
                                            {menuItem.content}
                                        </span>
                                    </div>
                                    <div className="relative">
                                        <div className="flex border rounded-xl py-1 px-2 gap-2 ">
                                            <>
                                                <select>
                                                    <option>판매중</option>
                                                    <option>하루 품절</option>
                                                    <option>숨김</option>
                                                </select>
                                            </>
                                            <button onClick={() => toggleViewOption(menuItem.id)}>
                                                <img src="/Icons/더보기버튼.svg" />
                                                {viewOption[menuItem.id] && (
                                                    <ul className="flex flex-col divide-y absolute right-0 top-5 w-[200px] border rounded-lg bg-white mt-4 px-2 py-1 z-10">
                                                        <li className="flex justify-start py-2">
                                                            메뉴 수정
                                                        </li>
                                                        <li
                                                            className="flex justify-start py-2"
                                                            onClick={() =>
                                                                deleteMenuGroup(menuItem.id)
                                                            }
                                                        >
                                                            메뉴 삭제
                                                        </li>
                                                    </ul>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    {/* 판매, 품절 등 드롭다운 메뉴 */}
                                </div>
                                <div className="flex border-t py-4 text-sm gap-2.5 cursor-pointer">
                                    <p
                                        className="text-yogiyo-blue"
                                        onClick={() => handleModalOpen("addMenuItem", menuItem.id)}
                                    >
                                        메뉴 추가
                                    </p>
                                    <span
                                        onClick={() =>
                                            handleModalOpen("reorderItemModal", menuItem.id)
                                        }
                                    >
                                        메뉴 순서 변경
                                    </span>
                                </div>
                                <MenuItemList
                                    menuGroupId={menuItem.id}
                                    fetchGroupList={fetchGroupList}
                                />
                            </div>
                        ))}
                    </ItemLayout>
                    {openModal.addMenuGroup && (
                        <AddMenuGroup
                            onClose={() => handleModalClose("addMenuGroup")}
                            fetchGroupList={fetchGroupList}
                        />
                    )}
                    {openModal.addMenuItem && (
                        <AddMenuItemModal
                            onClose={() => handleModalClose("addMenuItem")}
                            menuGroupId={selectGroupId}
                            fetchGroupList={fetchGroupList}
                        />
                    )}
                    {openModal.reorderModal && (
                        <ReorderModal
                            onClose={() => handleModalClose("reorderModal")}
                            fetchGroupList={fetchGroupList}
                        />
                    )}
                    {openModal.reorderItemModal && (
                        <ReorderItemModal
                            onClose={() => handleModalClose("reorderItemModal")}
                            menuGroupId={selectGroupId}
                        />
                    )}
                </>
            )}
            {selectedNav === "mainMenu" && <MainMenu onClose={onClose} />}
            {selectedNav === "optionMenu" && <OptionMenu onClose={onClose} />}
        </div>
    );
};

export default MenuSet;
