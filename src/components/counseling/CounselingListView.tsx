// CounselingListView.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCounselingsByStudentNo } from 'services/counselingService';
import { CounselingResponseDto } from 'types/interface/counseling';
import { IApplicant } from 'types/interface/program/IApplicant';
import PaginatedList from './PaginatedList';
import GroupCounselingList from './GroupCounselingList';
import 'assets/styles/counseling/CounselingListView.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface CounselingListViewProps {
  studentNo: number;
}

const CounselingListView: React.FC<CounselingListViewProps> = ({ studentNo }) => {
  const [modeFilter, setModeFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('PROF');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [counselingData, setCounselingData] = useState<CounselingResponseDto[]>([]);
  const [groupCounselingData, setGroupCounselingData] = useState<IApplicant[]>([]);
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

  const fetchGroupCounselingData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/applicant/${studentNo}`, {
        params: {
          page: page,
          size: rowsPerPage
        }
      });
      console.log('Group counseling data:', response.data);
      setGroupCounselingData(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error('집단상담 신청 데이터를 불러오는 데 실패했습니다:', err);
      setError('집단상담 신청 데이터를 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeFilter === 'GROUP') {
      fetchGroupCounselingData();
    } else {
      fetchData(typeFilter);
    }
  }, [studentNo, typeFilter, page]);

  const handleTypeFilter = (type: string) => {
    setTypeFilter(type);
    setPage(0);
  };

  const handleSearch = () => {
    setPage(0);
    if (typeFilter === 'GROUP') {
      fetchGroupCounselingData();
    } else {
      fetchData(typeFilter, true);
    }
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
        <button onClick={() => handleTypeFilter('GROUP')} className={typeFilter === 'GROUP' ? 'active' : ''}>집단상담</button>
      </div>
      {typeFilter !== 'GROUP' && (
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
      )}
      <div className='history-list'>
        {loading && <p>로딩 중...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && typeFilter !== 'GROUP' && (
          <PaginatedList 
            counselings={counselingData}
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isCounselor={false}
           />
        )}
        {!loading && !error && typeFilter === 'GROUP' && (
          <GroupCounselingList 
            applications={groupCounselingData}
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default CounselingListView;