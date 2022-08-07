//-------------- Request chat-Bot


export interface ReqBotConversation {
    id: string;
    expiration_timestamp?: string;
    origin: {
        type: string;
    }
}
export interface ReqBotPricing {
    billable: boolean;
    pricing_model: string;
    category: string;
}

export interface ReqBotStatuses {
    id: string;
    status: string;
    timestamp: string;
    recipient_id: string;
    conversation: ReqBotConversation;
    pricing: ReqBotPricing;
}



//-------------- Request User

export interface ReqUserErrors {
    code: number;
    details: string;
    title: string;
}

export interface ReqMetadata {

    display_phone_number: string;
    phone_number_id: string;

}

export interface ReqUserContacts {
    profile: {
        name: string;
    },
    wa_id: string;
}
export interface ReqUserPhones {
    phone: string;
    wa_id: string;
    type: string;
}
export interface ReqUserMessageContacts {
    name: {
        first_name: string;
        formatted_name: string;
    };
    phones: ReqUserPhones[];

}

export interface ReqUserText {
    body: string;
}

export interface ReqUserDocument {
    caption?: string;
    filename?: string;
    mime_type: string;
    sha256: string;
    id: string;
    voice?: boolean;
}

export interface ReqUserMessages {
    errors?: ReqUserErrors[];
    from: string;
    id: string;
    timestamp: string;
    text?: ReqUserText;
    type: string;
    image?: ReqUserDocument;
    audio?: ReqUserDocument;
    video?: ReqUserDocument;
    document?: ReqUserDocument;
    contacts?: ReqUserMessageContacts[];
    location?: {
        latitude: number;
        longitude: number;
    };
    context?: {
        from: string;
        id: string;
    };
    interactive?: {
        type: string;
        button_reply: {
            id: string;
            title: string;
        },
        list_reply: {
            id: string;
            title: string;
            description: string;
        }
    }
}

export interface ReqValue {
    messaging_product: string;
    metadata: ReqMetadata;
    contacts?: ReqUserContacts[];
    messages?: ReqUserMessages[];
    statuses?: ReqBotStatuses[];
}

//request webhooks general 
export interface ReqChanges {
    value: ReqValue;
    field: string
}

export interface ReqEntry {
    id: string
    changes: ReqChanges[]
}
export interface ReqWebhooks {
    object: string;
    entry: ReqEntry[];
}



