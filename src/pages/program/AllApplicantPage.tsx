// 프로그램 신청 전체목록
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { fetchApplicants } from 'utils/api';
import { applicantPagination } from 'utils/recoilState';
import { useNavigate } from 'react-router-dom';
import { IApplicant } from 'types/interface/program/IApplicant';

import AllApplicantListItem from 'components/program/AllApplicantListItem';
import ProgramPaginationItem from 'components/program/ProgramPaginationItem';

const AllApplicantPage: React.FC = () => {
    const [applicantPage, setApplicantPage] = useRecoilState(applicantPagination);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const navigate = useNavigate();

    const fetchApplicantsData = async () => {
        try {
            setLoading(true);
            const data = await fetchApplicants(currentPage, 16);
            setApplicantPage(data);
        } catch (err) {
            setError('신청 목록을 로드하는 데 실패하였습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplicantsData();
    }, [currentPage]);

    const pageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleApplicantClick = (applicant: IApplicant) => {
        navigate(`/applicant/${applicant.applicantNo}`);
    };

    return (
        <div className="applicant-page">
            {loading ? (
                <div>로딩 중...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <>
                    <AllApplicantListItem
                        applicants={applicantPage?.content || []}
                        onApplicantClick={handleApplicantClick}
                    />
                    {applicantPage && (
                        <ProgramPaginationItem
                            currentPage={currentPage}
                            totalPages={Math.ceil(applicantPage.totalPages / 16)}
                            onPageChange={pageChange}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default AllApplicantPage;
