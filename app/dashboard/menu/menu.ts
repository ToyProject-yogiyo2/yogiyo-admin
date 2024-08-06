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
    visible?: string;
    picture?: string;
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
