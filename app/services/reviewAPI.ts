import { getAxios } from "./loginAPI";

// 리뷰 조회
interface Reviews {
    dateRange: {
        startDate: Date | null;
        endDate: Date | null;
    };
    shopId: number;
    sortReview: string;
    cursor: number;
    subCursor: number;
}

export const fetchReviews = async ({
    dateRange,
    shopId,
    sortReview,
    cursor,
    subCursor,
}: Reviews) => {
    try {
        const StrStartDate = dateRange.startDate
            ? dateRange.startDate.toISOString().slice(0, 10)
            : "";
        const StrEndDate = dateRange.endDate ? dateRange.endDate.toISOString().slice(0, 10) : "";

        const res = await getAxios.get(
            `/owner/review/shop/${shopId}?sort=${sortReview}&startDate=${StrStartDate}&endDate=${StrEndDate}&status=ALL&?cursor=${cursor}&?subCursor=${subCursor}&limit=100`
        );
        if (res.status === 200) {
            console.log(res.data);
            return res.data;
        }
    } catch (error) {
        console.log("리뷰 조회 실패", error);
    }
};

// 리뷰 댓글 작성
export const patchReply = async (reviewId: number, replyContent: string | undefined) => {
    try {
        const res = await getAxios.patch(`owner/review/${reviewId}/reply`, {
            reply: replyContent,
        });
        if (res.status === 204) {
            console.log(res.data);
        }
    } catch (error) {
        console.error("댓글달기 실패", error);
    }
};
