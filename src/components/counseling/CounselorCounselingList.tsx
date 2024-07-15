// CounselorCounselingList.tsx
import React, { useState } from 'react';
import { 
  TableCell, 
  TableRow, 
  Paper, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import {
  StyledTableContainer,
  StyledTable,
  StyledTableHead,
  StyledTableBody,
  StyledButton,
} from './sharedStyles';
import { CounselingResponseDto } from '../../types/interface/counseling';
import { getCounselingTypeName, getStatusName } from 'utils/counselingUtils';

interface CounselorCounselingListProps {
  counselings: CounselingResponseDto[];
  onUpdateContent: (counselingId: number, content: string) => void;
}

const CounselorCounselingList: React.FC<CounselorCounselingListProps> = ({ counselings, onUpdateContent }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCounseling, setSelectedCounseling] = useState<CounselingResponseDto | null>(null);
  const [counselContent, setCounselContent] = useState('');

  const handleOpenDialog = (counseling: CounselingResponseDto) => {
    setSelectedCounseling(counseling);
    setCounselContent(counseling.counselContent || '');
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCounseling(null);
    setCounselContent('');
  };

  const handleSaveContent = () => {
    if (selectedCounseling) {
      onUpdateContent(selectedCounseling.reqNo, counselContent);
      handleCloseDialog();
    }
  };

  return (
    <>
      <StyledTableContainer as={Paper}>
        <StyledTable>
          <StyledTableHead>
            <TableRow>
              <TableCell>날짜</TableCell>
              <TableCell>학생</TableCell>
              <TableCell>학번</TableCell>
              <TableCell>상담 유형</TableCell>
              <TableCell>상태</TableCell>
              <TableCell>액션</TableCell>
            </TableRow>
          </StyledTableHead>
          <StyledTableBody>
            {counselings.map((counseling) => (
              <TableRow key={counseling.reqNo}>
                <TableCell>{new Date(counseling.counselDate).toLocaleDateString()}</TableCell>
                <TableCell>{counseling.student.user.userName}</TableCell>
                <TableCell>{counseling.student.user.userId}</TableCell>
                <TableCell>{counseling.department?.deptName || '배정 안됨'}</TableCell>
                <TableCell>{getStatusName(counseling.status)}</TableCell>
                <TableCell>
                  <StyledButton onClick={() => handleOpenDialog(counseling)}>
                    {counseling.counselContent ? '결과 수정' : '결과 등록'}
                  </StyledButton>
                </TableCell>
              </TableRow>
            ))}
          </StyledTableBody>
        </StyledTable>
      </StyledTableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>상담 결과 {selectedCounseling?.counselContent ? '수정' : '등록'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="counselContent"
            label="상담 결과"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={counselContent}
            onChange={(e) => setCounselContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <StyledButton onClick={handleCloseDialog}>취소</StyledButton>
          <StyledButton onClick={handleSaveContent}>저장</StyledButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CounselorCounselingList;