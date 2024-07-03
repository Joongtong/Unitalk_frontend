import React from 'react'
import 'assets/styles/ListItem.css';
import { IStudentListItem } from 'types/interface';
import { useNavigate } from 'react-router-dom';

interface Props {
    studentListItem: IStudentListItem
}

//component: Student List Item 컴포넌트
function StudentListItem({ studentListItem }: Props) {

    // properties
    const { studentId, deptId, studentName, studentEmail, studentPhoneNumber, grade, employee } = studentListItem;

    // function: 네비게이트 함수
    const navigator = useNavigate();

    // event handler: 게시물 아이템 클릭 이벤트 처리 함수
    const onClickHandler = () => {
        navigator(studentId);
    }

    // render: Student List Item 컴포넌트 렌더링
    return (
        <>
            <div className='list-item-content'>
                <div className='list-content-text'>{ studentId }</div>
                <div className='list-content-text'>{ deptId }</div>
                <div className='list-content-text'>{ studentName }</div>
                <div className='list-content-text'>{ studentEmail }</div>
                <div className='list-content-text'>{ studentPhoneNumber }</div>
                <div className='list-content-text'>{ grade }</div>
                <div className='list-content-text'>{ employee }</div>
                <div className='list-content-text'>
                    <button className='select-btn' onClick={ onClickHandler }>선택</button>
                </div>
            </div>
        </>
    )
}

export default StudentListItem;