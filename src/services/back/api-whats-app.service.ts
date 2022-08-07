import axios, { AxiosRequestConfig } from "axios";
import { environment } from "../../environment/dev";
import { ResGeneralApi, ResMessage, ResponseError } from "../../interfaces/api-whatsapp";

const version = 'v13.0';
const idPhone = '102587869229421';
const token = 'EAAH20DjZBlJABAOCZC3T8Gmu6MVxReyQRfunA5s8JZAZBKSbcVCUBw0BgXUP2ypV7ROHgQc5iaNwtcufTIk7NnZC8ZBXV9G3cumYMOQAsj264RZChXZBWwNwMGEeUnrU7cVOtq0FYuOjf3ty25rIg9qBwCf02pQk4POAG1OWMEqfgmY2aqJgZCmX6aulkwW2jmIQIjZCKe86BfMnRlcJc8R95U'

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