import { userState } from "@/lib/types";
import { BusinessHours,OwnerShopList, TempCloseShopRequest } from "../../app/services/shopAPI";
import { AtomEffect, atom } from "recoil";
import { AddMenu, AddMenuGroup, MenuItem, MenuList } from "../dashboard/menu/menu";
import { OptionMenu } from "../dashboard/option/option";
import { IReview } from "../dashboard/review/Review";
import { IMainMenu } from "../dashboard/mainMenu/mainMenus";

const sessionStorageEffect: <T>(key: string) => AtomEffect<T> =
    (key: string) =>
    ({ setSelf, onSet }) => {
        if (typeof window !== "undefined") {
            onSet((newValue, _, isReset) => {
                isReset
                    ? sessionStorage.removeItem(key)
                    : sessionStorage.setItem(key, JSON.stringify(newValue));
            });
        }
    };

export const userStateAtom = atom<userState | null>({
    key: "user",
    default: {
        userId: 1111111,
        nickname: "",
        email: "",
        isLoggedIn: false,
        shopId: 111111,
    },
    effects: [sessionStorageEffect("user")],
});

export const tokenState = atom({
    key: "tokenState",
    default: "",
});

export const shoplistState = atom<OwnerShopList[] | null>({
    key: "shoplistStateAtom",
    default: null,
});

// export const shopIdState = atom<ShopId | null>({
//     key: "shopId",
//     default: null,
// });

export const isLoggedInState = atom({
    key: "isLoggedIn",
    default: false,
});

// export const menuState = atom({
//     key: "menuState",
//     default: "",
// });

export const ownerAddMenu = atom<AddMenuGroup>({
    key: "addMenuGroup",
    default: {
        shopId: 123121,
        name: "",
        content: "",
    },
});

export const content = atom({
    key: "dashboardState",
    default: "main",
});

export const navContent = atom({
    key: "dashboardNavContent",
    default: "menuSet",
});

export const menuListState = atom<MenuList[]>({
    key: "menuList",
    default: [],
});

export const addMenuGroup = atom<AddMenu>({
    key: "menuGroupList",
    default: {
        picture: "",
        menuData: {
            name: "",
            content: "",
            price: 10000,
        },
    },
});

export const menuItemAtom = atom<MenuItem[]>({
    key: "menuGroups",
    default: [],
});

//옵션 그룹 아톰
export const optionGroupAtom = atom<OptionMenu[]>({
    key: "optionGroup",
    default: [],
});

// shopId저장 아톰
export const shopIdAtom = atom<number>({
    key: "shopId",
    default: 11111,
});

export const businessHoursState = atom({
    key: 'businessHoursState',
    default: {
        monday: { start: "오전 9시 00분", end: "오후 6시 00분", is24Hours: false },
        tuesday: { start: "오전 9시 00분", end: "오후 6시 00분", is24Hours: false },
        wednesday: { start: "오전 9시 00분", end: "오후 6시 00분", is24Hours: false },
        thursday: { start: "오전 9시 00분", end: "오후 6시 00분", is24Hours: false },
        friday: { start: "오전 9시 00분", end: "오후 6시 00분", is24Hours: false },
        saturday: { start: "오전 9시 00분", end: "오후 6시 00분", is24Hours: false },
        sunday: { start: "오전 9시 00분", end: "오후 6시 00분", is24Hours: false },
    } as BusinessHours
});
  
  export const tempBusinessHoursState = atom({
    key: 'tempBusinessHoursState',
    default: {} as BusinessHours
  });


// 휴게시간
export const breakTimesState = atom<{[key: string]: {start: string, end: string}}>({
    key: 'breakTimesState',
    default: {}
});



// 일시정지 상태 저장
export const tempCloseShopRequestState = atom<TempCloseShopRequest | null>({
    key: "tempCloseShopRequestState",
    default: null,
});

// 리뷰 저장 아톰
export const TotalReviewsAtom = atom<IReview>({
    key: "totalReview",
    default: {
        nextCursor: 0,
        nextSubCursor: null,
        hasNext: false,
        content: [],
    },
});

export const mainMenuAtom = atom<IMainMenu>({
    key: "mainMenus",
    default: {
        signatureMenus: [
            {
                id: 1,
                name: "hello",
                content: "yeah",
                picture: "empty",
                price: 10000,
            },
        ],
    },
});
