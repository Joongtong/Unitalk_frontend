// 프로그램 관리
import React from 'react';
import { IProgram } from 'types/interface/program/IProgram';
import { useNavigate } from 'react-router-dom';
import { deleteProgram } from 'utils/api';

interface Props {
    programs: IProgram[];
    onProgramClick: (program: IProgram) => void;
    onDeleteSuccess: () => void;
    onViewApplicants: (programNo: number) => void; // 신청인 목록
    }

const ProgramManagementItem: React.FC<Props> = ({
    programs,
    onProgramClick,
    onDeleteSuccess,
    onViewApplicants,
    }) => {
    const navigate = useNavigate();

    const handleEditClick = (program: IProgram) => {
        navigate(`/program/update/${program.programNo}`);
    };

    const handleDeleteClick = async (programNo: number) => {
        const confirmed = window.confirm('삭제하시겠습니까?');
        if (!confirmed) {
            return;
        }

        try {
            await deleteProgram(programNo);
            alert('프로그램이 삭제되었습니다.');
            onDeleteSuccess();
        } catch (error) {
            alert('프로그램 삭제에 실패했습니다.');
        }
    };

    return (
        <div className="program-management-list">
        {programs.map((program) => (
            <div key={program.programNo} className="program-list-item-content">
            <div className='list-content-text'>{program.status === 1 ? '신청가능' : '신청불가'}</div>
            <div className='list-content-text-fs' onClick={() => onProgramClick(program)} >
                {program.programName}
            </div>
            <div className='list-content-text'>
                {program.recruitStart ? new Date(program.recruitStart).toLocaleDateString() : '기한 없음'} ~{' '}
                {program.recruitEnd ? new Date(program.recruitEnd).toLocaleDateString() : '기한 없음'}
            </div>
            <div className='list-content-text'>
                {program.operationStart ? new Date(program.operationStart).toLocaleDateString() : '기한 없음'} ~{' '}
                {program.operationEnd ? new Date(program.operationEnd).toLocaleDateString() : '기한 없음'}
            </div>
            <div className='list-content-text'>{program.recruitNum || '제한없음'}</div>
            <div className='list-content-action'>
                <button 
                    className='list-content-action-btn'
                    onClick={() => onViewApplicants(program.programNo)}
                >
                    신청자
                </button>
                <button 
                    className='list-content-action-btn'
                    onClick={() => handleEditClick(program)}
                >
                    수정
                </button>
                <button 
                    className='list-content-action-btn'
                    onClick={() => handleDeleteClick(program.programNo)}
                >
                    삭제
                </button>
            </div>
            </div>
        ))}<br/>
        </div>
    );
};

export default ProgramManagementItem;
