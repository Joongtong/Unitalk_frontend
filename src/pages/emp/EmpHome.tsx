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
    const { deptId } = useParams<{ deptId?: string }>(); // deptId를 문자열로 명시적 타입 선언

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (deptId) {
                    // 학과별 교수 목록 가져오기
                    const professorData = await fetchProfessorsByDept(deptId);
                    setProfessors(professorData);

                    // 학과별 학생 목록 가져오기
                    const studentData = await fetchStudentsByDept(deptId);
                    setStudents(studentData);
                } else {
                    // 전체 교수 목록 가져오기
                    const professorData = await fetchAllProfessors();
                    setProfessors(professorData);

                    // 전체 학생 목록 가져오기
                    const studentData = await fetchAllStudents();
                    setStudents(studentData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [deptId]);

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