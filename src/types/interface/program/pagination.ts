import { Program } from './program';

export interface Pagination {
    content: Program[];
    pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    };
    totalElements: number;
    totalPages: number;
}