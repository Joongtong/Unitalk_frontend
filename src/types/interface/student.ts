import { User } from './common';
import { Employee } from './employee';

export interface Student {
  studentNo: number;
  user: User;
  regDate: string;
  grade: number;
  professor?: Employee;
}
