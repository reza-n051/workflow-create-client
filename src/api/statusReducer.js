const apiStatusReducer = (state, action) => {
    // loading  error successful
    switch (action.type) {
        case "INIT":
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case "FAIL":
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        case "SUCCESSFUL":
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.data
            }
        default:
            break;
    }
};
export default apiStatusReducer;
