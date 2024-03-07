import { produce } from 'immer';
import { ALL_BRAND_FAILED, ALL_BRAND_SUCCESS, CLEAR_MESSAGE, ALL_BRAND_REQUEST } from '~/constants/brandConstant';

const initialState = {
    isLoading: false,
    isSuccess: true,
    brand: {},
    brands: [],
    message: '',
};

const brandReducer = (state = initialState, action) => {
    return produce(state, (draftState) => {
        switch (action.type) {
            case ALL_BRAND_REQUEST:
                draftState.isLoading = true;
                draftState.isSuccess = false;
                draftState.message = '';
                break;
            case ALL_BRAND_SUCCESS: {
                draftState.isSuccess = true;
                draftState.isLoading = false;
                draftState.brands = action.payload.data;
                draftState.message = action.payload.message;
                break;
            }
            case ALL_BRAND_FAILED: {
                draftState.isSuccess = false;
                draftState.isLoading = false;
                draftState.brands = [];
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

export { brandReducer };
