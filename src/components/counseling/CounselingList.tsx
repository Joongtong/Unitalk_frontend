import React, { useState } from 'react';
import { 
  TableCell, 
  TableRow, 
  Paper, 
} from '@mui/material';
import {
  StyledTableContainer,
  StyledTable,
  StyledTableHead,
  StyledTableBody,
  StyledButton,
} from './sharedStyles';
import { CounselingResponseDto } from '../../types/interface/counseling';
import { IApplicant } from 'types/interface/program/IApplicant';
import CounselingDetailModal from './CounselingDetailModal';
import dayjs from 'dayjs';

interface CounselingListProps {
  counselings: CounselingResponseDto[];
  groupCounselings: IApplicant[];
  selectedDate: dayjs.Dayjs | null;
  onSelectCounseling: (arg: any) => void;
}

const CounselingList: React.FC<CounselingListProps> = ({ counselings }) => {
  const [selectedCounseling, setSelectedCounseling] = useState<CounselingResponseDto | null>(null);

  const getCounselingTypeName = (type: string): string => {
    const types: { [key: string]: string } = {
      PROF: '지도교수 상담',
      PERS: '개인 상담',
      SEXH: '성고충신고센터',
      WELF: '학생복지 상담'
    };
    return types[type] || '기타 상담';
  };

  const getStatusName = (status: number): string => {
    const statuses: { [key: number]: string } = {
      1: '대기',
      2: '승인',
      3: '완료',
      8: '불참',
      9: '취소'
    };
    return statuses[status] || '알 수 없음';
  };

  const handleDetailClick = (counseling: CounselingResponseDto) => {
    setSelectedCounseling(counseling);
  };

  const handleCloseModal = () => {
    setSelectedCounseling(null);
  };

  return (
    <div className="counseling-list">
      <StyledTableContainer as={Paper}>
        <StyledTable aria-label="counseling table">
          <StyledTableHead>
            <TableRow>
              <TableCell style={{ width: '10%' }}>No</TableCell>
              <TableCell style={{ width: '18%' }}>신청일시</TableCell>
              <TableCell style={{ width: '18%' }}>상담방식</TableCell>
              <TableCell style={{ width: '18%' }}>상태</TableCell>
              <TableCell style={{ width: '18%' }}>상세보기</TableCell>
              <TableCell style={{ width: '18%' }}>취소</TableCell>
            </TableRow>
          </StyledTableHead>
          <StyledTableBody>
            {counselings.map((counseling, index) => (
              <TableRow key={counseling.reqNo}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>{new Date(counseling.applicationDate).toLocaleDateString()}</TableCell>
                <TableCell>{counseling.counselMode === 1 ? '대면' : '비대면'}</TableCell>
                <TableCell>
                  {getStatusName(counseling.status)}
                </TableCell>
                <TableCell>
                  <StyledButton 
                    onClick={() => handleDetailClick(counseling)}
                  >
                    상세보기
                  </StyledButton>
                </TableCell>
                <TableCell>
                  <StyledButton 
                    disabled={counseling.status === 3}
                  >
                    상담취소
                  </StyledButton>
                </TableCell>
              </TableRow>
            ))}
          </StyledTableBody>
        </StyledTable>
      </StyledTableContainer>
      <CounselingDetailModal 
        counseling={selectedCounseling}
        open={selectedCounseling !== null}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default CounselingList;