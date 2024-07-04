import { FaStar } from "react-icons/fa";
import { Button } from "../common/Button";
import { getAxios } from "@/app/services/loginAPI";
import React, { useState } from "react";
import { patchReply } from "@/app/services/reviewAPI";
import { IReviewContent } from "./Review";

const ReviewItem = ({
    id,
    tasteScore,
    quantityScore,
    deliveryScore,
    totalScore,
    content,
    ownerReply,
    memberName,
    createdAt,
    reviewImages,
    menus,
}: IReviewContent) => {
    const [clickBtn, setClickBtn] = useState<boolean>(false);
    const [replyContent, setReplyContent] = useState<string | undefined>();
    // console.log(reviews);
    // console.log(reviewReply);
    // console.log(replyContent);

    const handlePatchReview = (reviewId: number) => {
        patchReply(reviewId, replyContent);
        console.log(reviewId);
    };

    const deleteReply = async (reviewId: number) => {
        try {
            const res = await getAxios.delete(`owner/review/${reviewId}`);
            if (res.status === 204) console.log(res.data);
        } catch (error) {
            console.error("댓글 삭제 실패", error);
        }
        console.log(reviewId);
    };

    const onClickReplyBtn = () => {
        setClickBtn(!clickBtn);
    };

    const ReviewReply = (reviewId: number) => {
        const replyDate = new Date().toLocaleDateString();

        return (
            <div className="flex flex-col border rounded-xl px-2 py-2 bg-box-gray ">
                <div className="flex justify-between w-full px-2 py-2">
                    <span>사장님{replyDate}</span>
                    <div className="flex gap-2">
                        <button
                            className="text-yogiyo-blue"
                            onClick={() => {
                                handlePatchReview(reviewId);
                            }}
                        >
                            저장
                        </button>
                        <button
                            onClick={() => {
                                deleteReply(reviewId);
                            }}
                        >
                            삭제
                        </button>
                    </div>
                </div>
                <textarea
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="px-2 py-2 w-full h-[160px] outline-none resize-none bg-transparent"
                >
                    {replyContent}
                </textarea>
            </div>
        );
    };

    return (
        <div className="divide-y w-full">
            <div className="flex gap-6 py-4 px-4">
                <div className="flex flex-col text-custom-gray text-sm gap-1 py-2 px-2">
                    <span className="font-bold text-lg text-black">{memberName}</span>
                    <span className="flex font-bold text-md text-black">
                        <div className="flex items-center">
                            {totalScore} <FaStar style={{ color: "yellow" }} />
                        </div>
                    </span>
                    <div className="flex items-center gap-1 text-base">
                        <div className="flex">
                            맛
                            <div className="flex items-center text-[#fbfb47] font-bold">
                                <FaStar />
                                {tasteScore}
                            </div>
                        </div>
                        <div className="flex">
                            양
                            <div className="flex items-center text-[#fbfb47] font-bold">
                                <FaStar style={{ color: "yellow" }} />
                                {quantityScore}
                            </div>
                        </div>
                        <div className="flex">
                            배달
                            <div className="flex items-center text-[#fbfb47] font-bold">
                                <FaStar style={{ color: "yellow" }} />
                                <span>{deliveryScore}</span>
                            </div>
                        </div>
                    </div>
                    <span>{createdAt.toString().slice(0, 10)}</span>
                </div>
                <div className="grow px-4 py-2 gap-2">
                    <div className="flex flex-col py-2 text-custom-gray text-sm">
                        <span className="text-black text-base">{content}</span>
                        {reviewImages.length > 0 && (
                            <div>
                                {reviewImages.map((imageUrl, index) => (
                                    <img
                                        src={`https://yogiyo-clone.shop${imageUrl}`}
                                        key={index}
                                        className="w-32 h-32 border-hidden rounded-xl gap-1"
                                    />
                                ))}
                            </div>
                        )}
                        <div className="flex">
                            {menus.map((menu, index) => (
                                <span key={index}>
                                    {menu.name},{menu.quantity}개
                                </span>
                            ))}
                        </div>
                        <span>몇명이 도움됬는지?</span>
                        <div className="flex">
                            <Button
                                onClick={onClickReplyBtn}
                                text={"리뷰 쓰기"}
                                color="submit"
                                size="default"
                            />
                        </div>
                        {clickBtn ? ReviewReply(id) : <div></div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;
