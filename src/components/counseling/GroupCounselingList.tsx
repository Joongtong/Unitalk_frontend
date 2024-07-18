// GroupCounselingList.tsx
import React from 'react';
import { IApplicant } from 'types/interface/program/IApplicant'; 
import { Pagination } from '@mui/material';

interface GroupCounselingListProps {
  applications: IApplicant[];
  page: number;
  totalPages: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const GroupCounselingList: React.FC<GroupCounselingListProps> = ({ applications, page, totalPages, onPageChange }) => {
    if (!applications || applications.length === 0) {
        return <p>신청한 집단상담 프로그램이 없습니다.</p>;
      }
      
    return (
    <div className="group-counseling-list">
      <table>
        <thead>
          <tr>
            <th>프로그램명</th>
            <th>신청일</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application.applicantNo}>
              <td>{application.program.programName}</td>
              <td>{application.applicantDate}</td>
              <td>{application.status === 1 ? '신청' : '취소'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        count={totalPages}
        page={page + 1}
        onChange={(event, value) => onPageChange(event, value)}
        color="primary"
      />
    </div>
  );
};

export default GroupCounselingList;