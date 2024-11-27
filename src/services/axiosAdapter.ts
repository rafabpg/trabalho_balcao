import axios, { AxiosError, AxiosResponse } from "axios";
import  api  from "./api";


type HttRequest = {
    url:string,
    method:string,
    body?:any
}

export interface HttpClient<R = any> {
    request(data:HttRequest):Promise<R>
}


export class AxiosHttpClientAdapter implements HttpClient {
    async  request(data:HttRequest){
        let axiosResponse:any;
        try {
           axiosResponse = await api.request({
                url: data.url,
                method: data.method,
                data: data.body,
            })
        } catch (error) {
            const _error = error as AxiosError<{message:string}>
            throw new Error(_error.response?.data.message)
        }
        const responseBody = axiosResponse.data === '' ? null : axiosResponse?.data;
        return {
            statusCode:axiosResponse.status,
            body: responseBody
        }
    }
}