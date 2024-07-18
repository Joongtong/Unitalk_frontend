import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";
import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.css";
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import "assets/styles/counseling/MyStatusCalendar.css";
import { CounselingResponseDto } from "types/interface/counseling";
import CounselingDetailModal from "./CounselingDetailModal";

interface CounselingResponse {
  content: CounselingResponseDto[];
  currentPage: number;
  totalPages: number;
}

interface MyStatusCalendarProps {
  userNo: number;
  userType: "counselor" | "student";
}

const MyStatusCalendar: React.FC<MyStatusCalendarProps> = ({
  userNo,
  userType,
}) => {
  const [counselings, setCounselings] = useState<CounselingResponseDto[]>([]);
  const [selectedCounseling, setSelectedCounseling] =
    useState<CounselingResponseDto | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const calendarRef = useRef<any>(null);

  useEffect(() => {
    fetchCounselings(currentPage);
  }, [userNo, currentPage, userType]);

  const fetchCounselings = async (page: number) => {
    try {
      const response = await axios.get<CounselingResponse>(
        `/api/counselings/${userType}/${userNo}?page=${page}&size=5`
      );
      setCounselings(response.data.content);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("상담 정보 조회 중 오류 발생:", error);
      setCounselings([]);
    }
  };

  const handleSelectCounseling = useCallback((arg: any) => {
    let counseling;
    if (arg && typeof arg === "object") {
      if (arg.schedule && arg.schedule.raw) {
        counseling = arg.schedule.raw;
      } else if (arg.data) {
        counseling = arg.data;
      } else {
        counseling = arg;
      }
    }

    if (counseling) {
      setSelectedCounseling(counseling);
      setIsModalOpen(true);
    } else {
      console.error("선택된 상담 정보를 찾을 수 없습니다:", arg);
    }
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCounseling(null);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value - 1);
  };

  const getTimeFromPeriod = (period: number) => {
    const startHour = 9 + Math.floor((period - 1) / 2);
    const startMinute = ((period - 1) % 2) * 30;
    return `${startHour.toString().padStart(2, "0")}:${startMinute
      .toString()
      .padStart(2, "0")}`;
  };

  const calendarEvents = useMemo(
    () =>
      counselings.map((counseling) => ({
        id: counseling.reqNo.toString(),
        calendarId: "1",
        title:
          userType === "counselor"
            ? `${counseling.student.user.userName}`
            : `${counseling.department.deptName} 상담`,
        category: "time",
        start: `${counseling.counselDate}T${getTimeFromPeriod(
          counseling.schedule.availTime
        )}`,
        end: `${counseling.counselDate}T${getTimeFromPeriod(
          counseling.schedule.availTime + 1
        )}`,
        backgroundColor: "#FF9800",
        raw: counseling,
      })),
    [counselings, userType]
  );

  const onBeforeCreateEvent = useCallback(() => {
    return false;
  }, []);

  return (
    <div className="my-status-calendar">
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} className="calendar-container">
            <Typography variant="h6" align="center" gutterBottom>
              {currentDate.format("YYYY년 MM월")}
            </Typography>
            <Calendar
              ref={calendarRef}
              height="700px"
              view="month"
              month={{
                dayNames: ["일", "월", "화", "수", "목", "금", "토"],
                startDayOfWeek: 0,
              }}
              events={calendarEvents}
              onClickSchedule={handleSelectCounseling}
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
            <h3 className="counseling-list-title">상담 목록</h3>
            <List>
              {counselings.map((counseling) => (
                <ListItem
                  key={counseling.reqNo}
                  button
                  onClick={() => handleSelectCounseling({ data: counseling })}
                >
                  <ListItemText
                    primary={`${dayjs(counseling.counselDate).format(
                      "YYYY/MM/DD"
                    )} ${getTimeFromPeriod(counseling.schedule.availTime)} - ${
                      counseling.department.deptName
                    }`}
                    secondary={
                      userType === "counselor"
                        ? `${counseling.student.user.userName} (${counseling.student.user.userId})`
                        : `상담사: ${counseling.counselor.user.userName}`
                    }
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
      </Grid>
      <CounselingDetailModal
        counseling={selectedCounseling}
        open={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default React.memo(MyStatusCalendar);
