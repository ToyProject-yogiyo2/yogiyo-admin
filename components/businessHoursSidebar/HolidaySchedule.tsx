import React, { useState, useEffect } from "react";

export const HolidaySchedule = () => {
    // 시간 옵션 생성 함수
    const generateOptions = (items: (string | number | undefined)[], suffix: string) =>
        items.map((item: string | number | undefined) => (
            <option key={item} value={item}>
                {item + suffix}
            </option>
        ));


    // 시간 옵션 생성
    const generateHourOptions = () => {
        const hours: string[] = [];
        const periods = ["오전", "오후"];
        periods.forEach((period) => {
            for (let i = 1; i <= 12; i++) {
                hours.push(`${period} ${i}시`);
            }
        });
        return hours;
    };

    // 분 옵션 생성
    const generateMinuteOptions = () => {
        const minutes: string[] = [];
        for (let i = 0; i <= 50; i += 10) {
            minutes.push(`${i}분`);
        }
        return minutes;
    };

    // 반응형 대응
    const [maxWidthStyle, setMaxWidthStyle] = useState("936px");

    // 수정 버튼 상태관리
    const [isEditMode, setIsEditMode] = useState(false);
    const [isDailyMode, setIsDailyMode] = useState(true); // 새로운 상태 변수 추가
    const [breakTimes, setBreakTimes] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1024) {
            setMaxWidthStyle("calc(100% - 80px)");
        } else if (screenWidth >= 768) {
            setMaxWidthStyle("calc(100% - 64px)");
        } else {
            setMaxWidthStyle("936px");
        }
    }, []);

    // 수정 버튼 클릭 핸들러
    const handleEditClick = () => setIsEditMode(true);
    const handleCancelClick = () => setIsEditMode(false);
    const handleDailyClick = () => setIsDailyMode(true);
    const handleDifferentDaysClick = () => setIsDailyMode(false);
    const handleAddBreakTime = (day: string) =>
        setBreakTimes((prev) => ({ ...prev, [day]: true }));
    const handleRemoveBreakTime = (day: string) =>
        setBreakTimes((prev) => ({ ...prev, [day]: false }));

    // 시간 선택 컴포넌트
    const TimeSelection = ({ label }: { label: string }) => (
        <>
            <span className="text-sm text-gray-400">{label}</span>
            <select className="border border-gray-300 text-gray-700 bg-white rounded-md py-2 px-4 mx-2">
                {generateOptions(generateHourOptions(), "")}
            </select>
            <select className="border border-gray-300 text-gray-700 bg-white rounded-md py-2 px-4 mx-2">
                {generateOptions(generateMinuteOptions(), "")}
            </select>
        </>
    );

    // 휴게시간 섹션 컴포넌트
    const BreakTimeSection = ({ day }: { day: string }) => (
        <div className="bg-gray-100 rounded-md mt-5 p-4 relative">
            <button
                className="absolute top-2 right-2"
                onClick={() => handleRemoveBreakTime(day)}
            >
                X
            </button>
            <p className="text-gray-700 text-lg mb-2">휴게시간</p>
            <TimeSelection label="시작" />
            <TimeSelection label="종료" />
        </div>
    );

    // 요일 섹션 컴포넌트
    const DaySection = ({ day }: { day: string }) => (
        <div key={day}>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <p className="text-gray-700 text-lg inline-block mr-2">{day}</p>
                    <p className="text-gray-700 text-lg inline-block mr-4">영업일</p>
                </div>
                <div className="flex items-center">
                    <p className="text-gray-700 text-lg mr-2">24시간</p>
                    <input type="checkbox" />
                </div>
            </div>
            <TimeSelection label="시작" />
            <TimeSelection label="종료" />
            <button className="text-blue-500 mt-2" onClick={() => handleAddBreakTime(day)}>
                + 휴게시간 추가
            </button>
            {breakTimes[day] && <BreakTimeSection day={day} />}
            <div className="border-t border-gray-200 my-5"></div>
        </div>
    );

    return (
        <div className="w-full">
            <div style={{ maxWidth: maxWidthStyle }} className="flex flex-auto flex-col mx-auto">
                <div className="flex-auto min-w-0" style={{ maxWidth: "936px" }}>
                    <div
                        className="flex flex-col mt-8 rounded-lg bg-white"
                        style={{
                            border: "1px solid rgba(0, 0, 0, 0.1)",
                            boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 6px",
                        }}
                    >
                        {/* 윗부분 */}
                        <div
                            className="pt-8 px-6 pb-6"
                            style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}
                        >
                            <div className="flex items-center">
                                <div
                                    className="flex items-center flex-auto"
                                    style={{
                                        minHeight: "2.5rem",
                                        fontSize: "1.375rem",
                                        lineHeight: "1.875rem",
                                        color: "rgba(0, 0, 0, 0.8)",
                                    }}
                                >
                                  정기 휴무일
                                </div>
                                <div className="ml-2 flex">
                                    {!isEditMode && (
                                        <button className="text-blue-500" onClick={handleEditClick}>
                                            수정
                                        </button>
                                    )}
                                    {isEditMode && (
                                        <button className="text-blue-500" onClick={handleCancelClick}>
                                            취소
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* 중간 부분 */}
                        <div className="mt-6 mx-6 mb-8">
                            {isEditMode ? (
                                <div className="mb-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div style={{ flex: 1 }}>
                                            <p style={{ color: "#6B7280", fontSize: "1rem" }}>영업주기</p>
                                            <div className="flex gap-4">
                                                <button
                                                    className={`border ${isDailyMode ? "border-blue-500" : "border-gray-300"} text-gray-700 bg-white rounded-md py-4 px-10`}
                                                    onClick={handleDailyClick}
                                                >
                                                    매일 같은 시간에 영업해요
                                                </button>
                                                <button
                                                    className={`border ${!isDailyMode ? "border-blue-500" : "border-gray-300"} text-gray-700 bg-white rounded-md py-4 px-10`}
                                                    onClick={handleDifferentDaysClick}
                                                >
                                                    요일별로 다르게 영업해요
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {isDailyMode ? (
                                        <DaySection day="매일" />
                                    ) : (
                                        ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"].map((day) => (
                                            <DaySection key={day} day={day} />
                                        ))
                                    )}
                                </div>
                            ) : (
                                ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"].map((day) => (
                                    <div key={day}>
                                        <p className="text-gray-700 text-lg mb-4">{day}</p>
                                        <div className="border-t border-gray-200 mb-4"></div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
