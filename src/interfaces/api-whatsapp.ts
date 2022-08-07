export interface ReqText {
    body: string;
}

export interface ReqMessage {
    messaging_product: string;
    preview_url: boolean;
    recipient_type: string;
    to: string;
    type: string;
    text: ReqText;
}
export interface ResContacts {
    input: string;
    wa_id: string;
}

export interface ResponseMsgMessages {
    id: string;
}

export interface ResMessage {
    messaging_product: string;
    contacts: ResContacts[];
    messages: ResponseMsgMessages[];
}
export interface ResponseError{
    error: {
        message: string;
        type: string;
        code: number;
        fbtrace_id: string;
    }
}

export interface ResGeneralApi{
    data?: ResMessage;
    error?: ResponseError;
}

