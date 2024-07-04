import React, { useEffect, useState } from 'react';

//Import Components
import EmpMenu from 'components/emp/EmpMenu';
import AssignmentListItem from 'components/emp/list/AssignmentListItem';

//Import Types Interface
import { IAssignmentListItem } from 'types/interface';

//Import Css
import 'assets/styles/emp/EmpHome.css';

//Import Data
import { fetchAssignments } from 'utils/api';

function ViewAssignment() {

    const [assignments, setAssignments] = useState<IAssignmentListItem[]>([]);

    useEffect(() => {
        const getAssignments = async () => {
            try {
                const data = await fetchAssignments();
                setAssignments(data);
            } catch (error) {
                console.error('Error fetching professors:', error);
            }
        };
    
        getAssignments();
    }, []);

    return (
        <>
            <section className='body-section'>
            <div className='page-title'>지도교수 관리</div><hr/>
            <div className='menu-content-grid'>
                <div className='menu-area'>
                    <EmpMenu />
                </div>
                <div className='content-area'>
                    <div className='step-title'>지도교수 배정현황</div>
                        <div className='assignment-list-item'>
                            <div className='list-item-box'>
                                <div className='assignment-list-item-category'>
                                    <div className='list-category-text'>{' 이력번호 '}</div>
                                    <div className='list-category-text'>{' 직원번호 '}</div>
                                    <div className='list-category-text'>{' 소속학과 '}</div>
                                    <div className='list-category-text'>{' 이름 '}</div>
                                    <div className='list-category-text'>{' 학생번호 '}</div>
                                    <div className='list-category-text'>{' 소속학과 '}</div>
                                    <div className='list-category-text'>{' 이름 '}</div>
                                    <div className='list-category-text'>{' 배정일시 '}</div>
                                </div>
                                {assignments.map(assignment => (
                                    <AssignmentListItem 
                                        key={ assignment.assignmentId } 
                                        assignmentListItem={ assignment } 
                                    />
                                ))}
                            </div>
                        </div>
                    </div><br/>
                </div><br/>
            </section>
        </>
    )
}

export default ViewAssignment;
