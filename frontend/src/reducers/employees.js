//step1
//Reducer: To describe the logic of how to change the state you have to write a function that takes the previous state of the app
//Reducer: and the action being dispatched, then returns the next state of the app. This function is called the .

//isLoading: 相当于一个flag，然后你可以通过这个flag判断数据是否在前端加载
//error: null: 告诉前端数据加载失败！比如在执行getEmployees这个action时，=>axios.catch(err => {dispatch(getEmployeeFail(err));}) => 报错，我们就执行action：getEmployeeFail！=>根据相应的type找到reducer，case（case "REQUEST_EMPLOYEES_FAIL":）然后return 数据

const employees = (
  state = { isLoading: false, error: null, employee: [] },
  action
) => {
  console.log(action);
  switch (action.type) {
    case "REQUEST_EMPLOYEES_START":
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case "REQUEST_EMPLOYEES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        error: null,
        employee: action.employee
      };
    case "REQUEST_EMPLOYEES_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default employees;
