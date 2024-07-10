import { Program } from 'types/interface/program';

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

export const frenchPrograms = async (): Promise<Program[]> => {
    try {
      const response = await fetch('/api/programs');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
  
      // content 배열 반환
      return data.content.map((program: any) => ({
        programNo: program.programNo,
        counselor: program.counselor,
        programName: program.programName,
        programContent: program.programContent,
        recruitStart: program.recruitStart,
        recruitEnd: program.recruitEnd,
        operationStart: program.operationStart,
        operationEnd: program.operationEnd,
        programSession: program.programSession,
        recruitNum: program.recruitNum,
        status: program.status,
        viewCnt: program.viewCnt,
        programFiles: program.files,
        thumbnailFile: program.thumbnailFile,
      }));
    } catch (error) {
      console.error('Error fetching programs:', error);
      throw error;
    }
  };