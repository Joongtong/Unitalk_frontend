import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CounselingResponseDto } from 'types/interface/counseling';
import PaginatedList from 'components/counseling/PaginatedList';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import 'assets/styles/counseling/CounselingListView.css';

interface CounselorDashboardProps {
    counselorNo: number;
}

const MainMyListCounselor: React.FC<CounselorDashboardProps> = ({ counselorNo }) => {
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
  const rowsPerPage = 5; // 페이지당 행 수

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
    <div className="Main-MyList-counseling-history">
      {/* 상담 목록 표시 */}
      <div className='Main-MyList-history-list'>
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

export default MainMyListCounselor;