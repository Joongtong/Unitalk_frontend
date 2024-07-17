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
    <div className='filter-buttons'>

      <button 
        onClick={() => filterChange('programNo')}
        className={filter === 'programNo' ? 'filter-buttons-selected' : 'filter-buttons-unselected'}
      >
        최신순 {filter === 'programNo' }
      </button>

      <button 
        onClick={() => filterChange('recruitStart')}
        className={filter === 'recruitStart' ? 'filter-buttons-selected' : 'filter-buttons-unselected'}
      >
        모집순 {filter === 'recruitStart' }
      </button>

      <button 
        onClick={() => filterChange('operationStart')}
        className={filter === 'operationStart' ? 'filter-buttons-selected' : 'filter-buttons-unselected'}
      >
        운영순 {filter === 'operationStart' }
      </button>

      <button 
        onClick={() => filterChange('status')}
        className={filter === 'status' ? 'filter-buttons-selected' : 'filter-buttons-unselected'}
      >
        상태순 {filter === 'status' }
      </button>

      <button 
        onClick={() => filterChange('viewCnt')}
        className={filter === 'viewCnt' ? 'filter-buttons-selected' : 'filter-buttons-unselected'}
      >
        조회순 {filter === 'viewCnt' }
      </button>

    </div>
  );
};

export default ProgramFilterItem;