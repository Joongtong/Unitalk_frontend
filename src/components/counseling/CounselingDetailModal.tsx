import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { CounselingResponseDto } from '../../types/interface/counseling';

interface CounselingDetailModalProps {
  counseling: CounselingResponseDto | null;
  open: boolean;
  onClose: () => void;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: 'none',
  padding: '8px 16px',
  '&:first-of-type': {
    backgroundColor: '#f5f5f5',
    fontWeight: 'bold',
    width: '30%',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  border: '1px solid #A51C30',
  color: '#A51C30',
  '&:hover': {
    backgroundColor: '#A51C30',
    color: '#fff',
  },
}));

const CounselingDetailModal: React.FC<CounselingDetailModalProps> = ({ counseling, open, onClose }) => {
  if (!counseling) return null;

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

  // 추가: 교시를 시간으로 변환
  const getTimeFromAvailTime = (availTime: number): string => {
    const hour = 8 + availTime; // 9시부터 시작하므로 8에 availTime을 더함
    return `${hour.toString().padStart(2, '0')}:00`;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ border: '1px solid #A51C30', color: '#A51C30' }}>상세보기</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableBody>
              <TableRow>
                <StyledTableCell>신청일시</StyledTableCell>
                <StyledTableCell>{new Date(counseling.applicationDate).toLocaleString()}</StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>상담사</StyledTableCell>
                <StyledTableCell>{counseling.counselor.user.userName}</StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>상담일시</StyledTableCell>
                <StyledTableCell>
                  {new Date(counseling.counselDate).toLocaleDateString()} {getTimeFromAvailTime(counseling.schedule.availTime)}
                  </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>상태</StyledTableCell>
                <StyledTableCell>{getStatusName(counseling.status)}</StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>신청내용</StyledTableCell>
                <StyledTableCell>{counseling.applicationContent}</StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <StyledButton onClick={onClose}>
          확인
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default CounselingDetailModal;