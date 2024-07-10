export default interface IApiResponse<T> {
    content: T[];
    totalPages: number;
}