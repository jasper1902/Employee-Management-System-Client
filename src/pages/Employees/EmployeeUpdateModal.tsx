import React, { ChangeEvent, useState, MouseEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { AddEmployeeType, EmployeesDataType } from "./Employee.type";
import { usePutRequest } from "../../hook/usePutRequest";

interface EmployeeModalProps {
  onCloseModal: (i: boolean) => void;
  employee: EmployeesDataType;
  setEmployees: (i: EmployeesDataType[]) => void;
  employees: EmployeesDataType[];
}

const EmployeeUpdateModal: React.FC<EmployeeModalProps> = ({
  onCloseModal,
  employee,
  setEmployees,
  employees,
}) => {
  const [putData, { data: putDataResponse, status }] =
    usePutRequest<EmployeeModalProps>(
      `${import.meta.env.VITE_API_URL}/api/employee/update/${employee.id}`,
      localStorage.getItem("token") ?? ""
    );

  const { register, handleSubmit, formState } = useForm<AddEmployeeType>({
    defaultValues: employee,
  });
  const { errors } = formState;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onCloseModal(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const updateEmployeeData = [...employees].map((employee) => {
      if (employee.id === putDataResponse?.employee.id) {
        return putDataResponse.employee;
      }
      return employee;
    });
    setEmployees(updateEmployeeData);
    
    if (status === 200) {
      onCloseModal(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [putDataResponse?.employee, status]);

  const handleFileSelection = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const onSubmit = (data: AddEmployeeType) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("salary", String(data.salary));
    formData.append("department", data.department);
    formData.append("hireDate", String(data.hireDate));
    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    putData(formData);
  };

  const handleContainerClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCloseModal(false);
    }
  };

  return (
    <div
      onClick={handleContainerClick}
      className="fixed bg-black inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center overflow-auto z-10"
    >
      <div className="max-w-[960px] mx-auto mt-10 bg-white rounded-md p-4 ">
        <div className="flex justify-end ">
          <RxCross2
            className="cursor-pointer"
            onClick={() => onCloseModal(false)}
          />
        </div>
        <h1 className="text-center font-bold">Add Employee</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-6 "
        >
          <div className="flex gap-4">
            <div className="flex flex-col w-full">
              <label htmlFor="firstName">
                Firstname{" "}
                <span className="text-sm text-red-600">
                  {errors.firstName?.message}
                </span>
              </label>
              <input
                {...register("firstName", {
                  required: { value: true, message: "Firstname is required" },
                })}
                type="text"
                id="firstName"
                className="border border-gray-400 rounded-md py-3 px-3 w-full"
                placeholder="firstName"
              />
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="lastName">
                Lastname{" "}
                <span className="text-sm text-red-600">
                  {errors.lastName?.message}
                </span>
              </label>
              <input
                {...register("lastName", {
                  required: { value: true, message: "Lastname is required" },
                })}
                type="text"
                id="lastName"
                className="border border-gray-400 rounded-md py-3 px-3 w-full"
                placeholder="lastName"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col w-full">
              <label htmlFor="email">
                Email{" "}
                <span className="text-sm text-red-600">
                  {errors.email?.message}
                </span>
              </label>
              <input
                {...register("email", {
                  required: { value: true, message: "Email is required" },
                })}
                type="email"
                id="email"
                className="border border-gray-400 rounded-md py-3 px-3 w-full"
                placeholder="Email"
              />
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="phone">
                Tel{" "}
                <span className="text-sm text-red-600">
                  {errors.phone?.message}
                </span>
              </label>
              <input
                {...register("phone", {
                  required: {
                    value: true,
                    message: "Phone number is required",
                  },
                })}
                type="tel"
                id="phone"
                className="border border-gray-400 rounded-md py-3 px-3 w-full"
                placeholder="Phone number"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col w-full">
              <label htmlFor="salary">
                Salary{" "}
                <span className="text-sm text-red-600">
                  {errors.salary?.message}
                </span>
              </label>
              <input
                {...register("salary", {
                  required: { value: true, message: "Salary is required" },
                })}
                type="number"
                id="salary"
                className="border border-gray-400 rounded-md py-3 px-3 w-full"
                placeholder="Salary"
              />
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="department">
                Department{" "}
                <span className="text-sm text-red-600">
                  {errors.phone?.message}
                </span>
              </label>
              <input
                {...register("department", {
                  required: {
                    value: true,
                    message: "Department is required",
                  },
                })}
                type="text"
                id="department"
                className="border border-gray-400 rounded-md py-3 px-3 w-full"
                placeholder="Department"
              />
            </div>
          </div>
          <label className="mb-[-14px]" htmlFor="hireDate">
            Hire Date{" "}
            <span className="text-sm text-red-600">
              {errors.hireDate?.message}
            </span>
          </label>
          <input
            {...register("hireDate", {
              required: {
                value: true,
                message: "Hire Date is required",
              },
            })}
            type="date"
            id="hireDate"
            className="border border-gray-400 rounded-md py-3 px-3 w-full"
          />
          <div className="flex items-center space-x-2">
            <label className="border border-blue-600 hover:border-blue-400 text-blue-600 hover:text-blue-400 font-bold px-4 py-2 rounded-lg cursor-pointer">
              Upload File
              <input
                type="file"
                className="hidden"
                onChange={handleFileSelection}
              />
            </label>

            <label htmlFor="imageName" className="text-gray-600">
              {selectedFile?.name}
            </label>
            <img
              className="rounded-full h-24 w-24 object-cover"
              src={
                selectedFile
                  ? URL.createObjectURL(selectedFile)
                  : employee.image
              }
              alt=""
            />
          </div>
          <button className="bg-green-600 hover:bg-green-400 rounded-md py-2 font-bold text-white">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeUpdateModal;
