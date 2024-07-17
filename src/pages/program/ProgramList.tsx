// 프로그램 목록
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { fetchPrograms } from 'utils/api';
import { programPagination } from 'utils/recoilState';
import { useNavigate } from 'react-router-dom';

import ProgramListItem from 'components/program/ProgramListItem';
import ProgramPaginationItem from 'components/program/ProgramPaginationItem';
import ProgramFilterItem from 'components/program/ProgramFilterItem';
import ProgramSearchItem from 'components/program/ProgramSearchItem';
import { IProgram as ProgramType } from 'types/interface/program/IProgram';

const ProgramList: React.FC = () => {
    const navigate = useNavigate();
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

    const filterChange = (newFilter: string) => {
        setFilter(newFilter);
        setCurrentPage(0);
    };

    const handleSearch = (newSearchType: string, newSearchTerm: string) => {
        setSearchType(newSearchType);
        setSearchTerm(newSearchTerm);
        setCurrentPage(0);
    };

    const handleProgramClick = (program: ProgramType) => {
        navigate(`/program/${program.programNo}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="program-page">
            <ProgramFilterItem onFilter={filterChange} />
            <ProgramSearchItem onSearch={handleSearch} />
            {programPage && programPage.content.length > 0 ? (
                <div>
                    <ProgramListItem programs={programPage.content} onProgramClick={handleProgramClick} />
                    <ProgramPaginationItem currentPage={programPage.pageable.pageNumber} totalPages={programPage.totalPages} onPageChange={pageChange} />
                </div>
            ) : (
                <div>게시글이 없습니다.</div>
            )}
        </div>
    );
};

export default ProgramList;
