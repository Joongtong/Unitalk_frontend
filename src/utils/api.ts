import { Program } from 'types/interface/program/program';
import { Pagination } from 'types/interface/program/pagination';

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

// 집단상담 상세페이지
export const fetchProgramById = async (programNo: number): Promise<Program> => {
  try {
    const response = await fetch(`/api/program/${programNo}`);
    if (!response.ok) {
      throw new Error('응답이 없습니다.');
    }
    const data = await response.json();
    
    const program: Program = {
      ...data,
      programFiles: data.files
    };
    
    return program;
  } catch (error) {
    console.error('게시글을 가져오지 못했습니다.:', error);
    throw error;
  }
};