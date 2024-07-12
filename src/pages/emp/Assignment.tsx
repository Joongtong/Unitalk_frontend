import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useParams, useNavigate } from 'react-router-dom';

// Import Components
import EmpMenu from 'components/emp/EmpSubMenu';
import ProfessorListItem from 'components/emp/list/ProfessorListItem';
import StudentListItem from 'components/emp/list/StudentListItem';
import DeptOptions from 'components/common/DeptOptions';
import Pagination from 'components/common/Pagination';

// Import Types Interface
import { IProfessorListItem, IStudentListItem } from 'types/interface';

// Import Css
import 'assets/styles/emp/EmpHome.css';
import 'assets/styles/common/Pagination.css';

// Import API Functions
import { fetchAllProfessors, fetchAllStudents, fetchProfessorsByDept, fetchStudentsByDept } from 'utils/api';
import { assignProfessorToStudent } from 'utils/api';

// Import States
import { selectedProfessorState, selectedStudentState } from 'utils/recoilState';

function Assignment() {
    const [professors, setProfessors] = useState<IProfessorListItem[]>([]);
    const [students, setStudents] = useState<IStudentListItem[]>([]);
    const [selectedProfessor, setSelectedProfessor] = useRecoilState(selectedProfessorState);
    const [selectedStudent, setSelectedStudent] = useRecoilState(selectedStudentState);
    const { deptId } = useParams<{ deptId?: string }>();
    const navigate = useNavigate();

    const [professorPage, setProfessorPage] = useState<number>(1);
    const [studentPage, setStudentPage] = useState<number>(1);
    const pageSize = 5;
    const [totalProfessorPages, setTotalProfessorPages] = useState<number>(1);
    const [totalStudentPages, setTotalStudentPages] = useState<number>(1);

    useEffect(() => {
        const fetchData = async () => {
        try {
            let professorData, studentData;
            if (deptId) {
            professorData = await fetchProfessorsByDept(deptId, professorPage - 1, pageSize);
            setProfessors(professorData.content);
            setTotalProfessorPages(professorData.totalPages);

            studentData = await fetchStudentsByDept(deptId, studentPage - 1, pageSize);
            setStudents(studentData.content);
            setTotalStudentPages(studentData.totalPages);
            } else {
            professorData = await fetchAllProfessors(professorPage - 1, pageSize);
            setProfessors(professorData.content);
            setTotalProfessorPages(professorData.totalPages);

            studentData = await fetchAllStudents(studentPage - 1, pageSize);
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
                        navigate(`/assignment/${selectedDeptId}`);
                    }}
                    >
                    <DeptOptions
                        value={deptId || ''}
                        onChange={(e: { target: { value: any; }; }) => {
                        const selectedDeptId = e.target.value;
                        navigate(`/assignment/${selectedDeptId}`);
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
                <Pagination
                    totalItems={totalProfessorPages * pageSize}
                    itemsPerPage={pageSize}
                    currentPage={professorPage}
                    onPageChange={(page) => setProfessorPage(page)}
                />
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
                <Pagination
                    totalItems={totalStudentPages * pageSize}
                    itemsPerPage={pageSize}
                    currentPage={studentPage}
                    onPageChange={(page) => setStudentPage(page)}
                />
                </div>
            </div><br/>
            <button
                className={`assign-btn ${selectedProfessor && selectedStudent ? 'enabled' : ''}`}
                onClick={assignHandler}
                disabled={!selectedProfessor || !selectedStudent}
            >
                배정하기
            </button>
            </div><br/>
        </section>
        </>
    );
}

export default Assignment;
