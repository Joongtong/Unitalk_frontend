import { ITop12CardItem } from "Types/interface";

// Main Top12 Program 가져오기
export const fetchTop12Programs = (): Promise<ITop12CardItem[]> => {
    return fetch(`/api/program/main/top12`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
};
