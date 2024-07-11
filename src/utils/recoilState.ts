// recoilState.ts
import { atom } from 'recoil';
import { Program } from 'types/interface/program';
import { Pagination } from 'types/interface/pagination';

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