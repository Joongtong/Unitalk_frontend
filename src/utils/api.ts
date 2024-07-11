import { Program } from 'types/interface/program';
import { Pagination } from 'types/interface/pagination';

export const fetchProfessors = async () => {
    try {
        const response = await fetch(`http://localhost:3791/api/assign-prof/list/professors`);
        if (!response.ok) {
            throw new Error('Failed to fetch professors');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching professors:', error);
        throw error;
    }
};

// 집단상담 목록 / 페이지네이션 / 필터 / 검색
export const fetchPrograms = async (
  page: number = 0,
  size: number = 16,
  filter?: string,
  searchType?: string,
  searchTerm?: string
): Promise<Pagination> => {
  try {
    // 집단상담 목록
    let url = `/api/programs/search?page=${page}&size=${size}`;
    // 검색
    if (searchTerm) {
      if (searchType === 'all') {
        url += `&programName=${encodeURIComponent(searchTerm)}&programContent=${encodeURIComponent(searchTerm)}`;
      } else if (searchType) {
        url += `&${searchType}=${encodeURIComponent(searchTerm)}`;
      }
    }
    // 필터
    if (filter) {
      url += `&sort=${filter}`;
    } else {
      url += `&sort=programNo`;
    }
    // 에러 처리
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('응답이 없습니다.');
    }
    return response.json();
  } catch (error) {
    console.error('목록을 가져오지 못했습니다.:', error);
    throw error;
  }
};