import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CounselingResponseDto } from 'types/interface/counseling';
import PaginatedList from './PaginatedList';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import 'assets/styles/counseling/CounselingListView.css';

interface CounselorDashboardProps {
  counselorNo: number;
}

const CounselorDashboard: React.FC<CounselorDashboardProps> = ({ counselorNo }) => {
  // 상태 관리
  const [sortOrder, setSortOrder] = useState<string>('latest'); // 정렬 순서
  const [status, setStatus] = useState<number | null>(null); // 상담 상태 필터
  const [hasResult, setHasResult] = useState<boolean | null>(null); // 결과 등록 여부 필터
  const [searchQuery, setSearchQuery] = useState<string>(''); // 검색어
  const [counselingData, setCounselingData] = useState<CounselingResponseDto[]>([]); // 상담 데이터
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태
  const [page, setPage] = useState(0); // 현재 페이지
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수
  const rowsPerPage = 10; // 페이지당 행 수

  // 데이터 fetching 함수
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/counselings/counselor/${counselorNo}/filtered`, {
        params: {
          status,
          hasResult,
          searchQuery,
          sortOrder,
          page,
          size: rowsPerPage
        }
      });
      
      setCounselingData(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError('데이터를 불러오는 데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 또는 의존성 변경 시 데이터 fetching
  useEffect(() => {
    fetchData();
  }, [counselorNo, page, status, hasResult, sortOrder]);

  // 검색 버튼 클릭 핸들러
  const handleSearch = () => {
    setPage(0);
    fetchData();
  };

  // 페이지 변경 핸들러
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  // 상담 내용 업데이트 핸들러
  const handleCounselingContentUpdate = async (counselingId: number, content: string) => {
    try {
      await axios.put(`/api/counselings/${counselingId}`, { counselContent: content });
      fetchData(); // 데이터 다시 불러오기
    } catch (err) {
      console.error('Failed to update counseling content:', err);
      setError('상담 결과 업데이트에 실패했습니다.');
    }
  };

  return (
    <div className="counseling-history">
      <div className="filters">
        {/* 정렬 순서 선택 */}
        <div style={{ width: '70%', display: 'flex', justifyContent: 'flex-start' }}>
          <select 
            style={{ width: '30%' }}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="latest">최신순</option>
            <option value="oldest">오래된순</option>
          </select>
          {/* 상담 상태 필터 */}
          <select 
            style={{ width: '30%' }}
            value={status === null ? '' : status.toString()}
            onChange={(e) => setStatus(e.target.value === '' ? null : Number(e.target.value))}
          >
            <option value="">전체 상태</option>
            <option value="1">신청</option>
            <option value="2">승인</option>
            <option value="3">완료</option>
          </select>
          {/* 결과 등록 여부 필터 */}
          <select 
            style={{ width: '30%' }}
            value={hasResult === null ? '' : hasResult.toString()}
            onChange={(e) => setHasResult(e.target.value === '' ? null : e.target.value === 'true')}
          >
            <option value="">전체</option>
            <option value="true">결과 등록</option>
            <option value="false">결과 미등록</option>
          </select>
        </div>
        {/* 검색 입력 필드 및 버튼 */}
        <div className='search-box' style={{ width: '30%', display: 'flex', justifyContent: 'flex-end' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="학번/이름 검색"
            style={{ width: '50%' }}
          />
          <button onClick={handleSearch} className="search-button">
            <FontAwesomeIcon icon={faMagnifyingGlass} /> 검색
          </button>
        </div>
      </div>
      {/* 상담 목록 표시 */}
      <div className="history-list">
        {loading && <p>로딩 중...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && (
          <PaginatedList 
            counselings={counselingData}
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isCounselor={true}
            onUpdateContent={handleCounselingContentUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default CounselorDashboard;