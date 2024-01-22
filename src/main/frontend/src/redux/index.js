// src/reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import sessionReducer from './sessionReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    session: sessionReducer, // 세션 리듀서 추가
    // 다른 리듀서 추가 가능
});

export default rootReducer;
