import { Department } from './common';
import { Student } from './student';
import { Employee } from './employee';

export interface CounselorSchedule {
    schNo: number;
    counselor: Employee;
    days: string;
    availTime: number;
    status: number;
}

export interface CounselingResponseDto {
    reqNo: number;
    student: Student;
    counselor: Employee;
    counselDate: string;
    schedule: CounselorSchedule;
    applicationDate: string;
    counselMode: number;
    department: Department;
    applicationContent?: string;
    status: number;
    counselContent?: string;
    recordTime?: string;
}

export interface CounselingReviewResponseDto {
    reviewNo: number;
    reqNo: number;
    student: Student;
    rating: number; // BigDecimal을 number로 변환
    content: string;
}

export interface CounselorScheduleResponseDto {
    counselor: number;
    days: string;
    availTime: number;
    status: number;
}

export interface CounselingCountsDto {
    professorCounseling: number;
    personalCounseling: number;
    sexualHarassmentCounseling: number;
    studentWelfareCounseling: number;
}

export interface FilterParams {
    counselMode?: number;
    status?: number;
    counselType?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    size?: number;
    semester?: string;
    resultStatus?: string;
    searchQuery?: string;
}