export interface Department {
    deptId: string;
    deptName: string;
}

export interface User {
    userId: number;
    department: Department;
    userName: string;
    tel?: string;
    email?: string;
    userType: string;
}
