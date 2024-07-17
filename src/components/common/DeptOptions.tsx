import React from 'react';
import 'assets/styles/emp/Assignment.css';

interface DeptOptionsProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DeptOptions: React.FC<DeptOptionsProps> = ({ value, onChange }) => {
    return (
        <>
            <option className='dept-dropdown-option' value='' selected={!value}>전체</option>
            <option value='kor' selected={value === 'kor'}> 국어국문학과</option>
            <option value='eng' selected={value === 'eng'}> 영어영문학과</option>
            <option value='phi' selected={value === 'phi'}> 철학과</option>
            <option value='pol' selected={value === 'pol'}> 정치외교학과</option>
            <option value='eco' selected={value === 'eco'}> 경제학과</option>
            <option value='socio' selected={value === 'socio'}> 사회학과</option>
            <option value='math' selected={value === 'math'}> 수학과</option>
            <option value='phy' selected={value === 'phy'}> 물리학과</option>
            <option value='che' selected={value === 'che'}> 화학과</option>
        </>
    );
};

export default DeptOptions;
