export interface EmployeesDataType {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  hireDate?: string;
  salary?: number | string;
  department?: string;
  image?: string;
}

export interface AddEmployeeType {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  salary: number | string;
  department: string;
  hireDate: string;
}
