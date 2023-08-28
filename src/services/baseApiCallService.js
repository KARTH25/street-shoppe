import axios from "axios";

export const baseApiCallService = {
    get : (url) => {
        return axios.get(url,{ params : { auth : "" } });
    },
    post : (url, requestBody) => {
        return axios.post(url,requestBody,{ params : { auth : "" } });
    },
    put : (url, requestBody) => {
        return axios.put(url,requestBody,{ params : { auth : "" } });
    },
    patch : (url, requestBody) => {
        return axios.patch(url,requestBody,{ params : { auth : "" } });
    },
    delete : (url) => {
        return axios.delete(url,{ params : { auth : "" } });
    }
}