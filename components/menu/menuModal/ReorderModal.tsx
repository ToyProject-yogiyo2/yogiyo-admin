import { ReactNode, useEffect, useState } from "react";
import { ModalLayout } from "../../common/ModalLayout";
import { Button } from "../../common/Button";
import { ModalProps } from "@/lib/types";
import { useRecoilValue } from "recoil";
import { menuItemAtom, shopIdAtom } from "@/app/recoil/state";
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import { MenuItem } from "../menu";
import { getAxios } from "@/app/services/loginAPI";

interface fetchGroupListProps extends ModalProps {
    fetchGroupList: () => void;
}

export const ReorderModal = ({ onClose, fetchGroupList }: fetchGroupListProps) => {
    const shopId = useRecoilValue(shopIdAtom);
    const menuGroup = useRecoilValue(menuItemAtom);
    const initialMenuGroupIds = menuGroup.map((item) => item.id);
    const [menuGroupIds, setMenuGroupIds] = useState(initialMenuGroupIds);
    const [enabled, setEnabled] = useState(false);

    console.log(menuGroupIds);

    const onDragEnd = ({ source, destination }: DropResult) => {
        if (!destination) return null;

        const updatedMenuGroupIds = Array.from(menuGroupIds);
        const [targetId] = updatedMenuGroupIds.splice(source.index, 1);
        updatedMenuGroupIds.splice(destination.index, 0, targetId);

        setMenuGroupIds(updatedMenuGroupIds);
        console.log(menuGroupIds);

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

    // 메뉴 그룹 순서 변경
    const ReorderMenu = async (shopId: number, menuGroupIds: number[]) => {
        try {
            const res = await getAxios.put(`/owner/menu-group/shop/${shopId}/change-position`, {
                menuGroupIds: menuGroupIds,
            });
            if (res.status === 204) {
                console.log(res);
                console.log(res.data);
                fetchGroupList();
            }
        } catch (error) {
            console.error("메뉴 그룹 순서 변경 실패", error);
        }
    };

    const orderedMenuGroup = menuGroupIds.map(
        (id) => menuGroup.find((item) => item.id === id) as MenuItem
    );

    console.log(orderedMenuGroup);
    if (!enabled) {
        return null;
    }

    return (
        <ModalLayout>
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-center relative font-bold text-xl py-2 mb-4 border-b">
                    <span>순서 변경</span>
                    <button className="absolute right-4 pr-6" onClick={onClose}>
                        X
                    </button>
                </div>
                <div className="border bg-[#f5f5dc] rounded-xl mx-4 px-4 py-4 mb-4">
                    <span className="text-base">메뉴를 끌어서 원하는 순서로 바꿀 수 있습니다.</span>
                </div>
                <div className="flex-grow overflow-auto py-4 px-4">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    {orderedMenuGroup.map((item, index) => (
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
                <Button
                    onClick={() => {
                        ReorderMenu(shopId, menuGroupIds);
                    }}
                    text={"저장"}
                    color="submit"
                    size="wideButton"
                    className="sticky bottom-0"
                />
            </div>
        </ModalLayout>
    );
};
