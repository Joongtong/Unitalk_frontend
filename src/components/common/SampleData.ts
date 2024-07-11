export interface Program {
    programNo: number;
    programName: string;
    recruitStart: string;
    recruitEnd: string;
    operationStart: string;
    operationEnd: string;
    recruitNum: number;
    status: number;
    viewCnt: number;
    thumbnailFile: string;
}

export const programData: Program[] = [
    {
        programNo: 1,
        programName: '커피 애호가 토론회',
        recruitStart: '2024.7.1',
        recruitEnd: '2024.7.31',
        operationStart: '2024.8.1',
        operationEnd: '2024.8.31',
        recruitNum: 20,
        status: 1,
        viewCnt: 15,
        thumbnailFile: `assets/images/coffee.jpg`
    },
    {
        programNo: 2,
        programName: '과학의 역사와 이해',
        recruitStart: '2024.7.1',
        recruitEnd: '2024.7.31',
        operationStart: '2024.8.1',
        operationEnd: '2024.8.31',
        recruitNum: 30,
        status: 1,
        viewCnt: 31,
        thumbnailFile: `assets/images/science.jpg`
    },
    {
        programNo: 3,
        programName: '멘탈 웰빙 연구 집단상담',
        recruitStart: '2024.7.11',
        recruitEnd: '2024.8.10',
        operationStart: '2024.9.1',
        operationEnd: '2024.9.30',
        recruitNum: 5,
        status: 1,
        viewCnt: 60,
        thumbnailFile: `assets/images/mental_health.jpg`
    },
    {
        programNo: 4,
        programName: '올바른 공부법 연구 소모임',
        recruitStart: '2024.6.1',
        recruitEnd: '2024.6.30',
        operationStart: '2024.7.1',
        operationEnd: '2024.7.31',
        recruitNum: 10,
        status: 2,
        viewCnt: 55,
        thumbnailFile: `assets/images/study.svg`
    },
    {
        programNo: 5,
        programName: 'UNITALK 창설자 모임',
        recruitStart: '2024.6.1',
        recruitEnd: '2024.6.10',
        operationStart: '2024.6.12',
        operationEnd: '2024.6.12',
        recruitNum: 6,
        status: 2,
        viewCnt: 55,
        thumbnailFile: `assets/images/unitalk_pretendard.png`
    }
];
