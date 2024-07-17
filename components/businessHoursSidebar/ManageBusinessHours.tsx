import React, { useEffect, useState } from "react";

type DaySchedule = {
    start: string;
    end: string;
    breakTime?: {
        start: string;
        end: string;
    };
};

type BusinessHours = {
    [key: string]: DaySchedule;
};

type BreakTime = {
    start: string;
    end: string;
};

type BreakTimes = {
    [key: string]: BreakTime;
};

export const ManageBusinessHours = () => {
    // 시간 옵션 생성 함수
    const generateOptions = (items: (string | number | readonly string[] | undefined)[], suffix: string) => {
        return items.map((item) => {
            if (item !== null && item !== undefined && typeof item !== 'object') {
                return (
                    <option key={item} value={item}>
                        {item + suffix}
                    </option>
                );
            }
            return null;
        });
    };

    const dayMap: { [key: string]: string } = {
        '월요일': 'monday',
        '화요일': 'tuesday',
        '수요일': 'wednesday',
        '목요일': 'thursday',
        '금요일': 'friday',
        '토요일': 'saturday',
        '일요일': 'sunday'
    };

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
        const minutes = [];
        for (let i = 0; i <= 50; i += 10) {
            minutes.push(`${i}분`);
        }
        return minutes;
    };

    const [businessHours, setBusinessHours] = useState<BusinessHours>({
        monday: { start: "오전 9시 00분", end: "오후 6시 00분" },
        tuesday: { start: "오전 9시 00분", end: "오후 6시 00분" },
        wednesday: { start: "오전 9시 00분", end: "오후 6시 00분" },
        thursday: { start: "오전 9시 00분", end: "오후 6시 00분" },
        friday: { start: "오전 9시 00분", end: "오후 6시 00분" },
        saturday: { start: "오전 9시 00분", end: "오후 6시 00분" },
        sunday: { start: "오전 9시 00분", end: "오후 6시 00분" },
    });

    const [tempBusinessHours, setTempBusinessHours] = useState<BusinessHours>({...businessHours});

    // 반응형 대응
    const [maxWidthStyle, setMaxWidthStyle] = useState("936px");

    // 수정 버튼 상태관리
    const [isEditMode, setIsEditMode] = useState(false);
    const [isDailyMode, setIsDailyMode] = useState(true);
    const [breakTimes, setBreakTimes] = useState<BreakTimes>({});

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
    const handleCancelClick = () => {
        setIsEditMode(false);
        setTempBusinessHours({...businessHours});
    };


    const handleConfirmClick = () => {
    const updatedBusinessHours = { ...tempBusinessHours };
    if (isDailyMode) {
        // 매일 모드일 때는 모든 요일에 같은 휴게시간을 적용
        const breakTime = breakTimes['매일'];
        if (breakTime) {
            Object.keys(updatedBusinessHours).forEach(day => {
                updatedBusinessHours[day] = {
                    ...updatedBusinessHours[day],
                    breakTime: breakTime
                };
            });
        }
    } else {
        // 요일별 모드일 때는 각 요일에 해당하는 휴게시간을 적용
        Object.keys(breakTimes).forEach(day => {
            if (updatedBusinessHours[dayMap[day]]) {
                updatedBusinessHours[dayMap[day]] = {
                    ...updatedBusinessHours[dayMap[day]],
                    breakTime: breakTimes[day]
                };
            }
        });
    }
    setBusinessHours(updatedBusinessHours);
    setBreakTimes({});
    setIsEditMode(false);
};


    const handleDailyClick = () => setIsDailyMode(true);
    const handleDifferentDaysClick = () => setIsDailyMode(false);
    const handleAddBreakTime = (day: string) => {
        setBreakTimes(prev => ({
            ...prev,
            [isDailyMode ? '매일' : day]: { start: "오전 12시 00분", end: "오후 1시 00분" }
        }));
    };
    const handleRemoveBreakTime = (day: string) => {
        setBreakTimes(prev => {
            const newBreakTimes = { ...prev };
            delete newBreakTimes[day];
            return newBreakTimes;
        });
    };

    const handleTimeChange = (day: string, type: 'start' | 'end', value: string) => {
        setTempBusinessHours(prev => ({
            ...prev,
            [day]: { ...prev[day], [type]: value }
        }));
        if (isDailyMode) {
            const updatedHours: BusinessHours = {};
            for (const key in tempBusinessHours) {
                updatedHours[key] = { ...tempBusinessHours[key], [type]: value };
            }
            setTempBusinessHours(updatedHours);
        }
    };

    const handleBreakTimeChange = (day: string, type: 'start' | 'end', value: string) => {
        setBreakTimes(prev => ({
            ...prev,
            [day]: { ...prev[day], [type]: value }
        }));
    };

    const TimeSelection = ({ label, day, type, isBreakTime = false }: { label: string, day: string, type: 'start' | 'end', isBreakTime?: boolean }) => {
        const time = isBreakTime ? breakTimes[day]?.[type] : tempBusinessHours[day]?.[type];
        const changeHandler = isBreakTime ? handleBreakTimeChange : handleTimeChange;
    
        if (!time) return null; // 시간이 설정되지 않았다면 렌더링하지 않음
    
        return (
            <>
                <span className="text-sm text-gray-400">{label}</span>
                <select 
                    className="border border-gray-300 text-gray-700 bg-white rounded-md py-2 px-4 mx-2"
                    value={time.split(' ')[0] + ' ' + time.split(' ')[1]}
                    onChange={(e) => changeHandler(day, type, e.target.value + ' ' + time.split(' ')[2])}
                >
                    {generateOptions(generateHourOptions(), "")}
                </select>
                <select 
                    className="border border-gray-300 text-gray-700 bg-white rounded-md py-2 px-4 mx-2"
                    value={time.split(' ')[2]}
                    onChange={(e) => changeHandler(day, type, time.split(' ')[0] + ' ' + time.split(' ')[1] + ' ' + e.target.value)}
                >
                    {generateOptions(generateMinuteOptions(), "")}
                </select>
            </>
        );
    };

    const BreakTimeSection = ({ day }: { day: string }) => (
        <div className="bg-gray-100 rounded-md mt-5 p-4 relative">
            <button
                className="absolute top-2 right-2"
                onClick={() => handleRemoveBreakTime(day)}
            >
                X
            </button>
            <p className="text-gray-700 text-lg mb-2">휴게시간</p>
            <TimeSelection label="시작" day={day} type="start" isBreakTime={true} />
            <TimeSelection label="종료" day={day} type="end" isBreakTime={true} />
        </div>
    );

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
            <TimeSelection label="시작" day={isDailyMode ? 'monday' : dayMap[day]} type="start" />
            <TimeSelection label="종료" day={isDailyMode ? 'monday' : dayMap[day]} type="end" />
            <button className="text-blue-500 mt-2" onClick={() => handleAddBreakTime(isDailyMode ? '매일' : day)}>
    + 휴게시간 추가
