import { IProfessorListItem, IStudentListItem } from 'types/interface';

// 전체 교수 목록 가져오기
export const fetchAllProfessors = async () => {
    try {
        const response = await fetch('/api/assign-prof/list/professors/all');
        if (!response.ok) {
            throw new Error('Failed to fetch all professors');
        }
        return response.json() as Promise<IProfessorListItem[]>;
    } catch (error) {
        console.error('Error fetching all professors:', error);
        throw error;
    }
};

// 전체 학생 목록 가져오기
export const fetchAllStudents = async () => {
    try {
        const response = await fetch('/api/assign-prof/list/students/all');
        if (!response.ok) {
            throw new Error('Failed to fetch all students');
        }
        return response.json() as Promise<IStudentListItem[]>;
    } catch (error) {
        console.error('Error fetching all students:', error);
        throw error;
    }
};

// 학과별 교수 목록 가져오기
export const fetchProfessorsByDept = async (deptId: string) => {
    try {
        const response = await fetch(`/api/assign-prof/list/professors/${deptId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch professors for department ${deptId}`);
        }
        return response.json() as Promise<IProfessorListItem[]>;
    } catch (error) {
        console.error(`Error fetching professors for department ${deptId}:`, error);
        throw error;
    }
};

// 학과별 학생 목록 가져오기
export const fetchStudentsByDept = async (deptId: string) => {
    try {
        const response = await fetch(`/api/assign-prof/list/students/${deptId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch students for department ${deptId}`);
        }
        return response.json() as Promise<IStudentListItem[]>;
    } catch (error) {
        console.error(`Error fetching students for department ${deptId}:`, error);
        throw error;
    }
};

//지도교수 배정이력 가져오기
export const fetchAssignments = async () => {
    try {
        const response = await fetch(`/api/assign-prof/list/assignments`)
        if (!response.ok) {
            throw new Error('Failed to fetch assignments');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
}

//지도교수 배정하기
export const assignProfessorToStudent = async (professorNo: number, studentNo: number) => {
    const assignData = {
        professorNo,
        studentNo,
    };

    try {
        const response = await fetch(`/api/assign-prof/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(assignData),
        });

        if (!response.ok) {
            throw new Error('Assignment failed');
        }

        return response.json();
    } catch (error) {
        console.error('Error during assignment:', error);
        throw error;
    }
};
