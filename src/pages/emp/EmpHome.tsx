import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

//Import Components
import EmpMenu from 'components/emp/EmpMenu';
import ProfessorListItem from 'components/emp/list/ProfessorListItem';
import StudentListItem from 'components/emp/list/StudentListItem';

//Import Types Interface
import { IProfessorListItem } from 'types/interface';
import { IStudentListItem } from 'types/interface';

//Import Css
import 'assets/styles/emp/EmpHome.css';

//Import Data
import { assignProfessorToStudent, fetchProfessors, fetchStudents } from 'utils/api';

//Import States
import { selectedProfessorState, selectedStudentState } from 'utils/recoilState';

function EmpHome() {

    const [professors, setProfessors] = useState<IProfessorListItem[]>([]);
    const [students, setStudents] = useState<IStudentListItem[]>([]);
    const [selectedProfessor, setSelectedProfessor] = useRecoilState(selectedProfessorState);
    const [selectedStudent, setSelectedStudent] = useRecoilState(selectedStudentState);

    useEffect(() => {
        const getProfessors = async () => {
            try {
                const data = await fetchProfessors();
                setProfessors(data);
            } catch (error) {
                console.error('Error fetching professors:', error);
            }
        };
    
        const getStudents = async () => {
            try {
                const data = await fetchStudents();
                setStudents(data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };
    
        getProfessors();
        getStudents();
    }, []);

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