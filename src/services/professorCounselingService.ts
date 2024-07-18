import axios from "axios";
import {
  CounselorScheduleResponseDto,
  CounselorSchedule,
  CounselingRequestDto,
} from "types/interface/counseling";
import { Employee } from "types/interface/employee";

const API_BASE_URL = "http://zzembori.store/api";

// 학생 정보를 표현하는 인터페이스 정의
export interface StudentInfo {
  studentNo: number;
  studentId: number;
  studentName: string;
  email: string;
  // 필요한 다른 필드 추가
}

export const getCounselorFindAll = async () => {
  try {
    const response = await axios.get<Employee[]>(
      `${API_BASE_URL}/counselor/professor/findAll`
    );
    console.log("response 결과");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching counselings for getCounselorFindAll:", error);
    throw error;
  }
};

export const saveCounseling = async (
  counselingRequestDto: CounselingRequestDto
) => {
  try {
    const response = await axios.post<CounselingRequestDto>(
      `${API_BASE_URL}/counselings`,
      counselingRequestDto
    );
    console.log("POST response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error saving counselor schedule:", error);
    throw error;
  }
};

export const getProfessorsByCounselType = async (counselType: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/counselor/professor/byCounselType?deptDetail=${counselType}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch professors by counsel type:", error);
    throw error;
  }
};
// 현재 로그인한 학생의 정보를 가져오는 함수
export const getCurrentStudent = async (): Promise<StudentInfo> => {
  try {
    const response = await axios.get<StudentInfo>(
      `${API_BASE_URL}/students/current`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching current student info:", error);
    throw error;
  }
};
