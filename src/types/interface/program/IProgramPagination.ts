import { Program } from './program';
import { Applicant } from './applicant';

export interface Pagination<T> {
    content: T[];
    pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    };
    totalElements: number;
    totalPages: number;
}