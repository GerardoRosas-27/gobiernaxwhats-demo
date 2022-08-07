export interface ButtonsInterface {
    type: string;
    reply: {
        id: string;
        title: string;
    }
}

export interface ItemMessageInterface {
    body?: string;
    link?: string;
    filename?: string;
    caption?: string;
}
export interface DataMessageInterface {
    type?: string;
    text?: string;
    image?: ItemMessageInterface;
    audio?: ItemMessageInterface;
    document?: ItemMessageInterface;
    video?: ItemMessageInterface;
    sticker?: ItemMessageInterface;
}

export interface ChatBotInterface {
    type: string;
    text: { body: string };
    image?: ItemMessageInterface;
    audio?: ItemMessageInterface;
    document?: ItemMessageInterface;
    video?: ItemMessageInterface;
    sticker?: ItemMessageInterface;
    interactive?: {
        type: string;
        header?: DataMessageInterface;
        body?: DataMessageInterface
        footer?: DataMessageInterface
        action?: {
            button?: string;
            buttons?: ButtonsInterface[]
            sections?: ListInterface[];
        }
    };
    name?: string;
    productAll?: string;
    productList?: string[];
    trigger?: string;
}
export interface SendTextInterface {
    type: string;
    text: { body: string };
}

export interface RowsInterface {
    id: string;
    title: string;
    description: string;
}

export interface ListInterface {
    title: string;
    rows: RowsInterface[];
}


export interface SendImageButtonsInterface {
    type: string;
    text?: {
        body: string;
    }
    interactive?: {
        type: string;
        header?: DataMessageInterface;
        body?: DataMessageInterface;
        footer?: DataMessageInterface;
        action: {
            buttons?: ButtonsInterface[];
            sections?: ListInterface[];
        }
        
    };
}