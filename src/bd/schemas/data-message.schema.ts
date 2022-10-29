import mongoose, { model, Schema } from "mongoose";
import { DataMessageModel } from "../../models/data-message.model";


let dataMessageSchema = new Schema<DataMessageModel>({

    user_id: { type: String, required: true },
    chat_id: { type: String, required: true },
    type: { type: String, required: true },
    timestamp: { type: String, required: true },
    caption: { type: String, required: false },
    filename: { type: String, required: false },
    mime_type: { type: String, required: false },
    id: { type: String, required: false },
    voice: { type: Boolean, required: false },
    url_serve: { type: String, required: false },
    status_donwload: { type: Boolean, required: false },
    location: {
        latitude: { type: String, required: false },
        longitude: { type: String, required: false },
    }
});

export const DataMessage = mongoose.models.datamessages || model<DataMessageModel>("datamessages", dataMessageSchema);