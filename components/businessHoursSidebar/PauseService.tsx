

'use client';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { shoplistState, shopIdAtom, tempCloseShopRequestState } from "../../app/recoil/state";
import { TempCloseShopRequest, tempCloseShop, getShopBusinessHours, BusinessHour } from '@/app/services/shopAPI';

interface Props {
  onClose: () => void; 
}

const PauseService = ({ onClose }: Props) => {
  const store = useRecoilValue(shoplistState);
  const selectedShopId = useRecoilValue(shopIdAtom);
  const [tempCloseRequest, setTempCloseRequest] = useRecoilState(tempCloseShopRequestState);
  const selectedShop = store?.find(shop => shop.id === selectedShopId);

  const [currentTime, setCurrentTime] = useState('');
  const [activeTime, setActiveTime] = useState<string>('');
  const [customTimeActive, setCustomTimeActive] = useState(false);
  const [businessHours, setBusinessHours] = useState<BusinessHour[]>([]);
  const timeOptions = ['30분', '1시간', '2시간', '오늘 하루', '직접 설정'];

  const [startTime, setStartTime] = useState({ hour: '오전 12시', minute: '00분' });
  const [endTime, setEndTime] = useState({ hour: '오후 11시', minute: '59분' });

  useEffect(() => {
    const fetchBusinessHours = async () => {
      if (selectedShopId) {
        try {
          const response = await getShopBusinessHours(selectedShopId);
          setBusinessHours(response.businessHours);
        } catch (error) {
          console.error('Error fetching business hours:', error);
        }
      }
    };

    fetchBusinessHours();
  }, [selectedShopId]);

  const updateCurrentTime = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const amPm = currentHour >= 12 ? '오후' : '오전';
    const displayHour = currentHour % 12 || 12;
    const displayMinute = String(now.getMinutes()).padStart(2, '0');
    setCurrentTime(`${amPm} ${displayHour}시 ${displayMinute}분`);
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let i = 0; i < 24; i++) {
      const period = i < 12 ? '오전' : '오후';
      const hour = i % 12 || 12;
      options.push(`${period} ${hour}시`);
    }
    return options;
  };

  const generateMinuteOptions = () => ['00분', '10분', '20분', '30분', '40분', '50분'];

  const handleTimeSelect = (time: string) => {
    setActiveTime(time);
    setCustomTimeActive(time === '직접 설정');

    let closeUntil: Date | null = null;
    let today: boolean | null = null;

    const now = new Date();
    switch (time) {
      case '30분':
      case '1시간':
      case '2시간':
        closeUntil = new Date(now.getTime() + (time === '30분' ? 30 : time === '1시간' ? 60 : 120) * 60000);
        setStartTime({ 
          hour: `${now.getHours() < 12 ? '오전' : '오후'} ${now.getHours() % 12 || 12}시`, 
          minute: `${now.getMinutes().toString().padStart(2, '0')}분` 
        });
        setEndTime({ 
          hour: `${closeUntil.getHours() < 12 ? '오전' : '오후'} ${closeUntil.getHours() % 12 || 12}시`, 
          minute: `${closeUntil.getMinutes().toString().padStart(2, '0')}분` 
        });
        today = false;
        break;
      case '오늘 하루':
        setStartTime({ hour: '오전 12시', minute: '00분' });
        setEndTime({ hour: '오후 11시', minute: '59분' });
        closeUntil = new Date(now.setHours(23, 59, 59, 999));
        today = true;
        break;
      default:
        closeUntil = null;
        today = null;
        break;
    }

    setTempCloseRequest({ 
      closeUntil: closeUntil ? closeUntil.toISOString() : null, 
      today 
    });
  };

  const handleStartTimeChange = (type: 'hour' | 'minute', value: string) => {
    setStartTime(prev => ({ ...prev, [type]: value }));
    updateCloseUntil({ ...startTime, [type]: value }, endTime);
  };

  const handleEndTimeChange = (type: 'hour' | 'minute', value: string) => {
    setEndTime(prev => ({ ...prev, [type]: value }));
    updateCloseUntil(startTime, { ...endTime, [type]: value });
  };

  const updateCloseUntil = (start: { hour: string; minute: string }, end: { hour: string; minute: string }) => {
    const now = new Date();
    const [startPeriod, startHourText] = start.hour.split(' ');
    const startHour = parseInt(startHourText.replace('시', ''), 10);
    const startMinute = parseInt(start.minute.replace('분', ''), 10);
    
    const [endPeriod, endHourText] = end.hour.split(' ');
    const endHour = parseInt(endHourText.replace('시', ''), 10);
    const endMinute = parseInt(end.minute.replace('분', ''), 10);

    let startTime = new Date(now);
    startTime.setHours(
      startPeriod === '오후' && startHour !== 12 ? startHour + 12 : startHour,
      startMinute, 0, 0
    );

    let endTime = new Date(now);
    endTime.setHours(
      endPeriod === '오후' && endHour !== 12 ? endHour + 12 : endHour,
      endMinute, 59, 999
    );

    if (endTime < startTime) {
      endTime.setDate(endTime.getDate() + 1);
    }

    setTempCloseRequest({ 
      closeUntil: endTime.toISOString(), 
      today: endTime.getDate() === now.getDate() 
    });
  };

  const handleTempClose = async () => {
    if (selectedShopId && tempCloseRequest && tempCloseRequest.closeUntil) {
      try {
        await tempCloseShop(selectedShopId, tempCloseRequest);
        alert('가게 일시중지가 성공적으로 업데이트되었습니다.');
        onClose();
      } catch (error) {
        console.error('가게 일시중지 오류:', error);
        alert('가게 일시중지 중 오류가 발생했습니다.');
      }
    } else {
      alert('일시중지 정보를 완전히 입력해주세요.');
    }
  };

  useEffect(() => {
    updateCurrentTime();
    const interval = setInterval(updateCurrentTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const [maxWidthStyle, setMaxWidthStyle] = useState('936px');
  
  useEffect(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1024) {
      setMaxWidthStyle('calc(100% - 80px)');
    } else if (screenWidth >= 768) {
      setMaxWidthStyle('calc(100% - 64px)');
    } else {
      setMaxWidthStyle('936px');
    }
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen overflow-auto z-10 bg-[#F7F7F7]" style={{ flex: '1 1 auto', overscrollBehavior: 'none', zIndex: 1 }}>
      {/* 네비게이션 바 부분 */}
      <div className="flex items-center w-full px-4 lg:px-6 h-16 bg-white shadow-md" style={{
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 8px'
      }}>
        {/* 네비게이션 카테고리 넣는 곳 */}
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="w-full"> 
        <div style={{ maxWidth: maxWidthStyle }} className="flex flex-auto flex-col mx-auto">
          <div className="flex-auto min-w-0" style={{ maxWidth: '936px' }}>
            <div className="flex flex-col mt-8 rounded-lg bg-white" style={{ border: '1px solid rgba(0, 0, 0, 0.1)', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 6px'}}>
              
              {/* 윗부분 */}
              <div className="pt-8 px-6 pb-6" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}>
                <div className="flex items-center">
                  <div className="flex items-center flex-auto" style={{minHeight: '2.5rem',fontSize: '1.375rem', lineHeight: '1.875rem', color: 'rgba(0, 0, 0, 0.8)'}}>
                    일시중지
                  </div>
                  
                  <div className="ml-2 flex">
                    월별 내역 다운로드 
                  </div>
                </div>
              </div>

              {/* 중간 부분 */}
              <div className="mt-6 mx-6 mb-8">
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div style={{ flex: 1 }}>
                      <h1 className="text-lg font-bold">{selectedShop ? selectedShop.name : 'No Shop Selected'}</h1>
                      <div style={{ height: '1px', background: 'rgba(0, 0, 0, 0.1)', margin: '20px 0' }}></div>
                      <p style={{ color: 'rgba(0, 0, 0, 0.4)', fontSize: '1rem', marginTop:'20px', marginBottom: '12px' }}>
                        중지 시간
                      </p>

                      {/* 버튼 속성 */}
                      <div className="flex gap-2 flex-wrap ">
                        {timeOptions.map(time => (
                          <button
                            key={time}
                            onClick={() => handleTimeSelect(time)}
                            style={{
                              width: '100px',
                              border: '1px solid rgb(229, 231, 235)',
                              borderRadius: '6px',
                              padding: '6px 12px',
                              background: '#ffffff',
                              color: activeTime === time ? '#3B82F6' : 'rgba(0, 0, 0, 0.6)',
                              fontWeight: activeTime === time ? 'bold' : 'normal',
                            }}
                          >
                            {time}
                          </button>
                        ))}
                      </div>

                      {/* 수정된 네모난 박스 */}
                      <div style={{
                        width: '100%',
                        maxWidth: '800px',
                        height: 'auto',
                        backgroundColor: '#efefef', 
                        borderRadius: '6px', 
                        marginTop: '20px',
                        padding: '20px',
                      }}>
                        <div className="space-y-4 text-gray-600">
                          <span className="text-gray-500 font-bold">설정 범위</span>
                          <div className="flex items-center space-x-4 flex-wrap">
                            <span className="text-sm text-gray-400">시작</span>
                            <select 
                              value={startTime.hour} 
                              onChange={(e) => handleStartTimeChange('hour', e.target.value)}
                              className="border border-gray-300 text-gray-700 bg-white rounded-md py-2 px-4"
                            >
                              {generateTimeOptions().map(hour => <option key={hour} value={hour}>{hour}</option>)}
                            </select>
                            <select 
                              value={startTime.minute} 
                              onChange={(e) => handleStartTimeChange('minute', e.target.value)}
                              className="border border-gray-300 text-gray-700 bg-white rounded-md py-2 px-4"
                            >
                              {generateMinuteOptions().map(minute => <option key={minute} value={minute}>{minute}</option>)}
                            </select>
                            
                            <span className="mx-2">~</span>
                            
                            <span className="text-sm text-gray-400">종료</span>
                            <select 
                              value={endTime.hour} 
                              onChange={(e) => handleEndTimeChange('hour', e.target.value)}
                              className="border border-gray-300 text-gray-700 bg-white rounded-md py-2 px-4"
                            >
                              {generateTimeOptions().map(hour => <option key={hour} value={hour}>{hour}</option>)}
                            </select>
                            <select 
                              value={endTime.minute} 
                              onChange={(e) => handleEndTimeChange('minute', e.target.value)}
                              className="border border-gray-300 text-gray-700 bg-white rounded-md py-2 px-4"
                            >
                              {generateMinuteOptions().map(minute => <option key={minute} value={minute}>{minute}</option>)}
                            </select>
                          </div>
                        </div>   
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 아랫 부분 */}
              <div className="pt-8 px-6 pb-6 flex justify-center items-center" style={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)' }}>
                <div className="flex items-center">
                  <div className="flex items-center flex-auto" style={{minHeight: '2.5rem',fontSize: '1.375rem', lineHeight: '1.875rem', color: 'rgba(0, 0, 0, 0.8)'}}></div>
                  <button onClick={handleTempClose} className="bg-blue-500 text-white px-20 py-3 font-bold rounded-md">
                    일시중지
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PauseService;