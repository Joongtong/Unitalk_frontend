import React from 'react'
import { Program } from 'types/interface/program';

interface Props {
    programs: Program[];
}

const ProgramList: React.FC<Props> = ({ programs }) => {
    return (
        <div className="program-list">
            {programs.map((program) => (
                <div key={program.programNo} className="program-item">
                    {program.thumbnailFile && <div><img src={program.thumbnailFile.filePath} style={{ width: '150px', height: 'auto'}}/></div>}
                    <div>{program.programName}</div>
                    <div>Recruit Period: {program.recruitStart ? new Date(program.recruitStart).toLocaleDateString() : '기한 없음'} - {program.recruitEnd ? new Date(program.recruitEnd).toLocaleDateString() : '기한 없음'}</div>
                    <div>Operation Period: {program.operationStart ? new Date(program.operationStart).toLocaleDateString() : '기한 없음'} - {program.operationEnd ? new Date(program.operationEnd).toLocaleDateString() : '기한 없음'}</div>
                    <div>Sessions: {program.programSession}</div>
                    <div>Recruit Number: {program.recruitNum || '제한없음'}</div>
                    <div>Status: {program.status === 1 ? '신청가능' : '신청불가'}</div>
                    <div>View Count: {program.viewCnt}</div>
                </div>
            ))}
        </div>
    );
};

export default ProgramList;
