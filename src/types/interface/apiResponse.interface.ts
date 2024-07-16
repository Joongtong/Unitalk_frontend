export interface IApiResponse<T> {
    content: T[];
    totalPages: number;
}