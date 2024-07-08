// components/counseling/CounselingHistory.tsx

import React, { useState, useEffect } from 'react';
import { getCounselingsByStudentNo } from 'services/counselingService';
import { CounselingResponseDto } from '../../types/interface/counseling';
import 'assets/styles/counseling/CounselingHistory.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface CounselingHistoryProps {
  studentNo: number;
}

const CounselingHistory: React.FC<CounselingHistoryProps> = ({ studentNo }) => {
  const [modeFilter, setModeFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [counselingData, setCounselingData] = useState<CounselingResponseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getCounselingsByStudentNo(studentNo, {
        counselMode: modeFilter ? parseInt(modeFilter) : undefined,
        status: statusFilter ? parseInt(statusFilter) : undefined,
        counselType: typeFilter !== 'ALL' ? typeFilter : undefined,
        startDate,
        endDate
      });
      setCounselingData(result.content);
    } catch (err) {
      setError('데이터를 불러오는 데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [studentNo]);

  const handleSearch = () => {
    fetchData();
  };

  return (
    <div className="counseling-history">
      <div className="title-container">
        <div className="icon">
          <FontAwesomeIcon icon={faList} />
        </div>
        <h2>전체 상담 이력</h2>
      </div>
      <div className="type-buttons">
        <button onClick={() => setTypeFilter('PROF')} className={typeFilter === 'PROF' ? 'active' : ''}>지도교수 상담</button>
        <button onClick={() => setTypeFilter('PERS')} className={typeFilter === 'PERS' ? 'active' : ''}>개인 상담</button>
        <button onClick={() => setTypeFilter('SEXH')} className={typeFilter === 'SEXH' ? 'active' : ''}>성고충신고센터</button>
        <button onClick={() => setTypeFilter('WELF')} className={typeFilter === 'WELF' ? 'active' : ''}>학생복지 상담</button>
      </div>
      <div className="filters">
        <select value={modeFilter} onChange={(e) => setModeFilter(e.target.value)}>
          <option value="">전체</option>
          <option value="1">대면</option>
          <option value="2">비대면</option>
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">전체</option>
          <option value="1">대기</option>
          <option value="2">승인</option>
          <option value="3">완료</option>
          <option value="8">불참</option>
          <option value="9">취소</option>
        </select>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="시작일"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="종료일"
        />
        <button onClick={handleSearch} className="search-button">
          <FontAwesomeIcon icon={faMagnifyingGlass}/> 검색
        </button>
      </div>
      {loading && <p>로딩 중...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && (
        <>
          {counselingData.length > 0 ? (
            <ul className="counseling-list">
              {counselingData.map((counseling) => (
                <li key={counseling.reqNo} className="counseling-item">
                  <span className="counseling-date">{counseling.counselDate}</span>
                  <span className={`counseling-type type-${counseling.counselType}`}>
                    {getCounselingTypeName(counseling.counselType)}
                  </span>
                  <span className="counseling-mode">
                    {counseling.counselMode === 1 ? '대면' : '비대면'}
                  </span>
                  <span className="counseling-status">
                    {getStatusName(counseling.status)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-data-message">기록이 존재하지 않습니다.</p>
          )}
        </>
      )}
    </div>
  );
};

function getCounselingTypeName(type: string): string {
  switch (type) {
    case 'PROF': return '지도교수 상담';
    case 'PERS': return '개인 상담';
    case 'SEXH': return '성고충신고센터';
    case 'WELF': return '학생복지 상담';
    default: return '기타 상담';
  }
}

function getStatusName(status: number): string {
  switch (status) {
    case 1: return '대기';
    case 2: return '승인';
    case 3: return '완료';
    case 8: return '불참';
    case 9: return '취소';
    default: return '알 수 없음';
  }
}

export default CounselingHistory;