import axios, { AxiosRequestConfig } from "axios";
import { environment } from "../../environment/dev";
import { ResGeneralApi, ResMessage, ResponseError } from "../../interfaces/api-whatsapp";

const version = 'v13.0';
const idPhone = '102587869229421';
const token = 'EAAH20DjZBlJABAAApZBlp7i8rrcIDCRQhs3nc52ZCBKB86RINcjcRtUFeYDRLLPW7Q2STyZBh9dBKsPedxH8OxTkqXiLBIGnDghZAnSrijOmqJ0cvwZAosD9yHzApZBT0udtp6U0G7JM8HrukULmEjrQZByCoeXxbDTNAvwR4mZAlDkea3I1YQ89S2p9lFEBroFahxpPcBwHyPioehZBR8PVg5'

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