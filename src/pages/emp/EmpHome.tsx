import React, { useState, useEffect } from 'react';
import EmpMenu from 'components/emp/EmpMenu';
import ProfessorListItem from 'components/emp/professor/ProfessorListItem';
import { IProfessorListItem } from 'types/interface';
import 'assets/styles/EmpHome.css';
import { fetchProfessors } from 'utils/api'; // api.ts 파일 경로에 맞게 수정

function EmpHome() {

    const [professors, setProfessors] = useState<IProfessorListItem[]>([]);

    useEffect(() => {
        const getProfessors = async () => {
            try {
                const data = await fetchProfessors();
                setProfessors(data);
            } catch (error) {
                console.error('Error fetching professors:', error);
            }
        };

        getProfessors();
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
                                    <div className='list-category-text'>{'직원번호'}</div>
                                    <div className='list-category-text'>{'학과명'}</div>
                                    <div className='list-category-text'>{'이름'}</div>
                                    <div className='list-category-text'>{'이메일'}</div>
                                    <div className='list-category-text'>{'전화번호'}</div>
                                    <div className='list-category-text'>{'선택'}</div>
                                </div>
                                {professors.map(professor => (
                                    <ProfessorListItem key={ professor.employeeId } professorListItem={ professor } />
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