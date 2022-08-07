import { HydratedDocument } from 'mongoose';
import { DataChatBot } from "../../bd/schemas/chat-bot.schema";
import { ChatBotModel } from '../../models/chat-bot.model';
import { connection } from '../../bd/connection'

export async function createChatBot(data: ChatBotModel): Promise<ChatBotModel> {
    let connet = await connection();
    console.log("save: ", data);
    const instance: HydratedDocument<ChatBotModel> = new DataChatBot(data);
    let response = await instance.save();
    connet.disconnect();
    console.log("response save: ", response);
    return response
}

export async function searchChatBot(key: string): Promise<ChatBotModel[]> {
    let connet = await connection();
    let response = await DataChatBot.find({ _id: key });
    connet.disconnect();
    return response
}
export async function searchChatBots(): Promise<ChatBotModel[]> {
    let connet = await connection();
    let response = await DataChatBot.find({});
    connet.disconnect();
    return response
}

export async function removeChatBot(id: string): Promise<ChatBotModel> {
    let connet = await connection();
    let response = await DataChatBot.findByIdAndRemove(id).exec();
    connet.disconnect();
    return response;
}
export async function updateChatBot(id: string, data: ChatBotModel): Promise<ChatBotModel | null> {
    let connet = await connection();
    let response = await DataChatBot.updateOne({ _id: id }, data).exec();
    connet.disconnect();
    if (response.modifiedCount === 1) {
        return { _id: id, ...data }
    } else {
        return null
    }
}