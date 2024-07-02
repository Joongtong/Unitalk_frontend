import React from 'react';
import 'assets/styles/ListItem.css';

function ProfessorListItem() {
    return (
        <>
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
                    <div className='list-item-content'>
                        <div className='list-content-text'>{'20050001'}</div>
                        <div className='list-content-text'>{'국어국문학과'}</div>
                        <div className='list-content-text'>{'김교수'}</div>
                        <div className='list-content-text'>{'prof.kim@unitalk.eu'}</div>
                        <div className='list-content-text'>{'010-6789-0123'}</div>
                        <div className='list-content-text'>
                            <button className='select-btn'>선택</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfessorListItem;