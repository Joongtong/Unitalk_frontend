import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';

//Import Components
import EmpMenu from 'components/emp/EmpMenu';
import ProfessorListItem from 'components/emp/list/ProfessorListItem';
import StudentListItem from 'components/emp/list/StudentListItem';

//Import Types Interface
import { IProfessorListItem, IStudentListItem } from 'types/interface';

//Import Css
import 'assets/styles/emp/EmpHome.css';

//Import API Functions
import { fetchAllProfessors, fetchAllStudents, fetchProfessorsByDept, fetchStudentsByDept } from 'utils/api';
import { assignProfessorToStudent } from 'utils/api';

//Import States
import { selectedProfessorState, selectedStudentState } from 'utils/recoilState';

function EmpHome() {

    const [professors, setProfessors] = useState<IProfessorListItem[]>([]);
    const [students, setStudents] = useState<IStudentListItem[]>([]);
    const [selectedProfessor, setSelectedProfessor] = useRecoilState(selectedProfessorState);
    const [selectedStudent, setSelectedStudent] = useRecoilState(selectedStudentState);
    const { deptId } = useParams<{ deptId?: string }>(); //deptId를 문자열로 명시적 타입 선언
    const [page, setPage] = useState<number>(0); //페이징 처리
    const [pageSize] = useState<number>(5); //페이지당 항목 수
    const [totalPages, setTotalPages] = useState<number>(0); //전체 페이지 수

    useEffect(() => {
        const fetchData = async () => {
            try {
                let professorData, studentData;
                if (deptId) {
                    // 학과별 교수 목록 가져오기
                    professorData = await fetchProfessorsByDept(deptId, page, pageSize);
                    setProfessors(professorData.content);

                    // 학과별 학생 목록 가져오기
                    studentData = await fetchStudentsByDept(deptId, page, pageSize);
                    setStudents(studentData.content);
                } else {
                    // 전체 교수 목록 가져오기
                    professorData = await fetchAllProfessors(page, pageSize);
                    setProfessors(professorData.content);

                    // 전체 학생 목록 가져오기
                    studentData = await fetchAllStudents(page, pageSize);
                    setStudents(studentData.content);
                }

                setTotalPages(Math.max(professorData.totalPages, studentData.totalPages));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [deptId, page, pageSize]);

    const assignHandler = async () => {
        if (selectedProfessor && selectedStudent) {
            try {
                await assignProfessorToStudent(selectedProfessor, selectedStudent);
                console.log('Assignment successful');
                setSelectedProfessor(null);
                setSelectedStudent(null);
                window.location.reload();
            } catch (error) {
                console.error('Assignment failed:', error);
            }
        }
    };

    //Pagination 관련
    const handleNextPage = () => {
        setPage(prevPage => (prevPage < totalPages - 1 ? prevPage + 1 : prevPage));
    };

    const handlePreviousPage = () => {
        setPage(prevPage => (prevPage > 0 ? prevPage - 1 : 0));
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
                    <div className='step-title'>지도교수 선택하기</div>
                        <div className='professor-list-item'>
                            <div className='list-item-box'>
                                <div className='professor-list-item-category'>
                                    <div className='list-category-text'>{' 직원번호 '}</div>
                                    <div className='list-category-text'>{' 학과명 '}</div>
                                    <div className='list-category-text'>{' 이름 '}</div>
                                    <div className='list-category-text'>{' 이메일 '}</div>
                                    <div className='list-category-text'>{' 전화번호 '}</div>
                                    <div className='list-category-text'>{' 선택 '}</div>
                                </div>
                                {professors.map(professor => (
                                    <ProfessorListItem 
                                        key={ professor.employeeNo } 
                                        professorListItem={ professor } 
                                    />
                                ))}
                            </div>
                            <div className='pagination'>
                                <button 
                                    className={`pagination-content pagination-btn ${page > 0 ? 'enabled' : ''}`}
                                    onClick={handlePreviousPage} 
                                    disabled={page === 0}
                                    >
                                        이전
                                </button>
                                <span className='pagination-content'>{page + 1} / {totalPages}</span>
                                <button 
                                    className={`pagination-content pagination-btn ${page < totalPages - 1 ? 'enabled' : ''}`}
                                    onClick={handleNextPage} 
                                    disabled={page >= totalPages - 1}
                                    >
                                        다음
                                </button>
                            </div>
                        </div><hr/>
                    <div className='step-title'>배정할 학생 선택하기</div>
                        <div className='student-list-item'>
                            <div className='list-item-box'>
                                <div className='student-list-item-category'>
                                    <div className='list-category-text'>{' 학생번호 '}</div>
                                    <div className='list-category-text'>{' 학과명 '}</div>
                                    <div className='list-category-text'>{' 이름 '}</div>
                                    <div className='list-category-text'>{' 이메일 '}</div>
                                    <div className='list-category-text'>{' 전화번호 '}</div>
                                    <div className='list-category-text'>{' 학년 '}</div>
                                    <div className='list-category-text'>{' 지도교수 '}</div>
                                    <div className='list-category-text'>{' 선택 '}</div>
                                </div>
                                {students.map(student => (
                                    <StudentListItem 
                                        key={ student.studentNo } 
                                        studentListItem={ student } 
                                    />
                                ))}
                            </div>
                            <div className='pagination'>
                                <button 
                                    className={`pagination-content pagination-btn ${page > 0 ? 'enabled' : ''}`}
                                    onClick={handlePreviousPage} 
                                    disabled={page === 0}
                                    >
                                        이전
                                </button>
                                <span className='pagination-content'>{page + 1} / {totalPages}</span>
                                <button 
                                    className={`pagination-content pagination-btn ${page < totalPages - 1 ? 'enabled' : ''}`}
                                    onClick={handleNextPage} 
                                    disabled={page >= totalPages - 1}
                                    >
                                        다음
                                </button>
                            </div>
                        </div>
                    </div><br/>
                    <button 
                        className={`assign-btn ${selectedProfessor && selectedStudent ? 'enabled' : ''}`}
                        onClick={ assignHandler }
                        disabled={ !selectedProfessor || !selectedStudent }
                    >
                        배정하기
                    </button>
                </div><br/>
            </section>
        </>
    )
}

export default EmpHome;