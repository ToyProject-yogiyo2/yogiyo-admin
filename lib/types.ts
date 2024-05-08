export interface OwnerJoin {
    nickname: string;
    email: string;
    password: string;
    providerType: "DEFAULT";
}

export interface OwnerJoinResponse {
    id: number;
}

export interface OwnerLogin {
    email: string | null;
    password: string | null;
    authCode: null | string;
    providerType: "DEFAULT";
}

export interface SocialLogin {
    email: string | null;
    password: string | null;
    authcode: string;
    providerType: string;
}

export interface KakaoAuth {
    client_id: string;
    redirect_uri: string;
    repose_type: string;
}

export interface ReqAuth {
    code: string;
    client_id: string;
    redirect_uri: string;
    state?: string;
}

export interface userState {
    userId: number;
    nickname: string;
    email: string;
    isLoggedIn: boolean;
    shopId?: number;
}

export interface DynamicRoute {
    params: {
        provider: string;
    };
}

export interface AddMenuGroup {
    shopId: number;
    name: string;
    content: string;
}

export interface AddMenu {
    picture: string;
    menuData: {
        name: string;
        content: string;
        price: number;
    };
}

export interface MenuList {
    id: number;
    name: string;
    content: string;
}

export interface NewGroupMenu {
    name: string;
    content: string;
    price: number;
}

// 모달 오픈 클로즈 타입
export interface ModalProps {
    onClose: () => void;
}

export interface MenuItem {
    id: number;
    name: string;
    content: string;
    visible: string;
    menus?: MenusItem[] | null;
}

export interface MenusItem {
    id: number;
    content: string;
    price: number;
    name: string;
    visible: string;
    picture: string;
}

export interface ShopId {
    id: number;
}
