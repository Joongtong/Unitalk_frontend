// CounselingListView.tsx
import React, { useState, useEffect } from 'react';
import { getCounselingsByStudentNo } from 'services/counselingService';
import { CounselingResponseDto } from 'types/interface/counseling';
import PaginatedList from './PaginatedList';
import 'assets/styles/counseling/CounselingListView.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface CounselingListViewProps {
  studentNo: number;
}

const CounselingListView: React.FC<CounselingListViewProps> = ({ studentNo }) => {
  const [modeFilter, setModeFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('PROF'); // 기본값을 'PROF'로 설정
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [counselingData, setCounselingData] = useState<CounselingResponseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const rowsPerPage = 10;

  const fetchData = async (type: string, applyFilters: boolean = false) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getCounselingsByStudentNo(studentNo, {
        counselMode: applyFilters && modeFilter ? parseInt(modeFilter) : undefined,
        status: applyFilters && statusFilter ? parseInt(statusFilter) : undefined,
        counselType: type,
        startDate: applyFilters ? startDate : undefined,
        endDate: applyFilters ? endDate : undefined,
        page: page,
        size: rowsPerPage
      });
      setCounselingData(result.content);
      setTotalPages(result.totalPages);
    } catch (err) {
      setError('데이터를 불러오는 데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(typeFilter);
  }, [studentNo, typeFilter]);

  const handleTypeFilter = (type: string) => {
    setTypeFilter(type);
    setPage(0);
    // type 버튼 클릭 시 즉시 데이터 fetch (다른 필터는 적용하지 않음)
    fetchData(type);
  };

  const handleSearch = () => {
    // 검색 버튼 클릭 시 모든 필터를 적용하여 데이터 fetch
    setPage(0);
    fetchData(typeFilter, true);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  return (
    <div className="counseling-history">
      <div className="title-container">
        <div className="icon">
          <FontAwesomeIcon icon={faList} />
        </div>
        <div className="title">전체 상담 이력</div>
      </div>
      <div className="type-buttons">
        <button onClick={() => handleTypeFilter('PROF')} className={typeFilter === 'PROF' ? 'active' : ''}>지도교수 상담</button>
        <button onClick={() => handleTypeFilter('PERS')} className={typeFilter === 'PERS' ? 'active' : ''}>개인 상담</button>
        <button onClick={() => handleTypeFilter('SEXH')} className={typeFilter === 'SEXH' ? 'active' : ''}>성고충신고센터</button>
        <button onClick={() => handleTypeFilter('WELF')} className={typeFilter === 'WELF' ? 'active' : ''}>학생복지 상담</button>
      </div>
      <div className="filters">
        <select className='counseling-page-select' value={modeFilter} onChange={(e) => setModeFilter(e.target.value)}>
          <option value="">전체</option>
          <option value="1">대면</option>
          <option value="2">비대면</option>
        </select>
        <select className='counseling-page-select' value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">전체</option>
          <option value="1">대기</option>
          <option value="2">승인</option>
          <option value="3">완료</option>
          <option value="8">불참</option>
          <option value="9">취소</option>
        </select>
        <input className='counseling-page-input'
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
      <div className='history-list'>
        {loading && <p>로딩 중...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && (
          <PaginatedList 
            counselings={counselingData}
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isCounselor={false}
           />
        )}
      </div>
    </div>
  );
};

export default CounselingListView;