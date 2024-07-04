import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { PiPlusBold } from "react-icons/pi";
import { BsClock } from "react-icons/bs";

SwiperCore.use([Autoplay]);

export const SwiperTips = () => {
    return (
        <div className="z-0">
            <Swiper
                spaceBetween={8}
                slidesPerView={3}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                speed={800}
            >
                <SwiperSlide>
                    <div className="flex flex-col justify-between min-h-[288px] px-5 py-4 rounded-lg cursor-pointer bg-[#f2f2f2]">
                        <div className="flex flex-col items-start">
                            <img
                                src="/Icons/영업시간.png"
                                alt="영업시간"
                                className="w-13 h-12 border-none rounded"
                            />
                            <span className="mt-4 text-base font-bold text-font-black whitespace-nowrap">
                                가게 영업시간을 알려주세요
                            </span>
                            <span className="mt-3 text-xs font-normal text-font-black">
                                영업시간은 변경사항이 있을때마다 수정해주세요!
                            </span>

                            <div className="flex items-center">
                                <PiPlusBold size="12" color="rgba(0, 0, 0, 0.6)" />
                                <span className="text-xs font-bold text-custom-gray">
                                    사용법 자세히보기
                                </span>
                            </div>
                        </div>
                        <button className="text-sm font-normal text-font-black mt-6 h-10 border rounded-lg bg-white">
                            영업시간 설정하기
                        </button>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        className="flex flex-col justify-between min-h-[288px] px-5 py-4 rounded-lg cursor-pointer 
                    bg-[#e6f4f2]"
                    >
                        <div className="flex flex-col items-start">
                            <img
                                src="/Icons/영업시간.png"
                                alt="영업시간"
                                className="w-13 h-12 border-none rounded"
                            />
                            <span className="mt-4 text-base font-bold text-font-black whitespace-nowrap">
                                내 가게를 대표하는 인기메뉴
                            </span>
                            <span className="mt-3 text-xs font-normal text-font-black">
                                우리가게 대표메뉴를 설정하고 주문수를 올려보세요!
                            </span>
                            <div className="flex items-center pt-2">
                                <PiPlusBold size="16" color="rgba(0, 0, 0, 0.6)" />
                                <span className="text-sm font-bold text-custom-gray">
                                    사용법 자세히보기
                                </span>
                            </div>
                        </div>
                        <button className="text-sm font-normal text-font-black mt-6 border h-10 rounded-lg bg-white">
                            대표메뉴 설정하기
                        </button>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        className="flex flex-col justify-between min-h-[288px] px-5 py-4 rounded-lg cursor-pointer 
                    bg-[#feede6]"
                    >
                        <div className="flex flex-col items-start">
                            <img
                                src="/Icons/영업시간.png"
                                alt="영업시간"
                                className="w-13 h-12 border-none rounded"
                            />
                            <span className="mt-4 text-base font-bold text-font-black whitespace-nowrap">
                                마음을 움직이는 가게쿠폰
                            </span>
                            <span className="mt-3 text-xs font-normal text-font-black">
                                가게쿠폰은 우리가게 주문수와 객단가 증가에 효과가 있어요!
                            </span>
                            <div className="flex items-center pt-2">
                                <PiPlusBold size="16" color="rgba(0, 0, 0, 0.6)" />
                                <span className="text-sm font-bold text-custom-gray">
                                    사용법 자세히보기
                                </span>
                            </div>
                        </div>
                        <button className="text-sm font-normal text-font-black mt-6 border h-10 rounded-lg bg-white">
                            쿠폰 발행하기
                        </button>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="flex flex-col justify-between min-h-[288px] px-5 py-4 rounded-lg cursor-pointer bg-[#eef3f5]">
                        <div className="flex flex-col items-start">
                            <img
                                src="/Icons/영업시간.png"
                                alt="영업시간"
                                className="w-13 h-12 border-none rounded"
                            />
                            <span className="mt-4 text-base font-bold text-font-black whitespace-nowrap">
                                고객 부담을 낮추는 배달요금
                            </span>
                            <span className="mt-3 text-xs font-normal text-font-black">
                                배달요금은 잘 설정하면 고객 부담은 낮아지고, 주문수는 올라요!
                            </span>
                            <div className="flex items-center pt-2">
                                <PiPlusBold size="16" color="rgba(0, 0, 0, 0.6)" />
                                <span className="text-sm font-bold text-custom-gray">
                                    사용법 자세히보기
                                </span>
                            </div>
                        </div>
                        <button className="text-sm font-normal text-font-black mt-6 border h-10 rounded-lg bg-white">
                            배달요금 설정하기
                        </button>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="flex flex-col justify-between min-h-[288px] px-5 py-4 rounded-lg cursor-pointer bg-[#e7f3fe]">
                        <div className="flex flex-col items-start">
                            <img
                                src="/Icons/영업시간.png"
                                alt="영업시간"
                                className="w-13 h-12 border-none rounded"
                            />
                            <span className="mt-4 text-base font-bold text-font-black whitespace-nowrap">
                                주문받기 전까지 광고비 0원!
                            </span>
                            <span className="mt-3 text-xs font-normal text-font-black">
                                AI로 주문확률이 높은 고객에게 우리가게를 추천해요!
                            </span>
                            <div className="flex items-center pt-2">
                                <PiPlusBold size="16" color="rgba(0, 0, 0, 0.6)" />
                                <span className="text-sm font-bold text-custom-gray">
                                    사용법 자세히보기
                                </span>
                            </div>
                        </div>
                        <button className="text-sm font-normal text-font-black mt-6 border h-10 rounded-lg bg-white">
                            추천광고 설정하기
                        </button>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="flex flex-col justify-between min-h-[288px] px-5 py-4 rounded-lg cursor-pointer bg-[#fff9e5]">
                        <div className="flex flex-col items-start">
                            <img
                                src="/Icons/영업시간.png"
                                alt="영업시간"
                                className="w-13 h-12 border-none rounded"
                            />
                            <span className="mt-4 text-base font-bold text-font-black">
                                주문을 이끄는 메뉴와 설명
                            </span>
                            <span className="mt-3 text-xs font-normal text-font-black">
                                메뉴의 매력을 느낄 수 있도록 메뉴와 메뉴 설명을 작성해보세요!
                            </span>
                            <div className="flex items-center pt-2">
                                <PiPlusBold size="16" color="rgba(0, 0, 0, 0.6)" />
                                <span className="text-sm font-bold text-custom-gray">
                                    사용법 자세히보기
                                </span>
                            </div>
                        </div>
                        <button className="text-sm font-normal text-font-black mt-6 border h-10 rounded-lg bg-white">
                            메뉴 관리하기
                        </button>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default SwiperTips;
