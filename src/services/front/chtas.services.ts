import axios, { AxiosRequestConfig } from 'axios';
import { environment } from 'src/environment/dev';
import { responseGeneral } from '@interfaces/response';
import { ChatBotModel } from '@models/chat-bot.model';



export const getChats = async (): Promise<responseGeneral<ChatBotModel[]>> => {
  const config: AxiosRequestConfig = {
    headers: { 'content-type': 'application/json' },
    validateStatus: (status) => true,
  };
  const response = await axios.get(`${environment.apiAdmin}/chats`, config);

  return response.data;
};

export const postChat = async (data: ChatBotModel): Promise<responseGeneral<ChatBotModel[]>> => {
  const config: AxiosRequestConfig = {
    headers: { 'content-type': 'application/json' },
    validateStatus: (status) => true,
  };
  const response = await axios.post(`${environment.apiAdmin}/chats`, data, config);

  return response.data;
};
export const putChat = async (id: string, data: ChatBotModel): Promise<responseGeneral<ChatBotModel[]>> => {
  const config: AxiosRequestConfig = {
    headers: { 'content-type': 'application/json' },
    validateStatus: (status) => true,
  };
  const response = await axios.put(`${environment.apiAdmin}/chats/${id}`, data, config);

  return response.data;
};

export const deleteChat = async (id: string): Promise<responseGeneral<ChatBotModel[]>> => {
  const config: AxiosRequestConfig = {
    headers: { 'content-type': 'application/json' },
    validateStatus: (status) => true,
  };
  const response = await axios.delete(`${environment.apiAdmin}/chats/${id}`, config);

  return response.data;
};


