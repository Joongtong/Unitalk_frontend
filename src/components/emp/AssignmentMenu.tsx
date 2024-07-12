import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

//Import Css
import 'assets/styles/emp/AssignmentMenu.css';

export default function AssignmentMenu() {
    const navigate = useNavigate();
    const location = useLocation();

    const [selectedMenu, setSelectedMenu] = useState<'assignment' | 'viewAssignment'>('assignment');

    useEffect(() => {
        if (location.pathname.startsWith('/emp/assignment/view')) {
            setSelectedMenu('viewAssignment');
        } else {
            setSelectedMenu('assignment');
        }
    }, [location.pathname]);

    const handleMenuClick = (menu: 'assignment' | 'viewAssignment') => {
        setSelectedMenu(menu);
        if (menu === 'assignment') {
            navigate('/emp/assignment');
        } else if (menu === 'viewAssignment') {
            navigate('/emp/assignment/view');
        }
    };

    return (
        <>
            <div className='menu-box'>
                <div
                    className={selectedMenu === 'assignment' ? 'menu-text-selected' : 'menu-text-unselected'}
                    onClick={() => handleMenuClick('assignment')}
                >
                    지도교수 배정하기
                </div>
                <div
                    className={selectedMenu === 'viewAssignment' ? 'menu-text-selected' : 'menu-text-unselected'}
                    onClick={() => handleMenuClick('viewAssignment')}
                >
                    지도교수 배정현황
                </div>
            </div>
        </>
    );
}
