import { userState } from "@/lib/types";
import { OwnerShopList, TempCloseShopRequest } from "../../app/services/shopAPI";
import { AtomEffect, atom, selector } from "recoil";
import { OptionMenu } from "@/components/option/option";
import { AddMenu, AddMenuGroup, MenuItem, MenuList } from "@/components/menu/menu";
import { IReview, IReviewContent } from "@/components/review/Review";

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
