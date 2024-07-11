import React from 'react';
import { Program } from 'types/interface/program/program';

interface Props {
    programs: Program[];
    onProgramClick: (program: Program) => void;
}

const ProgramList: React.FC<Props> = ({ programs, onProgramClick }) => {
    return (
        <div className="program-list">
            {programs.map((program) => (
                <div key={program.programNo} className="program-item" onClick={() => onProgramClick(program)}>
                    {program.thumbnailFile && (
                        <div>
                            <img src={program.thumbnailFile.filePath} style={{ width: '150px', height: 'auto' }} />
                        </div>
                    )}
                    <div>{program.status === 1 ? '신청가능' : '신청불가'}</div>
                    <div>조회수: {program.viewCnt}</div>

                    <div>{program.programName}</div>
                    <div>
                        모집기간: {program.recruitStart ? new Date(program.recruitStart).toLocaleDateString() : '기한 없음'} ~{' '}
                        {program.recruitEnd ? new Date(program.recruitEnd).toLocaleDateString() : '기한 없음'}
                    </div>
                    <div>
                        운영기간: {program.operationStart ? new Date(program.operationStart).toLocaleDateString() : '기한 없음'} ~{' '}
                        {program.operationEnd ? new Date(program.operationEnd).toLocaleDateString() : '기한 없음'}
                    </div>
                    <div>모집인원: {program.recruitNum || '제한없음'}</div>
                </div>
            ))}
        </div>
    );
};

export default ProgramList;
