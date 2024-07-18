import React, { useState, useEffect } from "react";
import "assets/styles/counseling/CounselingListView.css";
import ProfCounselingRegister from "components/professorCounseling/ProfCounselingRegister";
import PersonalCounselingPage from "components/professorCounseling/PersonalCounselingRegister";
import StudentWelfareCounseling from "components/professorCounseling/StudentWelfareCounseling";
import MindWellCounseling from "components/professorCounseling/MindWellCounseling";

const ApplyCounseling: React.FC = () => {
  const [menuFilter, setMenuFilter] = useState<string>("PROF"); // 기본값을 'PROF'로 설정

  const renderComponent = () => {
    console.log("랜더링 진입");
    switch (menuFilter) {
      //지도교수 상담
      case "PROF":
        return <ProfCounselingRegister counselType="PRO" />;
      //개인 상담
      case "PERS":
        return <PersonalCounselingPage counselType="COUN" />;
      //심리 상담
      case "SEXH":
        return <MindWellCounseling />;
      default:
        //학생복지 상담
        return <StudentWelfareCounseling counselType="COUN" />;
    }
  };

  return (
    <section className="body-section">
      <div className="counseling-history">
        <div className="title-container"></div>
        <div className="type-buttons">
          <button
            onClick={() => setMenuFilter("PROF")}
            className={menuFilter === "PROF" ? "active" : ""}
          >
            지도교수 상담
          </button>
          <button
            onClick={() => setMenuFilter("PERS")}
            className={menuFilter === "PERS" ? "active" : ""}
          >
            개인 상담
          </button>
          <button
            onClick={() => setMenuFilter("SEXH")}
            className={menuFilter === "SEXH" ? "active" : ""}
          >
            심리상담
          </button>
          <button
            onClick={() => setMenuFilter("WELF")}
            className={menuFilter === "WELF" ? "active" : ""}
          >
            학생복지 상담
          </button>
        </div>
        {renderComponent()}
      </div>
    </section>
  );
};

export default ApplyCounseling;
