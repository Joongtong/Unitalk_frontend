export const getCounselingTypeName = (type: string): string => {
    const types: { [key: string]: string } = {
      PROF: '지도교수 상담',
      PERS: '개인 상담',
      SEXH: '성고충신고센터',
      WELF: '학생복지 상담'
    };
    return types[type] || '기타 상담';
  };
  
  export const getStatusName = (status: number): string => {
    const statuses: { [key: number]: string } = {
      1: '대기',
      2: '승인',
      3: '완료',
      8: '불참',
      9: '취소'
    };
    return statuses[status] || '알 수 없음';
  };