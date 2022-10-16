import axios, { AxiosRequestConfig } from "axios";
import { environment } from "../../environment/dev";
import { ResGeneralApi, ResMessage, ResponseError } from "../../interfaces/api-whatsapp";

const version = 'v13.0';
const idPhone = '102587869229421';
const token = 'EAAFIvRKvJZBoBAI5N2wU9hD7BNlAsSUaacj1xFSz0ShonScBazPP6DgfkGeeXI33lY4Q9c8aK7WvrVdxHhQzHFTSuyyX0ZB5OifOu0PCBuogNXDqF7ev6jX5zrKlniY7lvpojkwC85g9JiTibG4AtPkbh2XcZAGmoW2xENJwRYwtl6DBSIahqkNuORYccozCVVpopdvaAR0XD1ptL2B'

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