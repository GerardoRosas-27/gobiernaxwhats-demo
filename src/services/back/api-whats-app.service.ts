import axios, { AxiosRequestConfig } from "axios";
import { environment } from "../../environment/dev";
import { ResGeneralApi, ResMessage, ResponseError } from "../../interfaces/api-whatsapp";

const version = 'v13.0';
const idPhone = '102587869229421';
const token = 'EAAH20DjZBlJABAFZAVbWC8kDFsBPzQHz3RvRjE2EkCOTZB5ZC2a89NKP4CZCiJhmQlNYkyusUitRDVXPZBLkYxfOSBcmQZAfHjPfwYhOcl5yR7hTPpghI0dlQ0YG5aLwI4UPJHD5ZBmSWyf1VgoCrenVi7oMewvHnt3PyKiIkUZBShqc1H7QeyrZBySwGfyCvZAWiNVIkEPL9AAfhNe6DNTLeiJ'

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