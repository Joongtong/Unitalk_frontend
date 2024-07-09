export interface Department {
    deptId: number;
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
