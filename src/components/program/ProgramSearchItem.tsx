// 프로그램 목록 검색
import React, { useState, KeyboardEvent } from 'react';

interface Props {
    onSearch: (searchType: string, searchTerm: string) => void;
}

const ProgramSearchItem: React.FC<Props> = ({ onSearch }) => {
    const [searchType, setSearchType] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const programSearch = () => {
        onSearch(searchType, searchTerm);
    };

    const keyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            programSearch();
        }
    };

    return (
        <div className="search-bar-grid">
            <select 
                className='search-applicant-option'
                value={searchType} onChange={(e) => setSearchType(e.target.value)}
            >
                <option className='search-applicant-option' value="all">전체</option>
                <option value="programName">제목</option>
                <option value="programContent">내용</option>
            </select>
            <input 
                className='search-input-text'
                type="text" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={keyPress}
                placeholder="검색어를 입력하세요" 
            />
            <button 
                className='search-btn'
                onClick={programSearch}>
                    검색
            </button>
        </div>
    );
};

export default ProgramSearchItem;