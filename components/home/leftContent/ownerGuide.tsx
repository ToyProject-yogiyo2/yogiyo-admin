import { PiPlusBold } from "react-icons/pi";

export const OwnerGuide = () => {
    return (
        <div className="flex flex-col mt-8 bg-white overflow-x-scroll">
            <div className="flex justify-between items-center py-4">
                <span className="text-lg font-bold">사장님을 위한 추천</span>
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
            <div className="grid grid-cols-3 flex-1 gap-2 relative overflow-x-auto">
                <div className="flex flex-col gap-3 cursor-pointer">
                    <div className="overflow-hidden relative border border-white rounded-lg">
                        <img
                            className="border-none rounded-md"
                            src="https://partner.yogiyo.co.kr/upload/2023/02/1675218071_676edda13d7a0702dc11_thumb_310_172.jpg"
                        />
                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-font-black font-bold break-keep">
                                테스트 폰트
                            </span>
                            <span className="text-xs font-bold text-[#d9d9d9]">작은 텍스트</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-3 cursor-pointer">
                    <div className="overflow-hidden relative border border-white rounded-lg">
                        <img
                            className="border-none rounded-md"
                            src="https://partner.yogiyo.co.kr/upload/2024/02/1706853674_d479a9bcd9e5a07e48ba_thumb_310_172.png"
                        />
                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-font-black font-bold break-keep">
                                테스트 폰트
                            </span>
                            <span className="text-xs font-bold text-[#d9d9d9]">작은 텍스트</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-3 cursor-pointer">
                    <div className="overflow-hidden relative border border-white rounded-lg">
                        <img
                            className="border-none rounded-md"
                            src="	https://partner.yogiyo.co.kr/upload/2024/01/1706574462_ff11698d69195f0fdae7_thumb_310_172.png"
                        />
                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-font-black font-bold break-keep">
                                테스트 폰트
                            </span>
                            <span className="text-xs font-bold text-[#d9d9d9]">작은 텍스트</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
