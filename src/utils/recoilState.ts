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
