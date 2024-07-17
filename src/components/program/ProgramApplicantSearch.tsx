// 신청목록 검색
import React, { useState, KeyboardEvent } from 'react';

interface Props {
    onSearch: (searchType: string, searchTerm: string) => void;
}

const ProgramApplicantSearch: React.FC<Props> = ({ onSearch }) => {
    const [searchType, setSearchType] = useState('studentName');
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        onSearch(searchType, searchTerm);
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
        handleSearch();
        }
    };

    return (
        <div className='search-bar-grid'>
        <select 
            className='search-option'
            value={searchType} 
            onChange={(e) => setSearchType(e.target.value)}
        >
            <option value="studentName">학생 이름</option>
        </select>
        <input
            className='search-input-text'
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="검색어를 입력하세요"
        />
        <button 
            className='search-btn'
            onClick={handleSearch}
        >
            검색
        </button>
        </div>
    );
};

export default ProgramApplicantSearch;
