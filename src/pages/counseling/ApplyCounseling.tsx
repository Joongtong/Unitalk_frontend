import React, { useState, useEffect } from "react";
import "assets/styles/counseling/CounselingListView.css";
import ProfCounselingRegister from "components/professorCounseling/ProfCounselingRegister";
import PersonalCounselingPage from "components/professorCounseling/PersonalCounselingRegister";

const ApplyCounseling: React.FC = () => {
  const [menuFilter, setMenuFilter] = useState<string>("PROF"); // 기본값을 'PROF'로 설정

  const renderComponent = () => {
    console.log("랜더링 진입");
    switch (menuFilter) {
      //지도교수 상담
      case "PROF":
        return <ProfCounselingRegister counselType="PROF" />;
      //개인 상담
      case "PERS":
        return <PersonalCounselingPage counselType="PERS" />;
      //성고충신고센터
      case "SEXH":
        return null;
      default:
        //학생복지 상담
        return null;
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
            성고충신고센터
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
