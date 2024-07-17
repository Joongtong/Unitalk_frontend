//모든 프로그램 신청내역 목록
import React from 'react';
import { IApplicant } from 'types/interface/program/IApplicant';

interface Props {
    applicants: IApplicant[];
    onApplicantClick: (applicant: IApplicant) => void;
}

const AllApplicantListItem: React.FC<Props> = ({ applicants, onApplicantClick }) => {
    return (
        <div className="applicant-list">
            {applicants.map((applicant) => (
                <div key={applicant.applicantNo} className="applicant-item" onClick={() => onApplicantClick(applicant)}>
                    <div>프로그램: {applicant.program ? applicant.program.programName : 'Unknown'}</div>
                    <div>학번: {applicant.userId}</div>
                    <div>이름: {applicant.userName}</div>
                    <div>신청일: {new Date(applicant.applicantDate).toLocaleDateString()}</div>
                    <div>상태: {applicant.status === 1 ? '신청' : '취소'}</div>
                </div>
            ))}
        </div>
    );
};

export default AllApplicantListItem;
