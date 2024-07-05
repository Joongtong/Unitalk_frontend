import React, { useEffect, useState } from 'react';
import CounselingDashboard from '../../components/counseling/CounselingDashboard';
import CounselingHistory from '../../components/counseling/CounselingHistory';
import { getCounselingCountsByStudentId, getCounselingsByStudentId } from '../../services/counselingService';
import { CounselingCountsDto, CounselingResponseDto } from '../../types/interface/counseling';
import 'assets/styles/counseling/MyStatus.css'

const CounselingMyStatus: React.FC = () => {
  const [counselingCounts, setCounselingCounts] = useState<CounselingCountsDto | null>(null);
  const [counselingData, setCounselingData] = useState<CounselingResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const studentId = 2001; // 임시로 고정된 학생 ID
        const [countsResult, historyResult] = await Promise.all([
          getCounselingCountsByStudentId(studentId),
          getCounselingsByStudentId(studentId)
        ]);
        setCounselingCounts(countsResult);
        setCounselingData(historyResult.content);
        setLoading(false);
      } catch (err) {
        console.error("Error in CounselingMyStatus:", err);
        setError('데이터를 불러오는 데 실패했습니다.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!counselingCounts || !counselingData) return null;

  return (
    <>
      <section className='body-section'>
        <div className="counseling-my-status">
          <CounselingDashboard counselingCounts={counselingCounts} />
          <CounselingHistory studentId={2001} />
        </div>
      </section>
    </>
  );
};

export default CounselingMyStatus;