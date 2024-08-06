import React from "react";

interface ICheckbox {
    id: number;
    checked: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    checkItemHandler: (id: number, isChecked: boolean) => void;
}

export const Checkbox = ({ id, checked, onChange, checkItemHandler }: ICheckbox) => {
    const checkHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("checkHandler Action");
        checkItemHandler(parseInt(e.target.id), e.target.checked);
    };
    return (
        <label>
            <input type="checkbox" id={String(id)} checked={checked} onChange={checkHandler} />
        </label>
    );
};
