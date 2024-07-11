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