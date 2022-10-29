export interface ChatMenuPopup {
    chat: boolean;
    id: string;
    asignar: string
    trigger?: string;
    title?: string;
    description?: string;
    productos?: string[];
}

export interface CatalogTypeChat {
   _id?: string;
   key: string;
   value: string;
} 