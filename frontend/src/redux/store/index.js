import reducer from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
const loggerMiddleware = createLogger({
    // predicate: () => process.env.NODE_ENV === 'development',
});
const middleWare = [];
middleWare.push(thunk);
middleWare.push(loggerMiddleware);
import thunk from 'redux-thunk';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, {}, composeEnhancers(applyMiddleware(...middleWare)));
export default store;
