// recoilState.ts
import { atom } from 'recoil';
import { Program } from 'types/interface/program/program';
import { Pagination } from 'types/interface/program/pagination';

// 집단상담 목록
export const getAllPrograms = atom<Program[]>({
    key: 'getAllPrograms',
    default: [],
});

// 집단상담 목록 페이지네이션
export const programPagination = atom<Pagination | null>({
    key: 'programPagination',
    default: null,
});

// 집단상담 조회
export const getProgramById = atom<Program | null>({
    key: 'getProgramById',
    default: null,
});
