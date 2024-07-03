import React from 'react'
import 'assets/styles/EmpMenu.css';

function EmpMenu() {
    return (
        <>
            <div className='menu-box'>
                <div className='menu-text-selected'>지도교수 배정하기</div>
                <div className='menu-text-unselected'>지도교수 배정현황</div>
            </div>
        </>
    )
}

export default EmpMenu;