import { ModalProps, ViewOption } from "@/lib/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import AddOptionMenu from "./optionModal/AddOptionGroupModal";
import { getAxios } from "@/app/services/loginAPI";
import { useRecoilState, useRecoilValue } from "recoil";
import { menuItemAtom, optionGroupAtom, shopIdAtom } from "@/app/recoil/state";
import { OptionItem } from "./OptionItem";
import { AddOptionItemModal } from "./optionModal/AddOptionItemModal";
import { OptionMenuLinkModal } from "./OptionMenuLinkModal";
import { ItemLayout } from "../common/ItemLayout";
import { ItemHeader } from "../common/ItemHeader";
import { ReorderOptionGroup } from "./optionModal/ReorderOptionGroup";

const OptionMenu = ({ onClose }: ModalProps) => {
    const shopId = useRecoilValue(shopIdAtom);
    const [viewOption, setViewOption] = useState<ViewOption>({});
    const [selectGroupId, setSelectGroupId] = useState<number | null>(null);
    const [optionList, setOptionList] = useRecoilState(optionGroupAtom);
    const [sortIds, setSortIds] = useState<number[]>([]);
    const [openModal, setOpenModal] = useState({
        addOptionGroupModal: false,
        addOptionItemModal: false,
        optionMenuLinkModal: false,
        reorderOptionGroupModal: false,
    });

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

    const matchOptionIds = (newIds: number[]) => {
        const prevIds = optionList.map((option) => option.id);
        console.log(prevIds);
        setSortIds(newIds);
    };

    const handleViewOption = (id: number) => {
        setViewOption((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
        console.log(id);
    };

    const optionGroupList = useCallback(async () => {
        // 옵션 그룹 전체 조회
        try {
            const res = await getAxios.get(`/owner/menu-option-group/shop/${shopId}`);
            if (res.status === 200) {
                setOptionList(res.data.menuOptionGroups);
            }
        } catch (error) {
            console.error("옵션전체조회 실패", error);
        }
    }, [shopId, setOptionList]);

    // 옵션 그룹 추가
    const addOptionGroup = useCallback(
        async (
            optionGroupName: string,
            optionType: string,
            count: number,
            options: { content: string; price: number }[],
            isPossibleCount: boolean
        ) => {
            try {
                const res = await getAxios.post(`/owner/menu-option-group/shop/${shopId}/add`, {
                    name: optionGroupName,
                    optionType: optionType,
                    count: 1,
                    options: options,
                    isPossibleCount: isPossibleCount,
                });
                if (res.status === 201) {
                    console.log("요청 성공", res.data);
                    optionGroupList();
                }
            } catch (error) {
                console.error("옵션그룹추가실패", error);
            }
        },
        []
    );

    // 옵션 그룹 삭제
    const deleteOptionGroup = useCallback(async (optionId: number) => {
        try {
            const res = await getAxios.delete(`owner/menu-option-group/${optionId}/delete`);
            if (res.status === 204) {
                // setOptionList((prevOptionList) =>
                //     prevOptionList.filter((option) => option.id !== optionId)
                // );
                optionGroupList();
            }
        } catch (error) {
            console.error("삭제 실패", error);
        }
    }, []);

    // 옵션 그룹 메뉴 연결
    const LinkOptionMenu = () => {
        const menuIds = [];
        const menuGroupId = useRecoilValue(menuItemAtom);
        try {
            const res = getAxios.put(`/owner/menu-option-group//link-menu`);
        } catch (error) {
            console.error("옵션 그룹 메뉴 연결 실패", error);
        }
    };
    useEffect(() => {
        optionGroupList();
        console.log("optionmenu useEffect");
    }, [optionGroupList]);

    console.log(optionList);
    return (
        <ItemLayout>
            <ItemHeader>
                <input
                    placeholder="옵션을 검색하세요"
                    className=" border rounded-xl mx-4 px-4 py-2"
                />
                <div className="text-custom-gray text-sm">
                    <button onClick={() => handleModalOpen("reorderOptionGroupModal")}>
                        옵션 순서 변경
                    </button>
                    <button
                        className="border rounded-xl px-4 py-2.5 bg-yogiyo-blue text-white font-bold mx-2"
                        onClick={() => handleModalOpen("addOptionGroupModal")}
                    >
                        옵션그룹 추가
                    </button>
                </div>
            </ItemHeader>
            {optionList && optionList.length > 0 ? (
                <>
                    {optionList.map((options) => (
                        <div
                            className="flex flex-col border rounded-2xl bg-white p-4 mt-2"
                            key={options.id}
                        >
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-bold">{options.name}</span>
                                <div className="flex border rounded-xl py-1 px-2 gap-2 ">
                                    <>
                                        <select>
                                            <option>판매중</option>
                                            <option>하루 품절</option>
                                            <option>숨김</option>
                                        </select>
                                    </>
                                    <button
                                        className="flex items-center relative"
                                        onClick={() => handleViewOption(options.id)}
                                    >
                                        <img src="/Icons/더보기버튼.svg" />
                                        {viewOption[options.id] && (
                                            <ul className="flex flex-col divide-y absolute top-4 right-0 w-[200px] border rounded-lg bg-white mt-4 px-2 py-1 z-10">
                                                <li className="flex justify-start py-2">
                                                    옵션그룹명 변경
                                                </li>
                                                <li className="flex justify-start py-2">
                                                    연결메뉴 설정
                                                </li>
                                                <li className="flex justify-start py-2">
                                                    그룹 숨김
                                                </li>
                                                <li
                                                    className="flex justify-start py-2"
                                                    onClick={() => deleteOptionGroup(options.id)}
                                                >
                                                    삭제
                                                </li>
                                            </ul>
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className="text-xs text-custom-gray py-4">
                                <div className="flex text-sm">
                                    <span>유형</span>
                                    <span className="">필수옵션 필수 1개 선택 옵션설정</span>
                                </div>
                                <div className="text-sm">
                                    <span>연결메뉴</span>
                                    <span>
                                        리코타치즈샐러드, 연어샐러드, 닭가슴살샐러드
                                        <button
                                            className="px-2 text-yogiyo-blue"
                                            onClick={() => handleModalOpen("optionMenuLinkModal")}
                                        >
                                            메뉴연결
                                        </button>
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col border-t py-4">
                                <div>
                                    <button
                                        className="text-xs px-2 text-yogiyo-blue"
                                        onClick={() =>
                                            handleModalOpen("addOptionItemModal", options.id)
                                        }
                                    >
                                        옵션추가
                                    </button>

                                    <span className="text-xs px-2">옵션 순서변경</span>
                                </div>

                                <OptionItem optionGroupId={options.id} onClose={onClose} />
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <div>옵션그룹을 불러오는 중</div>
            )}

            {openModal.addOptionGroupModal && (
                <AddOptionMenu
                    onClose={() => handleModalClose("addOptionGroupModal")}
                    addOptionGroup={addOptionGroup}
                />
            )}
            {openModal.addOptionItemModal && (
                <AddOptionItemModal
                    onClose={() => handleModalClose("addOptionItemModal")}
                    optionGroupId={selectGroupId}
                />
            )}
            {openModal.optionMenuLinkModal && (
                <OptionMenuLinkModal onClose={() => handleModalClose("optionMenuLinkModal")} />
            )}
            {openModal.reorderOptionGroupModal && (
                <ReorderOptionGroup onClose={() => handleModalClose("reorderOptionGroupModal")} />
            )}
        </ItemLayout>
    );
};

export default OptionMenu;
