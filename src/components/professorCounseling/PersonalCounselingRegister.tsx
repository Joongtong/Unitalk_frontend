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

const PersonalCounselingRegister: React.FC<{ counselType: string }> = ({
  counselType,
}) => {
  const [selectedCounselor, setSelectedCounselor] = useState<Employee | null>(
    null
  );
  const [selectedSchedule, setSelectedSchedule] =
    useState<CounselorSchedule | null>(null);
  const [isCounselorModalOpen, setCounselorModalOpen] =
    useState<boolean>(false);
  const [isScheduleModalOpen, setScheduleModalOpen] = useState<boolean>(false);
  const [counselorNo, setCounselorNo] = useState<number | null>(null);
  const [selectedCounselMode, setSelectedCounselMode] = useState<string>("1");

  // 상담신청내용
  const applicationContentRef = useRef<HTMLTextAreaElement>(null);

  // 각 라디오 버튼에 대한 ref 설정
  const radio1Ref = useRef<HTMLInputElement>(null);
  const radio2Ref = useRef<HTMLInputElement>(null);

  const handleCounselorSelect = (counselor: Employee) => {
    setSelectedCounselor(counselor);
    setCounselorNo(counselor.employeeNo);
    setCounselorModalOpen(false);
  };

  const handleScheduleSelect = (counselorSchedule: CounselorSchedule) => {
    setSelectedSchedule(counselorSchedule);
    setScheduleModalOpen(false);
  };

  const openScheduleModal = () => {
    if (selectedCounselor && counselorNo) {
      setScheduleModalOpen(true);
    } else {
      alert("상담사를 먼저 선택해주세요.");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedCounselor) {
      alert("상담사를 선택해주세요.");
      return;
    }

    if (!selectedSchedule) {
      alert("상담 시간을 선택해주세요.");
      return;
    }

    // 선택된 상담 모드 값을 가져오기
    const selectedMode = radio1Ref.current?.checked ? "1" : "2";

    const counselingRequestDto: CounselingRequestDto = {
      schNo: selectedSchedule?.schNo,
      studentNo: 1, // 임시 학생번호
      studentId: 20150001, // 임시
      counselorNo: counselorNo!,
      counselorId: 20100003, //임시
      counselMode: parseInt(selectedMode),
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
    <div className="counseling-personal">
      <h2>개인 상담 신청서 작성</h2>
      <div className="counseling-form">
        <p className="counseling-p">
          개인 상담을 통해 학업 및 생활에 대한 다양한 문제를 해결하세요.
        </p>
        {/* 추가 필요한 설명 */}
      </div>
      <br />
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
                  ref={radio1Ref}
                />{" "}
                방문상담
              </label>
              <label>
                <input
                  type="radio"
                  name="counselMode"
                  value="2"
                  ref={radio2Ref}
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
                onClick={() => setCounselorModalOpen(true)}
              >
                상담사 선택
              </button>
              <span className="counselor-selected">
                {" "}
                {selectedCounselor ? selectedCounselor.user.userName : " "}
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
                {selectedSchedule
                  ? `${selectedSchedule.days}DAY - ${selectedSchedule.availTime} 교시`
                  : " "}
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
        onClose={() => setCounselorModalOpen(false)}
        onSelectProfessor={handleCounselorSelect}
        counselType={counselType}
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

export default PersonalCounselingRegister;
