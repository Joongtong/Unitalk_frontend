// // 프로그램 상세페이지
// import React, { useState } from 'react';
// import axios from 'axios'; 
// import { IProgram } from 'types/interface/program/IProgram';

// interface Props {
//     program: IProgram;
// }

// const ProgramDetailItem: React.FC<Props> = ({ program }) => {
//     const [applying, setApplying] = useState(false);
//     const studentNo = 1; // 임시 **************************************

//     const handleApply = async () => {
//         // 신청 여부 확인
//         const confirmApply = window.confirm('신청하시겠습니까?');
//         if (!confirmApply) {
//             return;
//         }

//         setApplying(true);

//         const applicationData = {
//             programNo: program.programNo,
//             studentNo: studentNo,
//             applicantDate: new Date().toISOString().split('T')[0],
//             status: 1,
//         };

//         console.log('신청 데이터:', applicationData); // 데이터 출력

//         try {
//             await axios.post(`/api/applicant/student`, applicationData);
//             window.alert('신청이 성공적으로 완료되었습니다.');
//         } catch (error) {
//             let errorMessage = '신청에 실패했습니다. 다시 시도해주세요.';
//             if (axios.isAxiosError(error) && error.response) {
//                 // 서버로부터 오류 메시지가 있는 경우
//                 errorMessage = error.response.data.message || errorMessage;
//             }
//             window.alert(errorMessage);
//         } finally {
//             setApplying(false);
//         }
//     };

//     return (
//         <div>
//             <div className='program-detail-title-area'>
//                 <div className='program-detail-title-text'>프로그램 상세보기</div>
//                 <div className={`program-detail-status-v2 ${program.status === 1 ? 'available' : 'unavailable'}`}>
//                     {program.status === 1 ? '신청가능' : '신청불가'}
//                 </div>
//             </div>
//             <div className="program-detail">
//                 <div className='program-detail-left'>
//                     {/* 상단 좌측 이미지(이미지 위 모집상태) */}
//                     <div className='program-detail-img'>
//                     {program.thumbnailFile && (
//                             <img
//                                 src={program.thumbnailFile.filePath}
//                                 alt="Thumbnail"
//                             />
//                         )}
//                     </div>
//                     <div className='program-detail-left-content'>{program.programContent}</div>
//                     {/* <div className={`program-detail-status ${program.status === 1 ? 'available' : 'unavailable'}`}>
//                         {program.status === 1 ? '신청가능' : '신청불가'}
//                     </div> */}
//                 </div>
                
//                 <div className='program-detail-right'>
//                     {/* 상단 우측 상단 상담 정보 */}
//                     <div className='program-detail-right-upper'>
//                         <div className='right-upper-title-text'>{program.programName}</div>
//                         <div className='right-upper-category'>
//                             <div className='right-upper-grid'>
//                                 <div className='right-upper-category'>
//                                     <div className='right-category-text'>조회수</div>
//                                     <div className='right-category-text'>모집기간</div>
//                                     <div className='right-category-text'>운영기간</div>
//                                     <div className='right-category-text'>모집인원</div>
//                                 </div>
//                                 <div className='right-upper-content'>
//                                     <div>{program.viewCnt}</div>
//                                     <div>
//                                         {program.recruitStart ? new Date(program.recruitStart).toLocaleDateString() : '기한 없음'} ~{' '}
//                                         {program.recruitEnd ? new Date(program.recruitEnd).toLocaleDateString() : '기한 없음'}
//                                     </div>
//                                     <div>
//                                         {program.operationStart ? new Date(program.operationStart).toLocaleDateString() : '기한 없음'} ~{' '}
//                                         {program.operationEnd ? new Date(program.operationEnd).toLocaleDateString() : '기한 없음'}
//                                     </div>
//                                     <div>{program.recruitNum || '제한없음'}</div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* 상단 우측 하단 상담장소 및 문의 정보 */}
//                     <div className='program-detail-right-lower'>
//                         <div className='right-lower-category'>
//                             <div className='right-category-text'>캠퍼스</div>
//                             <div className='right-category-text'>장소</div>
//                             <div className='right-category-text'>상담사</div>
//                             <div className='right-category-text'>e-mail</div>
//                             <div className='right-category-text'>tel</div>
//                         </div>
//                         <div className='right-lower-content'>
//                             <div>강남 캠퍼스</div>
//                             <div>학생지원센터 집단상담실</div>
//                             <div>{program.counselor.user.userName}</div>
//                             <div>{program.counselor.user.email}</div>
//                             <div>02-000-0000</div>
//                         </div>
//                     </div>
//                     <div className='action-area'>
//                         <button 
//                             className='apply-btn'
//                             onClick={handleApply} disabled={applying}
//                         >
//                             {applying ? '신청 중...' : '신청하기'}
//                         </button>
//                     </div>
    
//                     {/* 상담 내용 이미지 및 텍스트 */}
                    
