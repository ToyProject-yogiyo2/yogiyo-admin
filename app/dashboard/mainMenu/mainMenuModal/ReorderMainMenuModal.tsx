import { shopIdAtom } from "@/app/recoil/state";
import { getAxios } from "@/app/services/loginAPI";
import { Button } from "@/components/common/Button";
import { ModalLayout } from "@/components/common/ModalLayout";
import { MenusItem } from "@/app/dashboard/menu/menu";
import { ModalProps } from "@/lib/types";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";

interface IReorderMainMenu extends ModalProps {
    fetchedMainMenu: () => void;
    mainMenu: MenusItem[];
}

export const ReorderMainMenuModal = ({ onClose, fetchedMainMenu, mainMenu }: IReorderMainMenu) => {
    const shopId = useRecoilValue(shopIdAtom);

    const initialOptionGroup = mainMenu.map((item: MenusItem) => item.id);
    const [mainMenuIds, setMainMenuIds] = useState(initialOptionGroup);
    const [enabled, setEnabled] = useState(false);

    console.log(mainMenu);
    console.log(initialOptionGroup);

    const onDragEnd = ({ source, destination }: DropResult) => {
        if (!destination) return null;

        const updatedMainMenuIds = Array.from(mainMenuIds);
        const [targetId] = updatedMainMenuIds.splice(source.index, 1);
        updatedMainMenuIds.splice(destination.index, 0, targetId);

        setMainMenuIds(updatedMainMenuIds);
        console.log(mainMenuIds);

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

    // 원본 데이터 수정을 방지하고 react-dnd에 적용시킬 데이터
    const orderedMainMenu = mainMenuIds.map(
        (id) => mainMenu.find((item) => item.id === id) as MenusItem
    );

    if (!enabled) {
        return null;
    }
    // 대표메뉴 순서 변경 api요청
    const reorderMainMenu = async () => {
        try {
            const res = await getAxios.put(`/owner/signature-menu/${shopId}/change-position`, {
                menuIds: mainMenuIds,
            });
            if (res.status === 204) {
                console.log(res.data, "대표메뉴 순서 변경 성공");
                fetchedMainMenu();
            }
        } catch (error) {
            console.error("대표메뉴 변경 요청 실패", error);
        }
    };

    return (
        <ModalLayout>
            <div className="flex flex-col h-full">
                <div className="flex justify-center text-xl font-bold w-full relative pb-4">
                    <span>대표메뉴 순서 변경</span>
                    <button className="absolute right-4 pr-6" onClick={onClose}>
                        X
                    </button>
                </div>

                <div className="flex-grow overflow-auto py-4 px-4 scrollbar-hide">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    {orderedMainMenu.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={`item${item.id}`}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <div
                                                    className="flex border rounded-xl px-4 py-2 mb-2 gap-2"
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <img
                                                        src={item.picture}
                                                        alt={item.name}
                                                        style={{
                                                            width: "50px",
                                                            height: "50px",
                                                            borderRadius: "5px",
                                                        }}
                                                    />
                                                    <div className="flex flex-col text-custom-gray">
                                                        <span className="font-bold">
                                                            {item.name}
                                                        </span>
                                                        <span>{item.price} 원</span>
                                                    </div>
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
                    text={"저장"}
                    size="wideButton"
                    color="submit"
                    className="sticky bottom-0"
                    onClick={() => reorderMainMenu()}
                />
            </div>
        </ModalLayout>
    );
};
