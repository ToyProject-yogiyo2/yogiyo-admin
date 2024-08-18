import { optionGroupAtom } from "@/app/recoil/state";
import { deleteOption } from "@/app/services/optionAPI";
import { ModalProps, ViewOption } from "@/lib/types";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { AddOptionItemModal } from "./optionModal/AddOptionItemModal";
import { Options } from "./option";
import { ItemList } from "../../../components/common/ItemList";

interface optionId extends ModalProps {
    optionGroupId: number;
}

export const OptionItem = ({ optionGroupId }: optionId) => {
    const optionList = useRecoilValue(optionGroupAtom);
    const optionItem = optionList.find((group) => group.id === optionGroupId);
    const [viewOption, setViewOption] = useState<ViewOption>({});
    const [selectOptionId, setSelectOptionId] = useState<number>();
    const [seletGroupId, setSelectGroupId] = useState<number>();
    const [openModal, setOpenModal] = useState({
        addOptionItemModal: false,
    });

    const handleModalOpen = (modalName: string, id?: number) => {
        setOpenModal((prevModal) => ({
            ...prevModal,
            [modalName]: true,
        }));
        if (id !== undefined) {
            setSelectOptionId(id);
            console.log(id);
        }
    };
    const handleModalClose = (modalName: string) => {
        setOpenModal((prevModal) => ({
            ...prevModal,
            [modalName]: false,
        }));
    };

    return (
        <div>
            {optionItem?.menuOptions?.map((option: Options) => (
                <ItemList option={option} showImage={false}>
                    <div className="flex" key={option.id}>
                        <button
                            className="px-0.5"
                            onClick={() => {
                                setViewOption((prev) => ({
                                    [option.id]: !prev[option.id],
                                }));
                            }}
                        >
                            <img src="/Icons/더보기버튼.svg" />
                            {viewOption[option.id] && (
                                <ul
                                    className="flex flex-col divide-y absolute top-9 right-0 w-[200px] border rounded-xl bg-white px-2 py-1 z-10"
                                    key={option.id}
                                >
                                    <li
                                        className="flex justify-start py-2"
                                        onClick={() => {
                                            handleModalOpen("addOptionItemModal");
                                            setSelectGroupId(optionItem.id);
                                        }}
                                    >
                                        옵션명, 가격 수정
                                    </li>
                                    <li
                                        className="flex justify-start py-2"
                                        onClick={() => deleteOption(option.id)}
                                    >
                                        삭제
                                    </li>
                                </ul>
                            )}
                        </button>
                    </div>
                </ItemList>
            ))}
            {openModal.addOptionItemModal && (
                <AddOptionItemModal
                    onClose={() => handleModalClose("addOptionItemModal")}
                    optionGroupId={seletGroupId}
                    optionId={parseInt(Object.keys(viewOption)[0])}
                />
            )}

            {/* 옵션 그룹 밑에 있는 설명란 임시 저장 */}
        </div>
    );
};
