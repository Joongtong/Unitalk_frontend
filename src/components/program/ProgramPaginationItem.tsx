import React from 'react';
import { IProgramPagination as PaginationInterface } from 'types/interface/program/IProgramPagination';

interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page: number) => {
        if (page >= 0 && page < totalPages) {
            onPageChange(page);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;
        const startPage = Math.floor(currentPage / maxPagesToShow) * maxPagesToShow;
        const endPage = Math.min(startPage + maxPagesToShow, totalPages);

        for (let i = startPage; i < endPage; i++) {
            pageNumbers.push(
                <button key={i}
                    onClick={() => handlePageChange(i)}
                    className={i === currentPage ? 'active' : ''}
                >
                    {i + 1}
                </button>
            );
        }

        return pageNumbers;
    };

    {/* 빈 태그는 그룹화 */}
    return (
        <div className="pagination">
            {currentPage > 0 && (
                <>
                    <button onClick={() => handlePageChange(0)}> ⟪ </button>
                    <button onClick={() => handlePageChange(currentPage - 1)}> ⟨ </button>
                </>
            )}
            {renderPageNumbers()}
            {currentPage < totalPages - 1 && (
                <>
                    <button onClick={() => handlePageChange(currentPage + 1)}> ⟩ </button>
                    <button onClick={() => handlePageChange(totalPages - 1)}> ⟫ </button>
                </>
            )}
        </div>
    );
};

export default Pagination;
