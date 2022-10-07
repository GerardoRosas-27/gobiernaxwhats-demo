
import { ModulesBotModel } from "@models/modules-bot.model";
import mongoose, { model, Schema } from "mongoose";

let ModuleBot = new Schema<ModulesBotModel>({
    name: { type: String, required: true },
    principal: { type: Boolean, required: false },
    next_module_id: { type: String, required: false },
    chats: [{ type: String, required: false }],
    id_chat_principal: { type: String, required: false }
});

export const DataModulesBot = mongoose.models.modulesbot || model<ModulesBotModel>("modulesbot", ModuleBot);

