import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import ChatIcon from '@mui/icons-material/Chat';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

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
                        <div className='move-btn' onClick={() => handleNavBtn('/main')}>
                            <HomeIcon />
                        </div>
                        <div className='btn-text'>My Home</div>
                    </div>
                    <div className='menu-group-area'>
                        <div className='move-btn' onClick={() => handleNavBtn('/counseling')}>
                            <PersonIcon />
                        </div>
                        <div className='btn-text'>1대1 상담</div>
                    </div>
                    <div className='menu-group-area'>
                        <div className='move-btn' onClick={() => handleNavBtn('/program')}>
                            <GroupsIcon />
                        </div>
                        <div className='btn-text'>상담 프로그램</div>
                    </div>
                    <div className='menu-group-area'>
                        <div className='move-btn' onClick={() => handleNavBtn('/online')}>
                            <ChatIcon />
                        </div>
                        <div className='btn-text'>온라인 상담</div>
                    </div>
                    <div className='menu-group-area'>
                        <div className='move-btn' onClick={() => handleNavBtn('/mypage')}>
                            <ManageAccountsIcon />
                        </div>
                        <div className='btn-text'>My Page</div>
                        {/* <div className='btn-text'>지도교수 관리(사용자가 교직원인 경우)</div> */}
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    )
}