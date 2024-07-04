import { Button } from "@/components/common/Button";
import { ModalProps } from "@/lib/types";
import React, { useState } from "react";

interface Options {
    content: string;
    price: number;
}
interface AddOptionGroupProps extends ModalProps {
    addOptionGroup: (
        optionGroupName: string,
        optionType: string,
        count: number,
        options: Options[],
        isPossibleCount: boolean
    ) => void;
}

const AddOptionGroupModal = ({ onClose, addOptionGroup }: AddOptionGroupProps) => {
    const [optionType, setOptionType] = useState<string>("REQUIRED");
    const [optionGroupName, setOptionGroupName] = useState("");
    const [optionName, setOptionName] = useState("");
    const [showNextOption, setShowNextOption] = useState(false);
    const [price, setPrice] = useState("");

    const handleNextOption = () => {
        if (optionGroupName && optionName && price !== null) {
            setShowNextOption(true);
        } else {
            setShowNextOption(false);
        }
    };

    const handleOptionGroupName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOptionGroupName(e.target.value);
    };

    const handleOptionContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.id === "optionName") {
            setOptionName(e.target.value);
        } else if (e.target.id === "price") {
            setPrice(e.target.value);
        }
    };

    const handleSubmit = async () => {
        const groupName = optionGroupName;
        const type = optionType;
        const count = 1;
        const options: Options[] = [{ content: optionName, price: parseInt(price) }];
        const isPossibleCount = false;
        await addOptionGroup(groupName, type, count, options, isPossibleCount);
        onClose();
    };

    const NextOption = () => {
        return (
            <div className="flex flex-col divide-y">
                <div className="flex py-4 gap-2">
                    <div className="flex flex-col items-center border rounded-lg w-[32rem] py-4">
                        <div
                            className="font-bold text-xl"
                            onClick={() => setOptionType("REQUIRED")}
                        >
                            필수 옵션
                        </div>
                        <span className="text-sm text-custom-gray">
                            반드시 선택해야 주문이 가능합니다.
                        </span>
                    </div>
                    <div className="flex flex-col items-center border rounded-lg w-full py-4">
                        <div
                            className="font-bold text-xl"
                            onClick={() => setOptionType("OPTIONAL")}
                        >
                            선택 옵션
                        </div>
                        <span className="text-sm text-custom-gray">
                            선택하지 않아도 주문이 가능합니다.
                        </span>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <span className="text-xl font-bold my-4">옵션 수</span>
                        <div className="border divide-y py-4 px-2">
                            <div className="text-ml text-custom-gray pb-4">
                                <span>고객은 필수 몇 개의 옵션을 선택할 수 있나요?</span>
                                {/* 갯수 버튼 */}
                            </div>
                            <div className="text-ml text-custom-gray pt-4">
                                <span>이 옵션그룹에는 옵션이 총 n개있습니다.</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between text-xl px-2 my-2">
                        <button
                            className="text-custom-gray"
                            onClick={() => setShowNextOption(false)}
                        >
                            뒤로
                        </button>
                        <Button
                            onClick={handleSubmit}
                            text={"저장"}
                            color="submit"
                            size="default"
                        />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center justify-center bg-black bg-opacity-50 fixed inset-0">
            <div className="flex flex-col bg-white divide-y px-4 border rounded-2xl  w-[32rem] h-fit m-20 overflow-hidden">
                <div className="relative">
                    <div className="flex items-center justify-center py-4">
                        <button className="absolute left-4" onClick={onClose}>
                            X
                        </button>
                        <span className="text-xl font-bold">옵션그룹 추가</span>
                    </div>
                </div>
                {showNextOption === true ? (
                    NextOption()
                ) : (
                    <>
                        <div className="flex flex-col py-4 text-custom-gray">
                            <span>옵션그룹명</span>
                            <input
                                placeholder="ex) 면 사리"
                                value={optionGroupName}
                                onChange={handleOptionGroupName}
                                type="text"
                                id="groupName"
                                className="border rounded-xl mt-4 px-4 py-2"
                            />
                        </div>
                        <div className="my-2 pb-10 py-4 text-custom-gray">
                            <span>옵션 내용</span>
                            <div className="flex flex-col my-2 gap-2">
                                <div className="flex">
                                    <input
                                        placeholder="옵션메뉴이름"
                                        value={optionName}
                                        onChange={handleOptionContent}
                                        type="text"
                                        id="optionName"
                                        className="border rounded-xl flex items-center px-2 py-2 mr-2 text-black"
                                    />
                                    <input
                                        placeholder="가격"
                                        value={price}
                                        onChange={handleOptionContent}
                                        type="text"
                                        id="price"
                                        className="border rounded-xl flex items-center px-2 py-2"
                                    />
                                    <button className="ml-2">X</button>
                                </div>
                                <button className="flex items-start text-yogiyo-blue">
                                    옵션 추가
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-end py-4">
                            <Button
                                onClick={handleNextOption}
                                text={"저장"}
                                color="submit"
                                size="default"
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AddOptionGroupModal;
