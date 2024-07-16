import { Employee } from '../employee';
import { IProgramFile } from './IProgramFile';

export interface IProgram {
  programNo: number; // 집단상담 번호
  counselor: Employee; // 상담사
  programName: string; // 집단상담명
  programContent: string; // 집단상담 내용
  recruitStart?: string; // 모집시작일
  recruitEnd?: string; // 모집종료일
  operationStart?: string; // 운영시작일
  operationEnd?: string; // 운영종료일
  programSession: number; // 회차
  recruitNum?: number; // 모집인원
  status: number; // 상태 1: 신청가능, 2: 신청불가
  viewCnt: number; // 조회수
  files?: IProgramFile[]; // 집단상담 파일(이미지)
  thumbnailFile?: IProgramFile; // 썸네일 파일
}
