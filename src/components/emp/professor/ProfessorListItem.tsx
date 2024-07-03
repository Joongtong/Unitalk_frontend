import React from 'react';
import 'assets/styles/ListItem.css';
import { IProfessorListItem } from 'types/interface';
import { useNavigate } from 'react-router-dom';

interface Props {
    professorListItem: IProfessorListItem
}

function ProfessorListItem({ professorListItem }: Props) {

    // properties
    const { employeeId, deptId, employeeName, employeeEmail, employeePhoneNumber } = professorListItem;

    // function: 네이게이트 함수
    const navigator = useNavigate();

    // event handler: 게시물 아이템 클릭 이벤트 처리 함수
    const onClickHandler = () => {
        navigator(employeeId);
    }

    return (
        <>
            <div className='list-item-content'>
                <div className='list-content-text'>{ employeeId }</div>
                <div className='list-content-text'>{ deptId }</div>
                <div className='list-content-text'>{ employeeName }</div>
                <div className='list-content-text'>{ employeeEmail }</div>
                <div className='list-content-text'>{ employeePhoneNumber }</div>
                <div className='list-content-text'>
                    <button className='select-btn' onClick={ onClickHandler }>선택</button>
                </div>
            </div>
        </>
    )
}

export default ProfessorListItem;