// 학생본인 신청 목록
import React from 'react';
import { IApplicant } from 'types/interface/program/IApplicant';
import { useNavigate } from 'react-router-dom';
import { deleteApplication } from 'utils/api';

interface Props {
    applicants: IApplicant[];
    onApplicantUpdate: (updatedApplicant: IApplicant) => void;
}

const StudentApplicantListItem: React.FC<Props> = ({ applicants, onApplicantUpdate }) => {
    const navigate = useNavigate();

    const handleProgramClick = (programNo: number) => {
        navigate(`/program/${programNo}`);
    };

    const handleCancelClick = async (applicant: IApplicant) => {
        const confirmed = window.confirm('취소하시겠습니까?');
        if (!confirmed) {
            return;
        }

        try {
            await deleteApplication(applicant.applicantNo);
            const updatedApplicant = { ...applicant, status: 2 };
            onApplicantUpdate(updatedApplicant);
        } catch (error) {
            console.error('신청 취소 실패:', error);
        }
    };

    return (
        <div className="StudentApplicantListItem">
            {applicants.map((applicant) => {
                return (
                    <div key={applicant.applicantNo} className="applicant-item">
                        <div onClick={() => handleProgramClick(applicant.program?.programNo ?? 0)} className="program-name" >
                            프로그램: {applicant.program ? applicant.program.programName : 'Unknown'}
                        </div>
                        <div>신청일: {new Date(applicant.applicantDate).toLocaleDateString()}</div>
                        <div>상태: { applicant.status === 1 ? '신청' : applicant.status === 2 ? '취소' : applicant.status === 3 ? '완료' : '알 수 없음' } </div>
                        {applicant.status === 1 && (
                            <button onClick={() => handleCancelClick(applicant)}>취소</button>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default StudentApplicantListItem;
