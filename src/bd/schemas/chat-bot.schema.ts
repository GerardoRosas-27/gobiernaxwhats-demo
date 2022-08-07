import mongoose, { model } from "mongoose";
import { ButtonsModel, ChatBotModel, DataMessageModel, ItemMessageModel, ListModel } from "../../models/chat-bot.model";

const Schema = mongoose.Schema;

let ButtonsSchema = new Schema<ButtonsModel>({
    type: { type: String, required: false },
    reply: {
        id: { type: String, required: false },
        title: { type: String, required: false },
    }
});

let ListSchema = new Schema<ListModel>({
    title: { type: String, required: false },
    rows: [
        {
            id: { type: String, required: false },
            title: { type: String, required: false },
            description: { type: String, required: false },
        }
    ]
});

let chatBot = new Schema<ChatBotModel>({
    input: {
        title: { type: String, required: false },
        id: { type: String, required: false },
    },
    type: { type: String, required: true },
    text: { body: { type: String, required: false } },
    image: {
        body: { type: String, required: false },
        link: { type: String, required: false },
        filename: { type: String, required: false },
        caption: { type: String, required: false }
    },
    audio: {
        body: { type: String, required: false },
        link: { type: String, required: false },
        filename: { type: String, required: false },
        caption: { type: String, required: false }
    },
    document: {
        body: { type: String, required: false },
        link: { type: String, required: false },
        filename: { type: String, required: false },
        caption: { type: String, required: false }
    },
    video: {
        body: { type: String, required: false },
        link: { type: String, required: false },
        filename: { type: String, required: false },
        caption: { type: String, required: false }
    },
    sticker: {
        body: { type: String, required: false },
        link: { type: String, required: false },
        filename: { type: String, required: false },
        caption: { type: String, required: false }
    },
    interactive: {
        type: { type: String, required: false },
        header: {
            type: { type: String, required: false },
            text: { type: String, required: false },
            image: {
                body: { type: String, required: false },
                link: { type: String, required: false },
                filename: { type: String, required: false },
                caption: { type: String, required: false }
            },
            audio: {
                body: { type: String, required: false },
                link: { type: String, required: false },
                filename: { type: String, required: false },
                caption: { type: String, required: false }
            },
            document: {
                body: { type: String, required: false },
                link: { type: String, required: false },
                filename: { type: String, required: false },
                caption: { type: String, required: false }
            },
            video: {
                body: { type: String, required: false },
                link: { type: String, required: false },
                filename: { type: String, required: false },
                caption: { type: String, required: false }
            },
            sticker: {
                body: { type: String, required: false },
                link: { type: String, required: false },
                filename: { type: String, required: false },
                caption: { type: String, required: false }
            },
        },
        body: {
            type: { type: String, required: false },
            text: { type: String, required: false },
            image: {
                body: { type: String, required: false },
                link: { type: String, required: false },
                filename: { type: String, required: false },
                caption: { type: String, required: false }
            },
            audio: {
                body: { type: String, required: false },
                link: { type: String, required: false },
                filename: { type: String, required: false },
                caption: { type: String, required: false }
            },
            document: {
                body: { type: String, required: false },
                link: { type: String, required: false },
                filename: { type: String, required: false },
                caption: { type: String, required: false }
            },
            video: {
                body: { type: String, required: false },
                link: { type: String, required: false },
                filename: { type: String, required: false },
                caption: { type: String, required: false }
            },
            sticker: {
                body: { type: String, required: false },
                link: { type: String, required: false },
                filename: { type: String, required: false },
                caption: { type: String, required: false }
            },
        },
        footer: { text: { type: String, required: false } },
        action: {
            button: { type: String, required: false },
            buttons: [ButtonsSchema],
            sections: [ListSchema]
        }
    },
    name: { type: String, required: false },
    productAll: { type: String, required: false },
    productList: [{ type: String, required: false }],
    trigger: { type: String, required: false },
});

export const DataChatBot = mongoose.models.chatbot || model<ChatBotModel>("chatbot", chatBot);