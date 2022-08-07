import mongoose, { model, Schema } from "mongoose";
import { FlowChatBotModel } from "../../models/flow-chat-bot.model";

let FlowchatBot = new Schema<FlowChatBotModel>({
    user_phone: { type: String, required: true },
    wa_id: { type: String, required: true },
    status_chat_bot: { type: Boolean, required: true },
    flow_module: { type: String, required: true },
    flow_chat: { type: String, required: true },
    id_response_bot: { type: String, required: true },
});

export const DataFlowChatBot = mongoose.models.flowchatbot || model<FlowChatBotModel>("flowchatbot", FlowchatBot);