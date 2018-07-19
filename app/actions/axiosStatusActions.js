import * as types from './actionTypes';

export function beginAxiosCall() {
    return {type: types.BEGIN_AXIOS_CALL};
}

export function endAxiosCall() {
    return {type: types.END_AXIOS_CALL};
}