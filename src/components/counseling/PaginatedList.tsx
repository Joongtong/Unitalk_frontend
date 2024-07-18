import React from "react";
import { Pagination } from "@mui/material";
import { styled } from '@mui/material/styles';
import CounselingList from "./CounselingList";
import CounselorCounselingList from "./CounselorCounselingList";
import { CounselingResponseDto } from "types/interface";

interface PaginatedListProps {
    counselings: CounselingResponseDto[];
    page: number;
    totalPages: number;
    onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
    isCounselor?: boolean;
    onUpdateContent?: (counselingId: number, content: string) => void;
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
        <CounselingList counselings={counselings} />
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