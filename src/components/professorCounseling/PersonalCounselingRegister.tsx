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

  const handleCounselorSelect = (counselor: Employee) => {
    setSelectedCounselor(counselor);
    setCounselorNo(counselor.employeeNo);
    setCounselorId(counselor.user.userId);
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
    <div className="counseling-personal">
      <h2>개인 상담 신청서 작성</h2>
      <div className="counseling-form">
        <p className="counseling-p">
          개인상담은 혼자 해결하기 힘든 어려움이 있을 때, 전문 상담자와 1:1
          상담을 통해
        </p>
        <p className="counseling-p">
          학업 및 진로, 성격, 대인관계, 가정문제 등 일상생활에서 겪는 다양한
          문제와 스트레스를 효과적으로 해결할 목적으로 일정기간 동안 만나는
          과정입니다.
        </p>
        <p className="counseling-p">
          현재 자신이 경험하고 있는 갈등이나 주제를 대화를 통해 보다 객관적으로
          돌아보게 되며, 환경과 나, 타인에 대한 이해를 폭 넓힐 수 있도록
          도와주어 인간적인 성장의
        </p>
        <p className="counseling-p">기회를 갖는데 큰 도움이 됩니다.</p>
      </div>
      <br />
      <div className="counseling-form">
        <img src="/img_counsel_person.png" alt="Counsel Person" />
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
