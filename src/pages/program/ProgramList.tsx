// 프로그램 목록
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { fetchPrograms } from 'utils/api';
import { programPagination } from 'utils/recoilState';
import { useNavigate } from 'react-router-dom';

import ProgramFilterItem from 'components/program/ProgramFilterItem';
import ProgramSearchItem from 'components/program/ProgramSearchItem';
import ProgramListItem from 'components/program/ProgramListItem';
import ProgramPaginationItem from 'components/program/ProgramPaginationItem';
import { IProgram as ProgramType } from 'types/interface/program/IProgram';
import 'assets/styles/program/ProgramList.css';

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
            const data = await fetchPrograms(currentPage, 12, filter, searchType, searchTerm);
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
        <div className='content-body-section'>
            <div className='action-btn-area'>
                <div><ProgramFilterItem onFilter={filterChange} /></div>
                <div></div>
                <div><ProgramSearchItem onSearch={handleSearch} /></div>
            </div><br/>
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
