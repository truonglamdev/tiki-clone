import { produce } from 'immer';
import { ALL_COLOR_FAILED, ALL_COLOR_REQUEST, ALL_COLOR_SUCCESS, CLEAR_MESSAGE } from '~/constants/colorConstant';

const initialState = {
    isLoading: false,
    isSuccess: true,
    color: {},
    colors: [],
    message: '',
};

const colorReducer = (state = initialState, action) => {
    return produce(state, (draftState) => {
        switch (action.type) {
            case ALL_COLOR_REQUEST:
                draftState.isLoading = true;
                draftState.isSuccess = false;
                draftState.message = '';
                break;
            case ALL_COLOR_SUCCESS: {
                draftState.isSuccess = true;
                draftState.isLoading = false;
                draftState.colors = action.payload.data;
                draftState.message = action.payload.message;
                break;
            }
            case ALL_COLOR_FAILED: {
                draftState.isSuccess = false;
                draftState.isLoading = false;
                draftState.colors = [];
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

export { colorReducer };
