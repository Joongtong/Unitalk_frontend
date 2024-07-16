import { IAssignmentListItem, IProfessorListItem, IStudentListItem } from './assignmentList-item.interface';
import { IApiResponse } from './apiResponse.interface';
import { ITop12CardItem } from './main-item.interface';

export type {
    IProfessorListItem,
    IStudentListItem,
    IAssignmentListItem,
    ITop12CardItem,
    IApiResponse,
}

export * from './common';
export * from './student';
export * from './employee';
export * from './counseling';
