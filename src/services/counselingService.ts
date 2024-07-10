import axios from 'axios';
import { CounselingResponseDto, CounselingCountsDto } from 'types/interface/counseling';

const API_BASE_URL = 'http://localhost:3791/api';

interface FilterParams {
  counselMode?: number;
  status?: number;
  counselType?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  size?: number;
  semester?: string;
  resultStatus?: string;
  searchQuery?: string;
}

interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export const getCounselingsByStudentNo = async (studentNo: number, filters: FilterParams = {}) => {
    const params = new URLSearchParams();
    if (filters.counselMode) params.append('counselMode', filters.counselMode.toString());
    if (filters.status) params.append('status', filters.status.toString());
    if (filters.counselType) params.append('counselType', filters.counselType);
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.page !== undefined) params.append('page', filters.page.toString());
    if (filters.size !== undefined) params.append('size', filters.size.toString());

    const response = await axios.get<PageResponse<CounselingResponseDto>>(
      `${API_BASE_URL}/counselings/student/${studentNo}`,
      { params }
    );
    return response.data;
};

export const getCounselingCountsByStudentNo = async (studentNo: number) => {
    console.log("Fetching counseling counts for student:", studentNo);
    try {
      const response = await axios.get<CounselingCountsDto>(`${API_BASE_URL}/counselings/student/${studentNo}/counts`);
      console.log("API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching counseling counts:", error);
      throw error;
    }
};

export const getCounselingsByCounselorNo = async (counselorNo: number, filters: FilterParams = {}) => {
  const params = new URLSearchParams();
  if (filters.semester) params.append('semester', filters.semester);
  if (filters.resultStatus) params.append('resultStatus', filters.resultStatus);
  if (filters.searchQuery) params.append('searchQuery', filters.searchQuery);
  if (filters.page !== undefined) params.append('page', filters.page.toString());
  if (filters.size !== undefined) params.append('size', filters.size.toString());

  try {
    const response = await axios.get<PageResponse<CounselingResponseDto>>(
      `${API_BASE_URL}/counselings/counselor/${counselorNo}`,
      { params }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching counselings for counselor:", error);
    throw error;
  }
};

export const updateCounselingContent = async (reqNo: number, counselContent: string) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/counselings/${reqNo}`, { counselContent });
    return response.data;
  } catch (error) {
    console.error("Error updating counseling content:", error);
    throw error;
  }
};