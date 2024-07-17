// 프로그램 신청목록 필터
import React, { useState } from 'react';

interface Props {
    onFilterChange: (filter: string) => void;
    }

const ProgramApplicantFilter: React.FC<Props> = ({ onFilterChange }) => {
    const [selectedFilter, setSelectedFilter] = useState<string | undefined>(undefined);

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const filter = event.target.value;
        setSelectedFilter(filter);
        onFilterChange(filter);
    };

    return (
        <div className='search-bar-grid'>
            <select 
                className='search-applicant-option'
                value={selectedFilter} 
                onChange={handleFilterChange}
            >
                <option 
                    className='search-applicant-option'
                    value=""
                >
                    전체
                </option>
                <option value="1">신청</option>
                <option value="2">취소</option>
                <option value="3">완료</option>
            </select>
            <div></div>
            <div></div>
        </div>
    );
};

export default ProgramApplicantFilter;
