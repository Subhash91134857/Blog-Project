import axios from "axios"
import { API_NOTIFICATION_MESSAGE, SERVICE_URLS } from "../constants/config"
import { getAccessToken,getType } from "../utils/common-utils"

const API_URL = 'https://techblogapps.onrender.com';
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Accept": "application/json, form-data",
        "Content-Type": "application/json",

    }
})


//  Add a request interceptor
axiosInstance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        // console.log(config);
        if (config.TYPE.params) {
            config.params = config.TYPE.params;
            // console.log(config.params);
        } else if (config.TYPE.query) {
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    function (error) {
        // Do something with error
        return Promise.reject(error);
    }
)

//  Add a response interceptor

axiosInstance.interceptors.response.use(
    function (response) {
        // Any status code that falls outside the range of 200 cause this
        // function to trigger

        // Do something with response data
        // Stop Loader
        // console.log(response);
        return processResponse(response);
    },
    function (error) {
        // Stop global Loader
        return Promise.reject(processError(error))
    }
)

// If Success->return{isSuccess:true,data:object}
// if fail->return {isFailure:true,status:string,msg:string,code:int}

const processResponse = (response) => {
    if (response?.status === 200) {
        return {
            isSuccess: true,
            data: response.data
        }
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}

// If Success->return{isSuccess:true,data:object}
// if fail->return {isFailure:true,status:string,msg:string,code:int}
const processError = (error) => {
    if (error.response) {
        // Request made and server responded with a status other than
        // that fails out of the range of 200.
        console.log("ERROR IN RESPONSE", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGE.responseFailure,
            code: error.response.status
        }

    } else if (error.request) {
        // Request made but not response was received
        console.log("ERROR IN REQUEST", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGE.requestFailure,
            code: ""
        }

    } else {
        // Something happened in frontend
        console.log("ERROR IN NETWORK", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGE.networkError,
            code: ""
        }

    }
}
const API = {
};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method==='DELETE'?{}:body,
            responseType: value.responseType,
            headers: {
                authorization: getAccessToken()
            },
            TYPE: getType(value, body)
            // onUploadProgress:  (progressEvent)=> {
            //     let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            //     showUploadProgress(percentCompleted);
            // },
            // onDownloadProgress:(progressEvent)=>{
            //     if (showDownloadProgress) {
            //         let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            //         showDownloadProgress(percentCompleted);
            //     }
            // }
        });

}

export { API };