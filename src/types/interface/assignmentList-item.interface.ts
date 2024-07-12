//지도교수 배정 이력 목록 인터페이스
export interface IAssignmentListItem {
    assignmentNo: number; //지도교수 배정 이력 ID
    professorId: number; //교직원 ID(지도교수 ID)
    professorDeptId: string; //교직원 부서코드(지도교수 소속 학과)
    professorName: string; //교직원 이름
    studentId: number; //학생 ID
    studentDeptId: string; //학생 부서코드(학생 소속 학과)
    studentName: string; //학생 이름
    assignmentDate: string; //지도교수 배정 일시
}

//지도교수 목록 인터페이스
export interface IProfessorListItem {
    employeeNo: number; //교직원 일련번호
    employeeId: number; //교직원 ID
    deptId: string; //부서코드(학과)
    employeeName: string; //교직원 이름
    employeeEmail: string; //교직원 이메일
    employeePhoneNumber: string; //교직원 전화번호
}

//학생 목록 인터페이스
export interface IStudentListItem {
    studentNo: number; //학생 일련번호
    studentId: number; //학생 ID
    deptId: string; //부서코드(학과)
    studentName: string; //학생 이름
    studentEmail: string; //학생 이메일
    studentPhoneNumber: string; //학생 전화번호
    grade: number; //학년
    professorName: string; //학생 지도교수
}