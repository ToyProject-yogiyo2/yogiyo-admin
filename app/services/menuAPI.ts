import { getAxios } from "./loginAPI";

// 메뉴 그룹 전체 조회
export const GroupList = async (shopId: number) => {
    try {
        const res = await getAxios.get(`/owner/menu-group/shop/${shopId}`);
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

// 메뉴 그룹 삭제

export const DeleteMenuGroup = async () => {
    try {
        const res = await getAxios.delete(`owner/menu-group/`);
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error("삭제오류", error);
    }
};

// 메뉴 그룹 메뉴 삭제
export const deleteMenuItem = async (menuGroupId: number) => {
    try {
        const res = await getAxios.delete(`/owner/menu-group/delete-menu/${menuGroupId}`);
        if (res.status === 204) {
            console.log(res.data);
            console.log(res);
        }
    } catch (error) {
        console.error("메뉴 삭제실패", error);
    }
};

// 메뉴 그룹 메뉴 조회
