import React from "react";
import Link from "@/node_modules/next/link";

type Props = {};

const DashboardNavbar = (props: Props) => {
    return (
        <nav
            className="flex items-center justify-between w-full bg-white border-b border-gray-200 px-3"
            style={{ height: "56px", borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}
        >
            <div className="flex items-center">
                {/* 이미지 로고, lg 이상에서만 표시 */}
                <Link href="/" className="hidden lg:inline-block w-[92px] h-[16px] mr-4">
                    <img src="/images/yogiyologo.png" alt="Yogiyo Logo" />
                </Link>
                <div className="border-l border-gray-300 h-4 -ml-2 lg:visible invisible"></div>
                {/* '셀프서비스' 문구, lg 이상에서만 표시 */}
                <span
                    className="hidden lg:inline-block text-base leading-6 ml-2 mb-0.5 lg:font-normal"
                    style={{ color: "rgb(51, 51, 51)" }}
                >
                    셀프서비스
                </span>
            </div>
            {/* '셀프서비스홈' 텍스트, lg 이하에서만 표시 */}
            <div className="lg:hidden absolute left-1/2 transform -translate-x-1/2">
                <span className="text-base leading-5 font-bold text-black text-opacity-80">
                    셀프서비스홈
                </span>
            </div>
        </nav>
    );
};

export default DashboardNavbar;
