export interface ModulesBotInterface {
    _id?: string;
    name: string;
    principal: boolean;
    next_module_id: string;
    chats: string[]; 
}