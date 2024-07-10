import React from 'react'

//Import Types Interface
import { formatDateTime } from 'utils/format';
import { IAssignmentListItem } from 'types/interface';

//Import Css
import 'assets/styles/emp/ListItem.css';

interface Props {
    assignmentListItem: IAssignmentListItem;
}

function AssignmentListItem({ assignmentListItem }: Props) {

    //properties
    const { assignmentId, professorId, professorDeptId, professorName, studentId, studentDeptId, studentName, assignmentDate } = assignmentListItem;

    //render: Student List Item 컴포넌트 렌더링
    return (
        <>
            <div className='assignment-list-item-content'>
                <div className='list-content-text'>{ assignmentId }</div>
                <div className='list-content-text'>{ professorId }</div>
                <div className='list-content-text'>{ professorDeptId }</div>
                <div className='list-content-text'>{ professorName }</div>
                <div className='list-content-text'>{ studentId }</div>
                <div className='list-content-text'>{ studentDeptId }</div>
                <div className='list-content-text'>{ studentName }</div>
                <div className='list-content-text'>{ formatDateTime(assignmentDate) }</div>
            </div>
        </>
    )
}

export default AssignmentListItem;