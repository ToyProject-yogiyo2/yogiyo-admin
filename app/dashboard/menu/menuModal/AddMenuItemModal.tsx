import { menuItemAtom } from "@/app/recoil/state";
import { getAxios } from "@/app/services/loginAPI";
import { ImageUploadBtn } from "@/components/common/ImageUploadBtn";
import { ModalLayout } from "@/components/common/ModalLayout";
import { ModalProps } from "@/lib/types";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";

interface MenuData {
    menuName?: string;
    content?: string;
    price?: number;
}

interface fetchGroupListProps extends ModalProps {
    fetchGroupList: () => void;
}

export const AddMenuItemModal = ({
    onClose,
    menuGroupId,
    itemId,
    fetchGroupList,
}: fetchGroupListProps & { menuGroupId: number | null; itemId?: number | null | undefined }) => {
    const [prevData, setPrevData] = useState<MenuData | null>(null);
    const [itemImage, setItemImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const menuGroup = useRecoilValue(menuItemAtom);
    let itemData = {};

    const filterMenuGroups = menuGroup.find((item) => item.id === menuGroupId);
    const filterMenuItem = filterMenuGroups?.menus?.find((item) => item.id === itemId);

    const handleImageSelect = (image: File | null) => {
        setItemImage(image);
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(image);
        } else {
            setImagePreview(null);
        }
    };

    const handleAddItem = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const menuItem = new FormData();

        if (prevData) {
            itemData = {
                name: prevData.menuName,
                content: prevData.content,
                price: prevData.price,
            };
            const jsonBlob = new Blob([JSON.stringify(itemData)], { type: "application/json" });
            menuItem.append("menuData", jsonBlob);
        }
        if (itemImage && itemImage instanceof File) {
            menuItem.append("picture", itemImage);
        }
        try {
            const res = await getAxios.post(`/owner/menu-group/${menuGroupId}/add-menu`, menuItem, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(res.data);
            fetchGroupList();
            onClose();
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddMenu = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrevData({ ...prevData, [e.target.id]: e.target.value });
    };

    return (
        <ModalLayout>
            <div>
                <p className="flex justify-center text-2xl font-bold">메뉴 추가</p>
                <div className="flex justify-end border-b gap-2 pb-4">
                    <button
                        className="border rounded-md px-2 py-1 bg-yogiyo-gray text-md font-bold"
                        onClick={onClose}
                    >
                        취소
                    </button>
                    <button
                        className="border rounded-md px-2 py-1 bg-yogiyo-blue text-md font-bold text-white"
                        onClick={handleAddItem}
                    >
                        저장
                    </button>
                </div>
            </div>
            <div className="flex  py-4 px-2">
                <span className="flex text-lg font-bold pr-4">메뉴명</span>
                <input
                    onChange={handleAddMenu}
                    value={filterMenuItem ? filterMenuItem?.name : prevData?.menuName}
                    id="menuName"
                    type="text"
                    className="border rounded-lg h-auto"
                ></input>
            </div>
            <div className="flex flex-col py-4 px-2">
                <span className="col-start-1 text-lg font-bold">메뉴설명(선택)</span>
                <div className="py-4 px-4">
                    <div className="flex flex-col gap-2 pl-4">
                        <input
                            onChange={handleAddMenu}
                            value={filterMenuItem ? filterMenuItem?.content : prevData?.content}
                            id="content"
                            type="text"
                            className="border rounded-lg"
                        ></input>

                        <ul className=" text-custom-gray text-sm list-disc">
                            <span className="font-bold">
                                주문수 올리는 메뉴설명 팁 작성팁 더보기
                            </span>
                            <li className="">구성품목, 양 알려주기</li>
                            <li className="">들어가는 재료, 맛과 식감 알려주기</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex py-4 px-2 gap-4">
                <span className="text-lg font-bold">가격</span>
                <input
                    onChange={handleAddMenu}
                    value={filterMenuItem ? filterMenuItem?.price : prevData?.price}
                    id="price"
                    type="number"
                    className="border rounded-lg"
                ></input>
            </div>
            <div className="flex items-center py-2 px-2 gap-2">
                <span className="text-lg font-bold">노출상태</span>
                <div className="flex items-center border divide-x rounded-lg text-lg py-1">
                    <button className="text-sm font-bold text-custom-gray  px-2">판매중</button>
                    <button className="text-sm font-bold text-custom-gray  px-2">하루품절</button>
                    <button className="text-sm font-bold text-custom-gray px-2">숨김</button>
                </div>
            </div>
            <div className="flex items-center py-4 px-2">
                <span className="text-lg font-bold">메뉴사진(선택)</span>
                <div className="flex items-center">
                    <ImageUploadBtn onImageSelect={handleImageSelect} />
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="preview"
                            className="w-[70px] h-[70px] rounded-lg"
                        />
                    )}
                </div>
            </div>
        </ModalLayout>
    );
};
