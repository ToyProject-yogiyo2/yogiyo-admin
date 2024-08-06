import { getAxios } from "@/app/services/loginAPI";
import { Button } from "@/components/common/Button";
import { ModalLayout } from "@/components/common/ModalLayout";
import { ModalProps } from "@/lib/types";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import { OptionMenu } from "../option";

interface IReorderOptionItem extends ModalProps {
    optionGroupId: number | null;
    optionList: OptionMenu[];
}

export const ReorderOptionItem = ({ onClose, optionGroupId, optionList }: IReorderOptionItem) => {
    const [enabled, setEnabled] = useState(false);
    const initialOptionItems = optionList
        .filter((item) => item.id === optionGroupId)
        .flatMap((item) => (item.menuOptions ? item.menuOptions.map((option) => option.id) : []));

    const [optionItemIds, setOptionItemIds] = useState(initialOptionItems);

    console.log(initialOptionItems);

    const onDragEnd = ({ source, destination }: DropResult) => {
        if (!destination) return null;

        const updatedOptionIds = Array.from(optionItemIds);
        const [targetId] = updatedOptionIds.splice(source.index, 1);
        updatedOptionIds.splice(destination.index, 0, targetId);

        setOptionItemIds(updatedOptionIds);
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

    if (!enabled) {
        return null;
    }

    const reorderOptionItems = async () => {
        try {
            const res = await getAxios.put(
                `owner/menu-option-group/${optionGroupId}/change-option-position`,
                {
                    menuOptionIds: optionItemIds,
                }
            );
            if (res.status === 204) {
                console.log("옵션 아이템 순서 변경 성공", res.data);
            }
        } catch (error) {
            console.error("옵션순서변경 실패", error);
        }
    };

    // 원본 데이터 수정을 방지하고 react-dnd에 적용시킬 데이터
    const orderedOptionItem = optionItemIds
        .map((id) => {
            const foundOption = optionList
                .flatMap((item) => item.menuOptions || [])
                .find((option) => option.id === id);

            return foundOption || null;
        })
        .filter((item) => item !== null);

    return (
        <ModalLayout>
            <div className="flex flex-col h-full">
                <div className="flex justify-center items-center font-bold text-xl relative border-b pb-4">
                    <span>메뉴 순서 변경</span>
                    <button className="absolute right-4 pr-6" onClick={onClose}>
                        X
                    </button>
                </div>
                <div className="flex-grow overflow-auto py-4 px-4 scrollbar-hide">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    {orderedOptionItem.length > 0 ? (
                                        orderedOptionItem.map(
                                            (item, index) =>
                                                item && ( // item이 null일수 있는 상황 제거
                                                    <Draggable
                                                        key={item.id}
                                                        draggableId={`item${item.id}`}
                                                        index={index}
                                                    >
                                                        {(provided) => (
                                                            <div
                                                                className="border rounded-xl px-4 py-2 mb-2"
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                {item.content}
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                )
                                        )
                                    ) : (
                                        <div>null</div>
                                    )}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
                <Button
                    onClick={() => reorderOptionItems()}
                    text={"저장"}
                    color="submit"
                    size="wideButton"
                    className="sticky bottom-0"
                />
            </div>
        </ModalLayout>
    );
};
