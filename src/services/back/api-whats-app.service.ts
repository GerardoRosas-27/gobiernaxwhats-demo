import axios, { AxiosRequestConfig } from "axios";
import { environment } from "../../environment/dev";
import { ResGeneralApi, ResMessage, ResponseError } from "../../interfaces/api-whatsapp";

const version = 'v13.0';
const idPhone = '102587869229421';
const token = 'EAAH20DjZBlJABAAy233EguZCwZCd4htdZCTt1PZCV1xsZCo5Qsoxnw71WOuEpX8te5JOzVAx060XV8Dsubdzf2O5yh0ICPEAZCsBaqFnsZCUSJede8qQqzCxFRHxopGnRQSsgNYiOW2UHdvfdIasZBNwqivEcnKl64n46W95CKZA7SZAJd1QLyiefceuX1icoHdAZBJ6q6xZAPbbXHBTtzs0PdMPj'

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