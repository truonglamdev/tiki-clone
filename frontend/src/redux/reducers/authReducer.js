// import {
//     LOGIN_REQUEST,
//     LOGIN_SUCCESS,
//     LOGIN_FAILED,
//     RESET_USER_REQUEST,
//     RESET_USER_SUCCESS,
//     CLEAR_MESSAGE,
//     LOGOUT_REQUEST,
//     LOGOUT_FAILED,
//     LOGOUT_SUCCESS,
//     REGISTER_REQUEST,
//     REGISTER_SUCCESS,
//     REGISTER_FAILED,
//     FORGOT_PASSWORD_REQUEST,
//     FORGOT_PASSWORD_SUCCESS,
//     FORGOT_PASSWORD_FAILED,
//     RESET_PASSWORD_REQUEST,
//     RESET_PASSWORD_FAILED,
//     RESET_PASSWORD_SUCCESS,
// } from '~/constants/authConstant';

// const getUserFromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

// const initialState = {
//     user: getUserFromLocalStorage,
//     order: [],
//     isLoading: false,
//     isSuccess: false,
//     message: '',
//     isAuthenticated: false,
// };

// const userReducer = (state =initialState, action) => {
//     switch (action.type) {
//         case LOGIN_REQUEST:
//         case RESET_USER_REQUEST:
//         case LOGOUT_REQUEST:
//         case REGISTER_REQUEST:
//         case FORGOT_PASSWORD_REQUEST:
//         case RESET_PASSWORD_REQUEST:
//             return {
//                 ...state,
//                 isLoading: true,
//                 isSuccess: false,
//                 isAuthenticated: false,
//                 message: '',
//             };
//         case LOGIN_SUCCESS: {
//             const newUser = { ...state.user, ...action.payload.user };
//             return {
//                 ...state,
//                 isSuccess: true,
//                 isLoading: false,
//                 user: newUser,
//                 message: action.payload.message,
//                 isAuthenticated: true,
//             };
//         }

//         case RESET_USER_SUCCESS:
//             return {
//                 ...state,
//                 isLoading: false,
//                 isSuccess: true,
//                 user: null,
//                 message: '',
//                 order: [],
//                 isAuthenticated: false,
//             };
//         case LOGOUT_SUCCESS:
//             return {
//                 ...state,
//                 isLoading: false,
//                 isSuccess: true,
//                 user: null,
//                 isAuthenticated: false,
//                 message: action.payload.message,
//             };

//         case REGISTER_SUCCESS:
//             return {
//                 ...state,
//                 isLoading: false,
//                 isSuccess: true,
//                 message: action.payload.message,
//                 user: action.payload.user,
//             };
//         case FORGOT_PASSWORD_SUCCESS:
//         case RESET_PASSWORD_SUCCESS:
//             return {
//                 ...state,
//                 isLoading: false,
//                 isSuccess: true,
//                 message: action.payload.message,
//             };
//         case LOGIN_FAILED:
//         case LOGOUT_FAILED:
//         case REGISTER_FAILED:
//         case FORGOT_PASSWORD_FAILED:
//         case RESET_PASSWORD_FAILED:
//             return {
//                 ...state,
//                 isLoading: false,
//                 isSuccess: false,
//                 message: action.payload.message,
//             };
//         case CLEAR_MESSAGE:
//             return {
//                 ...state,
//                 message: '',
//             };
//         default:
//             return {
//                 state,
//             };
//     }
// };

// export { userReducer };

import { produce } from 'immer';
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
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED,
    DETAIL_USER_REQUEST,
    DETAIL_USER_SUCCESS,
    DETAIL_USER_FAILED,
    UPDATE_AVATAR_REQUEST,
    UPDATE_AVATAR_SUCCESS,
    UPDATE_AVATAR_FAILED,
    DELETE_AVATAR_REQUEST,
    DELETE_AVATAR_SUCCESS,
    DELETE_AVATAR_FAILED,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAILED,
} from '~/constants/authConstant';

const getUserFromLocalStorage =
    localStorage.getItem('user')  ? JSON.parse(localStorage.getItem('user')) : null;

const initialState = {
    user: getUserFromLocalStorage,
    order: [],
    isLoading: false,
    isSuccess: false,
    message: '',
    isAuthenticated: false,
};

const userReducer = (state = initialState, action) => {
    return produce(state, (draftState) => {
        switch (action.type) {
            case LOGIN_REQUEST:
            case RESET_USER_REQUEST:
            case LOGOUT_REQUEST:
            case REGISTER_REQUEST:
            case FORGOT_PASSWORD_REQUEST:
            case RESET_PASSWORD_REQUEST:
            case UPDATE_USER_REQUEST:
            case DETAIL_USER_REQUEST:
            case UPDATE_AVATAR_REQUEST:
            case DELETE_AVATAR_REQUEST:
            case UPDATE_PASSWORD_REQUEST:
                draftState.isLoading = true;
                draftState.isSuccess = false;
                draftState.message = '';
                break;
            case LOGIN_SUCCESS: {
                const newUser = { ...draftState.user, ...action.payload.user };
                draftState.isSuccess = true;
                draftState.isLoading = false;
                draftState.user = newUser;
                draftState.message = action.payload.message;
                draftState.isAuthenticated = true;
                break;
            }
            case RESET_USER_SUCCESS:
                draftState.isLoading = false;
                draftState.isSuccess = true;
                draftState.user = null;
                draftState.message = '';
                draftState.order = [];
                draftState.isAuthenticated = false;
                break;
            case LOGOUT_SUCCESS:
                draftState.isLoading = false;
                draftState.isSuccess = true;
                draftState.user = null;
                draftState.isAuthenticated = false;
                draftState.message = action.payload.message;
                break;
            case REGISTER_SUCCESS:
                draftState.isLoading = false;
                draftState.isSuccess = true;
                draftState.message = action.payload.message;
                draftState.user = action.payload.user;
                break;
            case UPDATE_USER_SUCCESS:
            case UPDATE_AVATAR_SUCCESS: {
                const newUser = { ...draftState.user, ...action.payload.user };
                draftState.isLoading = false;
                draftState.isSuccess = true;
                draftState.message = action.payload.message;
                draftState.user = newUser;
                break;
            }
            case DETAIL_USER_SUCCESS:
                draftState.isLoading = false;
                draftState.isSuccess = true;
                draftState.message = action.payload.message;
                draftState.user = action.payload.user;
                break;
            case FORGOT_PASSWORD_SUCCESS:
            case RESET_PASSWORD_SUCCESS:
            case DELETE_AVATAR_SUCCESS:
                draftState.isLoading = false;
                draftState.isSuccess = true;
                draftState.message = action.payload.message;
                break;
            case UPDATE_PASSWORD_SUCCESS:
                draftState.isLoading = false;
                draftState.isSuccess = true;
                draftState.isAuthenticated = false;
                draftState.message = action.payload.message;
                break;
            case LOGIN_FAILED:
            case LOGOUT_FAILED:
            case REGISTER_FAILED:
            case FORGOT_PASSWORD_FAILED:
            case RESET_PASSWORD_FAILED:
            case UPDATE_USER_FAILED:
            case DETAIL_USER_FAILED:
            case UPDATE_AVATAR_FAILED:
            case DELETE_AVATAR_FAILED:
            case UPDATE_PASSWORD_FAILED:
                draftState.isLoading = false;
                draftState.isSuccess = false;
                draftState.message = action.payload.message;
                break;
            case CLEAR_MESSAGE:
                draftState.message = '';
                break;
            default:
                break;
        }
    });
};

export { userReducer };
