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
        <div className="program-list">
        {programs.map((program) => (
            <div key={program.programNo} className="program-item">
            <div>{program.status === 1 ? '신청가능' : '신청불가'}</div>
            <div className="program-name" onClick={() => onProgramClick(program)} >
                {program.programName}
            </div>
            <div>
                모집기간: {program.recruitStart ? new Date(program.recruitStart).toLocaleDateString() : '기한 없음'} ~{' '}
                {program.recruitEnd ? new Date(program.recruitEnd).toLocaleDateString() : '기한 없음'}
            </div>
            <div>
                운영기간: {program.operationStart ? new Date(program.operationStart).toLocaleDateString() : '기한 없음'} ~{' '}
                {program.operationEnd ? new Date(program.operationEnd).toLocaleDateString() : '기한 없음'}
            </div>
            <div>모집인원: {program.recruitNum || '제한없음'}</div>
            <button onClick={() => onViewApplicants(program.programNo)}>신청목록</button>
            <button onClick={() => handleEditClick(program)}>수정</button>
            <button onClick={() => handleDeleteClick(program.programNo)}>삭제</button>
            </div>
        ))}
        </div>
    );
};

export default ProgramManagementItem;
