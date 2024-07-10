export default interface IStudentListItem {
    studentNo: number; //학생 일련번호
    studentId: number; //학생 ID
    deptId: string; //부서코드(학과)
    studentName: string; //학생 이름
    studentEmail: string; //학생 이메일
    studentPhoneNumber: string; //학생 전화번호
    grade: number; //학년
    professorName: string; //학생 지도교수
}