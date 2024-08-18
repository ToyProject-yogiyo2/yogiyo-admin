import { getAxios } from "./loginAPI";

// 점주 가게 목록 조회
export interface OwnerShopList {
    id: number;
    name: string;
    icon: string;
}

// 가게 영업시간
export interface BusinessHour {
    dayOfWeek: string;
    openTime: string;
    closeTime: string;
    breakTimeStart: string | null;
    breakTimeEnd: string | null;
    isOpen: boolean;
    is24Hours: boolean;
}

// BusinessHours 타입 정의 추가
export type DaySchedule = {
    start: string;
    end: string;
    is24Hours: boolean; 
    breakTime?: {
        start: string;
        end: string;
    };
};

export type BusinessHours = {
    [key: string]: DaySchedule;
};

interface ShopBusinessHoursResponse {
    businessHours: BusinessHour[];
}

export const getShopBusinessHours = async (shopId: number): Promise<ShopBusinessHoursResponse> => {
    try {
        const response = await getAxios.get(`/owner/shop/${shopId}/business-hours`);
        return response.data;
    } catch (error) {
        console.error("Error fetching business hours:", error);
        throw error;
    }
};

// 영업시간 수정 요청 인터페이스
export interface UpdateBusinessHoursRequest {
    businessHours: BusinessHour[];
  }

// 영업시간 수정 함수
export const updateShopBusinessHours = async (shopId: number | undefined, updateRequest: UpdateBusinessHoursRequest): Promise<void> => {
    if (shopId === undefined) {
        console.error("Shop ID is undefined");
        throw new Error("Shop ID is undefined");
    }
    try {
        const response = await getAxios.patch(`/owner/shop/${shopId}/business-hours/update`, updateRequest);
        if (response.status === 204) {
            console.log("Business hours updated successfully");
        } else {
            console.warn("Unexpected response status:", response.status);
        }
    } catch (error) {
        console.error("Error updating business hours:", error);
        throw error;
    }
};


// 가게 일시정지
export interface TempCloseShopRequest {
    closeUntil: string | null;
    today: boolean | null;
}

export const ShopList = async () => {
    try {
        const resShops = await getAxios.get("/owner/shop/");
        console.log(resShops.data);

        // 각 상점 데이터에 icon URL 추가
        const updatedShops = resShops.data.map((shop: any) => ({
            ...shop,
            icon: `https://yogiyo-clone.shop${shop.icon}`,
        }));

        return updatedShops;
    } catch (error) {
        console.error("Error fetching shop list:", error);
        throw error;
    }
};

// 일시정지 기능
export const tempCloseShop = async (shopId: number, tempCloseRequest: TempCloseShopRequest) => {
    try {
        const response = await getAxios.patch(`/owner/shop/${shopId}/temp-close`, tempCloseRequest);
        if (response.status === 204) {
            return "Success"; // 성공 응답 처리
        }
        return response.data; // 기타 응답 데이터 처리
    } catch (error) {
        console.error("Error while attempting to temporarily close the shop:", error);
        throw error; // 에러 재던지기
    }
};



// 휴무일 인터페이스 
export interface CloseDay {
    weekNumOfMonth: number;
    dayOfWeek: string;
}

export interface UpdateCloseDaysRequest {
    closeDays: CloseDay[];
}

export const updateCloseDays = async (shopId: number, updateRequest: UpdateCloseDaysRequest): Promise<void> => {
    try {
        const response = await getAxios.patch(`/owner/shop/${shopId}/close-day/update`, updateRequest);
        if (response.status === 204) {
            console.log("Close days updated successfully");
        } else {
            console.warn("Unexpected response status:", response.status);
        }
    } catch (error) {
        console.error("Error updating close days:", error);
        throw error;
    }
};