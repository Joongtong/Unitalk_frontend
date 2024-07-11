import React from 'react';
import { Program } from 'types/interface/program/program';

interface Props {
    program: Program;
}

const Detail: React.FC<Props> = ({ program }) => {

    return (
        <div className="program-detail">
            <div>프로그램 상세보기</div>

            {/* 상단 좌측 이미지(이미지 위 모집상태) */}
            {program.thumbnailFile && (
                <div>
                    <img 
                        src={program.thumbnailFile.filePath} 
                        alt="Thumbnail" 
                        style={{ width: '150px', height: 'auto' }} 
                    />
                </div>
            )}
            <div>{program.status === 1 ? '신청가능' : '신청불가'}</div>

            {/* 상단 우측 상단 상담 정보 */}
            <div>{program.programName}</div>
            <div>{program.viewCnt}</div>
            <div>
                <b>모집기간</b> {program.recruitStart ? new Date(program.recruitStart).toLocaleDateString() : '기한 없음'} ~{' '}
                {program.recruitEnd ? new Date(program.recruitEnd).toLocaleDateString() : '기한 없음'}
            </div>
            <div>
                <b>운영기간</b> {program.operationStart ? new Date(program.operationStart).toLocaleDateString() : '기한 없음'} ~{' '}
                {program.operationEnd ? new Date(program.operationEnd).toLocaleDateString() : '기한 없음'}
            </div>
            <div><b>모집인원</b> {program.recruitNum || '제한없음'}</div>

            {/* 상단 우측 하단 상담장소 및 문의 정보 */}
            <div><b>캠퍼스</b> 강남 캠퍼스</div>
            <div><b>장소</b> 학생지원센터 집단상담실</div>

            <div><b>상담사</b> {program.counselor.user.userName}</div>
            <div><b>e-mail</b> {program.counselor.user.email}</div>
            <div><b>tel</b> 02-000-0000</div>

            {/* 상담 내용 이미지 및 텍스트 */}
            <div>{program.programContent}</div>

            {program.programFiles && program.programFiles.length > 0 ? (
                <div>
                    <div className="program-files">
                        {program.programFiles.slice(1).map(file => (
                            <div key={file.fileNo} style={{ marginBottom: '10px' }}>
                                <img 
                                    src={file.filePath} 
                                    alt={file.fileName} 
                                    style={{ width: '150px', height: 'auto' }} 
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>파일이 없습니다.</div>
            )}
        </div>
    );
};

export default Detail;
