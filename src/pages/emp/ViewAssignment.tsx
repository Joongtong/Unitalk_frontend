import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

//Import Components
import EmpMenu from 'components/emp/EmpMenu';
import AssignmentListItem from 'components/emp/list/AssignmentListItem';

//Import Types Interface
import { IAssignmentListItem } from 'types/interface';

//Import Css
import 'assets/styles/emp/EmpHome.css';

//Import API FUnctions
import { fetchAllAssignments, fetchAssignmentsByDept } from 'utils/api';

function ViewAssignment() {

    const [assignments, setAssignments] = useState<IAssignmentListItem[]>([]);
    const { deptId } = useParams<{ deptId?: string }>(); //deptId를 문자열로 명시적 타입 선언

    //지도교수 배정 이력 목록 페이징 처리
    const [assignmentPage, setAssignmentPage] = useState<number>(0); //지도교수 배정 이력 페이징 처리
    const [pageSize] = useState<number>(10); //페이지당 항목 수
    const [totalAssignmentPages, setTotalAssignmentPages] = useState<number>(0); //지도교수 배정 이력 목록 전체 페이지 수

    useEffect(() => {
        const fetchData = async () => {
            try {
                let assignmentData;
                if (deptId) {
                    //학과별 지도교수 배정 이력 가져오기
                    assignmentData = await fetchAssignmentsByDept(deptId, assignmentPage, pageSize);
                    setAssignments(assignmentData.content);
                    setTotalAssignmentPages(assignmentData.totalPages);
                } else {
                    //전체 지도교수 배정 이력 가져오기
                    assignmentData = await fetchAllAssignments(assignmentPage, pageSize);
                    setAssignments(assignmentData.content);
                    setTotalAssignmentPages(assignmentData.totalPages);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [deptId, assignmentPage, pageSize]);

    //지도교수 배정 이력 Pagination handlers
    const handleNextAssignmentPage = () => {
        setAssignmentPage(prevPage => (prevPage < totalAssignmentPages - 1 ? prevPage + 1 : prevPage));
    };

    const handlePreviousAssignmentPage = () => {
        setAssignmentPage(prevPage => (prevPage > 0 ? prevPage - 1 : 0));
    };


    return (
        <>
            <section className='body-section'>
            <div className='page-title'>지도교수 관리</div><hr/>
            <div className='menu-content-grid'>
                <div className='menu-area'>
                    <EmpMenu />
                </div>
                <div className='content-area'>
                    <div className='step-title'>지도교수 배정현황</div>
                        <div className='assignment-list-item'>
                            <div className='assignment-list-item-box'>
                                <div className='assignment-list-item-category'>
                                    <div className='list-category-text'>{' 이력번호 '}</div>
                                    <div className='list-category-text'>{' 직원번호 '}</div>
                                    <div className='list-category-text'>{' 소속학과 '}</div>
                                    <div className='list-category-text'>{' 담당교수 '}</div>
                                    <div className='list-category-text'>{' 학생번호 '}</div>
                                    <div className='list-category-text'>{' 소속학과 '}</div>
                                    <div className='list-category-text'>{' 학생이름 '}</div>
                                    <div className='list-category-text'>{' 배정일시 '}</div>
                                </div>
                                {assignments.map(assignment => (
                                    <AssignmentListItem 
                                        key={ assignment.assignmentId } 
                                        assignmentListItem={ assignment } 
                                    />
                                ))}
                            </div>
                            <div className='pagination'>
                                <button
                                    className={`pagination-content pagination-btn ${ assignmentPage > 0 ? 'enabled' : '' }`}
                                    onClick={ handlePreviousAssignmentPage }
                                    disabled={ assignmentPage === 0 }
                                >
                                    이전
                                </button>
                                <span className='pagination-content'>{ assignmentPage + 1 } / { totalAssignmentPages }</span>
                                <button
                                    className={`pagination-content pagination-btn ${ assignmentPage < totalAssignmentPages - 1 ? 'enabled' : '' }`}
                                    onClick={ handleNextAssignmentPage }
                                    disabled={ assignmentPage >= totalAssignmentPages - 1 }
                                >
                                    다음
                                </button>
                            </div>
                        </div>
                    </div><br/>
                </div><br/>
            </section>
        </>
    )
}

export default ViewAssignment;
