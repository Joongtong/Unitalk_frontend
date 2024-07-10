import React from 'react';
import { useRecoilState } from 'recoil';

//Import Types Interface
import { IProfessorListItem } from 'types/interface';

//Import Css
import 'assets/styles/emp/ListItem.css';

//Import States
import { selectedProfessorState } from 'utils/recoilState';

interface Props {
    professorListItem: IProfessorListItem;
}

function ProfessorListItem({ professorListItem }: Props) {

    //properties
    const { employeeNo, employeeId, deptId, employeeName, employeeEmail, employeePhoneNumber } = professorListItem;
    const [selectedProfessor, setSelectedProfessor] = useRecoilState(selectedProfessorState);

        //event handler: 게시물 아이템 클릭 이벤트 처리 함수
    const onClickHandler = () => {
        if (selectedProfessor === employeeNo) {
            setSelectedProfessor(null);
        } else {
            setSelectedProfessor(employeeNo);
        }
    };

    //render: Professor List Item 컴포넌트 렌더링
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
                        className={`select-btn ${selectedProfessor === employeeNo ? 'selected' : ''}`}
                        onClick={ onClickHandler }
                        disabled={ selectedProfessor !== null && selectedProfessor !== employeeNo }
                    >
                        { selectedProfessor === employeeNo ? '취소' : '선택'}
                    </button>
                </div>
            </div>
        </>
    )
}

export default ProfessorListItem;