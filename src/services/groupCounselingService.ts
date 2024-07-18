import axios from 'axios';
import { IApplicant } from 'types/interface/program/IApplicant'; 

const API_BASE_URL = 'http://localhost:3791/api';

interface FilterParams {
  counselMode?: number;
  status?: number;
  counselType?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  size?: number;
}

interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

// 그룹 상담 신청 데이터를 학생 번호로 가져오는 함수
export const getGroupCounselingsByStudentNo = async (studentNo: number, filters: FilterParams = {}) => {
    const params = new URLSearchParams();
    if (filters.page !== undefined) params.append('page', filters.page.toString());
    if (filters.size !== undefined) params.append('size', filters.size.toString());

    try {
        const response = await axios.get<PageResponse<IApplicant>>(
          `${API_BASE_URL}/applicant/${studentNo}`,
          { params }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching group counseling data for student:", error);
        throw error;
    }
};

