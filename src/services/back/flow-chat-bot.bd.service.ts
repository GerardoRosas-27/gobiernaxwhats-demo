import { HydratedDocument } from 'mongoose';
import { connection } from '../../bd/connection'
import { DataFlowChatBot } from '../../bd/schemas/flow-caht-bot.schema';
import { FlowChatBotModel } from '../../models/flow-chat-bot.model';

export async function createFlowChatBot(data: FlowChatBotModel): Promise<FlowChatBotModel> {
    let connet = await connection();
    console.log("save: ", data);
    const instance: HydratedDocument<FlowChatBotModel> = new DataFlowChatBot(data);
    let response = await instance.save();
    connet.disconnect();
    console.log("response save: ", response);
    return response
}

export async function searchFlowChatBot(key: string): Promise<FlowChatBotModel[]> {
    let connet = await connection();
    let response = await DataFlowChatBot.find({ wa_id: key });
    connet.disconnect();
    return response
}
export async function searchFlowChatBots(): Promise<FlowChatBotModel[]> {
    let connet = await connection();
    let response = await DataFlowChatBot.find({});
    connet.disconnect();
    return response
}

export async function removeFlowChatBot(id: string): Promise<FlowChatBotModel> {
    let connet = await connection();
    let response = await DataFlowChatBot.findByIdAndRemove(id).exec();
    connet.disconnect();
    return response;
}
export async function updateFlowChatBot(id: string, data: FlowChatBotModel): Promise<FlowChatBotModel | null> {
    let connet = await connection();
    let response = await DataFlowChatBot.updateOne({ _id: id }, data).exec();
    connet.disconnect();
    if (response.modifiedCount === 1) {
        return { _id: id, ...data }
    } else {
        return null
    }
}