import { IProfessorListItem, IStudentListItem, IApiResponse, IAssignmentListItem } from 'types/interface';
import { ITop12CardItem } from "types/interface";

// Main Top12 Program 가져오기
export const fetchTop12Programs = (): Promise<ITop12CardItem[]> => {
    return fetch(`/api/program/main/top12`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
};

//전체 교수 목록 가져오기
export const fetchAllProfessors = async (page: number, pageSize: number): Promise<IApiResponse<IProfessorListItem>> => {
    try {
        const response = await fetch(`/api/assign-prof/list/professors/all?page=${page}&pageSize=${pageSize}`);
        if (!response.ok) {
            throw new Error('Failed to fetch all professors');
        }
        const data = await response.json();
        return {
            content: data.content,
            totalPages: data.totalPages,
        }
    } catch (error) {
        console.error('Error fetching all professors:', error);
        throw error;
    }
};

//전체 학생 목록 가져오기
export const fetchAllStudents = async (page: number, pageSize: number): Promise<IApiResponse<IStudentListItem>> => {
    try {
        const response = await fetch(`/api/assign-prof/list/students/all?page=${page}&pageSize=${pageSize}`);
        if (!response.ok) {
            throw new Error('Failed to fetch all students');
        }
        const data = await response.json();
        return {
            content: data.content,
            totalPages: data.totalPages,
        }
    } catch (error) {
        console.error('Error fetching all students:', error);
        throw error;
    }
};

//학과별 교수 목록 가져오기
export const fetchProfessorsByDept = async (deptId: string, page: number, pageSize: number): Promise<IApiResponse<IProfessorListItem>> => {
    try {
        const response = await fetch(`/api/assign-prof/list/professors/${deptId}?page=${page}&pageSize=${pageSize}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch professors for department ${deptId}`);
        }
        const data = await response.json();
        return {
            content: data.content,
            totalPages: data.totalPages,
        }
    } catch (error) {
        console.error(`Error fetching professors for department ${deptId}:`, error);
        throw error;
    }
};

//학과별 학생 목록 가져오기
export const fetchStudentsByDept = async (deptId: string, page: number, pageSize: number): Promise<IApiResponse<IStudentListItem>> => {
    try {
        const response = await fetch(`/api/assign-prof/list/students/${deptId}?page=${page}&pageSize=${pageSize}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch students for department ${deptId}`);
        }
        const data = await response.json();
        return {
            content: data.content,
            totalPages: data.totalPages,
        }
    } catch (error) {
        console.error(`Error fetching students for department ${deptId}:`, error);
        throw error;
    }
};

//지도교수 배정이력 가져오기
export const fetchAllAssignments = async (page: number, pageSize: number): Promise<IApiResponse<IAssignmentListItem>> => {
    try {
        const response = await fetch(`/api/assign-prof/list/assignments/all?page=${page}&pageSize=${pageSize}`);
        if (!response.ok) {
            throw new Error('Failed to fetch assignments');
        }
        const data = await response.json();
        return {
            content: data.content,
            totalPages: data.totalPages,
        }
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
};

//학과별 지도교수 배정이력 가져오기
export const fetchAssignmentsByDept = async (deptId: string, page: number, pageSize: number): Promise<IApiResponse<IAssignmentListItem>> => {
    try {
        const response = await fetch(`/api/assign-prof/list/assignments/${deptId}?page=${page}&pageSize=${pageSize}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch students for department ${deptId}`);
        }
        const data = await response.json();
        return {
            content: data.content,
            totalPages: data.totalPages,
        }
    } catch (error) {
        console.error(`Error fetching students for department ${deptId}:`, error);
        throw error;
    }
};


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
