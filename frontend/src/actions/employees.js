//Step5: write the action(get all employees)
//Action creator is functions that create actions. For most of the case in React and Redux, we dispatch an action using the action creator:
import axios from "axios";

//action creator: getEmployeeStart, getEmployeeSuccess,getEmployeeFail
function getEmployeeStart() {
  return {
    type: "REQUEST_EMPLOYEES_START"
  };
}

function getEmployeeSuccess(response) {
  return {
    type: "REQUEST_EMPLOYEES_SUCCESS",
    employee: response
  };
}

function getEmployeeFail(error) {
  return {
    type: "REQUEST_EMPLOYEES_FAIL",
    error: error
  };
}

//USE THUNK
//action is the place to get all the data from server
// .get("http://localhost:4000/api/employees") =>从后端的route里的router.get("/employees", employee_controller.getAllEmployee);到达指定url执行controler拿到数据

//下面的是一个function用到了thunk（就是在action里面return其他的action，来实现async）， 允许你在里面dispat其他的action！
export function getEmployees() {
  console.log("fetching employee list...");
  return (dispatch, store) => {
    dispatch(getEmployeeStart());
    axios
      .get("http://localhost:5000/api/employees")
      .then(response => {
        dispatch(getEmployeeSuccess(response.data.employees));
        console.log(response.data.employees);
      })
      .catch(err => {
        dispatch(getEmployeeFail(err));
      });
  };
}

//add employee action(用post)
export function addEmployee(newEmployee) {
  console.log("Adding new employees");
  console.log(newEmployee);
  return (dispatch, store) => {
    dispatch(getEmployeeStart());
    axios
      .post("http://localhost:5000/api/addNewEmployee", newEmployee)
      .then(response => {
        // console.log(response);
        dispatch(getEmployeeSuccess(response.data.employees));
        console.log(response.data.employees);
        //dispatch(getEmployees()) 是为了在添加新用户时，dispatch新的页面
        // dispatch(getEmployees(response.data.employees));
      })
      .catch(err => {
        dispatch(getEmployeeFail(err));
      });
  };
}

//delete employee action (用delete)
//step9: delete employee => 为了delete employee ，我必须得dispatch一个deleteEmployee action
//点击delete button时应该把id具体值pass过来，:id 是一个variable
export function deleteEmployee(id) {
  console.log("deleidid", id);
  return dispatch => {
    dispatch(getEmployeeStart());
    axios
      .delete(`http://localhost:5000/api/employee/${id}`)
      .then(response => {
        // dispatch(getEmployeeSuccess(response.data.employees));
        console.log(response);
        dispatch(getEmployeeSuccess(response.data.employees));
      })
      .catch(err => {
        dispatch(getEmployeeFail(err));
      });
  };
}
