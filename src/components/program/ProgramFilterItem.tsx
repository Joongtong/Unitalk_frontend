// 프로그램 목록 필터
import React, { useState } from 'react';

interface Props {
  onFilter: (filter: string) => void;
}

const ProgramFilterItem: React.FC<Props> = ({ onFilter }) => {
  const [filter, setFilter] = useState<string | null>(null);

  const filterChange = (filter: string) => {
    setFilter(filter);
    onFilter(filter);
  };

  return (
    <div className="filter-buttons">

      <button 
        onClick={() => filterChange('programNo')}
        className={filter === 'programNo' ? 'active' : ''}
      >
        최신순 {filter === 'programNo' }
      </button>

      <button 
        onClick={() => filterChange('recruitStart')}
        className={filter === 'recruitStart' ? 'active' : ''}
      >
        모집순 {filter === 'recruitStart' }
      </button>

      <button 
        onClick={() => filterChange('operationStart')}
        className={filter === 'operationStart' ? 'active' : ''}
      >
        운영순 {filter === 'operationStart' }
      </button>

      <button 
        onClick={() => filterChange('status')}
        className={filter === 'status' ? 'active' : ''}
      >
        상태순 {filter === 'status' }
      </button>

      <button 
        onClick={() => filterChange('viewCnt')}
        className={filter === 'viewCnt' ? 'active' : ''}
      >
        조회순 {filter === 'viewCnt' }
      </button>

    </div>
  );
};

export default ProgramFilterItem;