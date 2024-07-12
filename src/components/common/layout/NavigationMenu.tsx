import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

//import Css
import 'assets/styles/common/NavigationMenu.css';

//component: 네비게이션 메뉴 레이아웃
export default function NavigationMenu() {

    const navigate = useNavigate();

    const handleNavBtn = (path: string) => {
        navigate(path);
    };

    //render: 네비게이션 메뉴 레이아웃 렌더링
    return (
        <div id='#navigation-menu'>
            <div className='navigation-area-grid'>
                <div></div>
                <div className='navigation-menu-grid'>
                    <div className='menu-group-area'>
                        <div className='move-btn' onClick={() => handleNavBtn('/main')}></div>
                        <div className='btn-text'>My Home</div>
                    </div>
                    <div className='menu-group-area'>
                        <div className='move-btn' onClick={() => handleNavBtn('/counseling')}></div>
                        <div className='btn-text'>1대1 상담</div>
                    </div>
                    <div className='menu-group-area'>
                        <div className='move-btn' onClick={() => handleNavBtn('/program')}></div>
                        <div className='btn-text'>상담 프로그램</div>
                    </div>
                    <div className='menu-group-area'>
                        <div className='move-btn' onClick={() => handleNavBtn('/online')}></div>
                        <div className='btn-text'>온라인 상담</div>
                    </div>
                    <div className='menu-group-area'>
                        <div className='move-btn' onClick={() => handleNavBtn('/mypage')}></div>
                        <div className='btn-text'>My Page</div>
                        {/* <div className='btn-text'>지도교수 관리(사용자가 교직원인 경우)</div> */}
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    )
}