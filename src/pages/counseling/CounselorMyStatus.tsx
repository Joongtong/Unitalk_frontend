import React, { useEffect, useState } from "react";
import CounselorDashboard from "components/counseling/CounselorDashboard";
import CounselorScheduleManager from "components/counseling/CounselorScheduleManager";
import MyStatusCalendar from "components/counseling/MyStatusCalendar";

const CounselorMyStatus: React.FC = () => {
  const [counselorNo, setCounselorNo] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [menuFilter, setMenuFilter] = useState<string>("MYPAGE");

  useEffect(() => {
    const fetchCounselorData = async () => {
      try {
        setLoading(true);
        // TODO: API를 통해 현재 로그인한 상담사의 번호를 가져오는 로직 구현
        // 예: const response = await getCounselorInfo();
        // setCounselorNo(response.counselorNo);
        setCounselorNo(2); // 임시로 7로 설정
        setLoading(false);
      } catch (err) {
        console.error("Error in CounselorMyStatus:", err);
        setError("상담사 정보를 불러오는 데 실패했습니다.");
        setLoading(false);
      }
    };

    fetchCounselorData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const renderComponent = () => {
    switch (menuFilter) {
      case "MYPAGE":
        return <MyStatusCalendar userNo={counselorNo} userType="C" />;
      case "LISTS":
        return <CounselorDashboard counselorNo={counselorNo} />;
      case "SCHEDULE":
        return <CounselorScheduleManager counselorNo={counselorNo} />;
      default:
        return null;
    }
  };

  return (
    <section className="body-section">
      <div className="counselor-my-status">
        <div className="type-buttons">
          <button
            onClick={() => setMenuFilter("MYPAGE")}
            className={menuFilter === "MYPAGE" ? "active" : ""}
          >
            My-Status
          </button>
          <button
            onClick={() => setMenuFilter("LISTS")}
            className={menuFilter === "LISTS" ? "active" : ""}
          >
            나의 상담 내역
          </button>
          <button
            onClick={() => setMenuFilter("SCHEDULE")}
            className={menuFilter === "SCHEDULE" ? "active" : ""}
          >
            상담 설정
          </button>
        </div>
        {renderComponent()}
      </div>
    </section>
  );
};

export default CounselorMyStatus;
