import { combineReducers } from 'redux';
import { userReducer } from './authReducer';

const reducer = combineReducers({
    user: userReducer,
});
export default reducer;
