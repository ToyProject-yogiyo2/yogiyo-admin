import { ReactNode } from "react";
import { Options } from "../../app/dashboard/option/option";

interface ItemProps {
    children: ReactNode;
    onClick?: () => void;
    option: Options;
    showImage?: boolean;
}

// const imageLoader = ({src, width, quality}) => {
//     return `https://yogiyo-clone.shop/images/${src}?w=${width}&q=${quality || 75}`
// }

const isPictuerEmpty = () => {
    return (
        <div>
            <img
                src="/Icons/대표메뉴없을때.svg"
                className="border rounded-lg mx-1 my-1 w-[48px] h-[48px]"
            />
        </div>
    );
};

export const ItemList = ({ children, option, showImage }: ItemProps) => {
    return (
        <div className="flex justify-between w-full mb-4" key={option.id}>
            <div className="flex">
                {showImage && option.picture && (
                    <img
                        src={option.picture}
                        className="border rounded-lg mx-1 my-1 w-[48px] h-[48px]"
                    />
                )}

                <div className="flex flex-col pt-2 pl-2">
                    <span className="text-base font-bold">{option.content}</span>
                    <span className="text-xs text-custom-gray pb-2">{option.price} 원</span>
                </div>
            </div>
            <div className="relative">
                <div className="flex items-center border rounded-lg  px-2 py-1">
                    <select>
                        <option>판매중</option>
                        <option>하루 품절</option>
                        <option>숨김</option>
                    </select>
                    {children}
                </div>
            </div>
        </div>
    );
};

const ItemTheme = {};
