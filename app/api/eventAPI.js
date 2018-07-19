import {url} from './apiUrl';
import axios from 'axios';

const eventUrl = url + "api/v1/event/";

const getData = res => {
    if(res.status === 200)
        return res.data;

    return {error: res.data, status: res.status};
};


class EventApi {

    static saveEvent(data) {
        return axios.post(eventUrl, data)
            .then(getData)
            .catch(console.error);
    }

}

export default EventApi;