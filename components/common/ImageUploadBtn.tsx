import React, { useRef } from "react";

interface ImgaeUploadProps {
    onImageSelect: (image: File | null) => void;
}

export const ImageUploadBtn = ({ onImageSelect }: ImgaeUploadProps) => {
    const imageRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null) {
            const file = e.target.files[0];
            onImageSelect(file);
            console.log("이미지 업로드", file);
        } else {
            onImageSelect(null);
        }
    };

    const handleClick = () => {
        if (imageRef.current) {
            imageRef.current.click();
        }
    };
    return (
        <form className="px-2.5">
            <div>
                <img
                    src="/Icons/add.png"
                    width={40}
                    height={40}
                    onClick={handleClick}
                    className="cursor-pointer"
                />
                <input
                    type="file"
                    accept="image/*"
                    ref={imageRef}
                    width={40}
                    height={40}
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                    className="border rounded-lg"
                ></input>
            </div>
        </form>
    );
};
