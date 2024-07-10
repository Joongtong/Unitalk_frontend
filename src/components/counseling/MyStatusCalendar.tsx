import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import { List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Button, Paper, Grid, Pagination, Typography } from '@mui/material';
import dayjs from 'dayjs';
import 'assets/styles/counseling/MyStatusCalendar.css';
import { CounselingResponseDto } from 'types/interface/counseling';

interface CounselingResponse {
  content: CounselingResponseDto[];
  currentPage: number;
  totalPages: number;
}

const MyStatusCalendar: React.FC<{ counselorNo: number }> = ({ counselorNo }) => {
  const [counselings, setCounselings] = useState<CounselingResponseDto[]>([]);
  const [selectedCounseling, setSelectedCounseling] = useState<CounselingResponseDto | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const calendarRef = useRef<any>(null);

  useEffect(() => {
    fetchCounselings(currentPage);
  }, [counselorNo, currentPage]);

  const fetchCounselings = async (page: number) => {
    try {
      const response = await axios.get<CounselingResponse>(`/api/counselings/counselor/${counselorNo}?page=${page}&size=5`);
      setCounselings(response.data.content);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('상담 정보 조회 중 오류 발생:', error);
      setCounselings([]);
    }
  };

  const handleSelectCounseling = (counseling: CounselingResponseDto) => {
    setSelectedCounseling(counseling);
  };

  const handleCloseDialog = () => {
    setSelectedCounseling(null);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value - 1);
  };

  const getTimeFromPeriod = (period: number) => {
    const startHour = 9 + Math.floor((period - 1) / 2);
    const startMinute = ((period - 1) % 2) * 30;
    return `${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`;
  };

  const calendarEvents = counselings.map(counseling => ({
    id: counseling.reqNo.toString(),
    calendarId: '1',
    title: `${counseling.student.user.userName}`,
    category: 'time',
    start: `${counseling.counselDate}T${getTimeFromPeriod(counseling.schedule.availTime)}`,
    end: `${counseling.counselDate}T${getTimeFromPeriod(counseling.schedule.availTime + 1)}`,
    backgroundColor: '#FF9800',
    data: counseling
  }));

  const onBeforeCreateEvent = useCallback(() => {
    return false;
  }, []);

  return (
    <Grid container spacing={2} className="my-status">
      <Grid item xs={12} md={8}>
        <Paper elevation={3} className="calendar-container">
          <Typography variant="h6" align="center" gutterBottom>
            {currentDate.format('YYYY년 MM월')}
          </Typography>
          <Calendar
            ref={calendarRef}
            height="700px"
            view="month"
            month={{
              dayNames: ['일', '월', '화', '수', '목', '금', '토'],
              startDayOfWeek: 0,
            }}
            events={calendarEvents}
            onClickEvent={(event) => handleSelectCounseling(event.event.data)}
            onBeforeCreateEvent={onBeforeCreateEvent}
            isReadOnly={true}
            onChangeView={(view) => {
              if (view.currentDate) {
                setCurrentDate(dayjs(view.currentDate));
              }
            }}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper elevation={3} className="list-container">
          <Typography variant="h6" className="counseling-list-title">
            전체 상담 목록
          </Typography>
          <List>
            {counselings.map((counseling) => (
              <ListItem key={counseling.reqNo} button onClick={() => handleSelectCounseling(counseling)}>
                <ListItemText
                  primary={`${dayjs(counseling.counselDate).format('YYYY/MM/DD')} ${getTimeFromPeriod(counseling.schedule.availTime)} - ${counseling.department.deptName}`}
                  secondary={`${counseling.student.user.userName} (${counseling.student.user.userId})`}
                />
              </ListItem>
            ))}
          </List>
          <div className="pagination-container">
            <Pagination 
              count={totalPages} 
              page={currentPage + 1} 
              onChange={handlePageChange} 
              color="primary" 
            />
          </div>
        </Paper>
      </Grid>
      <Dialog open={!!selectedCounseling} onClose={handleCloseDialog}>
        <DialogTitle>{selectedCounseling?.department.deptName} 상담</DialogTitle>
        <DialogContent>
          <p>학생: {selectedCounseling?.student.user.userName} ({selectedCounseling?.student.user.userId})</p>
          <p>시간: {selectedCounseling && `${dayjs(selectedCounseling.counselDate).format('YYYY/MM/DD')} ${getTimeFromPeriod(selectedCounseling.schedule.availTime)}`}</p>
          <p>상담 유형: {selectedCounseling?.department.deptName}</p>
          <p>상담 모드: {selectedCounseling?.counselMode === 1 ? '대면' : '비대면'}</p>
          <p>신청 내용: {selectedCounseling?.applicationContent}</p>
          <p>상담 내용: {selectedCounseling?.counselContent}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>닫기</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default MyStatusCalendar;