import React from "react";
import { useNavigate } from "react-router-dom";
import "assets/styles/counseling/ProfCounselingRegister.css";

const MindWellCounseling: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    window.open(
      "https://www.work.go.kr/consltJobCarpa/jobPsyExamNew/jobPsyExamAdultList.do",
      "_blank"
    );
  };

  return (
    <div className="counseling-personal">
      <h2>심리 상담 서비스</h2>
      <div className="counseling-form">
        <p className="counseling-p">
          심리검사는 개인의 성격, 심리상태, 진로 적성 등을 이해하는 전문적인
          도구로써, 이를 통해 자신에 대한 이해를 높이고 효율적인 결정을 내릴 수
          있도록 도와줍니다.
        </p>
        <p className="counseling-p">
          표준화된 심리검사를 통해 자신의 능력과 심리적 특성을 객관적으로 파악할
          수 있습니다. 심리검사 후에는 전문가와의 1:1 해석 상담이 진행되며,
        </p>
        <p className="counseling-p">
          일반적으로 1시간에서 1시간 30분 정도 소요됩니다. 신청 시 충분한 시간
          여유를 가지시기를 권장합니다.
        </p>
      </div>
      <br />
      <div className="counseling-form">
        <img
          src="/img_counsel_test02.png"
          alt="Counsel test"
          style={{ display: "block", margin: "auto" }}
        />
      </div>
      <div>
        <button
          type="submit"
          className="submit-button"
          onClick={handleNavigate}
        >
          상담 하러가기
        </button>
      </div>

      <div className="counseling-form"></div>
    </div>
  );
};

export default MindWellCounseling;
