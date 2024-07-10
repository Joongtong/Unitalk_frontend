import React, { useState, useEffect } from 'react';
import { getCounselingsByCounselorNo, updateCounselingContent } from 'services/counselingService';
import { CounselingResponseDto } from 'types/interface/counseling';
import PaginatedList from './PaginatedList';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import 'assets/styles/counseling/CounselingListView.css';

interface CounselorDashboardProps {
  counselorNo: number;
}

const CounselorDashboard: React.FC<CounselorDashboardProps> = ({ counselorNo }) => {
  const [semesterFilter, setSemesterFilter] = useState<string>('');
  const [resultFilter, setResultFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [counselingData, setCounselingData] = useState<CounselingResponseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const rowsPerPage = 10;

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getCounselingsByCounselorNo(counselorNo, {
        semester: semesterFilter,
        resultStatus: resultFilter,
        searchQuery: searchQuery,
        page: page,
        size: rowsPerPage
      });
      
      if ('content' in result && 'totalPages' in result) {
        setCounselingData(result.content);
        setTotalPages(result.totalPages);
      } else {
        console.error('Unexpected response format:', result);
        setError('서버 응답 형식이 잘못되었습니다.');
      }
    } catch (err) {
      setError('데이터를 불러오는 데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [counselorNo, page, semesterFilter, resultFilter]);

  const handleSearch = () => {
    setPage(0);
    fetchData();
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  const handleCounselingContentUpdate = async (counselingId: number, content: string) => {
    try {
      await updateCounselingContent(counselingId, content);
      fetchData(); // 데이터 다시 불러오기
    } catch (err) {
      console.error('Failed to update counseling content:', err);
      setError('상담 결과 업데이트에 실패했습니다.');
    }
  };

  return (
    <div className="counseling-history">
      <div className="filters">
        <div style={{ width: '70%', display: 'flex', justifyContent: 'flex-start' }}>
          <select 
            style={{ width: '30%' }}
            value={semesterFilter}
            onChange={(e) => setSemesterFilter(e.target.value)}
          >
            <option value="">전체 학기</option>
            <option value="2023-1">2023년 1학기</option>
            <option value="2023-2">2023년 2학기</option>
          </select>
          <select 
            style={{ width: '30%' }}
            value={resultFilter}
            onChange={(e) => setResultFilter(e.target.value)}
          >
            <option value="">전체</option>
            <option value="registered">결과 등록</option>
            <option value="unregistered">결과 미등록 (완료 제외)</option>
            <option value="completed_unregistered">완료 및 결과 미등록</option>
          </select>
        </div>
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