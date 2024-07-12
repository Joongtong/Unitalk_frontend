//메인페이지 Top 12 프로그램 인터페이스
export interface ITop12CardItem {
    programNo: number;
    programName: string;
    recruitStart: string;
    recruitEnd: string;
    operationStart: string;
    operationEnd: string;
    recruitNum: number;
    status: number;
    viewCnt: number;
    thumbnailFile: {
        filePath: string;
    }
}