import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TextField,
  IconButton,
  InputAdornment,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import { getCounselorFindAll } from "services/professorCounselingService";
import { CounselorSchedule } from "../../types/interface/counseling";
import { Employee } from "../../types/interface/employee";

interface ProfessorSearchListModalProps {
  open: boolean;
  onClose: () => void;
  onSelectProfessor: (employee: Employee) => void; // 부모 컴포넌트로 선택한 교수의 ID를 넘기기 위한 콜백 함수
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: "none",
  padding: "8px 16px",
  backgroundColor: "#A51C30", // #A51C30 색상 배경색
  color: "#fff", // 흰색 글자색
  fontWeight: "bold",
}));

const StyledTableCellContent = styled(TableCell)(({ theme }) => ({
  borderBottom: "none",
  padding: "8px 16px",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  border: "1px solid #A51C30",
  color: "#A51C30",
  "&:hover": {
    backgroundColor: "#A51C30",
    color: "#fff",
  },
}));

const ProfessorSearchListModal: React.FC<ProfessorSearchListModalProps> = ({
  open,
  onClose,
  onSelectProfessor,
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const [professors, setProfessors] = useState<any[]>([]); // 모든 교수 목록
  const [filteredProfessors, setFilteredProfessors] = useState<any[]>([]); // 필터된 교수 목록
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 5; // 한 페이지에 보여질 항목 수

  async function fetchProfessors() {
    try {
      const result = await getCounselorFindAll();
      setProfessors(result); // API에서 받은 데이터로 교수 목록 설정
      setFilteredProfessors(result); // 처음에는 전체 목록을 보여줍니다.
    } catch (error) {
      console.error("Failed to fetch professors:", error);
      // 에러 처리 필요
    }
  }

  useEffect(() => {
    if (open) {
      // 페이지 로딩 시 교수 목록 불러오기
      fetchProfessors();
    }
  }, [open]);

  // 페이지 변경 처리
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  // 검색 버튼 클릭 시 필터링 함수
  const handleSearchClick = () => {
    console.log(professors);
    const filteredData = professors.filter((prof) =>
      prof.user.userName.toLowerCase().includes(searchText.toLowerCase())
    );
    //|| prof.counselor.user.department.deptName.toLowerCase().includes(searchText.toLowerCase()));
    setFilteredProfessors(filteredData);
    setCurrentPage(1); // 검색 후 첫 페이지로 이동
  };

  // 선택한 교수 처리
  const handleProfessorSelect = (professorNo: number) => {
    const selectedProfessor = professors.find(
      (prof) => prof.employeeNo === professorNo
    );
    console.log("selectedProfessor");
    console.log(selectedProfessor);
    if (selectedProfessor) {
      onSelectProfessor(selectedProfessor);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          borderBottom: "1px solid #A51C30",
          marginBottom: "16px",
          padding: "12px",
        }}
      >
        교수 목록
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <TextField
              fullWidth
              label="교수 검색"
              variant="outlined"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="large" onClick={handleSearchClick}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              style={{ marginBottom: 16 }}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">
              총 {filteredProfessors.length} 건
            </Typography>
          </Grid>
        </Grid>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <StyledTableCell>이름</StyledTableCell>
                <StyledTableCell>학과</StyledTableCell>
                <StyledTableCell>선택</StyledTableCell>
              </TableRow>
              {filteredProfessors
                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                .map((professor) => (
                  <TableRow key={professor.employeeNo}>
                    <StyledTableCellContent>
                      {professor.user?.userName}
                    </StyledTableCellContent>
                    <StyledTableCellContent>
                      {professor.user?.department?.deptName}
                    </StyledTableCellContent>
                    <StyledTableCellContent>
                      <StyledButton
                        onClick={() =>
                          handleProfessorSelect(professor.employeeNo)
                        }
                      >
                        선택
                      </StyledButton>
                    </StyledTableCellContent>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div
          style={{ marginTop: 16, display: "flex", justifyContent: "center" }}
        >
          <Pagination
            count={Math.ceil(filteredProfessors.length / pageSize)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      </DialogContent>
      <DialogActions>
        <StyledButton onClick={onClose}>취소</StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default ProfessorSearchListModal;
