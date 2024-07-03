import React from 'react';
import 'assets/styles/Footer.css';

//component: 푸터 레이아웃
export default function Footer() {

  //render: 푸터 레이아웃 렌더링
  return (
    <div id='footer'>
      <div className='footer-container'>
        <div className='footer-left'>
          <div className='footer-logo-box'>
            <div className='icon-box'>
              <div className='icon logo-light-icon'></div>
            </div>
          </div>
        </div>
        <div className='footer-right'>
            <div className='footer-logo-text'>{ 'UNITALK' }</div>
            <div className='footer-copyright'>{ 'Copyright ⓒ 2024 UNITALK. ALL Rights Reserved.' }</div>
        </div>
      </div>
    </div>
  )
}
