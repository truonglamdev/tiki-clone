import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    RESET_USER_REQUEST,
    RESET_USER_SUCCESS,
    RESET_USER_FAILED,
    CLEAR_MESSAGE,
    LOGOUT_REQUEST,
    LOGOUT_FAILED,
    LOGOUT_SUCCESS,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
} from '~/constants/authConstant';

const getUserFromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
const initialState = {
    user: getUserFromLocalStorage,
    order: [],
    isLoading: false,
    isSuccess: false,
    message: '',
    isAuthenticated: false,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case RESET_USER_REQUEST:
        case LOGOUT_REQUEST:
        case REGISTER_REQUEST:
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
                isAuthenticated: true,
            };
        case RESET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                user: null,
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                user: null,
                isAuthenticated: false,
                message: action.message,
            };

        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                message: action.message,
            };
        case LOGIN_FAILED:
        case RESET_USER_FAILED:
        case LOGOUT_FAILED:
        case REGISTER_FAILED:
            return {
                ...state,
                isLoading: false,
                isSuccess: false,
                user: null,
                message: action.message,
                isAuthenticated: false,
            };
        case CLEAR_MESSAGE:
            return {
                ...state,
                message: '',
            };
        default:
            return {
                state,
            };
    }
};

export { userReducer };
