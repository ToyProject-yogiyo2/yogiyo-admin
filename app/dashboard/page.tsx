"use client";
import React, { useState, useEffect, Suspense } from "react";
import { content, userStateAtom } from "../recoil/state";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { ManageBusinessHours } from "@/components/businessHoursSidebar/ManageBusinessHours";
import Footer from "@/components/home/Footer";
import PauseService from "@/components/businessHoursSidebar/PauseService";
import HolidaySchedule from "@/components/businessHoursSidebar/HolidaySchedule";

import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import DashboardMypageMain from "./DashboardMypageMain";

import { useRouter } from "next/navigation";
import { ReviewManagement } from "./review/ReviewManagement";
import MenuSet from "./menu/MenuSet";

function Loading() {
    return <div>Loading...</div>;
}

const Page = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState("main"); // 초기 메뉴를 "main"으로 설정
    const toggleModal = () => setIsModalOpen(!isModalOpen);
    const user = useRecoilValue(userStateAtom);
    const router = useRouter();

    const MenuPage = React.lazy(() => import("./menu/MenuSet"));

    const setContent = useRecoilValue(content);
    const setRecoilContent = useSetRecoilState(content);

    useEffect(() => {
        if (!user?.isLoggedIn) {
            router.push("/login");
        }
    }, []);

    useEffect(() => {
        setRecoilContent(selectedMenu);
    }, [selectedMenu, setRecoilContent]);

    return (
        <div className="flex flex-col min-h-screen">
            <DashboardNavbar />
            <div className="flex flex-row flex-1">
                <DashboardSidebar toggleModal={toggleModal} setSelectedMenu={setSelectedMenu} />
                <div className="flex flex-col flex-1 bg-[#F7F7F7] overflow-auto z-10 overscroll-none">
                    {/* 메인 컨텐츠 영역 */}
                    {setContent === "main" && <DashboardMypageMain />}
                    {setContent === "manageBusinessHours" && <ManageBusinessHours />}
                    {setContent === "pauseService" && (
                        <PauseService onClose={() => console.log("메인클릭")} />
                    )}
                    {setContent === "holidaySchedule" && <HolidaySchedule />}
                    {setContent === "menuSet" && (
                        <Suspense fallback={<Loading />}>
                            <MenuPage onClose={() => console.log("메인클릭")} />
                        </Suspense>
                    )}
                    {setContent === "ReviewManagement" && <ReviewManagement />}
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Page;
