import {combineReducers} from 'redux';
import events from './eventReducer';
import axiosCalls from './axiosStatusReducer';

const rootReducer = combineReducers({
    events,
    axiosCalls
});

export default rootReducer;
