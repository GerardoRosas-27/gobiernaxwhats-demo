import { ModulesBotModel } from "@models/modules-bot.model";
import { HydratedDocument } from "mongoose";
import { connection } from "src/bd/connection";
import { DataModulesBot } from "src/bd/schemas/modules-bot.schema";

export async function postModule(data: ModulesBotModel): Promise<ModulesBotModel> {
    let connet = await connection();
    console.log("save: ", data);
    const instance: HydratedDocument<ModulesBotModel> = new DataModulesBot(data);
    let response = await instance.save();
    connet.disconnect();
    console.log("response save: ", response);
    return response
}
export async function getModules(): Promise<ModulesBotModel[]> {
    let connet = await connection();
    let response = await DataModulesBot.find({});
    connet.disconnect();
    return response
}
export async function getModule(key: string): Promise<ModulesBotModel[]> {
    let connet = await connection();
    let response = await DataModulesBot.find({ _id: key });
    connet.disconnect();
    return response
}
export async function putModule(id: string, data: ModulesBotModel): Promise<ModulesBotModel | null> {
    let connet = await connection();
    let response = await DataModulesBot.updateOne({ _id: id }, data).exec();
    connet.disconnect();
    if (response.modifiedCount === 1) {
        return { _id: id, ...data }
    } else {
        return null
    }
}

export async function deleteModule(id: string): Promise<ModulesBotModel> {
    let connet = await connection();
    let response = await DataModulesBot.findByIdAndRemove(id).exec();
    connet.disconnect();
    return response;
}