//Step2
//It's important to note that you'll only have a single store in a Redux application.
// When you want to split your data handling logic,
//you'll use combineReducer() to handle different part of a single store instead of many stores.

import { combineReducers } from "redux";
import employees from "./employees";
import employeeDetail from "./employeeDetail";
import editEmployee from "./editEmployee";
import directReporters from "./directReporters";

const reducers = combineReducers({
  employees,
  employeeDetail,
  editEmployee,
  directReporters
});

export default reducers;
