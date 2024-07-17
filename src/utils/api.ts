import { IProfessorListItem, IStudentListItem, IApiResponse, IAssignmentListItem } from 'types/interface';
import { ITop12CardItem } from "types/interface";
import axios from 'axios';
import { IProgram } from 'types/interface/program/IProgram';
import { IProgramPagination } from 'types/interface/program/IProgramPagination';
import { IApplicant } from 'types/interface/program/IApplicant';
import { Employee } from 'types/interface/employee';

// 로그인


// Main Top12 Program 가져오기
export const fetchTop12Programs = (): Promise<ITop12CardItem[]> => {
    return fetch(`/api/program/main/top12`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok`);
            }
            return response.json();
        });
};

//전체 교수 목록 가져오기
export const fetchAllProfessors = async (page: number, pageSize: number): Promise<IApiResponse<IProfessorListItem>> => {

    try {
        const response = await fetch(`/api/assign-prof/list/professors/all?page=${page}&pageSize=${pageSize}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch all professors`);
        }
        const data = await response.json();
        return {
            content: data.content,
            totalPages: data.totalPages,
        }
    } catch (error) {
        console.error(`Error fetching all professors:`, error);
        throw error;
    }
};

//전체 학생 목록 가져오기
export const fetchAllStudents = async (page: number, pageSize: number): Promise<IApiResponse<IStudentListItem>> => {
    try {
        const response = await fetch(`/api/assign-prof/list/students/all?page=${page}&pageSize=${pageSize}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch all students`);
        }
        const data = await response.json();
        return {
            content: data.content,
            totalPages: data.totalPages,
        }
    } catch (error) {
        console.error(`Error fetching all students:`, error);
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
            throw new Error(`Assignment failed`);
        }

        return response.json();
    } catch (error) {
        console.error(`Error during assignment:`, error);
        throw error;
    }
};

// 상담사 목록 조회 함수 추가
export const fetchCounselors = async (): Promise<Employee[]> => {
  try {
      const response = await axios.get('/api/program/counselors');
      return response.data;
  } catch (error) {
      console.error('Error fetching counselors:', error);
      throw error;
  }
};

// 집단상담 목록 조회 / 페이지네이션 / 필터 / 검색
export const fetchPrograms = async (
  page: number = 0,
  size: number = 16,
  filter?: string,
  searchType?: string,
  searchTerm?: string
): Promise<IProgramPagination<IProgram>> => {
  try {
    let url = `/api/program/list/search?page=${page}&size=${size}`;
    if (searchTerm) {
      if (searchType === 'all') {
        url += `&keyword=${encodeURIComponent(searchTerm)}`;
      } else if (searchType === 'programName') {
        url += `&programName=${encodeURIComponent(searchTerm)}`;
      } else if (searchType === 'programContent') {
        url += `&programContent=${encodeURIComponent(searchTerm)}`;
      }
    }
    if (filter) {
      url += `&sort=${filter}`;
    } else {
      url += `&sort=programNo`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('목록을 가져오지 못했습니다.:', error);
    throw error;
  }
};

// 집단상담 상세페이지
export const fetchProgramById = async (programNo: number): Promise<IProgram> => {
  try {
    const response = await axios.get(`/api/program/${programNo}`);
    return response.data;
  } catch (error) {
    console.error('게시글을 가져오지 못했습니다.:', error);
    throw error;
  }
};

// 집단상담 작성
export const createProgram = async (formData: FormData) => {
  try {
    const response = await axios.post('/api/program', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

// 집단상담 수정
export const updateProgram = async (programNo: number, programData: FormData): Promise<IProgram> => {
  try {
    const response = await axios.put(`/api/program/${programNo}`, programData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('프로그램 수정 실패:', error);
    throw error;
  }
};

// 집단상담 삭제
export const deleteProgram = async (programNo: number) => {
  try {
      await axios.delete(`/api/program/${programNo}`);
  } catch (error) {
      console.error('프로그램 삭제 실패:', error);
      throw error; // 에러를 다시 던져서 호출하는 쪽에서 처리할 수 있도록
  }
};

// 신청 목록 조회 / 페이지네이션 / 필터 / 검색
export const fetchApplicants = async (
  page: number = 0,
  size: number = 16,
  filter?: string,
  searchType?: string,
  searchTerm?: string
): Promise<IProgramPagination<IApplicant>> => {
  try {
    let url = `/api/applicant/list?page=${page}&size=${size}`;
    if (searchTerm) {
      if (searchType === 'all') {
        url += `&keyword=${encodeURIComponent(searchTerm)}`;
      } else if (searchType === 'studentName') {
        url += `&studentName=${encodeURIComponent(searchTerm)}`;
      } else if (searchType === 'programName') {
        url += `&programName=${encodeURIComponent(searchTerm)}`;
      }
    }
    if (filter) {
      url += `&sort=${filter}`;
    } else {
      url += `&sort=applicantNo`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Response error.');
    }

    const data = await response.json();
    
    const applicantsWithPrograms = await Promise.all(data.content.map(async (applicant: IApplicant) => {
      if (typeof applicant.program === 'number') {
        const program = await fetchProgramById(applicant.program);
        return {
          ...applicant,
          program
        };
      } else {
        return applicant;
      }
    }));
    return {
      ...data,
      content: applicantsWithPrograms
    };
  } catch (error) {
    throw error;
  }
};

// 프로그램조회 및 신청자 조회(관리))
export const fetchApplicantsByProgram = async (
  programNo: number,
  page: number = 0,
  size: number = 10,
  studentName?: string,
  applicantDate?: string,
  status?: number
): Promise<IProgramPagination<IApplicant>> => {
  try {
    let url = `/api/applicant/list/${programNo}/search?page=${page}&size=${size}`;
    if (studentName) {
      url += `&studentName=${encodeURIComponent(studentName)}`;
    }
    if (applicantDate) {
      url += `&applicantDate=${encodeURIComponent(applicantDate)}`;
    }
    if (status) {
      url += `&status=${status}`;
    }

    console.log('Final API URL:', url)
    const response = await axios.get(url);
    console.log('API Response Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('목록을 가져오지 못했습니다.:', error);
    throw error;
  }
};

// 학생 본인의 신청 내역 조회
export const fetchStudentApplications = async (
  studentId: number,
  page: number = 0,
  size: number = 10
): Promise<IProgramPagination<IApplicant>> => {
  try {
    const response = await axios.get(`/api/applicant/${studentId}?page=${page}&size=${size}`);
    console.log('Applications content:', response);
    
    const applicantsWithPrograms = await Promise.all(response.data.content.map(async (applicant: IApplicant) => {
      if (typeof applicant.program === 'number') {
        const program = await fetchProgramById(applicant.program);
        return {
          ...applicant,
          program
        };
      } else {
        return applicant;
      }
    }));
    
    return {
      ...response.data,
      content: applicantsWithPrograms
    };
  } catch (error) {
    console.error('목록을 가져오지 못했습니다.:', error);
    throw error;
  }
};

// 신청하기
export const createApplication = async (programNo: number, studentNo: number) => {
  try {
      const response = await axios.post('/api/applicant/student', {
        studentNo,
          applicantDate: new Date().toISOString().split('T')[0],
          status: 1,
      });
      console.log(response);
      return response.data;
  } catch (error) {
      throw error;
  }
};

// 신청 (수정)삭제
export const deleteApplication = async (applicantNo: number) => {
  try {
    await axios.patch(`/api/applicant/${applicantNo}`, null, {
    });
  } catch (error) {
    console.error('신청 삭제 실패:', error);
    throw error;
  }
};