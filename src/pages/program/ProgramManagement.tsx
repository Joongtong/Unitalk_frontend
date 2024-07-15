// 프로그램 관리 + 프로그램 신청자 목록
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { fetchPrograms } from 'utils/api';
import { programPagination } from 'utils/recoilState';
import { useNavigate } from 'react-router-dom';
import ProgramManagementItem from 'components/program/ProgramManagementItem';
import ProgramPaginationItem from 'components/program/ProgramPaginationItem';
import ProgramFilterItem from 'components/program/ProgramFilterItem';
import ProgramSearchItem from 'components/program/ProgramSearchItem';
import { IProgram as ProgramType } from 'types/interface/program/IProgram';
import ProgramApplicant from 'pages/program/ProgramApplicant';

const ProgramManagement: React.FC = () => {
    const navigate = useNavigate();
    const [programPage, setProgramPage] = useRecoilState(programPagination);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [filter, setFilter] = useState<string | undefined>(undefined);
    const [searchType, setSearchType] = useState<string | undefined>(undefined);
    const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
    const [selectedProgramNo, setSelectedProgramNo] = useState<number | null>(null); // 선택된 프로그램 번호

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

    const handleDeleteSuccess = async () => {
        await fetchProgramsData();
    };

    // 신청인 목록 보기
    const handleViewApplicants = (programNo: number) => {
        setSelectedProgramNo(programNo); // 선택된 프로그램 번호
    };

    // 프로그램 작성 페이지로 이동
    const handleCreateProgram = () => {
        navigate('/program/create');
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="program-page">
            <button onClick={handleCreateProgram}>작성하기</button>
        <ProgramFilterItem onFilter={filterChange} />
        <ProgramSearchItem onSearch={handleSearch} />
        {programPage && programPage.content.length > 0 ? (
            <div>
            <ProgramManagementItem programs={programPage.content}
                onProgramClick={handleProgramClick}
                onDeleteSuccess={handleDeleteSuccess}
                onViewApplicants={handleViewApplicants}
            />
            <ProgramPaginationItem currentPage={programPage.pageable.pageNumber} totalPages={programPage.totalPages} onPageChange={pageChange} />
            {selectedProgramNo && (
                <ProgramApplicant programNo={selectedProgramNo} />
            )}
            </div>
        ) : (
            <div>게시글이 없습니다.</div>
        )}
        </div>
    );
};

export default ProgramManagement;
