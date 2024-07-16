// 학생본인 프로그램 신청목록
import React, { useEffect, useState } from 'react';
import { fetchStudentApplications } from 'utils/api';
import { IApplicant } from 'types/interface/program/IApplicant';
import { IProgramPagination } from 'types/interface/program/IProgramPagination';
import StudentApplicantListItem from 'components/program/StudentApplicantListItem';
import PaginationComponent from 'components/program/ProgramPaginationItem';

const StudentApplicant: React.FC = () => {
    const [applications, setApplications] = useState<IApplicant[]>([]);
    const [pagination, setPagination] = useState<IProgramPagination<IApplicant> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize] = useState(16);
    const studentId = 20230002; //임시*************************************

    const fetchApplicationsData = async () => {
        try {
            setLoading(true);
            const data = await fetchStudentApplications(studentId, currentPage, pageSize);
            console.log('Received applications data:', data);
            setApplications(data.content);
            setPagination(data);
        } catch (err) {
            setError('신청 내역을 로드하는 데 실패하였습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplicationsData();
    }, [currentPage, pageSize]);

    const pageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleApplicantUpdate = (updatedApplicant: IApplicant) => {
        setApplications(prevApplications => 
            prevApplications.map(app => 
                app.applicantNo === updatedApplicant.applicantNo ? updatedApplicant : app
            )
        );
    };

    return (
        <div className="my-applications-page">
            {loading && <div>로딩 중...</div>}
            {error && <div>{error}</div>}
            {applications.length > 0 && (
                <StudentApplicantListItem  applicants={applications} onApplicantUpdate={handleApplicantUpdate} />
            )}
            {pagination && (
                <PaginationComponent currentPage={pagination.pageable.pageNumber} totalPages={pagination.totalPages} onPageChange={pageChange}/>
            )}
        </div>
    );
};

export default StudentApplicant;