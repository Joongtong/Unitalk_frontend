import axios from "axios";
import {
  CounselorScheduleResponseDto,
  CounselorSchedule,
  CounselingRequestDto,
} from "types/interface/counseling";
import { Employee } from "types/interface/employee";

const API_BASE_URL = "http://zzembori.store/api";

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
