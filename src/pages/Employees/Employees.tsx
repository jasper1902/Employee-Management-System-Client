import { ChangeEvent, useEffect, useState } from "react";
import { useFetchData } from "../../hook/useFetchData";
import { useSearchEmployee } from "../../hook/useSearch";
import { TiPlus } from "react-icons/ti";
import { AiOutlineLogout } from "react-icons/ai";
import EmployeeCreateModal from "./EmployeeCreateModal";
import { useDeleteRequest } from "../../hook/useDeleteRequest";
import EmployeeCard from "./EmployeeCard";
import EmployeeDetail from "./EmployeeDetail";
import { EmployeesDataType } from "./Employee.type";
import Swal from "sweetalert2";
import { useAuthorization } from "../../hook/useAuthorization";
import { useNavigate } from "react-router-dom";

const Employees = () => {
  const navigate = useNavigate();
  useAuthorization(
    `${import.meta.env.VITE_API_URL}/api/account/getaccount`,
    localStorage.getItem("token") ?? ""
  );

  const { data: fetchData } = useFetchData<{ employees: EmployeesDataType[] }>(
    `${import.meta.env.VITE_API_URL}/api/employee`,
    localStorage.getItem("token") ?? ""
  );

  const [selectedEmployeeIdForDelete, setSelectedEmployeeIdForDelete] =
    useState("");
  const [deleteData, { statusCode: deleteStatusCode }] = useDeleteRequest();
  const [employeeData, setEmployeeData] = useState<EmployeesDataType[]>(
    fetchData?.employees ?? []
  );

  useEffect(() => {
    setEmployeeData(fetchData?.employees ?? []);
  }, [fetchData]);

  useEffect(() => {
    if (deleteStatusCode === 204) {
      setEmployeeData((prevEmployeeData) =>
        prevEmployeeData.filter(
          (employee) => employee.id !== selectedEmployeeIdForDelete
        )
      );
    }
  }, [deleteStatusCode, selectedEmployeeIdForDelete]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployeeDetail, setSelectedEmployeeDetail] =
    useState<EmployeesDataType>({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      hireDate: "",
      salary: "",
      department: "",
      image: "",
    });

  const filteredEmployeeData = useSearchEmployee(employeeData, searchQuery);
  const [isOptionOpenArray, setIsOptionOpenArray] = useState(
    Array(filteredEmployeeData.length).fill(false)
  );

  const setIsOptionOpenArrayFunction = (length: number) => {
    setIsOptionOpenArray(Array(length).fill(false));
  };

  useEffect(
    () => setIsOptionOpenArrayFunction(filteredEmployeeData.length),
    [filteredEmployeeData.length, searchQuery]
  );

  const toggleOptions = (index: number) => {
    setIsOptionOpenArray(() => {
      const newOptionState = Array(length).fill(false);
      if (!isOptionOpenArray[index]) {
        newOptionState[index] = !newOptionState[index];
      }
      return newOptionState;
    });
  };

  const showEmployeeDetail = (id: string) => {
    setSelectedEmployeeDetail(
      filteredEmployeeData.filter((employee) => employee.id === id)[0]
    );
  };

  const showConfirmationDialog = async (): Promise<boolean> => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton:
          "bg-red-500 hover:bg-red-400 rounded-xl px-4 py-2 font-bold text-white mx-2",
        cancelButton:
          "bg-blue-500 hover:bg-blue-400 rounded-xl px-4 py-2 font-bold text-white mx-2",
      },
      buttonsStyling: false,
    });

    const result = await swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });

    return result.isConfirmed;
  };

  const deleteEmployee = async (id: string) => {
    const confirmed = await showConfirmationDialog();
    if (!confirmed) return;
    setSelectedEmployeeIdForDelete(id);
    deleteData(
      `${import.meta.env.VITE_API_URL}/api/employee/delete/${id}`,
      localStorage.getItem("token") ?? ""
    );
  };

  const onClickLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div className="flex flex-col mb-6 sm:grid sm:grid-cols-12 bg-white bg-opacity-90 rounded-xl whitespace-pre-line break-all">
        <div className="col-span-3 min-h-screen border-zinc-100 border rounded-tl-xl rounded-bl-xl p-6 flex flex-col items-center gap-2 mx-auto w-full">
          <EmployeeDetail selectedEmployeeDetail={selectedEmployeeDetail} />
        </div>

        <div className="col-span-9 min-h-screen border-zinc-100 border rounded-tr-xl rounded-br-xl p-6">
          <div className="flex items-center justify-between">
            <h1 className="lg:text-3xl md:text-2xl text-xl font-bold mb-10">
              Employees: {filteredEmployeeData?.length}
            </h1>

            <button
              onClick={onClickLogout}
              className="bg-red-700 hover:bg-red-500 px-5 py-2 rounded-xl font-bold text-white flex items-center gap-2"
            >
              <AiOutlineLogout size={20} />
              Logout
            </button>
          </div>

          <div className="flex justify-between mb-4 items-center">
            <input
              type="text"
              className="border border-gray-400 rounded-md py-1 px-3 w-60"
              placeholder="Search"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
            />
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-blue-700 hover:bg-blue-500 px-5 py-2 rounded-xl font-bold text-white flex items-center gap-2"
            >
              <TiPlus size={20} />
              Add Employee
            </button>
          </div>

          <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-4">
            {filteredEmployeeData?.map((employee, index) => (
              <div
                key={employee.id}
                className="border relative rounded-xl flex flex-col cursor-pointer"
                onClick={() => showEmployeeDetail(employee.id)}
              >
                <EmployeeCard
                  index={index}
                  toggleOptions={toggleOptions}
                  employee={employee}
                  setEmployees={setEmployeeData}
                  employees={employeeData}
                  isOptionOpenArray={isOptionOpenArray}
                  deleteEmployee={deleteEmployee}
                  setIsOptionOpenArrayFunction={setIsOptionOpenArrayFunction}
                  employeeLength={filteredEmployeeData.length}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {isCreateModalOpen && (
        <EmployeeCreateModal
          onCloseModal={setIsCreateModalOpen}
          setEmployees={setEmployeeData}
          employees={employeeData}
        />
      )}
    </>
  );
};

export default Employees;
