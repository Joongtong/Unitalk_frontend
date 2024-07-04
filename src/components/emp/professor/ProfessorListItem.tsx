import React from 'react';
import 'assets/styles/ListItem.css';
import { IProfessorListItem } from 'types/interface';
import { useRecoilState } from 'recoil';
import { selectedProfessorState } from 'utils/recoilState';

interface Props {
    professorListItem: IProfessorListItem;
}

function ProfessorListItem({ professorListItem }: Props) {

    // properties
    const { employeeId, deptId, employeeName, employeeEmail, employeePhoneNumber } = professorListItem;
    const [selectedProfessor, setSelectedProfessor] = useRecoilState(selectedProfessorState);

    // event handler: 게시물 아이템 클릭 이벤트 처리 함수
    const onClickHandler = () => {
        if (selectedProfessor === employeeId) {
            setSelectedProfessor(null);
        } else {
            setSelectedProfessor(employeeId);
        }
    };

    // render: Professor List Item 컴포넌트 렌더링
    return (
        <>
            <div className='professor-list-item-content'>
                <div className='list-content-text'>{ employeeId }</div>
                <div className='list-content-text'>{ deptId }</div>
                <div className='list-content-text'>{ employeeName }</div>
                <div className='list-content-text'>{ employeeEmail }</div>
                <div className='list-content-text'>{ employeePhoneNumber }</div>
                <div className='list-content-text'>
                    <button 
                        className={`select-btn ${selectedProfessor === employeeId ? 'selected' : ''}`}
                        onClick={ onClickHandler }
                        disabled={ selectedProfessor !== null && selectedProfessor !== employeeId }
                    >
                        { selectedProfessor === employeeId ? '취소' : '선택'}
                    </button>
                </div>
            </div>
        </>
    )
}

export default ProfessorListItem;