</button>
{breakTimes[isDailyMode ? '매일' : day] && <BreakTimeSection day={isDailyMode ? '매일' : day} />}
            <div className="border-t border-gray-200 my-5"></div>
        </div>
    );

    return (
        <div
            className="relative flex flex-col min-h-screen overflow-auto z-10 bg-[#F7F7F7]"
            style={{ flex: "1 1 auto", overscrollBehavior: "none", zIndex: 1 }}
        >
            {/* 네비게이션 바 부분 */}
            <div
                className="flex items-center w-full px-4 lg:px-6 h-16 bg-white shadow-md"
                style={{
                    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 8px",
                }}
            >
                {/* 네비게이션 카테고리 넣는 곳 */}
            </div>

            {/* 메인 콘텐츠 영역 */}
            <div className="w-full">
                <div style={{ maxWidth: maxWidthStyle }} className="flex flex-auto flex-col mx-auto">
                    <div className="flex-auto min-w-0" style={{ maxWidth: "936px" }}>
                        <div className="flex flex-col mt-8 rounded-lg bg-white" style={{
                            border: "1px solid rgba(0, 0, 0, 0.1)",
                            boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 6px",
                        }}>
                            {/* 윗부분 */}
                            <div className="pt-8 px-6 pb-6" style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}>
                                <div className="flex items-center">
                                    <div className="flex items-center flex-auto" style={{
                                        minHeight: "2.5rem",
                                        fontSize: "1.375rem",
                                        lineHeight: "1.875rem",
                                        color: "rgba(0, 0, 0, 0.8)",
                                    }}>
                                        영업시간
                                    </div>
                                    <div className="ml-2 flex">
                                        {!isEditMode && (
                                            <button className="text-blue-500" onClick={handleEditClick}>
                                                수정
                                            </button>
                                        )}
                                        {isEditMode && (
                                            <>
                                                <button className="text-blue-500 mr-2" onClick={handleCancelClick}>
                                                    취소
                                                </button>
                                                <button className="text-blue-500" onClick={handleConfirmClick}>
                                                    확인
                                                </button>
                                            </>
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
                                                <p style={{ color: "#6B7280", fontSize: "1rem" }}>
                                                    영업주기
                                                </p>
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
                                            <p className="text-gray-600 mb-2">
                                                영업시간: {businessHours[dayMap[day]]?.start || '설정되지 않음'} ~ {businessHours[dayMap[day]]?.end || '설정되지 않음'}
                                            </p>
                                            {businessHours[dayMap[day]]?.breakTime && (
                                                <p className="text-gray-600 mb-2">
                                                    휴게시간: {businessHours[dayMap[day]]?.breakTime?.start} ~ {businessHours[dayMap[day]]?.breakTime?.end}
                                                </p>
                                            )}
                                            <div className="border-t border-gray-200 mb-4"></div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};