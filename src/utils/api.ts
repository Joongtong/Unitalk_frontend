//교수목록 가져오기
export const fetchProfessors = async () => {
    try {
        const response = await fetch(`/api/assign-prof/list/professors`);
        if (!response.ok) {
            throw new Error('Failed to fetch professors');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching professors:', error);
        throw error;
    }
};

//학생목록 가져오기
export const fetchStudents = async () => {
    try {
        const response = await fetch(`/api/assign-prof/list/students`);
        if (!response.ok) {
            throw new Error('Failed to fetch students');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
};

//지도교수 배정이력 가져오기
export const fetchAssignments = async () => {
    try {
        const response = await fetch(`/api/assign-prof/list/assignments`)
        if (!response.ok) {
            throw new Error('Failed to fetch assignments');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
}


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