//                     {program.files && program.files.length > 0 ? (
//                         <div>
//                             <div className="program-files">
//                                 {program.files.slice(1).map(file => (
//                                     <div key={file.fileNo} style={{ marginBottom: '10px' }}>
//                                         <img src={file.filePath} alt={file.fileName} style={{ width: '150px', height: 'auto' }} />
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     ) : (
//                         <div>파일이 없습니다.</div>
//                     )}
//                 </div>
//             </div><br/>
//         </div>
//     );
// };

// export default ProgramDetailItem;

import React, { useState } from 'react';
import axios from 'axios'; 
import { IProgram } from 'types/interface/program/IProgram';

interface Props {
    program: IProgram;
}

const ProgramDetailItem: React.FC<Props> = ({ program }) => {
    const [applying, setApplying] = useState(false);
    const studentNo = 3; // 임시 **************************************

    const handleApply = async () => {
        // 신청 여부 확인
        const confirmApply = window.confirm('신청하시겠습니까?');
        if (!confirmApply) {
            return;
        }

        setApplying(true);

        const applicationData = {
            programNo: program.programNo,
            studentNo: studentNo,
            applicantDate: new Date().toISOString().split('T')[0],
            status: 1,
        };

        console.log('신청 데이터:', applicationData); // 데이터 출력

        try {
            await axios.post(`/api/applicant/student`, applicationData);
            window.alert('신청이 성공적으로 완료되었습니다.');
        } catch (error) {
            let errorMessage = '신청에 실패했습니다. 다시 시도해주세요.';
            if (axios.isAxiosError(error) && error.response) {
                // 서버로부터 오류 메시지가 있는 경우
                errorMessage = error.response.data.message || errorMessage;
            }
            window.alert(errorMessage);
        } finally {
            setApplying(false);
        }
    };

    return (
        <div>
            <div className='program-detail-title-area'>
                <div className='program-detail-title-text'>프로그램 상세보기</div>
                <div className={`program-detail-status-v2 ${program.status === 1 ? 'available' : 'unavailable'}`}>
                    {program.status === 1 ? '신청가능' : '신청불가'}
                </div>
            </div>
            <div className="program-detail">
                <div className='program-detail-left'>
                    {/* 상단 좌측 이미지(이미지 위 모집상태) */}
                    <div className='program-detail-img'>
                        {program.thumbnailFile && (
                            <img
                                src={program.thumbnailFile.filePath}
                                alt="Thumbnail"
                            />
                        )}
                    </div><br/>
                    <div className='program-detail-content-title-text'>프로그램 내용</div>
                    <div className='program-detail-left-content'>
                        {program.programContent}
                    </div><br/>

                    {/* 추가 이미지 */}
                    {program.files && program.files.length > 0 ? (
                        <div className='program-files'>
                            {program.files.slice(1).map(file => (
                                <div key={file.fileNo} className='additional-image'>
                                    <img src={file.filePath} alt={file.fileName} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>파일이 없습니다.</div>
                    )}                    
                </div>
                
                <div className='program-detail-right'>
                    {/* 상단 우측 상단 상담 정보 */}
                    <div className='program-detail-right-upper'>
                        <div className='right-upper-title-text'>{program.programName}</div>
                        <div className='right-upper-category'>
                            <div className='right-upper-grid'>
                                <div className='right-upper-category'>
                                    <div className='right-category-text'>조회수</div>
                                    <div className='right-category-text'>모집기간</div>
                                    <div className='right-category-text'>운영기간</div>
                                    <div className='right-category-text'>모집인원</div>
                                </div>
                                <div className='right-upper-content'>
                                    <div>{program.viewCnt}</div>
                                    <div>
                                        {program.recruitStart ? new Date(program.recruitStart).toLocaleDateString() : '기한 없음'} ~{' '}
                                        {program.recruitEnd ? new Date(program.recruitEnd).toLocaleDateString() : '기한 없음'}
                                    </div>
                                    <div>
                                        {program.operationStart ? new Date(program.operationStart).toLocaleDateString() : '기한 없음'} ~{' '}
                                        {program.operationEnd ? new Date(program.operationEnd).toLocaleDateString() : '기한 없음'}
                                    </div>
                                    <div>{program.recruitNum || '제한없음'}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 상단 우측 하단 상담장소 및 문의 정보 */}
                    <div className='program-detail-right-lower'>
                        <div className='right-lower-category'>
                            <div className='right-category-text'>캠퍼스</div>
                            <div className='right-category-text'>장소</div>
                            <div className='right-category-text'>상담사</div>
                            <div className='right-category-text'>e-mail</div>
                            <div className='right-category-text'>tel</div>
                        </div>
                        <div className='right-lower-content'>
                            <div>강남 캠퍼스</div>
                            <div>학생지원센터 집단상담실</div>
                            <div>{program.counselor.user.userName}</div>
                            <div>{program.counselor.user.email}</div>
                            <div>02-000-0000</div>
                        </div>
                    </div>
                    <div className='action-area'>
                        <button 
                            className='apply-btn'
                            onClick={handleApply} disabled={applying}
                        >
                            {applying ? '신청 중...' : '신청하기'}
                        </button>
                    </div>
                </div>
            </div><br/>
        </div>
    );
};

export default ProgramDetailItem;
