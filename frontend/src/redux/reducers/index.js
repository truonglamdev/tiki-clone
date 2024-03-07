import { combineReducers } from 'redux';
import { userReducer } from './authReducer';
import { colorReducer } from './colorReducer';
import { brandReducer } from './brandReducer';
import { categoryReducer } from './categoryReduce';

const reducer = combineReducers({
    auth: userReducer,
    color: colorReducer,
    brand: brandReducer,
    category: categoryReducer,
});
export default reducer;
