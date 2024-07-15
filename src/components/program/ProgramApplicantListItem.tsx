// 프로그램 목록
import React from 'react';
import { IApplicant } from 'types/interface/program/IApplicant';
import { useNavigate } from 'react-router-dom';
import { deleteApplication } from 'utils/api';

interface Props {
  applicants: IApplicant[];
  onApplicantClick: (updatedApplicants: IApplicant[]) => void;
}

const ProgramApplicantListItem: React.FC<Props> = ({ applicants, onApplicantClick }) => {
  const navigate = useNavigate();

  const handleDeleteClick = async (applicantNo: number) => {
    const confirmed = window.confirm('취소하시겠습니까?');
    if (!confirmed) {
      return;
    }

    try {
      await deleteApplication(applicantNo);

      const updatedApplicants = applicants.filter(applicant => applicant.applicantNo !== applicantNo);
      onApplicantClick(updatedApplicants);
      alert('신청이 삭제되었습니다.');
    } catch (error) {
      alert('신청 삭제에 실패했습니다.');
    }
  };

  return (
    <div className="applicant-list">
      {applicants.map((applicant) => (
        <div key={applicant.applicantNo} className="applicant-item">
          <div>학번: {applicant.userId}</div>
          <div>이름: {applicant.userName}</div>
          <div>신청일: {new Date(applicant.applicantDate).toLocaleDateString()}</div>
          <div>
            상태: {
              applicant.status === 1 ? '신청' :
              applicant.status === 2 ? '취소' :
              applicant.status === 3 ? '완료' :
              '알 수 없음'
            }
          </div>
          {applicant.status === 1 && (
            <button onClick={() => handleDeleteClick(applicant.applicantNo)}>취소</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgramApplicantListItem;
