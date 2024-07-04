import { ReactNode } from "react";

interface IModalLayout {
    children: ReactNode;
    onClick?: () => void;
}

export const ModalLayout = ({ children, onClick }: IModalLayout) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="flex flex-col bg-white w-[32rem] h-1/2  rounded-2xl my-20">
                <div className="border py-6 px-3 rounded-2xl h-full overflow-y-auto scrollbar-hide">
                    {children}
                </div>
            </div>
        </div>
    );
};
