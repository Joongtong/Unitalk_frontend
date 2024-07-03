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
