import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'assets/styles/common/NavigationMenu.css';
import { LoginInfo } from '../../../types/interface/LoginInfo';

interface NavigationMenuProps {
    user: LoginInfo | null;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ user }) => {
    const navigate = useNavigate();

    const handleNavBtn = (path: string) => {
        navigate(path);
    };

    const handleMyPageClick = () => {
        if (!user) return;

        switch (user.userType) {
            case 'S':
                navigate('/counseling');
                break;
            case 'C':
            case 'P':
                navigate('/counselor');
                break;
            case 'E':
                navigate('/emp/assignment');
                break;
            default:
                break;
        }
    };

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
                        <div className='move-btn' onClick={handleMyPageClick}></div>
                        <div className='btn-text'>My Page</div>
                        {/* <div className='btn-text'>지도교수 관리(사용자가 교직원인 경우)</div> */}
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default NavigationMenu;
