import { User } from './common';

export interface Employee {
  employeeNo: number; // 교직원번호
  user: User;  // 직원ID
  hireDate: string; // 입사일
  deptDetail?: string; // 교직원구분
}