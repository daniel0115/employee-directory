const editEmployee = (
  state = { isLoading: false, error: null, editDetail: {} },
  action
) => {
  switch (action.type) {
    case "REQUEST_EDITEMPLOYEE_START":
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case "REQUEST_EDITEMPLOYEE_SUCCESS":
      // console.log(`detail in staffdetail reducer: ${JSON.stringify(action, null, 2)}`)
      return {
        ...state,
        isLoading: false,
        editDetail: action.detail,
        manager: action.managerName,
        numOfDRs: action.numOfDRs
      };
    case "REQUEST_EDITEMPLOYEE_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default editEmployee;
