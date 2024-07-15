import React from 'react'

//Import Components
import MainCarousel from 'components/common/MainCarousel';

//Import Css
import 'assets/styles/common/Main.css';
import MainMySchedule from 'components/common/MainMySchedule';
import MainMyList from 'components/common/MainMyList';

function Main() {
    return (
        <>
            <div className='banner-section'>
                <div className='banner-img-container'>
                    <div className='banner-img'></div>
                </div>
            </div>
            <div className='body-section'>
                <div className='title-text'>상담 프로그램</div>
                <div className='program-container'>
                    <div className='program-content'>
                        <MainCarousel />
                    </div>
                </div>
                <div className='title-text'>My Page</div>
                <div className='myPage-container'>
                    <div className='myPage-content-grid'>
                        <div className='myPage-left'>
                            <MainMySchedule />
                        </div>
                        <div className='myPage-right'>
                            <MainMyList />
                        </div>
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

export default Main;