import { User } from './common';

export interface Employee {
  employeeNo: number; // 교직원번호
  user: User;  // 학생번호
  hireDate: string; // 입사일
  deptDetail?: string; // 교직원구분
}