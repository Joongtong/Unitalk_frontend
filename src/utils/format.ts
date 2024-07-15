import { format, parseISO } from 'date-fns';

export const formatDateTime = (isoString: string): string => {
    const date = parseISO(isoString);
    return format(date, 'yyyy-MM-dd, HH:mm:ss');
};

// dept_id를 받아서 dept_name으로 변환하는 함수
export function getDeptName(deptId: string): string {
    switch (deptId) {
        //대학본부 및 소속부서
        case 'HQ': return '대학본부';
        case 'ADM': return '행정팀';
        case 'CSL': return '상담팀';
        case 'PRT': return '협력사';

        //인문대학 및 학과
        case 'HUM': return '인문대학';
        case 'KOR': return '국어국문학과';
        case 'ENG': return '영어영문학과';
        case 'PHI': return '철학과';

        //사회과학대학 및 학과
        case 'SOC': return '사회과학대학';
        case 'POL': return '정치외교학과';
        case 'ECO': return '경제학과';
        case 'SOCIO': return '사회학과';

        //자연과학대학 및 학과
        case 'SCI': return '자연과학대학';
        case 'MATH': return '수학과';
        case 'PHY': return '물리학과';
        case 'CHE': return '화학과';

        default:
            return '기타'; // 기본값 설정
    }
}