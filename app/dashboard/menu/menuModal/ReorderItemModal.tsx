import { menuItemAtom } from "@/app/recoil/state";
import { getAxios } from "@/app/services/loginAPI";
import { Button } from "@/components/common/Button";
import { ModalLayout } from "@/components/common/ModalLayout";
import { ModalProps } from "@/lib/types";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";

interface ReoderItemProps extends ModalProps {
    menuGroupId: number | null;
}

export const ReorderItemModal = ({ onClose, menuGroupId }: ReoderItemProps) => {
    const menuGroup = useRecoilValue(menuItemAtom);

    const initialMenusIds = menuGroup
        .filter((menu) => menu.id === menuGroupId)
        .flatMap((item) => (item.menus ? item.menus : []))
        .map((item) => item.id);
    const [enabled, setEnabled] = useState(false);
    console.log(initialMenusIds);

    const [menusIds, setMenusIds] = useState(initialMenusIds);

    const onDragEnd = ({ source, destination }: DropResult) => {
        if (!destination) return null;

        const updatedMenuIds = Array.from(menusIds);
        const [targetId] = updatedMenuIds.splice(source.index, 1);
        updatedMenuIds.splice(destination.index, 0, targetId);

        setMenusIds(updatedMenuIds);
        console.log(menusIds);

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

    // sortItem으로 menusIds를 포함하여 실시간으로 변경되고 있는 menuGroup.menus의 데이터를 보여줌
    const sortItem = menusIds
        .map((id) => {
            for (const group of menuGroup) {
                const foundItem = group.menus?.find((menu) => menu.id === id);
                if (foundItem) {
                    return foundItem;
                }
            }
            return null;
        })
        .filter((item) => item !== null);

    if (!sortItem) return null;
    console.log(sortItem);
    if (!enabled) {
        return null;
    }

    const onSubmitReorderMenu = async () => {
        try {
            const res = await getAxios.put(`owner/menu-group/${menuGroupId}/change-menu-position`, {
                menuIds: menusIds,
            });
            if (res.status === 204) {
                console.log("메뉴 그룹 메뉴 순서 변경 완료", res.data);
            }
        } catch (error) {
            console.error("메뉴 그룹 메뉴 순서 변경 실패", error);
        }
    };

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
                                    {sortItem.length > 0 ? (
                                        sortItem?.map(
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
                                                                {item.name}
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
                    onClick={() => onSubmitReorderMenu()}
                    text={"저장"}
                    color="submit"
                    size="wideButton"
                    className="sticky bottom-0"
                />
            </div>
        </ModalLayout>
    );
};
