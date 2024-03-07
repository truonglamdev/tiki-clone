import { produce } from 'immer';
import {
    ALL_CATEGORY_FAILED,
    ALL_CATEGORY_REQUEST,
    ALL_CATEGORY_SUCCESS,
    CLEAR_MESSAGE,
} from '~/constants/categoryConstant';

const initialState = {
    isLoading: false,
    isSuccess: true,
    category: {},
    categories: [],
    message: '',
};

const categoryReducer = (state = initialState, action) => {
    return produce(state, (draftState) => {
        switch (action.type) {
            case ALL_CATEGORY_REQUEST:
                draftState.isLoading = true;
                draftState.isSuccess = false;
                draftState.message = '';
                break;
            case ALL_CATEGORY_SUCCESS: {
                draftState.isSuccess = true;
                draftState.isLoading = false;
                draftState.categories = action.payload.data;
                draftState.message = action.payload.message;
                break;
            }
            case ALL_CATEGORY_FAILED: {
                draftState.isSuccess = false;
                draftState.isLoading = false;
                draftState.categories = [];
                draftState.message = action.payload.message;
                break;
            }

            case CLEAR_MESSAGE:
                draftState.message = '';
                break;
            default:
                break;
        }
    });
};

export { categoryReducer };
