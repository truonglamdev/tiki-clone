import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    RESET_USER_REQUEST,
    RESET_USER_SUCCESS,
    CLEAR_MESSAGE,
    LOGOUT_REQUEST,
    LOGOUT_FAILED,
    LOGOUT_SUCCESS,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_FAILED,
    RESET_PASSWORD_SUCCESS,
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
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                isLoading: true,
                isSuccess: false,
                isAuthenticated: false,
                message: '',
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                isLoading: false,
                user: action.payload.user,
                message: action.payload.message,
                isAuthenticated: true,
            };
        case RESET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                user: null,
                message: '',
                order: [],
                isAuthenticated: false,
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                user: null,
                isAuthenticated: false,
                message: action.payload.message,
            };

        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                message: action.payload.message,
                user: action.payload.user,
            };
        case FORGOT_PASSWORD_SUCCESS:
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                message: action.payload.message,
            };
        case LOGIN_FAILED:
        case LOGOUT_FAILED:
        case REGISTER_FAILED:
        case FORGOT_PASSWORD_FAILED:
        case RESET_PASSWORD_FAILED:
            return {
                ...state,
                isLoading: false,
                isSuccess: false,
                message: action.payload.message,
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
