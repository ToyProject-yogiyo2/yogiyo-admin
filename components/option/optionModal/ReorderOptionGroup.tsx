import { optionGroupAtom, shopIdAtom } from "@/app/recoil/state";
import { Button } from "@/components/common/Button";
import { ModalLayout } from "@/components/common/ModalLayout";
import { ModalProps } from "@/lib/types";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import { OptionMenu } from "../option";
import { changeOptionList } from "@/app/services/optionAPI";

export const ReorderOptionGroup = ({ onClose }: ModalProps) => {
    const shopId = useRecoilValue(shopIdAtom);
    const optionGroupList = useRecoilValue(optionGroupAtom);
    const [enabled, setEnabled] = useState(false);
    const initialOptionGroup = optionGroupList.map((item) => item.id);
    const [optionGroupIds, setOptionGroupIds] = useState(initialOptionGroup);

    console.log(optionGroupList);

    const onDragEnd = ({ source, destination }: DropResult) => {
        if (!destination) return null;

        const updatedOptionGroupIds = Array.from(optionGroupIds);
        const [targetId] = updatedOptionGroupIds.splice(source.index, 1);
        updatedOptionGroupIds.splice(destination.index, 0, targetId);

        setOptionGroupIds(updatedOptionGroupIds);
        console.log(optionGroupIds);

        console.log([targetId]);
        console.log(">> source", source);
        console.log(">> Destination", destination);
    };

    useEffect(() => {
        const animation = requestAnimationFrame(() => setEnabled(true));

        return () => {
            cancelAnimationFrame(animation);
            setEnabled(false);
        };
    }, []);

    const orderedOptionGroup = optionGroupIds.map(
        (id) => optionGroupList.find((item) => item.id === id) as OptionMenu
    );

    const noneOptionGroup = () => {
        return (
            <div>
                <span>옵션 아이템이 없습니다.</span>
            </div>
        );
    };
    if (!enabled) {
        return null;
    }
    return (
        <ModalLayout>
            <div>
                <div className="flex justify-center border-b text-xl font-bold pb-4 relative">
                    <button className="absolute left-4" onClick={onClose}>
                        X
                    </button>
                    <span>옵션 순서 변경</span>
                </div>
                <div className="border rounded-xl text-sm text-custom-gray p-4 my-4 bg-[#f5f5dc]">
                    <span>옵션을 끌어서 원하는 순서로 바꿀 수 있습니다.</span>
                </div>
                <div className="flex flex-col gap-2">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    {orderedOptionGroup.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={`item${item.id}`}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <div
                                                    className="border rounded-xl px-4 py-2"
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    {item.name}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
                <div className="flex justify-center pt-4">
                    <Button
                        onClick={() => {
                            changeOptionList(shopId, optionGroupIds);
                        }}
                        text={"저장"}
                        color="submit"
                        size="wideButton"
                    />
                </div>
            </div>
        </ModalLayout>
    );
};
