import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from 'recoil';
import { shopIdAtom, businessHoursState, tempBusinessHoursState, breakTimesState } from '../../app/recoil/state';
import { UpdateBusinessHoursRequest, updateShopBusinessHours, getShopBusinessHours } from '../../app/services/shopAPI'

type DaySchedule = {
    start: string;
    end: string;
    is24Hours: boolean;
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

const convertApiTimeToLocalFormat = (time: string): string => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? '오후' : '오전';
    const displayHour = hour % 12 || 12;
    return `${period} ${displayHour}시 ${minutes}분`;
};

export const ManageBusinessHours = () => {
    const shopId = useRecoilValue(shopIdAtom);
    const [businessHours, setBusinessHours] = useRecoilState(businessHoursState);
    const [tempBusinessHours, setTempBusinessHours] = useRecoilState(tempBusinessHoursState);
    const [breakTimes, setBreakTimes] = useRecoilState(breakTimesState);

    const [maxWidthStyle, setMaxWidthStyle] = React.useState("936px");
    const [isEditMode, setIsEditMode] = React.useState(false);
    const [isDailyMode, setIsDailyMode] = React.useState(true);

    useEffect(() => {
        if (Object.keys(tempBusinessHours).length === 0) {
            setTempBusinessHours({...businessHours});
        }
    }, [businessHours, tempBusinessHours, setTempBusinessHours]);

    useEffect(() => {
        const fetchBusinessHours = async () => {
            if (shopId) {
                try {
                    const response = await getShopBusinessHours(shopId);
                    const fetchedBusinessHours = response.businessHours.reduce((acc, hour) => {
                        acc[hour.dayOfWeek.toLowerCase()] = {
                            start: convertApiTimeToLocalFormat(hour.openTime),
                            end: convertApiTimeToLocalFormat(hour.closeTime),
                            is24Hours: hour.openTime === "00:00:00" && hour.closeTime === "23:59:59",
                            breakTime: hour.breakTimeStart && hour.breakTimeEnd ? {
                                start: convertApiTimeToLocalFormat(hour.breakTimeStart),
                                end: convertApiTimeToLocalFormat(hour.breakTimeEnd)
                            } : undefined
                        };
                        return acc;
                    }, {} as BusinessHours);
                    setBusinessHours(fetchedBusinessHours);
                    setTempBusinessHours(fetchedBusinessHours);
                } catch (error) {
                    console.error("영업시간 조회 중 오류 발생:", error);
                }
            }
        };

        fetchBusinessHours();
    }, [shopId, setBusinessHours, setTempBusinessHours]);

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

    const generateMinuteOptions = () => {
        const minutes = [];
        for (let i = 0; i <= 50; i += 10) {
            minutes.push(`${i}분`);
        }
        return minutes;
    };

    const handleEditClick = () => setIsEditMode(true);
    const handleCancelClick = () => {
        setIsEditMode(false);
        setTempBusinessHours({...businessHours});
        setBreakTimes({});
    };

    const convertToApiTimeFormat = (time: string): string => {
        const [period, hourStr, minuteStr] = time.split(' ');
        let hour = parseInt(hourStr);
        const minute = parseInt(minuteStr);
    
        if (period === "오후" && hour !== 12) {
            hour += 12;
        } else if (period === "오전" && hour === 12) {
            hour = 0;
        }
    
        return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`;
    };

    const handleConfirmClick = async () => {
        if (!shopId) {
            console.error("Shop ID is not available");
            return;
        }

        const updatedBusinessHours = { ...tempBusinessHours };
        if (isDailyMode) {
            const breakTime = breakTimes['매일'];
            const is24Hour = updatedBusinessHours['monday'].is24Hours;
            Object.keys(updatedBusinessHours).forEach(day => {
                updatedBusinessHours[day] = {
                    ...updatedBusinessHours[day],
                    breakTime: breakTime,
                    is24Hours: is24Hour
                };
            });
        } else {
            Object.keys(dayMap).forEach(day => {
                const englishDay = dayMap[day];
                updatedBusinessHours[englishDay] = {
                    ...updatedBusinessHours[englishDay],
                    breakTime: breakTimes[day],
                };
            });
        }

        const apiBusinessHours = Object.entries(updatedBusinessHours).map(([day, schedule]) => ({
            dayOfWeek: day.toUpperCase(),
            openTime: schedule.is24Hours ? "00:00:00" : convertToApiTimeFormat(schedule.start),
            closeTime: schedule.is24Hours ? "23:59:59" : convertToApiTimeFormat(schedule.end),
            breakTimeStart: schedule.breakTime ? convertToApiTimeFormat(schedule.breakTime.start) : null,
            breakTimeEnd: schedule.breakTime ? convertToApiTimeFormat(schedule.breakTime.end) : null,
            isOpen: true,
            is24Hours: schedule.is24Hours
        }));

        const updateRequest: UpdateBusinessHoursRequest = {
            businessHours: apiBusinessHours
        };

        try {
            await updateShopBusinessHours(shopId, updateRequest);
            console.log("영업시간이 성공적으로 수정되었습니다.");
            setBusinessHours(updatedBusinessHours);
            setTempBusinessHours(updatedBusinessHours);
            setIsEditMode(false);
        } catch (error) {
            console.error("영업시간 수정 중 오류 발생:", error);
        }
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
        setTempBusinessHours(prev => {
            const updatedHours = { ...prev };
            if (isDailyMode) {
                Object.keys(updatedHours).forEach(key => {
                    updatedHours[key] = { 
                        ...updatedHours[key], 
                        [type]: value,
                        is24Hours: false
                    };
                });
            } else {
                updatedHours[day] = { 
                    ...updatedHours[day], 
                    [type]: value,
                    is24Hours: false
                };
            }
            return updatedHours;
        });
    };

    const handle24HoursChange = (day: string) => {
        setTempBusinessHours(prev => {
            const updatedHours = { ...prev };
            if (isDailyMode) {
                Object.keys(updatedHours).forEach(key => {
                    updatedHours[key] = { 
                        ...updatedHours[key], 
                        is24Hours: !updatedHours[key].is24Hours,
                        start: !updatedHours[key].is24Hours ? '오전 12시 00분' : '오전 9시 00분',
                        end: !updatedHours[key].is24Hours ? '오전 12시 00분' : '오후 6시 00분'
                    };
                });
            } else {
                updatedHours[day] = { 
                    ...updatedHours[day], 
                    is24Hours: !updatedHours[day].is24Hours,
                    start: !updatedHours[day].is24Hours ? '오전 12시 00분' : '오전 9시 00분',
                    end: !updatedHours[day].is24Hours ? '오전 12시 00분' : '오후 6시 00분'
                };
            }
            return updatedHours;
        });
    };

    const handleBreakTimeChange = (day: string, type: 'start' | 'end', value: string) => {
        setBreakTimes(prev => ({
            ...prev,
            [isDailyMode ? '매일' : day]: { ...prev[isDailyMode ? '매일' : day], [type]: value }
        }));
    };

    const TimeSelection = ({ label, day, type }: { label: string, day: string, type: 'start' | 'end' }) => {
        const time = tempBusinessHours[day]?.[type];
        const is24Hour = tempBusinessHours[day]?.is24Hours;
    
        if (!time) return null;
    
        return (
            <>
                <span className="text-sm text-gray-400">{label}</span>
                <select 
                    className="border border-gray-300 text-gray-700 bg-white rounded-md py-2 px-4 mx-2"
                    value={time.split(' ')[0] + ' ' + time.split(' ')[1]}
                    onChange={(e) => handleTimeChange(day, type, e.target.value + ' ' + time.split(' ')[2])}
                    disabled={is24Hour}
                >
                    {generateOptions(generateHourOptions(), "")}
                </select>
                <select 
                    className="border border-gray-300 text-gray-700 bg-white rounded-md py-2 px-4 mx-2"
                    value={time.split(' ')[2]}
                    onChange={(e) => handleTimeChange(day, type, time.split(' ')[0] + ' ' + time.split(' ')[1] + ' ' + e.target.value)}
                    disabled={is24Hour}
                >
                    {generateOptions(generateMinuteOptions(), "")}
                </select>
            </>
        );
    };

    const BreakTimeSection = ({ day }: { day: string }) => {
        const breakTime = breakTimes[isDailyMode ? '매일' : day];
        if (!breakTime) return null;
    
        return (
            <div className="bg-gray-100 rounded-md mt-5 p-4 relative">
                <button
                    className="absolute top-2 right-2"
                    onClick={() => handleRemoveBreakTime(isDailyMode ? '매일' : day)}
                >
                    X
                </button>
                <p className="text-gray-700 text-lg mb-2">휴게시간</p>
                <div className="flex items-center">
                    <span className="text-sm text-gray-400 mr-2">시작</span>
                    <select 
                        className="border border-gray-300 text-gray-700 bg-white rounded-md py-2 px-4 mr-2"
                        value={breakTime.start.split(' ')[0] + ' ' + breakTime.start.split(' ')[1]}
                        onChange={(e) => handleBreakTimeChange(day, 'start', e.target.value + ' ' + breakTime.start.split(' ')[2])}
                    >
                        {generateOptions(generateHourOptions(), "")}
                    </select>
                    <select
                        className="border border-gray-300 text-gray-700 bg-white rounded-md py-2 px-4 mr-4"
                        value={breakTime.start.split(' ')[2]}
                        onChange={(e) => handleBreakTimeChange(day, 'start', breakTime.start.split(' ')[0] + ' ' + breakTime.start.split(' ')[1] + ' ' + e.target.value)}
                    >
                        {generateOptions(generateMinuteOptions(), "")}
                    </select>
                    <span className="text-sm text-gray-400 mr-2">종료</span>
                    <select 
                        className="border border-gray-300 text-gray-700 bg-white rounded-md py-2 px-4 mr-2"
                        value={breakTime.end.split(' ')[0] + ' ' + breakTime.end.split(' ')[1]}
                        onChange={(e) => handleBreakTimeChange(day, 'end', e.target.value + ' ' + breakTime.end.split(' ')[2])}
                    >
                        {generateOptions(generateHourOptions(), "")}
                    </select>
                    <select 
                        className="border border-gray-300 text-gray-700 bg-white rounded-md py-2 px-4"
                        value={breakTime.end.split(' ')[2]}
                        onChange={(e) => handleBreakTimeChange(day, 'end', breakTime.end.split(' ')[0] + ' ' + breakTime.end.split(' ')[1] + ' ' + e.target.value)}
                    >
                        {generateOptions(generateMinuteOptions(), "")}
                    </select>
                </div>
            </div>
        );
    };

    const DaySection = ({ day }: { day: string }) => {
        const actualDay = isDailyMode ? 'monday' : dayMap[day];
        const is24Hour = tempBusinessHours[actualDay]?.is24Hours;
    
        return (
            <div key={day}>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <p className="text-gray-700 text-lg inline-block mr-2">{day}</p>
                        <p className="text-gray-700 text-lg inline-block mr-4">영업일</p>
                    </div>
                    <div className="flex items-center">
                        <p className="text-gray-700 text-lg mr-2">24시간</p>
                        <input 
                            type="checkbox" 
                            checked={is24Hour}
                            onChange={() => handle24HoursChange(actualDay)}
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />
                    </div>
                </div>
                {is24Hour ? (
                    <p className="text-gray-600 mb-2">영업시간: 24시간</p>
                ) : (
                    <>
                        <TimeSelection label="시작" day={actualDay} type="start" />
                        <TimeSelection label="종료" day={actualDay} type="end" />
                    </>
                )}
                <button className="text-blue-500 mt-2" onClick={() => handleAddBreakTime(isDailyMode ? '매일' : day)}>
                    + 휴게시간 추가
                </button>
                {breakTimes[isDailyMode ? '매일' : day] && <BreakTimeSection day={isDailyMode ? '매일' : day} />}
                <div className="border-t border-gray-200 my-5"></div>
            </div>
        );
    };

    return (
        <div
            className="relative flex flex-col min-h-screen overflow-auto z-10 bg-[#F7F7F7]"
            style={{ flex: "1 1 auto", overscrollBehavior: "none", zIndex: 1 }}
        >
            <div
                className="flex items-center w-full px-4 lg:px-6 h-16 bg-white shadow-md"
                style={{
                    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 8px",
                }}
            >
                {/* 네비게이션 카테고리 넣는 곳 */}
            </div>

            <div className="w-full">
                <div style={{ maxWidth: maxWidthStyle }} className="flex flex-auto flex-col mx-auto">
                    <div className="flex-auto min-w-0" style={{ maxWidth: "936px" }}>
                        <div className="flex flex-col mt-8 rounded-lg bg-white" style={{
                            border: "1px solid rgba(0, 0, 0, 0.1)",
                            boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 6px",
                        }}>
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
                                                영업시간: {
                                                    businessHours[dayMap[day]]?.is24Hours 
                                                    ? '24시간' 
                                                    : `${businessHours[dayMap[day]]?.start || '설정되지 않음'} ~ ${businessHours[dayMap[day]]?.end || '설정되지 않음'}`
                                                }
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