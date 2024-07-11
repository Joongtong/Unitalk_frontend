import React, { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';
import { fetchPrograms } from 'utils/api';
import { programPagination } from 'utils/recoilState';

import ProgramList from 'components/program/ProgramList';
import Pagination from 'components/program/Pagination';
import ProgramFilter from 'components/program/ProgramFilter';
import ProgramSearch from 'components/program/ProgramSearch';

const Program: React.FC = () => {
  
  const [programPage, setProgramPage] = useRecoilState(programPagination);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState<string | undefined>(undefined);
  const [searchType, setSearchType] = useState<string | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);

  const fetchProgramsData = async () => {
    try {
      setLoading(true);
      const data = await fetchPrograms(currentPage, 16, filter, searchType, searchTerm);
      setProgramPage(data);
    } catch (err) {
      setError('프로그램 로드를 실패하였습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgramsData();
  }, [currentPage, filter, searchType, searchTerm]);

  const pageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 필터
  const filterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(0);
  };

  // 검색
  const Search = (newSearchType: string, newSearchTerm: string) => {
    setSearchType(newSearchType);
    setSearchTerm(newSearchTerm);
    setCurrentPage(0);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="program-page">
      <ProgramFilter onFilter={filterChange} />
      <ProgramSearch onSearch={Search} />
      {programPage && programPage.content.length > 0 ? (
        <div>
          <ProgramList programs={programPage.content} />
          <Pagination
            currentPage={programPage.pageable.pageNumber}
            totalPages={programPage.totalPages}
            onPageChange={pageChange}
          />
        </div>
      ) : (
        <div>게시글이 없습니다.</div>
      )}
    </div>
  );
};

export default Program;