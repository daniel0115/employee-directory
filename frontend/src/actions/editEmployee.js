import axios from "axios";
//import getEmployeeDetail action
import { getEmployeeDetail } from "./employeeDetail";

function editEmployeeStart() {
  return {
    type: "REQUEST_EDITEMPLOYEE_START"
  };
}

function editEmployeeSuccess(response) {
  return {
    type: "REQUEST_EDITEMPLOYEE_SUCCESS",
    detail: response.employee,
    managerName: response.managerName,
    numOfDRs: response.numOfDRs
  };
}

function editEmployeeFail(error) {
  return {
    type: "REQUEST_EDITEMPLOYEE_FAIL",
    error: error
  };
}

export function editEmployee(id, newEmployee) {
  // console.log(`Editing employee...${JSON.stringify(newEmployee)}`);
  console.log("Edit employee id:", id);
  console.log("Update employee:", newEmployee);
  return (dispatch, store) => {
    dispatch(editEmployeeStart());
    axios
      .put(`http://localhost:5000/api/employee/${id}`, newEmployee)
      .then(response => {
        dispatch(editEmployeeSuccess(response.data));
        dispatch(getEmployeeDetail(id));

        console.log(response.data);
      })
      .catch(err => {
        dispatch(editEmployeeFail(err));
      });
  };
}
