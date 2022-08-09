export interface DataMessageModel{
    user_id: string;
    chat_id: string;
    caption?: string;
    type: string;
    filename?: string;
    mime_type: string;
    sha256: string;
    id: string;
    voice?: boolean;
    url_serve: string;
    location?: {
        latitude: number;
        longitude: number;
    }
}