import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED } from '~/constants/authConstant';

const getUserFromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
const initialState = {
    user: getUserFromLocalStorage,
    order: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                user: action.payload,
            };
        case LOGIN_FAILED:
            return {
                ...state,
                isLoading: false,
                isError: true,
                user: null,
                message: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
};

export { userReducer };
