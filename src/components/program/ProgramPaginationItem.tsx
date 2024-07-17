// 프로그램 목록 페이지네이션
import React from 'react';
// import 'assets/styles/program/PaginationItem.css';

interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const ProgramPaginationItem: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
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
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={i === currentPage ? 'pagination-btn-v2 active' : 'pagination-btn-v2'}
                >
                    {i + 1}
                </button>
            );
        }

        return pageNumbers;
    };

    return (
        <div className='pagination-v2'>
            {currentPage > 0 && (
                <>
                    <button
                        className='pagination-btn-v2'
                        onClick={() => handlePageChange(0)}>
                        ⟪
                    </button>
                    <button
                        className='pagination-btn-v2'
                        onClick={() => handlePageChange(currentPage - 1)}>
                        ⟨
                    </button>
                </>
            )}
            {renderPageNumbers()}
            {currentPage < totalPages - 1 && (
                <>
                    <button
                        className='pagination-btn-v2'
                        onClick={() => handlePageChange(currentPage + 1)}>
                        ⟩
                    </button>
                    <button
                        className='pagination-btn-v2'
                        onClick={() => handlePageChange(totalPages - 1)}>
                        ⟫
                    </button>
                </>
            )}
        </div>
    );
};

export default ProgramPaginationItem;
