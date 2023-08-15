import { EmployeesDataType } from "../pages/Employees/Employee.type";

export const useSearchEmployee = (
  employees: EmployeesDataType[],
  searchTerm: string
): EmployeesDataType[] => {
  const lowerCasedSearchTerm = searchTerm.toLowerCase();

  return employees.filter((employee) =>
    doesProjectMatchSearch(employee, lowerCasedSearchTerm)
  );
};

const doesProjectMatchSearch = (
  employee: EmployeesDataType,
  searchTerm: string
): boolean => {
  const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
  const email = employee.email?.toLowerCase();
  const phoneNumber = employee.phone?.toLowerCase();
  const department = employee.department?.toLowerCase();
  const salary = employee.salary?.toString().toLowerCase();

  return (
    fullName?.includes(searchTerm) ||
    email?.includes(searchTerm) ||
    phoneNumber?.includes(searchTerm) ||
    department?.includes(searchTerm) ||
    salary?.includes(searchTerm) ||
    false
  );
};
