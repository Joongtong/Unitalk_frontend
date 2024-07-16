export interface Department {
    deptId: number; // 부서코드
    deptName: string; // 부서명
}

export interface User {
    userId: number; // 사용자 ID
    department: Department; // 부서코드
    userName: string; // 이름
    tel?: string; // 전화번호
    email?: string; // 이메일
    userType: string; // 사용자구분 : P 프로페서, S 스튜던트, C 카운셀러, E 임플로이
}
