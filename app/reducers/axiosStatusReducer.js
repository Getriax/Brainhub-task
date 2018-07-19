import * as types from '../actions/actionTypes';

export default function axiosStatusReducer(state = 0, action) {
    switch (action.type) {

        case types.BEGIN_AXIOS_CALL:
            return state + 1;

        case types.END_AXIOS_CALL:
            return state - 1;

        default:
            return state;
    }
}