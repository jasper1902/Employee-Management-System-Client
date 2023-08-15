import { EmployeesDataType } from "./Employee.type";
type Props = {
  selectedEmployeeDetail: EmployeesDataType;
};

const EmployeeDetail: React.FC<Props> = ({ selectedEmployeeDetail }) => {
  return (
    <>
      <h2 className="text-center font-bold text-xl mb-8">Full detail</h2>
      {selectedEmployeeDetail.image && (
        <img
          src={selectedEmployeeDetail?.image}
          alt=""
          className="rounded-full h-44 w-44 object-cover"
        />
      )}
      <h2 className="text-xl">{`${selectedEmployeeDetail?.firstName} ${selectedEmployeeDetail?.lastName}`}</h2>
      <p>{selectedEmployeeDetail?.department}</p>
      <p>{selectedEmployeeDetail?.email}</p>
      <p>
        {selectedEmployeeDetail?.phone && "tel: "}
        {selectedEmployeeDetail?.phone}
      </p>
      <p>
        {selectedEmployeeDetail?.salary && "salary: "}
        {selectedEmployeeDetail?.salary?.toLocaleString()}
      </p>
      <p>
        {selectedEmployeeDetail?.hireDate &&
          `hire date: ${selectedEmployeeDetail.hireDate}`}
      </p>
    </>
  );
};

export default EmployeeDetail;
