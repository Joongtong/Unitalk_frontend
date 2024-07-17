import { IProgram } from './IProgram';
import { IApplicant } from './IApplicant';

export interface IProgramPagination<T> {
    content: T[];
    pageable: {
        offset: number;
        pageNumber: number;
        pageSize: number;
    };
    totalElements: number;
    totalPages: number;
}