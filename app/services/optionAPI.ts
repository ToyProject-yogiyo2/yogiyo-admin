import { getAxios } from "./loginAPI";

// 옵션그룹 삭제
export const deleteOptionGroup = async (optionId: number) => {
    const optionID = optionId;
    try {
        const res = await getAxios.delete(`owner/menu-option-group/${optionId}/delete`);
    } catch (error) {
        console.error("삭제 실패", error);
    }
};

// 옵션 삭제
export const deleteOption = async (optionId: number) => {
    try {
        const res = await getAxios.delete(`/owner/menu-option-group/option/${optionId}/delete`);
        if (res.status === 204) {
            console.log("옵션 삭제 성공", res.data);
        }
    } catch (error) {
        console.error("옵션 삭제 실패", error);
    }
};

// 옵션 그룹 순서 변경
export const changeOptionList = async (shopId: number, optionGroupIds: number[]) => {
    try {
        const res = await getAxios.put(`/owner/menu-option-group/shop/${shopId}/change-position`, {
            menuOptionGroupIds: optionGroupIds,
        });
        if (res.status === 204) console.log(res.data);
    } catch (error) {
        console.error("옵션 그룹 순서 변경 실패", error);
    }
};
