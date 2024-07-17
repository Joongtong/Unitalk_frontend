// 프로그램 목록
import React from 'react';
import { IProgram } from 'types/interface/program/IProgram';
import VisibilityIcon from '@mui/icons-material/Visibility';
import 'assets/styles/program/PaginationItem.css';

interface Props {
    programs: IProgram[];
    onProgramClick: (program: IProgram) => void;
}

const ProgramListItem: React.FC<Props> = ({ programs, onProgramClick }) => {
    return (
        <div className="program-list">
            {programs.map((program) => (
                <div 
                    key={ program.programNo } 
                    onClick={() => onProgramClick(program)}
                    className='program-item-card' 
                >
                    <div className='program-card-img-top'>
                        {program.thumbnailFile && (
                            <img src={program.thumbnailFile.filePath}/>
                        )}
                        <div className={`program-status ${program.status === 1 ? 'available' : 'unavailable'}`}>
                            {program.status === 1 ? '신청가능' : '신청불가'}
                        </div>
                        <div className='program-viewCnt'>
                            <div className='program-viewCnt-icon'><VisibilityIcon/></div>
                            <div className='program-viewCnt-text'>{program.viewCnt}</div>
                        </div>
                    </div>
                    <div className='program-card-body'>
                        <div className='program-card-title'>{program.programName}</div>
                        <div></div>
                        <div className='program-card-text'>
                            모집기간: {program.recruitStart ? new Date(program.recruitStart).toLocaleDateString() : '기한 없음'} ~{' '}
                            {program.recruitEnd ? new Date(program.recruitEnd).toLocaleDateString() : '기한 없음'}
                        </div>
                        <div className='program-card-text'>
                            운영기간 : {program.operationStart ? new Date(program.operationStart).toLocaleDateString() : '기한 없음'} ~{' '}
                            {program.operationEnd ? new Date(program.operationEnd).toLocaleDateString() : '기한 없음'}
                        </div>
                        <div></div>
                        <div className='program-card-text'>
                            모집인원 : {program.recruitNum || '제한없음'}
                        </div>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default ProgramListItem;
