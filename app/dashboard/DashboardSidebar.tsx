"use client";
import React, { useState, useEffect } from "react";
import { shopIdAtom, shoplistState } from "../recoil/state";
import { useRecoilState, useSetRecoilState } from "recoil";
import { OwnerShopList, ShopList } from "../services/shopAPI";
import DashboardModal from "./DashboardModal";
import Link from "next/link";
import { ManageBusinessHoursLink } from "../../components/businessHoursSidebar/ManageBusinessHoursLink";
import MenuGroup from "./menuSidebar/MenuGroup";
import { ReviewTab } from "./menuSidebar/ReviewTab";

// DashboardSidebar 컴포넌트의 props 타입 정의
interface DashboardSidebarProps {
    toggleModal: () => void;
    setSelectedMenu: (menu: string) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ setSelectedMenu, toggleModal }) => {
    const setShopList = useSetRecoilState(shoplistState);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [store, setStore] = useRecoilState(shoplistState);
    const [shopId, setShopId] = useRecoilState(shopIdAtom); // shopId를 담은 atom
    const [selectedShopId, setSelectedShopId] = useRecoilState(shopIdAtom);

    const [shopListDropdownOpen, setShopListDropdownOpen] = useState(false);

    const toggleShopListDropdown = () => setShopListDropdownOpen(!shopListDropdownOpen);

    // 모달 열고 닫는 함수
    const settoggleModal = () => setIsModalOpen(!isModalOpen);

    const fetchShopList = async () => {
        try {
            const fetchedShopList = await ShopList();
            setShopList(fetchedShopList);
            if (fetchedShopList.length > 0) {
                const firstShopId = fetchedShopList[0].id;
                setShopId(firstShopId);
                setSelectedShopId(firstShopId);
            }
        } catch (error) {
            console.error("Error fetching shop list:", error);
        }
    };

    const ownerStore = (store ?? []).map((shop: OwnerShopList) => {
        return (
            <div className="flex items-center gap-2" key={shop.id}>
                <img src={shop.icon} alt={shop.name} className="w-[28px] h-[28px]" />
                {/* icon의 사이즈는 28 28 */}
                <div className="flex flex-col">
                    <span className="text-lg font-bold">{shop.name}</span>
                    <p className="text-xs">ID. {shop.id}</p>{" "}
                    {/* 추후 영업 여부에 대한 값 넣어야 함 */}
                </div>
            </div>
        );
    });

    useEffect(() => {
        const fetchShopList = async () => {
            try {
                const fetchedShopList = await ShopList();
                if (fetchedShopList.length > 0) {
                    setStore(fetchedShopList);
                    setSelectedShopId(fetchedShopList[0].id);
                }
            } catch (error) {
                console.error("Error fetching shop list:", error);
            }
        };
        fetchShopList();
    }, [setStore, setSelectedShopId]);

    const handleSelectShop = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedShopId(parseInt(event.target.value, 10));
    };

    const selectedShop = store?.find((shop) => shop.id === selectedShopId);

    return (
        <div
            style={{ width: "260px", background: "#ffffff" }}
            className="relative z-10 flex flex-col"
        >
            {/* 대시보드 버튼 및 누르면 모달창 나오는 부분 */}
            <div className="flex justify-center py-4 h-[106px] border-b border-gray-200">
                {store && store.length > 0 ? (
                    <>
                        <div className="flex items-center gap-2">
                            <img
                                src={selectedShop?.icon}
                                alt={selectedShop?.name}
                                className="w-[28px] h-[28px]"
                            />
                            <div className="flex flex-col">
                                <span className="text-lg font-bold">{selectedShop?.name}</span>
                                <p className="text-xs">ID: {selectedShop?.id}</p>
                            </div>
                            <select
                                value={selectedShopId.toString()}
                                onChange={handleSelectShop}
                                className="mt-2"
                            >
                                {store.map((shop) => (
                                    <option key={shop.id} value={shop.id.toString()}>
                                        {shop.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </>
                ) : (
                    <div className="inline-flex items-center justify-start w-[236px] h-[74px] p-[19px_8px_19px_12px] bg-white rounded-[8px] border border-[rgba(0,0,0,0.6)] cursor-pointer relative flex-row font-bold">
                        <button onClick={() => setIsModalOpen(true)}>아직 가게가 없습니다</button>
                    </div>
                )}
            </div>
            {isModalOpen && <DashboardModal closeModal={settoggleModal} />}

            {/* 버튼 3개 부분 */}
            <div
                style={{ lineHeight: "16px", gap: "4px" }}
                className="w-full my-4 py-0 px-3 text-xs font-bold flex flex-row justify-between"
            >
                <Link href="/OrderHistory" passHref>
                    <button
                        onClick={() => setSelectedMenu("orderHistory")}
                        className="flex flex-col justify-center items-center flex-1 h-[76px] w-[76px] text-center gap-[9.4px] border border-gray-200 rounded bg-white text-gray-800"
                    >
                        <p>주문내역</p>
                    </button>
                </Link>
                <button className="flex flex-col justify-center items-center flex-1 h-[76px] w-[76px] text-center gap-[9.4px] border border-gray-200 rounded bg-white text-gray-800">
                    <p>통계</p>
                </button>
                <button className="flex flex-col justify-center items-center flex-1 h-[76px] w-[76px] text-center gap-[9.4px] border border-gray-200 rounded bg-white text-gray-800">
                    <p>사장님장부</p>
                </button>
            </div>
            {/* 실선 부분 */}
            <div
                style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.05)" }}
                className="my-3 mx-4"
            ></div>
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
                가게 관리
            </a>
            <ManageBusinessHoursLink setSelectedMenu={setSelectedMenu} />
            <MenuGroup />
            <ReviewTab />
            {/* 실선 부분 */}
            <div
                style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.05)" }}
                className="my-3 mx-4"
            ></div>
            {/* 승인 알림 부터 시작 */}
            <a
                style={{ lineHeight: "19px", color: "rgba(0, 0, 0, 0.8)", fontSize: "14px" }}
                className="flex flex-row items-center h-10 pl-6 font-normal no-underline"
            >
                승인알림
            </a>
            <a
                style={{ fontSize: "14px", lineHeight: "19px", color: "rgba(0, 0, 0, 0.8)" }}
                className="flex flex-row items-center h-10 pl-6 font-normal no-underline"
            >
                요기요 공지사항
            </a>
            <a
                style={{ fontSize: "14px", lineHeight: "19px", color: "rgba(0, 0, 0, 0.8)" }}
                className="flex flex-row items-center h-10 pl-6 font-normal no-underline"
            >
                PC 주문접수 계정관리
            </a>
            {/* 단골질문 버튼 부분 */}
            <div
                style={{
                    fontSize: "14px",
                    lineHeight: "19px",
                    color: "rgba(0, 0, 0, 0.6)",
                    padding: "12px 18px 32px",
                }}
                className="font-bold"
            >
                <div className="flex items-center mb-5 min-h-10">
                    <a
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}
                        className="flex items-center justify-center rounded h-12 w-full"
                    >
                        단골질문
                    </a>
                </div>
            </div>
        </div>
    );
};

export default DashboardSidebar;
