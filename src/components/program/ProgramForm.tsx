// 프로그램 입력 및 수정폼
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IProgram } from 'types/interface/program/IProgram';
import { fetchProgramById, createProgram, updateProgram, fetchCounselors } from 'utils/api';
import { Employee } from 'types/interface/employee';
import axios from 'axios';
import EmpTopMenu from 'components/emp/EmpTopMenu';
import 'assets/styles/program/ProgramForm.css';

interface ProgramFormProps {
  isEdit?: boolean;
}

const ProgramForm: React.FC<ProgramFormProps> = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<string[]>([]);
  const [program, setProgram] = useState<Partial<IProgram>>({});
  const { programNo } = useParams<{ programNo: string }>();
  const [files, setFiles] = useState<File[]>([]); // 파일
  const [fileInputs, setFileInputs] = useState<number[]>([0]); // 파일 입력 관리
  const [existingFiles, setExistingFiles] = useState<any[]>([]); // 기존 파일 정보
  const [counselors, setCounselors] = useState<Employee[]>([]); // 상담사 목록

  // 데이터 가져오기
  useEffect(() => {
    const loadData = async () => {
      if (isEdit && programNo) {
        const fetchedProgram = await fetchProgramById(parseInt(programNo));
        setProgram(fetchedProgram);
        setExistingFiles(fetchedProgram.files || []); // 기존 파일 정보
      }
      // 상담사 목록
      const fetchedCounselors = await fetchCounselors();
      setCounselors(fetchedCounselors);
    };
    loadData();
  }, [isEdit, programNo]);

  // 상태값 관리
  useEffect(() => {
    const updateStatusBasedOnDates = () => {
      const now = new Date();

      if (program.recruitStart && program.recruitEnd) {
        const recruitStart = new Date(program.recruitStart);
        const recruitEnd = new Date(program.recruitEnd);

        // 현재 날짜가 모집 시작일보다 이전이거나, 모집 종료일보다 이후 신청불가
        if (now < recruitStart || now > recruitEnd) {
          setProgram(prev => ({
            ...prev,
            status: 2 // 신청불가
          }));
        } else {
          setProgram(prev => ({
            ...prev,
            status: prev.status ?? 1 // 신청가능
          }));
        }
      }
    };

    // 모집시작 및 종료에 따른 자동 상태 변경 입력
    updateStatusBasedOnDates();
  }, [program.recruitStart, program.recruitEnd]);

  // 날짜 유효성 검사
  useEffect(() => {
    validateDates();
  }, [program.recruitStart, program.recruitEnd, program.operationStart, program.operationEnd]);

  // 날짜 유효성 검사
  const validateDates = () => {
    const errors: string[] = [];
    const recruitStart = new Date(program.recruitStart || '');
    const recruitEnd = new Date(program.recruitEnd || '');
    const operationStart = new Date(program.operationStart || '');
    const operationEnd = new Date(program.operationEnd || '');

    if (recruitEnd < recruitStart) {
      errors.push('모집 종료일은 모집 시작일 이후여야 합니다.');
    }
    if (operationStart < recruitEnd) {
      errors.push('운영 시작일은 모집 종료일 이후여야 합니다.');
    }
    if (operationEnd < operationStart) {
      errors.push('운영 종료일은 운영 시작일 이후여야 합니다.');
    }

    setErrors(errors);
    return errors.length === 0;
  };

  // 폼 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 날짜 유효성 검사 실패 시 제출 중단
    if (!validateDates()) {
      return;
    }
    if (!program) return;

    // 확인 메시지
    const confirmed = window.confirm(isEdit ? '수정하시겠습니까?' : '등록하시겠습니까?');
    if (!confirmed) {
      return;
    }

    const formData = new FormData();

    // 프로그램 데이터를 JSON 문자열 변환
    const programJson = JSON.stringify({
      programName: program.programName,
      programContent: program.programContent,
      recruitStart: program.recruitStart,
      recruitEnd: program.recruitEnd,
      operationStart: program.operationStart,
      operationEnd: program.operationEnd,
      programSession: program.programSession,
      recruitNum: program.recruitNum,
      status: program.status ?? 1,
      counselorNo: program.counselor?.employeeNo
    });

    // JSON 문자열을 FormData 추가
    formData.append('program', programJson);

    // 파일이 있는 경우 추가
    files.forEach(file => {
      formData.append('files', file);
    });

    try {
      if (isEdit && programNo) {
        await updateProgram(parseInt(programNo), formData);
      } else {
        await createProgram(formData);
      }
      navigate('/program');
    } catch (error) {
      console.error('프로그램 저장 실패:', error);
    }
  };

  // 입력 필드 변경
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProgram(prev => {
      const updatedProgram = { ...prev, [name]: value };
      console.log('Updated program state:', updatedProgram);
      return updatedProgram;
    });
  };

  // 상담사 선택
  const handleCounselorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setProgram(prev => ({
      ...prev,
      counselor: {
        ...(prev.counselor as Employee),
        employeeNo: parseInt(value, 10)
      } as Employee
    }));
  };

  // 파일 입력 변경
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prevFiles => {
        const updatedFiles = [...prevFiles];
        updatedFiles.splice(index, 1, ...newFiles); // 새 파일 추가
        return updatedFiles.flat();
      });
    }
  };

  // 파일 삭제
  const handleFileDelete = async (fileId: number) => {
    try {
      // 파일 삭제 요청
      await axios.delete(`/api/program/files/${fileId}`);
      // 기존 파일 삭제
      setExistingFiles(prevFiles => prevFiles.filter(file => file.fileNo !== fileId));
    } catch (error) {
      console.error('파일 삭제 실패:', error);
    }
  };

  // 파일 입력 필드 추가
  const addFileInput = () => {
    setFileInputs(prevInputs => [...prevInputs, prevInputs.length]);
  };

  // 파일 입력 필드 삭제
  const removeFileInput = (index: number) => {
    setFileInputs(prevInputs => prevInputs.filter((_, i) => i !== index));
  };

  // 최소 날짜(시작일)
  const getMinDate = (date: string | undefined) => {
    if (date) {
      const minDate = new Date(date);
      return minDate.toISOString().split('T')[0];
    }
    return '';
  };

  // 최대 날짜(종료일)
  const getMaxDate = (date: string | undefined) => {
    if (date) {
      const maxDate = new Date(date);
      return maxDate.toISOString().split('T')[0];
    }
    return '';
  };

  if (isEdit && !program) {
    return <div>Loading...</div>;
  }

  return (
    // HTML 코드 시작지점
    
    <div className='body-section'>
        <EmpTopMenu />
    <div className='program-form-body'>
    <div className="program-form">
      <div className="program-form-title">
        <h2>{isEdit ? '프로그램 수정' : '프로그램 등록'}</h2>
      </div>
    <form onSubmit={handleSubmit}>
      {errors.length > 0 && (
        <div className="error-messages"> {errors.map((error, index) => (
            <p key={index} className="error">{error}</p>
          ))}
        </div>
      )}
  
      {/* 상담사 선택 영역 */}
      <div className='ProgramInput-coun'>
        <div className='ProgramInput-coun2'>
          <label htmlFor="counselorNo" >상담사</label>
        </div>
        <select id="counselorNo" name="counselorNo" value={program.counselor?.employeeNo || ''} onChange={handleCounselorChange} required >
          <option  value="">상담사 선택</option> {counselors.map(counselor => (
            <option key={counselor.employeeNo} value={counselor.employeeNo}>
              {counselor.user.userName} ({counselor.user.userId} {counselor.hireDate})
            </option>
          ))}
        </select>
      </div>
      
      {/* 프로그램 이름 영역 */}
      <div className='ProgramInput-title'>
        <div className='ProgramInput-title'>
          <label htmlFor="programName">프로그램 이름</label>
        </div>
        <input
          style={{ width: '100%' }}
          id="programName"
          type="text"
          name="programName"
          value={program.programName || ''}
          onChange={handleChange}
          placeholder="프로그램 이름"
          required
        />
      </div>

      {/* 프로그램 내용 */}
      <div className='ProgramInput-textarea'>
        <div className='ProgramInput-title'>
          <label htmlFor="programContent">프로그램 내용</label>
        </div>
        <textarea
          id="programContent"
          name="programContent"
          value={program.programContent || ''}
          onChange={handleChange}
          placeholder="프로그램 내용"
          required
        />
      </div>

      {/* 모집시작일 */}
      <div className='ProgramInput-date'>
        <div className='ProgramInput-title'>
          <label htmlFor="recruitStart">모집 시작일</label>
        </div>
        <input
        
          id="recruitStart"
          type="date"
          name="recruitStart"
          value={program.recruitStart || ''}
          onChange={handleChange}
          max={getMaxDate(program.recruitEnd)}
        />
      </div>

      {/* 모집 종료일 */}
      <div className='ProgramInput-date'>
      <div className='ProgramInput-title'>
        <label htmlFor="recruitEnd">모집 종료일</label>
      </div>
        <input
          id="recruitEnd"
          type="date"
          name="recruitEnd"
          value={program.recruitEnd || ''}
          onChange={handleChange}
          min={getMinDate(program.recruitStart)}
          max={getMaxDate(program.operationStart)}
        />
      </div>

      {/* 운영 시작일 */}
      <div className='ProgramInput-date'>
      <div className='ProgramInput-title'>
        <label htmlFor="operationStart">운영 시작일</label>
      </div>
        <input
          id="operationStart"
          type="date"
          name="operationStart"
          value={program.operationStart || ''}
          onChange={handleChange}
          min={getMinDate(program.recruitEnd)}
          max={getMaxDate(program.operationEnd)}
        />
      </div>

      {/* 운영 종료일 */}
      <div className='ProgramInput-date'>
      <div className='ProgramInput-title'>
        <label htmlFor="operationEnd">운영 종료일</label>
      </div>
        <input
          id="operationEnd"
          type="date"
          name="operationEnd"
          value={program.operationEnd || ''}
          onChange={handleChange}
          min={getMinDate(program.operationStart)}
        />
      </div>

      {/* 회차 */}
      <div className='ProgramInput-date'>
      <div className='ProgramInput-title'>
        <label htmlFor="programSession">회차</label>
      </div>
        <input
          id="programSession"
          type="number"
          name="programSession"
          value={program.programSession || ''}
          onChange={handleChange}
          placeholder="회차"
          required
        />
      </div>

      {/* 모집 인원 */}
      <div className='ProgramInput-date'>
      <div className='ProgramInput-title'>
        <label htmlFor="recruitNum">모집 인원</label>
      </div>
        <input
          id="recruitNum"
          type="number"
          name="recruitNum"
          value={program.recruitNum || ''}
          onChange={handleChange}
          placeholder="모집 인원"
        />
      </div>

      {/* 상태 */}
      <div className='ProgramInput-date'>
      <div className='ProgramInput-title'>
        <label htmlFor="status">상태</label>
      </div>
        <select
        style={{ width: '348px' }}
          id="status"
          name="status"
          value={program.status ?? 1}
          onChange={handleChange}
          required
        >
          <option value={1}>신청가능</option>
          <option value={2}>신청불가</option>
        </select>
      </div>

      {/* 파일 */}
      <div className='Fileadd'>
        <div className='Fileadd_title'>
          <button 
            className='Fileadd-btn'
            style={{ marginRight:'20px'}} 
            type="button" 
            onClick={addFileInput}
          >
            파일 추가
          </button>
        </div><br/>
        {existingFiles.map((file) => (
          <div key={file.fileNo}>
            <a href={file.filePath} target="_blank" rel="noopener noreferrer">
              {file.fileName}
            </a>
            <button className='create-btn2' type="button" onClick={() => handleFileDelete(file.fileNo)}>삭제</button>
          </div>
        ))}
        {fileInputs.map((_, index) => (
          <div key={index}>
            <div className='file-action-grid'>
              <div className='file-action-left'>
                <input 
                  className='custom-file-upload'
                  type="file"
                  id={`file-upload-${index}`}
                  multiple
                  onChange={(e) => handleFileChange(e, index)}
                />
              </div>
              <div className='file-action-right'>
                <button 
                  className='FileDelete-btn'
                  type="button" 
                  onClick={() => removeFileInput(index)}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='button-submit'>
      <button className='create-btn1' type="submit">{isEdit ? '수정하기' : '등록하기'}</button>
      </div>
    </form>
  </div>
</div>
</div>
  );
};

export default ProgramForm;