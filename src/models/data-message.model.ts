export interface DataMessageModel{
    _id?: string;
    user_id: string;
    chat_id: string;
    type: string;
    timestamp: string;
    caption?: string;
    filename?: string;
    mime_type?: string;
    id?: string;
    voice?: boolean;
    url_serve?: string;
    status_donwload?: boolean;
    location?: {
        latitude?: string;
        longitude?: string;
    }
}