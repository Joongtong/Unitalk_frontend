import React, { useState, useEffect, useRef } from 'react';
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
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedCounseling, setSelectedCounseling] = useState<CounselingResponseDto | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
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

  const getCounselingsForSelectedDate = () => {
    return counselings.filter(counseling => 
      dayjs(counseling.counselDate).isSame(dayjs(selectedDate), 'day')
    );
  };

  const getUpcomingCounselings = () => {
    const now = dayjs();
    return counselings.filter(counseling => dayjs(counseling.counselDate).isAfter(now))
      .sort((a, b) => dayjs(a.counselDate).diff(dayjs(b.counselDate)));
  };

  const calendarEvents = counselings.map(counseling => ({
    id: counseling.reqNo.toString(),
    calendarId: '1',
    title: `${counseling.student.user.userName}`,
    category: 'time',
    start: counseling.counselDate,
    end: dayjs(counseling.counselDate).add(1, 'hour').toDate(),
    backgroundColor: '#FF9800',
    data: counseling
  }));

  const handleDateClick = (info: any) => {
    setSelectedDate(info.date);
  };

  return (
    <Grid container spacing={2} className="my-status">
      <Grid item xs={12} md={8}>
        <Paper elevation={3} className="calendar-container">
          <Calendar
            ref={calendarRef}
            height="700px"
            view="month"
            month={{
              dayNames: ['일', '월', '화', '수', '목', '금', '토'],
              startDayOfWeek: 0,
            }}
            events={calendarEvents}
            onClickDate={handleDateClick}
            onClickEvent={(event) => handleSelectCounseling(event.event.data)}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper elevation={3} className="list-container">
          <Typography variant="h6" className="counseling-list-title">
            {dayjs(selectedDate).format('YYYY년 MM월 DD일')}의 상담
          </Typography>
          <List>
            {getCounselingsForSelectedDate().map((counseling) => (
              <ListItem key={counseling.reqNo} button onClick={() => handleSelectCounseling(counseling)}>
                <ListItemText
                  primary={`${dayjs(counseling.counselDate).format('HH:mm')} - ${counseling.counselType}`}
                  secondary={`${counseling.student.user.userName} (${counseling.student.user.userId})`}
                />
              </ListItem>
            ))}
          </List>
          <Typography variant="h6" className="counseling-list-title">
            예정된 상담
          </Typography>
          <List>
            {getUpcomingCounselings().map((counseling) => (
              <ListItem key={counseling.reqNo} button onClick={() => handleSelectCounseling(counseling)}>
                <ListItemText
                  primary={`${dayjs(counseling.counselDate).format('MM/DD HH:mm')} - ${counseling.counselType}`}
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
        <DialogTitle>{selectedCounseling?.counselType} 상담</DialogTitle>
        <DialogContent>
          <p>학생: {selectedCounseling?.student.user.userName} ({selectedCounseling?.student.user.userId})</p>
          <p>시간: {selectedCounseling && dayjs(selectedCounseling.counselDate).format('YYYY/MM/DD HH:mm')}</p>
          <p>상담 유형: {selectedCounseling?.counselType}</p>
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