import { IProgram } from './IProgram';

export interface IProgramFile {
    fileNo?: number; // 파일 번호
    program?: IProgram; // 집단상담 번호
    fileName: string; // 파일 원본명
    fileSaveName: string; // 파일 저장명
    filePath: string; // 파일 경로
    fileSize: number; // 파일 크기
}