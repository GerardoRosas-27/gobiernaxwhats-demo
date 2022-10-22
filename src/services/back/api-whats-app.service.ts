import axios, { AxiosRequestConfig } from "axios";
import { environment } from "../../environment/dev";
import { ResGeneralApi, ResMessage, ResponseError } from "../../interfaces/api-whatsapp";

const version = 'v13.0';
const idPhone = '102587869229421';
const token = 'EAAH20DjZBlJABAJgobmjxDhjvj0FqFE40wBqGeUC1gUZCSpiol0gr2BaNNyQWj9izsK8SZBZBcZBCL0FrqXgxXVmPtl8ILCRISAfPDpZB1lVj1jbhedAgwAoakZCZCU1bSiiWZCDUjqqZCbgHBWGFzo8mZCNAQBAW3SiWhzQGzoNWZCz7uRG3Hpu8huicjJURCrakyllmiCaufZBGRSW1XGIcgYIy'

export const apiSendMessage = async (dataMessage: any): Promise<ResGeneralApi> => {
    const config: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const url = `${environment.urlApiWhatsApp}/${version}/${idPhone}/messages`;
    let response = await axios.post(url, dataMessage, config);
    if (response.data && response.data.error) {
        return { error: response.data.error };
    } else {
        return { data: response.data }
    }
}