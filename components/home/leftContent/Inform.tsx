import { PiPlusBold } from "react-icons/pi";

export const InformEvent = () => {
    return (
        <div className="mt-8 bg-white">
            <div className="flex justify-between items-center py-4">
                <span className="text-lg font-bold">공지사항∙이벤트</span>
                <button className="flex items-center justify-center relative w-auto max-w-[480px] h-[28px] rounded-md">
                    <a
                        className="absolute w-full h-full top-0 left-0"
                        href="https://ceo.yogiyo.co.kr/announcement/list"
                        target="_blank"
                    ></a>
                    <div className="flex items-center justify-center ">
                        <PiPlusBold size="12" color="rgba(0, 0, 0, 0.6)" />
                    </div>
                    <span className="text-xs font-normal mx-0.5 text-custom-gray ">더보기</span>
                </button>
            </div>
            <div className="flex flex-row gap-2">
                <div className="flex flex-col flex-auto gap-2 overflow-hidden py-6 px-4 border border-box-gray rounded-lg">
                    <div>
                        <span>공지사항∙이벤트 1</span>
                    </div>
                    <div>
                        <span>공지사항∙이벤트 2</span>
                    </div>
                    <div>
                        <span>공지사항∙이벤트 3</span>
                    </div>
                </div>
                <div className="flex justify-end flex-[0_0_240px] items-center relative min-h-[92px] rounded-lg overflow-hidden bg-[#f4f4f2]">
                    <a
                        className="absolute w-full h-full top-0 left-0"
                        href="https://partner.yogiyo.co.kr/event"
                        target="_blank"
                    ></a>
                    <span className="absolute m-auto text-sm text-font-black font-bold left-4 top-4">
                        요기요 사장님 한정!
                        <br />
                        이벤트 참여해보세요
                    </span>
                    <div className="flex self-end">
                        <img
                            src="/bannerimage/banner-event.b9acc160.png"
                            className="align-bottom w-[200px] h-[100px]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
