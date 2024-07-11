import React, { useState, KeyboardEvent } from 'react';

interface Props {
    onSearch: (searchType: string, searchTerm: string) => void;
}

const Search: React.FC<Props> = ({ onSearch }) => {
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
        <div className="search-bar">
            <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                <option value="all">전체</option>
                <option value="programName">제목</option>
                <option value="programContent">내용</option>
            </select>
            <input 
                type="text" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={keyPress}
                placeholder="검색어를 입력하세요" 
            />
            <button onClick={programSearch}>검색</button>
        </div>
    );
};

export default Search;