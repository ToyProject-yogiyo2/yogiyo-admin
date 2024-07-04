"use client";

import { FaStar } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import { TotalReviewsAtom, shopIdAtom } from "@/app/recoil/state";
import TotalReview from "./TotalReview";
import React, { useEffect, useState } from "react";
import DatePickerComponent from "./DatePicker/DatePickerComponent";
import { Button } from "../common/Button";
import ReviewItem from "./ReviewItem";
import { fetchReviews } from "@/app/services/reviewAPI";
import { ItemLayout } from "../common/ItemLayout";
import { ItemHeader } from "../common/ItemHeader";

export const ReviewManagement = () => {
    const shopId = useRecoilValue(shopIdAtom);
    const [getReviews, setGetReviews] = useRecoilState(TotalReviewsAtom);
    const [sortReview, setSortReview] = useState("LATEST");
    const [hasReview, setHasReview] = useState<boolean>(false);
    const [cursor, setCursor] = useState<number>(0);
    const [subCursor, setSubCursor] = useState<number>(11);
    const [dateRange, setDateRange] = useState<{ startDate: Date | null; endDate: Date | null }>({
        startDate: null,
        endDate: null,
    });

    console.log(getReviews);

    const reviewOption = [
        { value: "LATEST", label: "최신순" },
        { value: "RATING_LOW", label: "별점 낮은순" },
        { value: "RATING_HIGH", label: "별점 높은순" },
    ];

    const handleFetchReviews = async () => {
        const fetchedReviews = await fetchReviews({
            shopId: shopId,
            dateRange,
            sortReview,
            cursor,
            subCursor,
        });
        setGetReviews(fetchedReviews);
        if (getReviews.content !== null) {
            setHasReview(true);
        }
    };

    const handleSortReview = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortReview(e.target.value);
    };

    const handleDateChange = (newDateRange: { startDate: Date | null; endDate: Date | null }) => {
        setDateRange(newDateRange);
    };

    // useEffect(() => {
    //     handleFetchReviews();
    //     console.log("useEffect hook");
    // }, [shopId, dateRange, sortReview, cursor, subCursor]);

    return (
        <div className="my-4 mx-2">
            <ItemLayout>
                <ItemHeader>
                    <TotalReview />
                </ItemHeader>
                <div className="flex flex-col border rounded-xl py-4 w-full bg-white">
                    <div className="flex px-4 gap-2">
                        <div className="flex">
                            <select
                                className="border rounded-xl px-2 py-2 text-custom-gray"
                                onChange={handleSortReview}
                                value={sortReview}
                            >
                                {reviewOption.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex">
                            <DatePickerComponent
                                dateRange={dateRange}
                                onChange={handleDateChange}
                            />
                        </div>

                        <Button
                            onClick={handleFetchReviews}
                            text={"조회"}
                            color="submit"
                            size="default"
                        />
                    </div>
                    <>
                        {hasReview ? (
                            getReviews.content.map((item) => <ReviewItem key={item.id} {...item} />)
                        ) : (
                            <EmptyReview />
                        )}
                    </>
                </div>
            </ItemLayout>
        </div>
    );
};

const EmptyReview = () => {
    return (
        <div className="flex mx-2 my-2">
            <span className="px-2">Review is not loading</span>
        </div>
    );
};
