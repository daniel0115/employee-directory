//step 8: getEmployeeDetail action to dispatch in employeeDetail page

import axios from "axios";
function getEmployeeDetailStart() {
  return {
    type: "REQUEST_EMPLOYEEDETAIL_START"
  };
}

function getEmployeeDetailSuccess(response) {
  return {
    type: "REQUEST_EMPLOYEEDETAIL_SUCCESS",
    detail: response.employee,
    managerName: response.managerName,
    numOfDRs: response.numOfDRs
  };
}

function getEmployeeDetailFail(error) {
  return {
    type: "REQUEST_EMPLOYEEDETAIL_FAIL",
    error: error
  };
}

//记住什么时候export要加default， 这里我们import getEmployeeDetail的时候，需要加{}；
// 在后端controller里，需要一个getEmployeeDetail controller
export function getEmployeeDetail(id) {
  console.log(id);
  return (dispatch, store) => {
    dispatch(getEmployeeDetailStart());
    axios
      .get(`http://localhost:5000/api/employee/${id}`)
      .then(response => {
        dispatch(getEmployeeDetailSuccess(response.data));
        console.log("em_detail:", response.data);
      })
      .catch(err => {
        dispatch(getEmployeeDetailFail(err));
      });
  };
}
