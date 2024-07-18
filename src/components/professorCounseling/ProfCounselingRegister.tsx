import React, { useRef, useState, useEffect } from "react";
import "assets/styles/counseling/ProfCounselingRegister.css";
import ProfessorSearchListModal from "./ProfessorSearchListModal";
import CounselorScheduleModal from "./CounselorScheduleModal";
import { useNavigate } from "react-router-dom";
import {
  CounselorSchedule,
  CounselingRequestDto,
} from "../../types/interface/counseling";
import { Employee } from "../../types/interface/employee";
import { saveCounseling } from "services/professorCounselingService";
import { getCurrentStudent } from "services/professorCounselingService";

const ProfCounselingRegister: React.FC<{ counselType: string }> = ({
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
  const [selectedCounselMode, setSelectedCounselMode] = useState<string>("1"); // 상담구분 선택 값
  const [studentNo, setStudentNo] = useState<number | null>(null);
  const [studentId, setStudentId] = useState<number | null>(null);
  const [counselorId, setCounselorId] = useState<number | null>(null);

  // 상담신청내용
  const applicationContentRef = useRef<HTMLTextAreaElement>(null);

  // 각 라디오 버튼에 대한 ref 설정
  const radio1Ref = useRef<HTMLInputElement>(null);
  const radio2Ref = useRef<HTMLInputElement>(null);

  // useNavigate 훅 사용
  const navigate = useNavigate();

  useEffect(() => {
    // 현재 로그인한 학생 정보를 가져오는 로직
    async function fetchStudentInfo() {
      try {
        const studentInfo = await getCurrentStudent();
        setStudentNo(studentInfo.studentNo);
        setStudentId(studentInfo.studentId);
      } catch (error) {
        console.error("Error fetching student info:", error);
      }
    }

    fetchStudentInfo();
  }, []);

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
      console.log("Opening schedule modal for counselorNo:", counselorNo);
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
    if (!studentNo || !studentId) {
      alert("학생 정보를 가져오는 데 실패했습니다.");
      return;
    }

    // 선택된 상담 모드 값을 가져오기
    const selectedMode = radio1Ref.current?.checked ? "1" : "2";

    const counselingRequestDto: CounselingRequestDto = {
      schNo: selectedSchedule?.schNo,
      studentNo: studentNo,
      studentId: studentId,
      counselorNo: counselorNo!,
      counselorId: counselorId!,
      counselMode: parseInt(selectedMode),
      counselType: counselType.toString(),
      counselDate: new Date().toISOString(), // 실제 상담 날짜로 대체 필요
      applicationContent: applicationContentRef.current?.value || "",
      counselContent: "",
    };

    console.log("Counseling Request DTO:", counselingRequestDto);

    try {
      const response = await saveCounseling(counselingRequestDto);
      console.log("Saved counseling request:", response);
      alert("상담 신청이 완료되었습니다.");
      navigate("/Counseling"); // 상담 신청 완료 후 Counseling 페이지로 이동
    } catch (error) {
      console.error("Error saving counseling request:", error);
      alert("상담 신청 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="counseling-prof">
      <h2>상담 신청서 작성</h2>
      <div className="counseling-form">
        <p className="counseling-p">
          지도교수님과의 개별 상담을 통해 대학생활에 대한 고민을 나눠보세요.
        </p>
        <p className="counseling-p">
          학교생활중 발생한 문제 또는 개인적인 어려움도 상담을 통해 도움을 받을
          수 있습니다.
        </p>
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
                onClick={() => setProfessorModalOpen(true)}
              >
                상담사 선택
              </button>
              <span className="counselor-selected">
                {" "}
                {selectedProfessor ? selectedProfessor.user.userName : " "}
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
        onClose={() => setProfessorModalOpen(false)}
        onSelectProfessor={handleProfessorSelect}
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

export default ProfCounselingRegister;
