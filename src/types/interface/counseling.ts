export interface CounselingResponseDto {
    reqNo: number;
    student: number;
    counselor: number;
    counselDate: string;
    schedule: number;
    applicationDate: string;
    counselMode: number;
    counselType: string;
    applicationContent: string;
    status: number;
    counselContent: string;
    recordTime: string;
}

export interface CounselingCountsDto {
    professorCounseling: number;
    personalCounseling: number;
    sexualHarassmentCounseling: number;
    studentWelfareCounseling: number;
}