import React from 'react';
import '../../assets/styles/common/NoticeBoard.css';
import noicelogo from 'assets/images/notice-red.png';

const NoticeBoard: React.FC = () => {
  const notices = [
    {
      title: "T-WIN시스템 고도화 매뉴얼 안내",
      description: "2022년 7월 25일자로 고도화된 T-WIN시스템의 학생용 매뉴얼입니다. 화면은 My-Dj, 진로-Design, 학습 Care, 생활 Support, 취업 Matching 의 메뉴로 구성되어 있습니다.",
      date: "2022.07.25",
      img: noicelogo
    },
    {
      title: "비교과프로그램 참여 우수학생 장학(마일리지 인센티브 장학) 폐지 안내",
      date: "2024.01.11",
      img: noicelogo
    },
    {
      title: "2024학년도 『TDG 프로그램 참여 인증 EVENT』 사전 공지",
      description: "『TDG 프로그램 참여 인증 EVENT』는 2024년 12월에 운영 예정으로 TDG 프로그램 이수 방법 안내를 위한 사전 공지입니다.",
      date: "2024.03.15",
      img: noicelogo
    }
  ];

  const briefNotices = [
    { title: "환경산업 일자리 박람회", date: "2024.06.21" },
    { title: "국민건강보험공단 기업탐방(기업탐방 7회차) 3,4학년 우선대상", date: "2024.06.18" },
    { title: "코맥스 중견기업 탐방 (기업탐방 6회차) 3,4학년 우선대상", date: "2024.06.18" },
    { title: "2024학년도 학습역량검사 안내 (참가자 마일리지 8점, 커피쿠폰[추첨])", date: "2024.06.12" },
    { title: "[중요] T-WIN 시스템 접속기록 보관 시스템 설치에 따른 서비스 일시 중지 안내", date: "2024.06.12" },
    { title: "진로역량 강화 캠프", date: "2024.06.04" }
  ];

  return (
    <div className="notice-board">
      <div className="notice-header">
        <div className="header-title">공지사항</div>
        <div className="more-button">
          <div className="more-text">+ more</div>
        </div>
      </div>
      <div className="notice-content">
        <div className="detailed-notices">
          {notices.map((notice, index) => (
            <div className="notice-item" key={index}>
              <div className="item-content">
                <img src={notice.img} alt="thumbnail" />
                <div className="item-info">
                  <div className="item-title">{notice.title}</div>
                  {notice.description && <div className="item-description">{notice.description}</div>}
                </div>
                <div className="item-date">{notice.date}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="brief-notices">
          {briefNotices.map((notice, index) => (
            <div className="brief-notice-item" key={index}>
              <div className="brief-notice-title">{notice.title}</div>
              <div className="brief-notice-date">{notice.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;
