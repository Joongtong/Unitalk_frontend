import { User } from './common';

export interface Employee {
  employeeNo: number;
  user: User;
  hireDate: string;
  deptDetail?: string;
}