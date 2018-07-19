import * as types from './actionTypes';
import eventAPI from '../api/eventAPI';
import {beginAxiosCall, endAxiosCall} from './axiosStatusActions';

export function createEventSuccess(event) {
    return {type: types.CREATE_EVENT_SUCCESS, event};
}

export function saveEvent(event) {
    return function (dispatch) {
        dispatch(beginAxiosCall());
        return eventAPI.saveEvent(event)
            .then(event => {
                dispatch(createEventSuccess(event));
                dispatch(endAxiosCall());
            })
            .catch(error => dispatch(endAxiosCall()));
    }
}
