//리뷰 타입
export interface IReview {
    nextCursor: number;
    nextSubCursor: number | null;
    hasNext: boolean;
    content: IReviewContent[];
}

// 리뷰 컨텐츠 타입
export interface IReviewContent {
    id: number;
    tasteScore: number;
    quantityScore: number;
    deliveryScore: number;
    totalScore: number;
    content: string;
    ownerReply: string | null;
    memberName: string;
    createdAt: string;
    reviewImages: string[];
    menus: IReviewMenus[];
}

export interface IReviewMenus {
    name: string;
    quantity: number;
    price: number;
}
