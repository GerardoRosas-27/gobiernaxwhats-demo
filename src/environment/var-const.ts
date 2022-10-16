import { CatalogTypeChat } from "@interfaces/chat-ui.interface";

export const TypeInputUser = {
    text: "text",
    interactive: "interactive",
    image: "image",
    document: "document",
    video: "video",
    location: "location"
}

export const catalogTypeChat: CatalogTypeChat[] = [
    { _id: '0', key: 'text', value: 'Texto' },
    { _id: '2', key: 'interactive', value: 'Botones' },
    { _id: '2', key: 'image', value: 'Imagen' },
    { _id: '3', key: 'document', value: 'Documento' },
    { _id: '4', key: 'video', value: 'video' },
    { _id: '5', key: 'location', value: 'Ubicación' }
]

export const catalogTypeChatInteractive: CatalogTypeChat[] = [
    { _id: '0', key: 'buttons', value: 'Botones' },
    { _id: '1', key: 'secction', value: 'Secciones con Botones' },
]


