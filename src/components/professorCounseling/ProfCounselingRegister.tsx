import React, { useRef, useState } from "react";
import "assets/styles/counseling/ProfCounselingRegister.css";
import ProfessorSearchListModal from "./ProfessorSearchListModal";
import CounselorScheduleModal from "./CounselorScheduleModal";
import {
  CounselorSchedule,
  CounselingRequestDto,
} from "../../types/interface/counseling";
import { Employee } from "../../types/interface/employee";
import { saveCounseling } from "services/professorCounselingService";

const ProfCounselingRegister: React.FC<{ counselType: String }> = ({
  counselType,
}) => {
  const [selectedProfessor, setSelectedProfessor] = useState<Employee | null>(
    null
  );
  const [selectedSchedule, setSelectedSchedule] =
    useState<CounselorSchedule | null>(null);
  const [isCounselorModalOpen, setProfessorModalOpen] =
    useState<boolean>(false);
  const [isScheduleModalOpen, setScheduleModalOpen] = useState<boolean>(false);
  const [counselorNo, setCounselorNo] = useState<number | null>(null);

  // 상담신청내용
  const applicationContentRef = useRef<HTMLTextAreaElement>(null);
  // 상담모드
  const counselModeRef = useRef<HTMLInputElement>(null);

  const handleProfessorSelect = (employee: Employee) => {
    setSelectedProfessor(employee);
    console.log("employee");
    console.log(employee);
    setCounselorNo(employee.employeeNo);
    setProfessorModalOpen(false);
  };

  const handleScheduleSelect = (counselorSchedule: CounselorSchedule) => {
    console.log("ProfCounselingRegister handleScheduleSelect");
    console.log(counselorSchedule);
    setSelectedSchedule(counselorSchedule);
    setScheduleModalOpen(false);
  };

  const openScheduleModal = () => {
    if (selectedProfessor && counselorNo) {
      setScheduleModalOpen(true);
    } else {
      alert("상담사를 먼저 선택해주세요.");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedProfessor) {
      alert("상담사를 선택해주세요.");
      return;
    }

    if (!selectedSchedule) {
      alert("상담 시간을 선택해주세요.");
      return;
    }

    const counselingRequestDto: CounselingRequestDto = {
      schNo: selectedSchedule?.schNo,
      studentNo: 1, // 임시 학생번호
      studentId: 20150001, // 임시
      counselorNo: counselorNo!,
      counselorId: 20100003, //임시
      counselMode: parseInt(counselModeRef.current?.value || "1"),
      counselType: counselType.toString(),
      counselDate: new Date().toISOString(), // 실제 상담 날짜로 대체 필요
      applicationContent: applicationContentRef.current?.value || "",
      counselContent: "",
    };

    try {
      const response = await saveCounseling(counselingRequestDto);
      console.log("Saved counseling request:", response);
      alert("상담 신청이 완료되었습니다.");
      //todo 마이페이지로 이동
    } catch (error) {
      console.error("Error saving counseling request:", error);
      alert("상담 신청 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="counseling-prof">
      <h2>상담신청서 작성</h2>
      <div className="counseling-form">
        <form onSubmit={handleSubmit}>
          <div>
            <label>상담구분</label>
            <div className="radio-buttons">
              <label>
                <input
                  type="radio"
                  name="counselMode"
                  value="1"
                  defaultChecked
                  ref={counselModeRef}
                />{" "}
                방문상담
              </label>
              <label>
                <input
                  type="radio"
                  name="counselMode"
                  value="2"
                  ref={counselModeRef}
                />{" "}
                온라인상담
              </label>
            </div>
          </div>
          <div>
            <label>상담사 선택</label>
            <div className="button-container2">
              <button
                type="button"
                className="select-button"
                onClick={() => setProfessorModalOpen(true)}
              >
                상담사 선택
              </button>
              <span className="counselor-selected">
                선택한 교수:{" "}
                {selectedProfessor ? selectedProfessor.user.userName : "없음"}
              </span>
            </div>
          </div>
          <div>
            <label>상담시간</label>
            <div className="button-container2">
              <button
                type="button"
                className="select-button"
                onClick={openScheduleModal}
              >
                시간 선택
              </button>
              <span className="counselor-selected">
                선택한 스케쥴:{" "}
                {selectedSchedule
                  ? `${selectedSchedule.days} - ${selectedSchedule.availTime}`
                  : "없음"}
              </span>
            </div>
          </div>
          <div>
            <label>상담내용</label>
            <textarea
              id="applicationContent"
              name="applicationContent"
              rows={4}
              ref={applicationContentRef}
            ></textarea>
          </div>
          <div>
            <label>연락처</label>
            <div className="button-container">
              <input type="text" size={4} maxLength={4} /> -
              <input type="text" size={4} maxLength={4} /> -
              <input type="text" size={4} maxLength={4} />
            </div>
          </div>
          <div>
            <label>이메일</label>
            <div className="button-container">
              <input type="text" size={10} /> @
              <input type="text" size={10} />
            </div>
          </div>
          <div>
            <button type="submit" className="submit-button">
              상담 신청하기
            </button>
          </div>
        </form>
      </div>
      <ProfessorSearchListModal
        open={isCounselorModalOpen}
        onClose={() => setProfessorModalOpen(false)}
        onSelectProfessor={handleProfessorSelect}
      />
      <CounselorScheduleModal
        open={isScheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        onSelectSchedule={handleScheduleSelect}
        counselorNo={counselorNo}
      />
    </div>
  );
};

export default ProfCounselingRegister;
