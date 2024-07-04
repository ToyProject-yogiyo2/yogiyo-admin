// 옵션 그룹 타입
export interface OptionMenu {
    id: number;
    name: string;
    position: number;
    optionType: string;
    count: number;
    isPossibleCount: boolean;
    visible: string;
    menuOptions?: Options[];
}

// 옵션 타입
export interface Options {
    id: number;
    content: string;
    price: number;
    position?: number;
    visible?: string;
    picture?: string;
}
