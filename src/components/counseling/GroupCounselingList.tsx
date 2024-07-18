import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { IApplicant } from 'types/interface/program/IApplicant';
import { Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { getGroupCounselingsByStudentNo } from 'services/groupCounselingService'; 
import { StyledButton } from './sharedStyles';
interface GroupCounselingListProps {
  studentNo: number;
  page: number;
  totalPages: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const GroupCounselingList: React.FC<GroupCounselingListProps> = ({ studentNo, page, totalPages, onPageChange }) => {
  const [applications, setApplications] = useState<IApplicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getGroupCounselingsByStudentNo(studentNo, { page });
        setApplications(response.content);
      } catch (err) {
        setError('집단상담 신청 데이터를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [studentNo, page]);

  const handleDetailClick = (programNo: number) => {
     // 상세보기 버튼 클릭 시 해당 경로로 이동
     navigate(`/api/program/${programNo}`);
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!applications || applications.length === 0) {
    return <p>신청한 집단상담 프로그램이 없습니다.</p>;
  }

  return (
    <div className="counseling-list">
      <TableContainer component={Paper}>
        <Table aria-label="group counseling table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '10%' }}>No</TableCell>
              <TableCell style={{ width: '18%' }}>신청일시</TableCell>
              <TableCell style={{ width: '18%' }}>프로그램 이름</TableCell>
              <TableCell style={{ width: '18%' }}>상세보기</TableCell>
              <TableCell style={{ width: '18%' }}>상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((application, index) => (
              <TableRow key={application.applicantNo}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{application.applicantDate}</TableCell>
                <TableCell>{application.program.programName}</TableCell> 
                <TableCell>
                  <StyledButton 
                    onClick={() => handleDetailClick(application.program.programNo)}
                  >
                    상세보기
                  </StyledButton>
                </TableCell>
                <TableCell>{application.status === 1 ? '신청' : '취소'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
