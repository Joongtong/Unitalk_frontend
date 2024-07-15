import { IProgram } from './IProgram';
import { Student } from '../student';

export interface IApplicant {
  applicantNo: number; // 신청 번호
  program: IProgram; // 집단상담
  student: Student; // 학생
  userId: number; // 학번
  userName: string; // 학생 이름
  applicantDate: string; // 신청일 (ISO 형식의 문자열)
  status: number; // 상태 (1: 신청, 2: 취소)
}
