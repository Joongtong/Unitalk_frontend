import React from 'react';
import 'assets/styles/common/Footer.css';

//component: 푸터 레이아웃
export default function Footer() {

  //render: 푸터 레이아웃 렌더링
  return (
    <div id='footer'>
      <div className='footer-container'>
        <div className='footer-left'>
          <div className='footer-logo-box'>
            <div className='footer-icon-box'>
              <div className='footer-icon logo-light-icon'></div>
            </div>
          </div>
        </div>
        <div className='footer-center'>
            <div className='footer-logo-text'>{ 'UNITALK' }</div>
            <div className='footer-information-area'>
              <div className='footer-information-text'>{ '본사주소 : 서울특별시 강구 테헤란로7길 7, 에스코빌딩 6층' }</div>
              <div className='footer-information-text'>{ '문의전화 : 02-561-1911' }</div>
              <div className='footer-information-text'>{ '문의메일 : help@unitalk.edu' }</div>
            </div>
            <div className='footer-copyright'>{ 'Copyright ⓒ 2024 UNITALK. ALL Rights Reserved.' }</div>
        </div>
      </div>
    </div>
  )
}
