// 프로그램에 따른 신청자 목록
import React, { useEffect, useState } from 'react';
import { fetchApplicantsByProgram } from 'utils/api';
import { IProgramPagination } from 'types/interface/program/IProgramPagination';
import { IApplicant } from 'types/interface/program/IApplicant';
import ProgramApplicantListItem from 'components/program/ProgramApplicantListItem';
import PaginationComponent from 'components/program/ProgramPaginationItem';
import ProgramApplicantFilter from 'components/program/ProgramApplicantFilter';
import ProgramApplicantSearch from 'components/program/ProgramApplicantSearch';
import 'assets/styles/program/ProgramList.css';

interface Props {
  programNo: number;
}

const ProgramApplicant: React.FC<Props> = ({ programNo }) => {
  const [applicantsPage, setApplicantsPage] = useState<IProgramPagination<IApplicant> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState<string | undefined>(undefined);
  const [searchType, setSearchType] = useState<string | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);

  const fetchApplicantsData = async () => {
    try {
      setLoading(true);
      const data = await fetchApplicantsByProgram(
        programNo,
        currentPage,
        16, // 사이즈
        searchType === 'studentName' ? searchTerm : undefined,
        undefined,
        filter ? parseInt(filter, 10) : undefined
      );
      setApplicantsPage(data);
    } catch (err) {
      setError('신청 목록을 로드하는 데 실패하였습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicantsData();
  }, [currentPage, programNo, filter, searchType, searchTerm]);

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
    setCurrentPage(0);
  };

  const handleSearch = (searchType: string, searchTerm: string) => {
    setSearchType(searchType);
    setSearchTerm(searchTerm);
    setCurrentPage(0);
  };

  const pageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 신청자 업데이트
  const handleApplicantUpdate = (updatedApplicants: IApplicant[]) => {
    setApplicantsPage(prev => ({
      ...prev!,
      content: updatedApplicants
    }));
  };

  return (
    <div className="applicant-page">
      <ProgramApplicantFilter onFilterChange={handleFilterChange} />
      <ProgramApplicantSearch onSearch={handleSearch} />

      {loading ? (
        <div>로딩 중...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          {applicantsPage && applicantsPage.content.length === 0 ? (
            <div>신청인이 없습니다.</div>
          ) : (
            <>
              <ProgramApplicantListItem applicants={applicantsPage?.content || []} onApplicantClick={handleApplicantUpdate} />
              {applicantsPage && (
                <PaginationComponent currentPage={currentPage} totalPages={applicantsPage.totalPages} onPageChange={pageChange} />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ProgramApplicant;
