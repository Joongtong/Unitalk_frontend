import React from "react";
import { Pagination } from "@mui/material";
import { styled } from '@mui/material/styles';
import CounselingList from "./CounselingList";
import CounselorCounselingList from "./CounselorCounselingList";
import { CounselingResponseDto } from "types/interface";
import { IApplicant } from "types/interface/program/IApplicant";
import dayjs from "dayjs";

interface PaginatedListProps {
    counselings: CounselingResponseDto[];
    page: number;
    totalPages: number;
    onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
    isCounselor?: boolean;
    onUpdateContent?: (counselingId: number, content: string) => void;
    // 아래 prop들을 옵셔널로 만듭니다
    groupCounselings?: IApplicant[];
    selectedDate?: dayjs.Dayjs | null;
    onSelectCounseling?: (arg: any) => void;
}

const StyledPagination = styled(Pagination)(({ theme }) => ({
    '& .MuiPaginationItem-root': {
        color: '#A51C30',
        border: '1px solid #A51C30',
    },
    '& .MuiPaginationItem-root:hover': {
        backgroundColor: 'rgba(165, 28, 48, 0.1)',
    },
    '& .Mui-selected': {
        backgroundColor: '#A51C30 !important',
        color: '#ffffff',
        borderColor: '#A51C30',
    },
}));

const PaginatedList: React.FC<PaginatedListProps> = ({
    counselings,
    groupCounselings,
    selectedDate,
    onSelectCounseling,
    page,
    totalPages,
    onPageChange,
    isCounselor = false,
    onUpdateContent
}) => {
    return (
    <>
        {isCounselor ? (
        <CounselorCounselingList 
            counselings={counselings} 
            onUpdateContent={onUpdateContent!}
        />
        ) : (
        <CounselingList 
            counselings={counselings}
            groupCounselings={groupCounselings || []}
            selectedDate={selectedDate || null}
            onSelectCounseling={onSelectCounseling || (() => {})}
        />
        )}
        <StyledPagination 
        count={totalPages} 
        page={page + 1} 
        onChange={onPageChange}
        color="primary"
        sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}
        />
    </>
    );
};

export default PaginatedList;