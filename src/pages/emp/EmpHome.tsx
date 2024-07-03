import React, { useState, useEffect } from 'react';

// Import Components
import EmpMenu from 'components/emp/EmpMenu';
import ProfessorListItem from 'components/emp/professor/ProfessorListItem';
import StudentListItem from 'components/emp/student/StudentListItem';

// Import Types Interface
import { IProfessorListItem } from 'types/interface';
import { IStudentListItem } from 'types/interface';

// Import Css
import 'assets/styles/EmpHome.css';

// Import Datas
import { fetchProfessors } from 'utils/api';
import { fetchStudents } from 'utils/api';

function EmpHome() {

    const [professors, setProfessors] = useState<IProfessorListItem[]>([]);
    const [students, setStudents] = useState<IStudentListItem[]>([]);

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
                                <div className='list-item-category'>
                                    <div className='list-category-text'>{' 직원번호 '}</div>
                                    <div className='list-category-text'>{' 학과명 '}</div>
                                    <div className='list-category-text'>{' 이름 '}</div>
                                    <div className='list-category-text'>{' 이메일 '}</div>
                                    <div className='list-category-text'>{' 전화번호 '}</div>
                                    <div className='list-category-text'>{' 선택 '}</div>
                                </div>
                                {professors.map(professor => (
                                    <ProfessorListItem key={ professor.employeeId } professorListItem={ professor } />
                                ))}
                            </div>
                        </div><hr/>
                    <div className='step-title'>배정할 학생 선택하기</div>
                        <div className='student-list-item'>
                            <div className='list-item-box'>
                                <div className='list-item-category'>
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
                                    <StudentListItem key={ student.studentId } studentListItem={ student } />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default EmpHome;