import React from 'react'

//Import Css
import 'assets/styles/common/Main.css';

export default function Main() {
    return (
        <>
            <div className='banner-section'>
                <div className='banner-img-container'>
                    <div className='banner-img'></div>
                </div>
            </div>
            <div className='body-section'>
                <div className='title-text'>비교과 영역</div>
                <div className='program-container'>
                    <div className='program-content'>비교과 컨텐츠 영역</div>
                </div>
                <div className='title-text'>마이페이지 영역</div>
                <div className='myPage-container'>
                    <div className='myPage-content-grid'>
                        <div className='myPage-left'>캘린더</div>
                        <div className='myPage-right'>나의 예약 리스트</div>
                    </div>
                </div>
                <div className='title-text'>공지사항</div>
                <div className='notice-container'>
                    <div className='notice-content'>공지사항 컨텐츠 영역</div>
                </div>
            </div>
            <br/><br/>
        </>
    )
}
