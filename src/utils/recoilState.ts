import { IProgram } from 'types/interface/program/IProgram';
import { IApplicant } from 'types/interface/program/IApplicant';
import { IProgramPagination } from 'types/interface/program/IProgramPagination';
// recoilState.ts
import { atom } from 'recoil';

// 선택된 교수의 ID 상태
export const selectedProfessorState = atom<number | null>({
    key: 'selectedProfessorState',
    default: null,
});

// 선택된 학생의 ID 상태
export const selectedStudentState = atom<number | null>({
    key: 'selectedStudentState',
    default: null,
});

// 집단상담 목록
export const getAllPrograms = atom<IProgram[]>({
    key: 'getAllPrograms',
    default: [],
});

// 집단상담 목록 페이지네이션
export const programPagination = atom<IProgramPagination<IProgram> | null>({
    key: 'programPagination',
    
    default: null,
});

// 집단상담 상세조회
export const getProgramById = atom<IProgram | null>({
    key: 'getProgramById',
    default: null,
});

// 신청 목록
export const getAllApplicants = atom<IApplicant[]>({
    key: 'getAllApplicants',
    default: [],
});

// 신청 목록 페이지네이션
export const applicantPagination = atom<IProgramPagination<IApplicant> | null>({
    key: 'applicantPagination',
    default: null,
});
