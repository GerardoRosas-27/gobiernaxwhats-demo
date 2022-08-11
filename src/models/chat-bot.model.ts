export interface ButtonsModel {
    _id?: string;
    type: string;
    reply: {
        id: string;
        title: string;
    }
}
export interface RowsModel {
    id: string;
    title: string;
    description: string;
}

export interface ListModel {
    _id?: string;
    title: string;
    rows: RowsModel[];
}
export interface ItemMessageModel {
    body?: string;
    link?: string;
    filename?: string;
    caption?: string;
}
export interface DataMessageModel {
    type?: string;
    text?: string;
    image?: ItemMessageModel;
    audio?: ItemMessageModel;
    document?: ItemMessageModel;
    video?: ItemMessageModel;
    sticker?: ItemMessageModel;
}

export interface ChatBotModel {
    _id?: string;
    type: string;
    text: { body: string };
    image?: ItemMessageModel;
    audio?: ItemMessageModel;
    document?: ItemMessageModel;
    video?: ItemMessageModel;
    sticker?: ItemMessageModel;
    interactive?: {
        type: string;
        header?: DataMessageModel;
        body?: DataMessageModel
        footer?: DataMessageModel
        action?: {
            button?: string;
            buttons?: ButtonsModel[]
            sections?: ListModel[];
        }
    };
    media?: {
        type: string;
        title: string;
        id: string;
    },
    location?: {
        latitude: string;
        longitude: string;
        id: string;
    }
    input?: {
        title: string;
        id: string;
    }
    name?: string;
    productAll?: string;
    productList?: string[];
    trigger?: string;
}





