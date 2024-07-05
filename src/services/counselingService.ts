import axios from 'axios';
import { CounselingResponseDto } from 'types/interface/counseling';
import { CounselingCountsDto } from 'types/interface/counseling';

const API_BASE_URL = 'http://localhost:3791/api';

interface FilterParams {
    counselMode?: number;
    status?: number;
    counselType?: string;
    startDate?: string;
    endDate?: string;
}

export const getCounselingsByStudentId = async (studentId: number, filters: FilterParams = {}) => {
    const params = new URLSearchParams();
    if (filters.counselMode) params.append('counselMode', filters.counselMode.toString());
    if (filters.status) params.append('status', filters.status.toString());
    if (filters.counselType) params.append('counselType', filters.counselType);
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
  
    const response = await axios.get<{ content: CounselingResponseDto[] }>(
      `${API_BASE_URL}/counselings/student/${studentId}`,
      { params }
    );
    return response.data;
  };

export const getCounselingCountsByStudentId = async (studentId: number) => {
    console.log("Fetching counseling counts for student:", studentId);
    try {
      const response = await axios.get<CounselingCountsDto>(`${API_BASE_URL}/counselings/student/${studentId}/counts`);
      console.log("API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching counseling counts:", error);
      throw error;
    }
};