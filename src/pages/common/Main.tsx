import React from 'react'

//Import Components
import MainCarousel from 'components/common/MainCarousel';
import MainMySchedule from 'components/common/MainMySchedule';
import MainMyList from 'components/common/MainMyList';

//Import Css
import 'assets/styles/common/Main.css';
import NoticeBoard from 'components/common/NoticeBoard';
import MyStatusCalendar from 'components/counseling/MyStatusCalendar';

function Main() {
    return (
        <>
            <div className='banner-section'>
                <div className='banner-img-container'>
                    <div className='banner-img'></div>
                </div>
            </div>
            <div className='content-body-section'>
                <div className='title-text'>상담 프로그램</div>
                <div className='mainProgram-container'>
                    <div className='mainProgram-content'>
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
                {/* <div className='title-text'>공지사항</div> */}
                <div className='notice-container'>
                    <div className='notice-content'>
                        <NoticeBoard />
                    </div>
                </div>
            </div>
            <br/><br/>
        </>
    )
}

export default Main;

