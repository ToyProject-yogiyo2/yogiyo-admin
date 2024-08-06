import React, { useState } from "react";

type Props = {};

export const Footer = (props: Props) => {
    // 상세 정보 보기 상태 관리
    const [showDetails, setShowDetails] = useState(false);

    // 상세 정보 토글 함수
    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <footer className="px-[22px] py-6 border border-t">
            <div className="flex flex-col justify-between items-center gap-0 md:flex-row-reverse">
                <a href="">
                    <button className="flex items-center justify-center w-auto max-w-[480px] h-[40px] rounded-lg px-[14px] border">
                        <span className="text-sm font-normal mx-0.5 text-font-black">
                            서비스 소개 다운로드
                        </span>
                    </button>
                </a>
                <div className="flex flex-wrap">
                    <a className="text-custom-gray text-sm font-normal">서비스 이용약관</a>
                    <div className="text-custom-gray border-r border-custom-gray-border mx-4 h-3.5"></div>
                    <a className="text-custom-gray text-sm font-normal">사이트 이용약관</a>
                    <div className="text-custom-gray border-r border-custom-gray-border mx-4 h-3.5"></div>
                    <a className="text-custom-gray text-sm font-bold">개인정보 처리방침</a>
                    <div className="text-custom-gray border-r border-custom-gray-border mx-4 h-3.5"></div>
                    <a className="text-custom-gray text-sm font-normal">전자금융거래 이용약관</a>
                    <div className="text-custom-gray border-r border-custom-gray-border mx-4 h-3.5"></div>
                    <a className="text-custom-gray text-sm font-normal">광고 상품 이용약관</a>
                </div>
            </div>

            {/* 두번째 줄 문구 부분 */}
            <div className="mt-3">
                <div
                    className="flex flex-row items-center h-10 cursor-pointer font-bold text-xs"
                    style={{ lineHeight: "16px", padding: "6px 0 8px" }}
                >
                    <div
                        className="inline-flex flex-row items-center mr-4 font-bold text-sm"
                        style={{ lineHeight: "19px", color: "rgba(0, 0, 0, 0.6)" }}
                    >
                        주식회사 위대한상상
                    </div>
                    <button
                        onClick={toggleDetails}
                        className="flex items-center justify-center w-auto max-w-xs bg-transparent h-7 rounded outline-none ml-2"
                        style={{ borderRadius: "6px", padding: "0 6px", maxWidth: "480px" }}
                    >
                        <span className="text-xs font-normal text-custom-gray mx-0.5">
                            자세히 보기
                        </span>
                        <div className="flex items-center justify-center">
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M12 15.4142L16.7071 10.7071C17.0976 10.3166 17.7308 10.3166 18.1213 10.7071C18.5118 11.0976 18.5118 11.7308 18.1213 12.1213L12.7071 17.5355C12.3166 17.926 11.6834 17.926 11.2929 17.5355L5.87868 12.1213C5.48816 11.7308 5.48816 11.0976 5.87868 10.7071C6.2692 10.3166 6.90237 10.3166 7.29289 10.7071L12 15.4142Z"
                                    fill="#000000"
                                />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
            {/* 누르면 보여지는 문구 부분 */}
            {showDetails && (
                <div className="pt-0 px-4 pb-6">
                    {/* 첫번째 줄 */}
                    <div className="flex flex-wrap items-center">
                        <div
                            className="inline-flex flex-row items-baseline max-w-full text-sm leading-[19px] font-normal mb-[10px]"
                            style={{
                                fontSize: "14px",
                                lineHeight: "19px",
                                fontWeight: "normal",
                                marginBottom: "10px",
                            }}
                        >
                            <span
                                className="flex-none font-normal"
                                style={{
                                    fontSize: "13px",
                                    color: "rgba(0, 0, 0, 0.4)",
                                    lineHeight: "18px",
                                }}
                            >
                                대표이사
                            </span>
                            <span
                                className="ml-2 flex-grow-0 flex-shrink-1 font-normal"
                                style={{
                                    fontSize: "13px",
                                    color: "rgba(0, 0, 0, 0.6)",
                                    lineHeight: "18px",
                                    wordBreak: "break-all",
                                    overflowWrap: "break-word",
                                }}
                            >
                                전준희
                            </span>
                        </div>
                        {/* 선 경계부분 */}
                        <div
                            className="border-l border-[rgba(0,0,0,0.1)]"
                            style={{
                                borderColor: "rgba(0, 0, 0, 0.1)",
                                height: "14px",
                                margin: "0px 10px 10px",
                            }}
                        ></div>

                        {/* 사업자 등록 번호 부분*/}
                        <div
                            className="inline-flex flex-row flex-none max-w-full text-base font-normal items-baseline mb-2.5"
                            style={{ lineHeight: "19px" }}
                        >
                            <span
                                className="flex-none font-normal"
                                style={{
                                    fontSize: "13px",
                                    color: "rgba(0, 0, 0, 0.4)",
                                    lineHeight: "18px",
                                }}
                            >
                                사업자등록번호
                            </span>
                            <span
                                className="ml-2 flex-shrink flex-grow text-gray-600 text-xs font-normal break-all"
                                style={{
                                    color: "rgba(0, 0, 0, 0.6)",
                                    lineHeight: "18px",
                                    fontSize: "13px",
                                }}
                            >
                                211-8868802
                            </span>
                            <a href="#" className="ml-2 bg-transparent no-underline text-current">
                                <button
                                    className="relative flex items-center justify-center w-auto max-w-xs bg-transparent h-7 rounded px-2"
                                    style={{
                                        boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 0px 1px inset",
                                        borderRadius: "6px",
                                        maxWidth: "480px",
                                    }}
                                >
                                    <span
                                        className="text-xs font-normal mx-0.5"
                                        style={{ lineHeight: "16px", color: "rgba(0, 0, 0, 0.8)" }}
                                    >
                                        사업자 정보 확인
                                    </span>
                                </button>
                            </a>
                        </div>
                        <div
                            className="mb-2 border-l border-gray-200"
                            style={{ height: "14px", margin: "0px 10px 10px" }}
                        ></div>

                        {/* 통신 판매업 문구 부분 */}
                        <div
                            className="inline-flex flex-row items-baseline mb-2.5"
                            style={{
                                maxWidth: "100%",
                                fontSize: "14px",
                                lineHeight: "19px",
                                fontWeight: "normal",
                                alignItems: "baseline",
                                marginBottom: "10px",
                            }}
                        >
                            <span
                                className="flex-none text-gray-600 text-sm leading-4.5"
                                style={{
                                    color: "rgba(0, 0, 0, 0.4)",
                                    fontSize: "13px",
                                    lineHeight: "18px",
                                    fontWeight: "normal",
                                }}
                            >
                                통신판매업신고
                            </span>
                            <span
                                className="ml-2 flex-auto text-gray-700 break-words"
                                style={{
                                    color: "rgba(0, 0, 0, 0.6)",
                                    fontSize: "13px",
                                    lineHeight: "18px",
                                    fontWeight: "normal",
                                }}
                            >
                                제 2018-서울서초-2635
                            </span>
                        </div>
                    </div>

                    {/* 두번째 줄 */}
                    <div className="flex flex-wrap items-center">
                        <div
                            className="inline-flex flex-row flex-none max-w-full text-base font-normal items-baseline mb-2.5"
                            style={{ lineHeight: "19px" }}
                        >
                            <span
                                className="flex-none font-normal ml-2"
                                style={{
                                    color: "rgba(0, 0, 0, 0.4)",
                                    fontSize: "13px",
                                    lineHeight: "18px",
                                    flex: "0 0 auto",
                                }}
                            >
                                주소
                            </span>
                            <span
                                className="flex-grow-0 flex-shrink ml-2 font-normal break-words"
                                style={{
                                    color: "rgba(0, 0, 0, 0.6)",
                                    fontSize: "13px",
                                    lineHeight: "18px",
                                }}
                            >
                                서울시 서초구 서초대로38길 12 마제스타시티 타워2 17층
                            </span>
                        </div>
                        <div
                            className="border-l border-[rgba(0,0,0,0.1)]"
                            style={{
                                borderColor: "rgba(0, 0, 0, 0.1)",
                                height: "14px",
                                margin: "0px 10px 10px",
                            }}
                        ></div>
                        <div
                            className="inline-flex flex-row flex-none max-w-full text-base font-normal items-baseline mb-2.5"
                            style={{ lineHeight: "19px" }}
                        >
                            <span
                                className="flex-none font-normal"
                                style={{
                                    color: "rgba(0, 0, 0, 0.4)",
                                    lineHeight: "18px",
                                    fontSize: "13px",
                                }}
                            >
                                개인정보보호책임자
                            </span>
                            <span
                                className="ml-2 break-words font-normal text-xs"
                                style={{
                                    color: "rgba(0, 0, 0, 0.6)",
                                    fontSize: "13px",
                                    lineHeight: "18px",
                                    flex: "0 1 auto",
                                }}
                            >
                                privacy@yogiyo.co.kr
                            </span>
                        </div>
                    </div>

                    {/* 세번째 줄 */}
                    <div className="flex flex-wrap items-center">
                        <div
                            className="inline-flex flex-row flex-none max-w-full text-base font-normal items-baseline mb-2.5"
                            style={{ lineHeight: "19px" }}
                        >
                            <span
                                className="flex-none font-normal ml-2"
                                style={{
                                    color: "rgba(0, 0, 0, 0.4)",
                                    fontSize: "13px",
                                    lineHeight: "18px",
                                    flex: "0 0 auto",
                                }}
                            >
                                제휴문의
                            </span>
                            <span
                                className="flex-grow-0 flex-shrink ml-2 font-normal break-words"
                                style={{
                                    color: "rgba(0, 0, 0, 0.6)",
                                    fontSize: "13px",
                                    lineHeight: "18px",
                                }}
                            >
                                partnership@yogiyo.co.kr
                            </span>
                        </div>
                        <div
                            className="border-l border-[rgba(0,0,0,0.1)]"
                            style={{
                                borderColor: "rgba(0, 0, 0, 0.1)",
                                height: "14px",
                                margin: "0px 10px 10px",
                            }}
                        ></div>
                        <div
                            className="inline-flex flex-row flex-none max-w-full text-base font-normal items-baseline mb-2.5"
                            style={{ lineHeight: "19px" }}
                        >
                            <span
                                className="flex-none font-normal"
                                style={{
                                    color: "rgba(0, 0, 0, 0.4)",
                                    lineHeight: "18px",
                                    fontSize: "13px",
                                }}
                            >
                                고객만족센터
                            </span>
                            <span
                                className="ml-2 break-words font-normal text-xs"
                                style={{
                                    color: "rgba(0, 0, 0, 0.6)",
                                    fontSize: "13px",
                                    lineHeight: "18px",
                                    flex: "0 1 auto",
                                }}
                            >
                                support@yogiyo.co.kr
                            </span>
                        </div>
                        <div
                            className="border-l border-[rgba(0,0,0,0.1)]"
                            style={{
                                borderColor: "rgba(0, 0, 0, 0.1)",
                                height: "14px",
                                margin: "0px 10px 10px",
                            }}
                        ></div>
                        <div
                            className="inline-flex flex-row flex-none max-w-full text-base font-normal items-baseline mb-2.5"
                            style={{ lineHeight: "19px" }}
                        >
                            <span
                                className="flex-none font-normal"
                                style={{
                                    color: "rgba(0, 0, 0, 0.4)",
                                    lineHeight: "18px",
                                    fontSize: "13px",
                                }}
                            >
                                전화
                            </span>
                            <span
                                className="ml-2 break-words font-normal text-xs"
                                style={{
                                    color: "rgba(0, 0, 0, 0.6)",
                                    fontSize: "13px",
                                    lineHeight: "18px",
                                    flex: "0 1 auto",
                                }}
                            >
                                1661-5270(유료) 24시간, 연중무휴
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </footer>
    );
};

export default Footer;
