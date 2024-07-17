import React from 'react';

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageClick = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
        onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
        onPageChange(currentPage + 1);
        }
    };

    return (
        <div className='pagination-v2'>
            <button 
                className={`pagination-btn-v2 ${currentPage === 1 ? 'hidden' : ''}`}
                onClick={handlePrevPage} 
            >
                &lt;
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index + 1}
                    onClick={() => handlePageClick(index + 1)}
                    className={`pagination-btn-v2 ${currentPage === index + 1 ? 'active' : ''}`}
                    disabled={currentPage === index + 1}
                >
                    {index + 1}
                </button>
            ))}
            <button 
                className={`pagination-btn-v2 ${currentPage === totalPages ? 'hidden' : ''}`}
                onClick={handleNextPage} 
            >
                &gt;
            </button>
        </div>
    );
};

export default Pagination;
