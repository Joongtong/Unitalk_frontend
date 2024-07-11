export default interface IAssignmentListItem {
    assignmentNo: number; //지도교수 배정 이력 ID
    professorId: number; //교직원 ID(지도교수 ID)
    professorDeptId: string; //교직원 부서코드(지도교수 소속 학과)
    professorName: string; //교직원 이름
    studentId: number; //학생 ID
    studentDeptId: string; //학생 부서코드(학생 소속 학과)
    studentName: string; //학생 이름
    assignmentDate: string; //지도교수 배정 일시
}