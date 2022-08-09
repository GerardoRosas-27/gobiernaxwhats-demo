import axios, { AxiosRequestConfig } from "axios";
import { environment } from "../../environment/dev";
import { ResGeneralApi, ResMessage, ResponseError } from "../../interfaces/api-whatsapp";

const version = 'v13.0';
const idPhone = '102587869229421';
const token = 'EAAH20DjZBlJABADYJmAG7QsVkZBMbVlVpmaFTnZC4NEnyjE9YBGyRm5xbmamqHMFdTy9M7VbEOGlIdFF9ZBTlERIfAUUX5nDBfaD5MJY6tzT2L1ZCcN8rWRgauFexUy0HbNJAxfUo3GZAZAbWEn0ZCZAgxmAwdmtIfL7B7XZCNtbpZBEJCJBUayQVln8coHm08nEAF7995Fzkk31RDKLXqicvkj'

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