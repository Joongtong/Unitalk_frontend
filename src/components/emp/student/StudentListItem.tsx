import React from 'react'
import 'assets/styles/ListItem.css';
import { IStudentListItem } from 'types/interface';
import { useRecoilState } from 'recoil';
import { selectedStudentState } from 'utils/recoilState';

interface Props {
    studentListItem: IStudentListItem;
}

//component: Student List Item 컴포넌트
function StudentListItem({ studentListItem }: Props) {

    // properties
    const { studentId, deptId, studentName, studentEmail, studentPhoneNumber, grade, employeeName } = studentListItem;
    const [selectedStudent, setSelectedStudent] = useRecoilState(selectedStudentState);

    // event handler: 게시물 아이템 클릭 이벤트 처리 함수
    const onClickHandler = () => {
        if(selectedStudent === studentId) {
            setSelectedStudent(null);
        } else {
            setSelectedStudent(studentId);
        }
    }

    // render: Student List Item 컴포넌트 렌더링
    return (
        <>
            <div className='student-list-item-content'>
                <div className='list-content-text'>{ studentId }</div>
                <div className='list-content-text'>{ deptId }</div>
                <div className='list-content-text'>{ studentName }</div>
                <div className='list-content-text'>{ studentEmail }</div>
                <div className='list-content-text'>{ studentPhoneNumber }</div>
                <div className='list-content-text'>{ grade }</div>
                <div className='list-content-text'>{ employeeName }</div>
                <div className='list-content-text'>
                    <button 
                        className={`select-btn ${selectedStudent === studentId ? 'selected' : ''}`}
                        onClick={ onClickHandler }
                        disabled={ selectedStudent !== null && selectedStudent !== studentId }
                    >
                        { selectedStudent === studentId ? '취소' : '선택' }
                    </button>
                </div>
            </div>
        </>
    )
}

export default StudentListItem;