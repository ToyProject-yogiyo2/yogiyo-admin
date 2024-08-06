import { FaStar } from "react-icons/fa";

const TotalReview = () => {
    return (
        <div className="flex flex-col w-full divide-y gap-2">
            <div className="px-4 py-2">
                <span className="text-custom-gray text-xl">리뷰관리</span>
            </div>
            <div className="px-4 py-4">
                <span className="text-custom-gray text-base">전체 별점</span>
                <div>
                    <div>
                        <FaStar size="16" color="yellow" />
                    </div>
                    <span>(총리뷰)</span>
                </div>
                <div>
                    <span>맛 </span>
                    <span>양</span>
                    <span>배달</span>
                </div>
            </div>
        </div>
    );
};

export default TotalReview;
