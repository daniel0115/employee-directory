const directReporters = (
  state = { isLoading: false, error: null, data: [] },
  action
) => {
  switch (action.type) {
    case "REQUEST_REPORTERS_START":
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case "REQUEST_REPORTERS_SUCCESS":
      // console.log(`reporters in action of reducer: ${JSON.stringify(action, null, 2)}`)
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.reporters
      };
    case "REQUEST_REPORTERS_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default directReporters;
