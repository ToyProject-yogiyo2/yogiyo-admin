import React, { useState, useRef, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import PauseService from "./PauseService";
import { atom } from "recoil";
import HolidaySchedule from "./HolidaySchedule";

interface ManageBusinessHoursLinkProps {
    setSelectedMenu: (menu: string) => void;
}

export const ManageBusinessHoursLink: React.FC<ManageBusinessHoursLinkProps> = ({
    setSelectedMenu,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLUListElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current && dropdownRef.current) {
            containerRef.current.style.height = isOpen
                ? `${dropdownRef.current.scrollHeight + 40}px`
                : "40px"; // 기본 높이 + 드롭다운 리스트 높이
        }
    }, [isOpen]);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <a
                    style={{ lineHeight: "16px", color: "rgba(0, 0, 0, 0.4)" }}
                    className="pl-3 text-xs font-bold flex flex-row items-center h-10 decoration-none"
                >
                    <svg
                        width="20"
                        height="20"
                        fill="none"
                        style={{ fill: "none" }}
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <mask id="myMask" x="3" y="2" width="18" height="20">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M 14.1213 3.70705 C 12.9497 2.53547 11.0503 2.53548 9.87868 3.70705 L 3.87868 9.70705 C 3.31607 10.2697 3 11.0327 3 11.8284 V 18.4999 C 3 20.1568 4.34315 21.4999 6 21.4999 H 18 C 19.6569 21.4999 21 20.1568 21 18.4999 V 11.8284 C 21 11.0327 20.6839 10.2697 20.1213 9.70705 L 14.1213 3.70705 Z M 11.2929 5.12126 C 11.6834 4.73074 12.3166 4.73074 12.7071 5.12126 L 18.7071 11.1213 C 18.8946 11.3088 19 11.5632 19 11.8284 V 18.4999 C 19 19.0522 18.5523 19.4999 18 19.4999 H 15.25 V 15.589 C 15.25 13.7698 13.8194 12.2499 12 12.2499 C 10.1806 12.2499 8.75 13.7698 8.75 15.589 V 19.4999 H 6 C 5.44772 19.4999 5 19.0522 5 18.4999 V 11.8284 C 5 11.5632 5.10536 11.3088 5.29289 11.1213 L 11.2929 5.12126 Z M 10.25 19.4999 H 13.75 V 15.589 C 13.75 14.5483 12.942 13.7499 12 13.7499 C 11.058 13.7499 10.25 14.5483 10.25 15.589 V 19.4999 Z"
                                fill="rgb(255, 255, 255)"
                            ></path>
                        </mask>
                    </svg>
                    영업시간 관리
                </a>

                {/* Toggle Icon */}
                <svg
                    onClick={toggleOpen}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    className="mr-2"
                >
                    <path
                        fill="rgba(0,0,0,0.4)"
                        d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6-6-6z"
                    />
                </svg>
            </div>

            {isOpen && (
                <div className="ml-5 text-sm text-custom-gray">
                    {/* 영업시간, 휴무일, 일시정지 항목 클릭 핸들러 구현 */}
                    <ul className="flex flex-col">
                        <li
                            className="pt-2 pl-6"
                            onClick={() => setSelectedMenu("manageBusinessHours")}
                        >
                            영업시간
                        </li>
                        <li
                            className="pt-2 pl-6"
                            onClick={() => setSelectedMenu("holidaySchedule")}
                        >
                            휴무일
                        </li>
                        <li className="pt-2 pl-6" onClick={() => setSelectedMenu("pauseService")}>
                            일시정지
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};
