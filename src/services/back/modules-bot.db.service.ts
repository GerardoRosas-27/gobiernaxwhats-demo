import { ModulesBotModel } from "@models/modules-bot.model";
import { HydratedDocument } from "mongoose";
import { connection } from "src/bd/connection";
import { DataModulesBot } from "src/bd/schemas/modules-bot.schema";

export async function createFlowChatBot(data: ModulesBotModel): Promise<ModulesBotModel> {
    let connet = await connection();
    console.log("save: ", data);
    const instance: HydratedDocument<ModulesBotModel> = new DataModulesBot(data);
    let response = await instance.save();
    connet.disconnect();
    console.log("response save: ", response);
    return response
}