import { getAxios } from "@/app/services/loginAPI";
import { ItemHeader } from "../menu/menuModal/common/ItemHeader";
import { ItemLayout } from "../menu/menuModal/common/ItemLayout";
import { FaStar } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { shopIdAtom } from "@/app/recoil/state";
import TotalReview from "./TotalReview";
import React, { useEffect, useState } from "react";
import DatePickerComponent from "./DatePicker/DatePickerComponent";
import { Button } from "../common/Button";

export const ReviewManagement = () => {
    const [sortReview, setSortReview] = useState("LATEST");
    const [dateRange, setDateRange] = useState<{ startDate: Date | null; endDate: Date | null }>({
        startDate: null,
        endDate: null,
    });
    const shopId = useRecoilValue(shopIdAtom);

    const reviewOption = [
        { value: "LATEST", label: "최신순" },
        { value: "RATING_LOW", label: "별점 낮은순" },
        { value: "RATING_HIGH", label: "별점 높은순" },
    ];
    const getReviews = async () => {
        try {
            const StrStartDate = dateRange.startDate
                ? dateRange.startDate.toISOString().slice(0, 10)
                : "";
            const StrEndDate = dateRange.endDate
                ? dateRange.endDate.toISOString().slice(0, 10)
                : "";
            const res = await getAxios.get(
                `/owner/review/shop/${shopId}?sort=${sortReview}&startDate=${StrStartDate}&endDate=${StrEndDate}&status=ALL&cursor=11&limit=10`
            );
            if (res.status === 200) {
                console.log(res.data);
            }
        } catch (error) {
            console.log("리뷰 조회 실패", error);
        }
    };

    const handleSortReview = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortReview(e.target.value);
    };

    const handleDateChange = (newDateRange: { startDate: Date | null; endDate: Date | null }) => {
        setDateRange(newDateRange);
    };

    useEffect(() => {
        console.log(sortReview);
    }, [handleSortReview]);

    return (
        <div className="my-4 mx-2">
            <ItemLayout>
                <ItemHeader>
                    <TotalReview />
                </ItemHeader>
                <div className="flex border rounded-xl px-4 py-4 w-full bg-white gap-2">
                    <div className="flex">
                        <select
                            className="border rounded-xl px-2 py-2"
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
                        <DatePickerComponent dateRange={dateRange} onChange={handleDateChange} />
                    </div>
                    <Button onClick={getReviews}>조회</Button>
                </div>
            </ItemLayout>
        </div>
    );
};
