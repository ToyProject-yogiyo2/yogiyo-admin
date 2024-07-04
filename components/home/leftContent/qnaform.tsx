"use client";
import React, { useState } from "react";
import { PiPlusBold } from "react-icons/pi";

export const QnAform = () => {
    const buttons = ["전체", "PC 주문접수", "쿠폰관리", "정산"];
    const [buttonClick, setButtonClick] = useState<number | null>(null);

    const handleClick = (index: number) => {
        setButtonClick(index);
    };

    const getButtonClassName = (index: number) => {
        return buttonClick === index
            ? "flex items-center justify-center h-9 min-w-11 px-2.5 border-none rounded-[100px] bg-font-black text-white"
            : "flex items-center justify-center h-9 min-w-11 px-2.5 border border-font-black rounded-[100px] bg-white text-font-black";
    };

    return (
        <div className="mt-8">
            <div className="flex justify-between items-center py-4">
                <span className="text-lg font-bold">자주 묻는 질문</span>
                <button className="flex items-center justify-center relative w-auto max-w-[480px] h-[28px] rounded-md">
                    <a
                        className="absolute w-full h-full top-0 left-0"
                        href="https://partner.yogiyo.co.kr/?utm_source=yogiyo&utm_medium=site&utm_campaign=more&utm_content=portal_home"
                        target="_blank"
                    ></a>
                    <div className="flex items-center justify-center ">
                        <PiPlusBold size="12" color="rgba(0, 0, 0, 0.6)" />
                    </div>
                    <span className="text-xs font-normal mx-0.5 text-custom-gray ">더보기</span>
                </button>
            </div>
            <div className="bg-white border rounded-lg">
                <div className="flex gap-2 pt-5 px-4 pb-[15px]">
                    {buttons.map((buttonName, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleClick(idx)}
                            className={getButtonClassName(idx)}
                            value={buttons}
                        >
                            <span className="text-sm font-normal mx-0.5">{buttonName}</span>
                        </button>
                    ))}
                </div>
                <div className="flex flex-col px-4 divide-y">
                    <div className="py-[18px]">
                        <div className="flex justify-between items-center gap-1 cursor-pointer">
                            <div className="flex items-center gap-2">
                                <span className="flex items-center justify-center w-6 h-6 text-base font-bold">
                                    Q
                                </span>
                                <span className="text-sm font-normal text-font-black">
                                    추천광고는 어디에 노출되나요?
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="py-[18px]">
                        <div className="flex justify-between items-center gap-1 cursor-pointer">
                            <div className="flex items-center gap-2">
                                <span className="flex items-center justify-center w-6 h-6 text-base font-bold">
                                    Q
                                </span>
                                <span className="text-sm font-normal text-font-black">
                                    추천광고는 어디에 노출되나요?
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="py-[18px]">
                        <div className="flex justify-between items-center gap-1 cursor-pointer">
                            <div className="flex items-center gap-2">
                                <span className="flex items-center justify-center w-6 h-6 text-base font-bold">
                                    Q
                                </span>
                                <span className="text-sm font-normal text-font-black">
                                    추천광고는 어디에 노출되나요?
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
