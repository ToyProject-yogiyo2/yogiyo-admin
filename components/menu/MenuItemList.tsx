import { menuItemAtom } from "@/app/recoil/state";
import { deleteMenuItem } from "@/app/services/menuAPI";
import { ViewOption } from "@/lib/types";
import { useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { AddMenuItemModal } from "./menuModal/AddMenuItemModal";
import { getAxios } from "@/app/services/loginAPI";
import { MenusItem } from "./menu";
import { ItemList } from "../common/ItemList";

interface MenuItemListProps {
    menuGroupId: number;
    fetchGroupList: () => void;
}

export const MenuItemList = ({ menuGroupId, fetchGroupList }: MenuItemListProps) => {
    const [viewOption, setViewOption] = useState<ViewOption>({});
    const menuItemGroups = useRecoilValue(menuItemAtom);
    const menuGroup = menuItemGroups.find((group) => group.id === menuGroupId);
    if (!menuGroup) return null;
    const [selectGroupId, setSelectGroupId] = useState<number | null>(null);
    const [selectItemId, setSelectItemId] = useState<number>();
    const [transItems, setTransItems] = useState([]);
    const [openModal, setOpenModal] = useState({
        addMenuItemModal: false,
    });

    const handleModalOpen = (modalName: string, id?: number) => {
        setOpenModal((prevModal) => ({
            ...prevModal,
            [modalName]: true,
        }));
        if (id !== undefined) {
            setSelectItemId(id);
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

    const memoizedMenuItem = useMemo(() => {
        return transItems;
    }, [transItems]);

    const getItemList = async () => {
        try {
            const res = await getAxios.get(`owner/menu-group/${menuGroupId}/menu`);
            if (res.status === 200) {
                setTransItems(
                    res.data.menus.map((sm: any) => ({
                        ...sm,
                        picture: `https://yogiyo-clone.shop${sm.picture}`,
                    }))
                );
            }
        } catch (error) {
            console.log("리스트 가져오기 실패", error);
        }
    };
    console.log(transItems);

    useEffect(() => {
        getItemList();
    }, []);

    return (
        <div>
            {transItems.map((menuItem: MenusItem) => (
                <ItemList option={menuItem} showImage={true} key={menuItem.id}>
                    <div className="flex items-center">
                        <button className="px-0.5" onClick={() => toggleViewOption(menuItem.id)}>
                            <img src="/Icons/더보기버튼.svg" />
                            {viewOption[menuItem.id] ? (
                                <ul className="flex flex-col divide-y absolute right-0 top-5 w-[200px] border rounded-lg bg-white mt-4 px-2 py-1 z-10">
                                    <li
                                        className="flex justify-start py-2"
                                        onClick={() => {
                                            handleModalOpen("addMenuItemModal");
                                            setSelectGroupId(menuGroup.id);
                                        }}
                                    >
                                        메뉴 수정
                                    </li>
                                    <li
                                        className="flex justify-start py-2"
                                        onClick={() => deleteMenuItem(menuItem.id)}
                                    >
                                        메뉴 삭제
                                    </li>
                                </ul>
                            ) : (
                                <div></div>
                            )}
                        </button>
                    </div>
                </ItemList>
            ))}
            {openModal.addMenuItemModal && (
                <AddMenuItemModal
                    menuGroupId={selectGroupId}
                    fetchGroupList={fetchGroupList}
                    itemId={parseInt(Object.keys(viewOption)[0])}
                    onClose={() => handleModalClose("addMenuItemModal")}
                />
            )}
        </div>
    );
};
