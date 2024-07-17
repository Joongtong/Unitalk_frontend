import React, { useState, useEffect } from "react";
import axios from "axios";
import { CounselorSchedule } from "types/interface";
import "assets/styles/counseling/CounselorScheduleModal.css";

interface CounselorScheduleProps {
  open: boolean;
  onClose: () => void;
  onSelectSchedule: (counselorSchedule: CounselorSchedule) => void; // 부모 컴포넌트로 선택한 교수의 ID를 넘기기 위한 콜백 함수
  counselorNo: number | null; // counselorNo를 받아오도록 수정
}

const CounselorScheduleModal: React.FC<CounselorScheduleProps> = ({
  open,
  onClose,
  onSelectSchedule,
  counselorNo,
}) => {
  const [schedules, setSchedules] = useState<CounselorSchedule[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<{
    [key: string]: boolean;
  }>({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const periods = Array.from({ length: 9 }, (_, i) => i + 1);

  useEffect(() => {
    if (open && counselorNo) {
      fetchSchedules();
    }
  }, [open, counselorNo]);

  const fetchSchedules = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `/api/counselor-schedules/${counselorNo}`
      );
      console.log("스케쥴결과");
      console.log(response.data);
      setSchedules(response.data);
      initializeSelectedSlots(response.data);
    } catch (error) {
      console.error("스케줄 조회 중 오류 발생:", error);
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
      ${isSelected ? "selected" : ""} 
      ${isEditing ? "editable" : ""} 
      ${isSelected && isPrevSelected ? "continue-top" : ""}
      ${isSelected && isNextSelected ? "continue-bottom" : ""}`;
  };

  const initializeSelectedSlots = (existingSchedules: CounselorSchedule[]) => {
    const slots: { [key: string]: boolean } = {};
    days.forEach((day) => {
      periods.forEach((period) => {
        const key = `${day}-${period}`;
        slots[key] = existingSchedules.some(
          (schedule) => schedule.days === day && schedule.availTime === period
        );
      });
    });
    setSelectedSlots(slots);
  };

  const handleSlotToggle = (day: string, period: number) => {
    const key = `${day}-${period}`;

    //선택한 날짜와 스케쥴 데이터를 비교하여 schNo를 얻고 부모창으로 보낸다.
    if (selectedSlots[key]) {
      const selectedSchedule = schedules.find(
        (schedule) => key === `${schedule.days}-${schedule.availTime}`
      );
      console.log(selectedSchedule);
      if (selectedSchedule) {
        onSelectSchedule(selectedSchedule);
        onClose(); // Close the modal
      }
    }
  };

  const getTimeAndPeriodFromPeriod = (period: number) => {
    const startHour = 9 + Math.floor(((period - 1) * 60) / 60);
    const startMinute = ((period - 1) * 60) % 60;
    const timeString = `${startHour.toString().padStart(2, "0")}:${startMinute
      .toString()
      .padStart(2, "0")}`;
    return `${period}교시\n${timeString}`;
  };

  if (!open) {
    return null;
  }

  return (
    <div className="counselor-schedule-manager2">
      <div className="schedule-header">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="schedule-grid2">
        <div className="time-column">
          <div className="time-header">시간</div>
          {periods.map((period) => (
            <div key={period} className="time-slot">
              <div className="time-slot-content">
                {getTimeAndPeriodFromPeriod(period)
                  .split("\n")
                  .map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
              </div>
            </div>
          ))}
        </div>
        {days.map((day) => (
          <div key={day} className="day-column">
            <div className="day-header">{day}</div>
            {periods.map((period) => (
              <div
                key={`${day}-${period}`}
                className={getSlotClassName(day, period)}
                onClick={() => handleSlotToggle(day, period)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CounselorScheduleModal;
