import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useParams, useNavigate } from 'react-router-dom';

//Import Components
import EmpMenu from 'components/emp/EmpMenu';
import ProfessorListItem from 'components/emp/list/ProfessorListItem';
import StudentListItem from 'components/emp/list/StudentListItem';
import DeptOptions from 'components/common/DeptOptions';

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
    const navigate = useNavigate(); // useNavigate 훅 사용

    //교수목록과 학생목록의 페이징 처리 분리
    const [professorPage, setProfessorPage] = useState<number>(0); //교수목록 페이징 처리
    const [studentPage, setStudentPage] = useState<number>(0); //학생목록 페이징 처리
    const [pageSize] = useState<number>(5); //페이지당 항목 수
    const [totalProfessorPages, setTotalProfessorPages] = useState<number>(0); //교수목록 전체 페이지 수
    const [totalStudentPages, setTotalStudentPages] = useState<number>(0); //학생목록 전체 페이지 수


    useEffect(() => {
        const fetchData = async () => {
            try {
                let professorData, studentData;
                if (deptId) {
                    //학과별 교수 목록 가져오기
                    professorData = await fetchProfessorsByDept(deptId, professorPage, pageSize);
                    setProfessors(professorData.content);
                    setTotalProfessorPages(professorData.totalPages);

                    //학과별 학생 목록 가져오기
                    studentData = await fetchStudentsByDept(deptId, studentPage, pageSize);
                    setStudents(studentData.content);
                    setTotalStudentPages(studentData.totalPages);
                } else {
                    //전체 교수 목록 가져오기
                    professorData = await fetchAllProfessors(professorPage, pageSize);
                    setProfessors(professorData.content);
                    setTotalProfessorPages(professorData.totalPages);

                    //전체 학생 목록 가져오기
                    studentData = await fetchAllStudents(studentPage, pageSize);
                    setStudents(studentData.content);
                    setTotalStudentPages(studentData.totalPages);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [deptId, professorPage, studentPage, pageSize]);

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

    //교수목록 Pagination handlers
    const handleNextProfessorPage = () => {
        setProfessorPage(prevPage => (prevPage < totalProfessorPages - 1 ? prevPage + 1 : prevPage));
    };

    const handlePreviousProfessorPage = () => {
        setProfessorPage(prevPage => (prevPage > 0 ? prevPage - 1 : 0));
    };

    //학생목록 Pagination handlers
    const handleNextStudentPage = () => {
        setStudentPage(prevPage => (prevPage < totalStudentPages - 1 ? prevPage + 1 : prevPage));
    };

    const handlePreviousStudentPage = () => {
        setStudentPage(prevPage => (prevPage > 0 ? prevPage - 1 : 0));
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
                    <div className='step-title-grid'>
                        <div className='step-title'>지도교수 선택하기</div>
                        <div className='step-dropdown'>
                            <select
                                className='dept-dropdown'
                                value={deptId || ''}
                                onChange={(e) => {
                                    const selectedDeptId = e.target.value;
                                    navigate(`/empHome/${selectedDeptId}`); // 선택한 학과(deptId)에 따라 URL을 변경
                                }}
                            >
                                <DeptOptions
                                        value={deptId || ''}
                                        onChange={(e: { target: { value: any; }; }) => {
                                            const selectedDeptId = e.target.value;
                                            navigate(`/empHome/${selectedDeptId}`);
                                        }}
                                />
                            </select>
                        </div>
                    </div>
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
                                    className={`pagination-content pagination-btn ${ professorPage > 0 ? 'enabled' : '' }`}
                                    onClick={ handlePreviousProfessorPage }
                                    disabled={ professorPage === 0 }
                                >
                                    이전
                                </button>
                                <span className='pagination-content'>{ professorPage + 1 } / { totalProfessorPages }</span>
                                <button
                                    className={`pagination-content pagination-btn ${ professorPage < totalProfessorPages - 1 ? 'enabled' : '' }`}
                                    onClick={ handleNextProfessorPage }
                                    disabled={ professorPage >= totalProfessorPages - 1 }
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
                                    className={`pagination-content pagination-btn ${ studentPage > 0 ? 'enabled' : '' }`}
                                    onClick={ handlePreviousStudentPage }
                                    disabled={ studentPage === 0 }
                                >
                                    이전
                                </button>
                                <span className='pagination-content'>{ studentPage + 1 } / { totalStudentPages }</span>
                                <button
                                    className={`pagination-content pagination-btn ${ studentPage < totalStudentPages - 1 ? 'enabled' : '' }`}
                                    onClick={ handleNextStudentPage }
                                    disabled={ studentPage >= totalStudentPages - 1 }
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