import { ButtonsInterface, DataMessageInterface, ListInterface, RowsInterface, SendImageButtonsInterface } from "../interfaces/chat-bot.interface";
import { ButtonsModel, ChatBotModel, DataMessageModel, ListModel, RowsModel } from "../models/chat-bot.model";

export function converteModelToInterfaceImageButtons(data: ChatBotModel): SendImageButtonsInterface {
    let converteData: SendImageButtonsInterface = {
        type: data.type,
        text: {
            body: data.text.body
        },
        interactive: {
            type: data.interactive?.type as string,
            header: mapItemDocument(data?.interactive && data?.interactive.header),
            body: mapItemDocument(data.interactive && data.interactive?.body),
            footer: mapItemDocument(data.interactive && data.interactive?.footer),
            action: {
                buttons: data.interactive?.action?.buttons && data.interactive?.action?.buttons?.length > 0 ? itemsButtons(data.interactive?.action?.buttons) : [],
                sections: data.interactive?.action?.sections && data.interactive?.action?.sections.length > 0 ? mapListItems(data.interactive?.action?.sections) : []
            },

        }
    }
    if (!data.text.body) {
        delete converteData.text;
    }
    if ((data.interactive?.action?.buttons && data.interactive?.action?.buttons?.length === 0) && (data.interactive?.action?.buttons && data.interactive?.action?.sections && data.interactive?.action?.sections.length === 0)) {
        delete converteData.interactive
    } else {
        if (data.interactive?.action?.buttons && data.interactive?.action?.buttons?.length === 0) {
            delete converteData.interactive?.action.buttons
        }
        if (data.interactive?.action?.sections && data.interactive?.action?.sections?.length === 0) {
            delete converteData.interactive?.action.sections
        }
    }
    return converteData
}



const mapItemDocument = (data: DataMessageModel | undefined): DataMessageInterface | undefined => {
    if (data) {
        let item: DataMessageInterface = {
            type: data.type,
            text: data.text,
            image: data.image,
            audio: data.audio,
            document: data.document,
            video: data.video,
            sticker: data.sticker
        }
        data.type ? null : delete item.type;
        data.text ? null : delete item.text;
        data.image?.link ? null : delete item.image;
        data.audio?.link ? null : delete item.audio;
        data.document?.link ? null : delete item.document;
        data.video?.link ? null : delete item.video;
        data.sticker?.link ? null : delete item.sticker;
        return item
    } else {
        return undefined;
    }

}

const itemsButtons = (data: ButtonsModel[]): ButtonsInterface[] => {

    let items: ButtonsInterface[] = data.map(item => {
        return {
            type: item.type,
            reply: {
                id: item.reply.id,
                title: item.reply.title
            }
        }
    })
    return items
}
const mapListItems = (data: ListModel[]): ListInterface[] => {
    let items: ListInterface[] = data.map(item => {
        return {
            title: item.title,
            rows: mapRowsItems(item.rows)
        }
    });
    return items
}

const mapRowsItems = (data: RowsModel[]): RowsInterface[] => {
    let items: RowsInterface[] = data.map(item => {
        return {
            id: item.id,
            title: item.title,
            description: item.description
        }
    });
    return items
}
