import React from 'react'
import { useRecoilState } from 'recoil';

//Import Types Interface
// import { getDeptName } from 'utils/format';
import { IStudentListItem } from 'types/interface';

//Import Css
import 'assets/styles/emp/ListItem.css';

//Import States
import { selectedStudentState } from 'utils/recoilState';

interface Props {
    studentListItem: IStudentListItem;
}

//component: Student List Item 컴포넌트
function StudentListItem({ studentListItem }: Props) {

    //properties
    const { studentNo, studentId, deptId, studentName, studentEmail, studentPhoneNumber, grade, professorName } = studentListItem;
    const [selectedStudent, setSelectedStudent] = useRecoilState(selectedStudentState);

    //event handler: 게시물 아이템 클릭 이벤트 처리 함수
    const onClickHandler = () => {
        if(selectedStudent === studentNo) {
            setSelectedStudent(null);
        } else {
            setSelectedStudent(studentNo);
        }
    }

    //render: Student List Item 컴포넌트 렌더링
    return (
        <>
            <div className='student-list-item-content'>
                <div className='list-content-text'>{ studentId }</div>
                <div className='list-content-text'>{ deptId }</div>
                <div className='list-content-text'>{ studentName }</div>
                <div className='list-content-text'>{ studentEmail }</div>
                <div className='list-content-text'>{ studentPhoneNumber }</div>
                <div className='list-content-text'>{ grade }</div>
                <div className='list-content-text'>{ professorName }</div>
                <div className='list-content-text'>
                    <button 
                        className={`select-btn ${selectedStudent === studentNo ? 'selected' : ''}`}
                        onClick={ onClickHandler }
                        disabled={ selectedStudent !== null && selectedStudent !== studentNo }
                    >
                        { selectedStudent === studentNo ? '취소' : '선택' }
                    </button>
                </div>
            </div>
        </>
    )
}

export default StudentListItem;