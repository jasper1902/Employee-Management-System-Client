import { BiDotsVerticalRounded } from "react-icons/bi";
import { EmployeesDataType } from "./Employee.type";
import { useState } from "react";
import EmployeeUpdateModal from "./EmployeeUpdateModal";

type Props = {
  index: number;
  toggleOptions: (index: number) => void;
  employee: EmployeesDataType;
  isOptionOpenArray: boolean[];
  deleteEmployee: (id: string) => void;
  setIsOptionOpenArrayFunction: (length: number) => void;
  employeeLength: number;
  setEmployees: (i: EmployeesDataType[]) => void;
  employees: EmployeesDataType[];
};

const EmployeeCard: React.FC<Props> = ({
  index,
  toggleOptions,
  employee,
  isOptionOpenArray,
  deleteEmployee,
  setIsOptionOpenArrayFunction,
  employeeLength,
  setEmployees,
  employees,
}) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  return (
    <>
      <div className="flex justify-end p-3">
        <BiDotsVerticalRounded onClick={() => toggleOptions(index)} />
      </div>

      {isOptionOpenArray[index] && (
        <div className={`absolute right-6 top-[-16px]`}>
          <ul className="border rounded-xl flex flex-col">
            <li
              onClick={() => {
                setIsUpdateModalOpen(true);
                setIsOptionOpenArrayFunction(employeeLength);
              }}
              className="hover:bg-gray-300 px-6 py-1 rounded-tr-xl rounded-tl-xl"
            >
              update
            </li>
            <li
              onClick={() => deleteEmployee(employee.id)}
              className="hover:bg-gray-300 px-6 py-1 rounded-br-xl rounded-bl-xl"
            >
              delete
            </li>
          </ul>
        </div>
      )}

      <div className="flex flex-col items-center justify-center flex-grow">
        <img
          src={employee.image}
          alt=""
          className="rounded-full h-24 w-24 object-cover mb-4"
        />
        <h2>{`${employee.firstName} ${employee.lastName}`}</h2>
        <p>{employee.email}</p>
      </div>

      <div className="bg-gray-400 p-1 py-2 rounded-b-xl text-center font-bold">
        <p>{employee.department}</p>
      </div>
      {isUpdateModalOpen && (
        <EmployeeUpdateModal
          onCloseModal={setIsUpdateModalOpen}
          employee={employee}
          setEmployees={setEmployees}
          employees={employees}
        />
      )}
    </>
  );
};

export default EmployeeCard;
