import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { CounselingResponseDto } from '../../types/interface/counseling';
import CounselingDetailModal from './CounselingDetailModal';

interface CounselingListProps {
  counselings: CounselingResponseDto[];
}

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  boxShadow: 'none',
  backgroundColor: 'transparent',
}));

const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
  '& .MuiTableCell-root': {
    fontSize: '12px',
    textAlign: 'center',
    verticalAlign: 'middle',
    padding: '7px',
    borderRight: `1px solid ${theme.palette.divider}`,
    '&:last-child': {
      borderRight: 'none',
    },
  },
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: '#f0f0f0',
  '& .MuiTableCell-root': {
    fontSize: '14px',
    fontWeight: 'bold',
    height: '32px',
  }
}));

const StyledTableBody = styled(TableBody)(({ theme }) => ({
  '& .MuiTableCell-root': {
    borderBottom: `1px solid ${theme.palette.divider}`,
    height: '32px',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderColor: '#A51C30',
  borderWidth: '1px',
  borderStyle: 'solid',
  color: '#A51C30',
  fontSize: '12px',
  width: '100%',
  height: '100%',
  '&:hover': {
    backgroundColor: '#A51C30',
    color: '#fff',
  },
  '&.Mui-disabled': {
    backgroundColor: '#f0f0f0',
    borderColor: '#f0f0f0',
    color: theme.palette.text.disabled,
  },
}));

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