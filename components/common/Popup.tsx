import { ModalProps } from "@/lib/types";
import React, { useState } from "react";
import { TbAlertSquareRounded } from "react-icons/tb";

interface IPopup extends ModalProps {
    message: string;
}

const Popup = ({ message, onClose }: IPopup) => {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-50 ">
            <div className="flex flex-col justify-center items-center border rounded-lg w-96 h-36 bg-white py-4 relative shadow-lg shadow-custom-gray">
                <span className="flex items-center gap-2 text-lg pb-2 h-full ">
                    <TbAlertSquareRounded size={"32px"} />
                    {message}
                </span>
                <button
                    onClick={onClose}
                    className="w-16 h-10 border rounded-2xl text-white font-bold bg-yogiyo-blue absolute bottom-2 right-2 "
                >
                    확인
                </button>
            </div>
        </div>
    );
};

export default Popup;
