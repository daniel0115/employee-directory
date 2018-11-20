//step 8: 我们需要employeeDetail reducedr to set the state and update by dispatch action

const employeeDetail = (
  state = { isLoading: false, error: null, detail: {} },
  action
) => {
  switch (action.type) {
    case "REQUEST_EMPLOYEEDETAIL_START":
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case "REQUEST_EMPLOYEEDETAIL_SUCCESS":
      return {
        ...state,
        isLoading: false,
        detail: action.detail,
        managerName: action.managerName,
        numOfDRs: action.numOfDRs
      };
    case "REQUEST_EMPLOYEEDETAIL_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default employeeDetail;
