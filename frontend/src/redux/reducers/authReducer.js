import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    RESET_USER_REQUEST,
    RESET_USER_SUCCESS,
    RESET_USER_FAILED,
} from '~/constants/authConstant';

const getUserFromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
const initialState = {
    user: getUserFromLocalStorage,
    order: [],
    isLoading: false,
    isSuccess: false,
    message: '',
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case RESET_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                isLoading: false,
                user: action.payload,
                message: action.message,
            };
        case RESET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                user: null,
                message: action.message,
            };
        case LOGIN_FAILED:
        case RESET_USER_FAILED:
            return {
                ...state,
                isLoading: false,
                isSuccess: false,
                user: null,
                message: action.message,
            };
        default:
            return {
                ...state,
            };
    }
};

export { userReducer };
