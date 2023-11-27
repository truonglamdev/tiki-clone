import { combineReducers } from 'redux';
import { userReducer } from './authReducer';

const reducer = combineReducers({
    auth: userReducer,
});
export default reducer;
