import React from 'react'

//component: Student List Item 컴포넌트
export default function StudentListItem() {

    //render: Student List Item 컴포넌트 렌더링
    return (
        <div className='student-list-item'>
            <div className='list-item-box'>
                <div className='list-item-category'>
                    <div className='list-item-studentId'></div>
                    <div className='list-item-deptId'></div>
                    <div className='list-item-studentName'></div>
                    <div className='list-item-studentEmail'></div>
                    <div className='list-item-studentPhoneNumber'></div>
                    <div className='list-item-grade'></div>
                    <div className='list-item-assignedProfessor'></div>
                    <div className='list-item-studentSelect'></div>
                </div>
                <div className='list-item-content'>
                    <div className='list-content-studentId'></div>
                    <div className='list-content-deptId'></div>
                    <div className='list-content-studentName'></div>
                    <div className='list-content-studentEmail'></div>
                    <div className='list-content-studentPhoneNumber'></div>
                    <div className='list-content-grade'></div>
                    <div className='list-content-assignedProfessor'></div>
                    <div className='list-content-studentSelect'>
                        <button className='select-btn'>선택</button>
                    </div>
                </div>
            </div>
        </div>
    )
}