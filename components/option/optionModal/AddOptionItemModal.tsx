import { optionGroupAtom } from "@/app/recoil/state";
import { getAxios } from "@/app/services/loginAPI";
import { Button } from "@/components/common/Button";
import { Header } from "@/components/common/Header";
import { ModalLayout } from "@/components/common/ModalLayout";
import { ModalProps } from "@/lib/types";
import { useState } from "react";
import { useRecoilValue } from "recoil";

export const AddOptionItemModal = ({
    onClose,
    optionGroupId,
    optionId,
}: ModalProps & { optionGroupId?: number | null; optionId?: number | null | undefined }) => {
    const [content, setContent] = useState("");
    const [price, setPrice] = useState<number>();
    const optionList = useRecoilValue(optionGroupAtom);

    const filterOptionGroupId = optionList.find((option) => option.id === optionGroupId);
    console.log(filterOptionGroupId);
    console.log(optionList);
    console.log(optionGroupId);
    console.log(optionId);
    const filterOptions = filterOptionGroupId?.menuOptions?.find(
        (option) => option.id === optionId
    );
    console.log(filterOptions);

    const handleAddOption = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.id === "content") {
            setContent(e.target.value);
        } else if (e.target.id === "price") {
            setPrice(e.target.valueAsNumber);
        }
    };

    const addOption = async () => {
        try {
            const res = await getAxios.post(
                `/owner/menu-option-group/${optionGroupId}/add-option`,
                {
                    content: content,
                    price: price,
                }
            );
            if (res.status === 201) console.log("옵션추가성공", res.data);
        } catch (error) {
            console.error("옵션추가실패", error);
        }
    };
    return (
        <ModalLayout>
            <div className="flex flex-col gap-2">
                <div className="relative">
                    <Header>
                        <span>옵션추가</span>
                        <button className="absolute right-4" onClick={onClose}>
                            X
                        </button>
                    </Header>
                </div>
                <div className="flex flex-col mx-2 text-custom-gray text-sm divide-y">
                    <div className="flex flex-col py-4">
                        <span>옵션그룹명</span>
                        <input
                            className="px-4 py-2 border rounded-lg"
                            onChange={handleAddOption}
                            value={filterOptions ? filterOptions?.content : content}
                            id="content"
                            type="text"
                        ></input>
                    </div>
                    <div className="flex flex-col">
                        <span>옵션가격</span>
                        <div>
                            <input
                                className="border rounded-lg px-4 py-2"
                                onChange={handleAddOption}
                                value={filterOptions ? filterOptions?.price : price}
                                id="price"
                                type="number"
                            ></input>
                            <span>일천만원</span>
                        </div>
                    </div>
                </div>

                <Button
                    color="submit"
                    size="wideButton"
                    text={"저장"}
                    onClick={() => addOption()}
                />
            </div>
        </ModalLayout>
    );
};
