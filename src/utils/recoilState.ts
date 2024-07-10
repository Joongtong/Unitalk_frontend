// recoilState.ts
import { atom } from 'recoil';
import { Program } from 'types/interface/program';

// 집단상담 목록
export const getAllPrograms = atom<Program[]>({
    key: 'getAllPrograms',
    default: [],
});
