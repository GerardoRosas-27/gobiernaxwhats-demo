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

export interface ResErrorUrlImg {
    message: string;
    type: string;
    code: number;
    error_subcode: number;
    fbtrace_id: string;
}

export interface ResUrlImage{
    url?: string;
    mime_type?: string;
    sha256?: string;
    file_size?: number;
    id?: string;
    messaging_product?: string;
    error?: ResErrorUrlImg
}

