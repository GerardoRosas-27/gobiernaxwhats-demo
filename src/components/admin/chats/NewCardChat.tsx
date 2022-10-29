
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

import Fab from '@mui/material/Fab';
import { postChat } from '@services/front/chtas.services';
import { useChatState } from '@store/chats/chatsContext';
import { ChatBotModel } from '@models/chat-bot.model';
import { useModuleState } from '@store/modulesFlows/ModulesContext';
import { ModulesBotModel } from '@models/modules-bot.model';
import { putModule } from '@services/front/modules.services';

export const NewCardChat = () => {

    const { stateChat, dispatchChat } = useChatState();
    const { state, dispatch } = useModuleState();
    const addNewCardChat = async () => {

        let dataCaht: ChatBotModel = {
            type: 'text',
            text: {
                body: 'Editar mensaje'
            }
        }

        let result = await postChat(dataCaht);
        if (result.staus === 200) {
            let resultChat = result.body[0];
            dispatchChat({ type: "ADD_CHAT", payload: { data: resultChat } });

            let dataChats: string[] = state.select.chats ? state.select.chats : [];
            let data: ModulesBotModel = {
                ...state.select,
                chats: [...dataChats, resultChat._id] as string[]
            }
            let id = data._id as string;
            delete data._id;
            let resulModule = await putModule(id, data);
            console.log("modulo edit: ", resulModule);
            if (resulModule.staus === 200) {
                dispatch({ type: "SELECT_MODULE", payload: { data: resulModule.body[0] } });
            }

        }

    }

    return (
        <Fab onClick={() => addNewCardChat()} color="primary" aria-label="add">
            <AddIcon />
        </Fab>
    )
}
