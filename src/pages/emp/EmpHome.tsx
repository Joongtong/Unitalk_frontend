import React from 'react';
import EmpMenu from 'components/emp/EmpMenu';
import ProfessorListItem from 'components/emp/professor/ProfessorListItem';
import 'assets/styles/EmpHome.css';

function EmpHome() {
    return (
        <>
            <section className='body-section'>
            <h1>지도교수 관리</h1><hr/>
            <div className='menu-content-grid'>
                <div className='menu-area'>
                    <EmpMenu/>
                </div>
                <div className='content-area'>
                    <div className='step-title'>지도교수 선택하기</div>
                    <ProfessorListItem/>
                </div>
            </div>
            </section>
        </>
    )
}

export default EmpHome;