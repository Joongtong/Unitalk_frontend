import React from 'react';
import { CounselingCountsDto } from 'types/interface/counseling'; 
import 'assets/styles/counseling/CounselingDashboard.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

interface CounselingDashboardProps {
  counselingCounts: CounselingCountsDto;
}

const CounselingDashboard: React.FC<CounselingDashboardProps> = ({ counselingCounts }) => {
  return (
    <div className="participation-status">
      <div className="title-container">
        <div className="icon">
          <FontAwesomeIcon icon={faBookmark} />
        </div>
        <h2 className="title">나의 상담 참여 현황</h2>
      </div>
      <div className="status-grid">
        <div className="status-item professor">
          <h3>지도교수 상담</h3>
          <p>{counselingCounts.professorCounseling}회</p>
        </div>
        <div className="status-item personal">
          <h3>개인 상담</h3>
          <p>{counselingCounts.personalCounseling}회</p>
        </div>
        <div className="status-item harassment">
          <h3>심리상담</h3>
          <p>{counselingCounts.sexualHarassmentCounseling}회</p>
        </div>
        <div className="status-item welfare">
          <h3>학생복지 상담</h3>
          <p>{counselingCounts.studentWelfareCounseling}회</p>
        </div>
      </div>
    </div>
  );
};

export default CounselingDashboard;