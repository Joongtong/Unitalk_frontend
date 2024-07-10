import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CounselorSchedule } from 'types/interface';
import { Button } from '@mui/material';
import 'assets/styles/counseling/CounselorScheduleManager.css';

interface CounselorScheduleManagerProps {
  counselorNo: number;
}

const CounselorScheduleManager: React.FC<CounselorScheduleManagerProps> = ({ counselorNo }) => {
  const [schedules, setSchedules] = useState<CounselorSchedule[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<{[key: string]: boolean}>({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const periods = Array.from({ length: 9 }, (_, i) => i + 1);

  useEffect(() => {
    fetchSchedules();
  }, [counselorNo]);

  const fetchSchedules = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/counselor-schedules/${counselorNo}`);
      setSchedules(response.data);
      initializeSelectedSlots(response.data);
    } catch (error) {
      console.error('스케줄 조회 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isSlotSelected = (day: string, period: number) => {
    return selectedSlots[`${day}-${period}`] || false;
  };

  const getSlotClassName = (day: string, period: number) => {
    const isSelected = isSlotSelected(day, period);
    const isPrevSelected = period > 1 && isSlotSelected(day, period - 1);
    const isNextSelected = period < 9 && isSlotSelected(day, period + 1);
    
    return `time-slot 
      ${isSelected ? 'selected' : ''} 
      ${isEditing ? 'editable' : ''} 
      ${isSelected && isPrevSelected ? 'continue-top' : ''}
      ${isSelected && isNextSelected ? 'continue-bottom' : ''}`;
  };

  const initializeSelectedSlots = (existingSchedules: CounselorSchedule[]) => {
    const slots: {[key: string]: boolean} = {};
    days.forEach(day => {
      periods.forEach(period => {
        const key = `${day}-${period}`;
        slots[key] = existingSchedules.some(schedule => schedule.days === day && schedule.availTime === period);
      });
    });
    setSelectedSlots(slots);
  };

  const handleSlotToggle = (day: string, period: number) => {
    if (!isEditing) return;
    const key = `${day}-${period}`;
    setSelectedSlots(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const schedulesToDelete = schedules.filter(schedule => 
        !selectedSlots[`${schedule.days}-${schedule.availTime}`]
      );
      const schedulesToAdd = Object.entries(selectedSlots)
        .filter(([key, isSelected]) => isSelected && !schedules.some(s => `${s.days}-${s.availTime}` === key))
        .map(([key]) => {
          const [day, period] = key.split('-');
          return {
            counselorNo,
            days: day,
            availTime: parseInt(period),
            status: 1
          };
        });

      // 삭제 작업
      await Promise.all(schedulesToDelete.map(schedule => 
        axios.delete(`/api/counselor-schedules/${schedule.schNo}`)
      ));

      // 추가 작업
      await Promise.all(schedulesToAdd.map(newSchedule => 
        axios.post('/api/counselor-schedules', newSchedule)
      ));

      await fetchSchedules();
      setIsEditing(false);
    } catch (error) {
      console.error('스케줄 업데이트 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // 수정 취소 시 원래 스케줄로 복원
      initializeSelectedSlots(schedules);
    }
    setIsEditing(!isEditing);
  };

  const getTimeAndPeriodFromPeriod = (period: number) => {
    const startHour = 9 + Math.floor((period - 1) * 60 / 60);
    const startMinute = ((period - 1) * 60) % 60;
    const timeString = `${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`;
    return `${period}교시\n${timeString}`;
    };

  return (
    <div className="counselor-schedule-manager">
      <div className="schedule-grid">
        <div className="time-column">
          <div className="time-header">시간</div>
          {periods.map(period => (
            <div key={period} className="time-slot">
                <div className="time-slot-content">
                {getTimeAndPeriodFromPeriod(period).split('\n').map((line, index) => (
                    <div key={index}>{line}</div>
                ))}
                </div>
            </div>
          ))}
        </div>
        {days.map(day => (
          <div key={day} className="day-column">
            <div className="day-header">{day}</div>
            {periods.map(period => (
              <div
                key={`${day}-${period}`}
                className={getSlotClassName(day, period)}
                onClick={() => handleSlotToggle(day, period)}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="button-container">
        <Button 
          variant="contained" 
          color={isEditing ? "secondary" : "primary"} 
          onClick={handleEditToggle}
          disabled={isLoading}
        >
          {isEditing ? '수정 취소' : '수정'}
        </Button>
        {isEditing && (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSubmit}
            disabled={isLoading}
          >
            저장
          </Button>
        )}
      </div>
      {isLoading && <div className="loading-overlay">처리 중...</div>}
    </div>
  );
};

export default CounselorScheduleManager;