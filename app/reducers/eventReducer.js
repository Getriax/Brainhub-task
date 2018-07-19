import * as types from '../actions/actionTypes';

export default function eventReducer(state = [], action) {
    switch (action.type) {
        case types.CREATE_EVENT_SUCCESS:
            return [
                ...state,
                Object.assign({}, action.event)
            ];

        default:
            return state;
    }
}