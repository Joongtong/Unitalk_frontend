import React, { useEffect, useState } from "react";
import CounselingDashboard from "components/counseling/CounselingDashboard";
import CounselingListView from "components/counseling/CounselingListView";
import { getCounselingCountsByStudentNo } from "services/counselingService";
import { CounselingCountsDto } from "types/interface/counseling";
import "assets/styles/counseling/MyStatus.css";

const CounselingMyStatus: React.FC = () => {
  const [counselingCounts, setCounselingCounts] =
    useState<CounselingCountsDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const studentNo = 1; // 임시로 고정된 학생 번호
        const countsResult = await getCounselingCountsByStudentNo(studentNo);
        setCounselingCounts(countsResult);
        setLoading(false);
      } catch (err) {
        console.error("Error in CounselingMyStatus:", err);
        setError("데이터를 불러오는 데 실패했습니다.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!counselingCounts) return null;

  return (
    <>
      <section className="body-section">
        <div className="counseling-my-status">
          <CounselingDashboard counselingCounts={counselingCounts} /><br/>
          <CounselingListView studentNo={1} />
        </div>
      </section>
    </>
  );
};

export default CounselingMyStatus;
