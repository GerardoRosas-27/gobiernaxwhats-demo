import axios, { AxiosRequestConfig } from 'axios';
import { environment } from 'src/environment/dev';
import { responseGeneral } from '@interfaces/response';
import { ModulesBotModel } from '@models/modules-bot.model';



export const getModules = async (): Promise<responseGeneral<ModulesBotModel[]>> => {
  const config: AxiosRequestConfig = {
    headers: { 'content-type': 'application/json' },
    validateStatus: (status) => true,
  };
  const response = await axios.get(`${environment.apiAdmin}/flows`, config);

  return response.data;
};

export const postModule = async (data: ModulesBotModel): Promise<responseGeneral<ModulesBotModel[]>> => {
  const config: AxiosRequestConfig = {
    headers: { 'content-type': 'application/json' },
    validateStatus: (status) => true,
  };
  const response = await axios.post(`${environment.apiAdmin}/flows`, data, config);

  return response.data;
};
export const putModule = async (id: string, data: ModulesBotModel): Promise<responseGeneral<ModulesBotModel[]>> => {
  const config: AxiosRequestConfig = {
    headers: { 'content-type': 'application/json' },
    validateStatus: (status) => true,
  };
  const response = await axios.put(`${environment.apiAdmin}/flows/${id}`, data, config);

  return response.data;
};

export const deleteModule = async (id: string): Promise<responseGeneral<ModulesBotModel[]>> => {
  const config: AxiosRequestConfig = {
    headers: { 'content-type': 'application/json' },
    validateStatus: (status) => true,
  };
  const response = await axios.delete(`${environment.apiAdmin}/flows/${id}`, config);

  return response.data;
};


