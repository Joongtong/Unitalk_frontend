import React from 'react'
import 'assets/styles/Header.css';

//component: 헤더 레이아웃
export default function Header() {

    //render: 헤더 레이아웃 렌더링
    return (
        <div id='header'>
            <div className='header-container'>
                <div className='header-logo-area'>
                    <div className='header-logo-box'>
                        <div className='header-icon-box'>
                            <div className='header-icon logo-icon'></div>
                        </div>
                    </div>
                </div>
                <div></div>
                <div className='login-user-info'>
                    <strong>{ '최원진' }</strong>님 환영합니다.
                </div>
                <div className='header-right'>
                    <button className='header-btn'>로그아웃</button>
                </div>
            </div>
        </div>
    )
}

