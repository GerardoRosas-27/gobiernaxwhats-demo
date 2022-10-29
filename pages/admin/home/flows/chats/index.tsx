
import React, { ChangeEventHandler, useEffect, useState } from 'react'

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import { useRouter } from 'next/router'

import Alert from '@mui/material/Alert';
import { FormChat } from '@components/admin/chats/FormChat';
import { getChats } from '@services/front/chtas.services';
import { initialState, useChatState } from '@store/chats/chatsContext';
import CardInfoModule from '@components/admin/chats/CardInfoModule';
import { useModuleState } from '@store/modulesFlows/ModulesContext';
import { ChatBotModel } from '@models/chat-bot.model';
import { NewCardChat } from '@components/admin/chats/NewCardChat';




const chatsPage = () => {
    const { state, dispatch } = useModuleState();
    const { stateChat, dispatchChat } = useChatState();

    const [loading, setloading] = useState(false);

    useEffect(() => {

        (async function () {
            const result = await getChats()

            if (result && result.staus === 200) {
                let data: ChatBotModel[] = [];
                let dataChats: string[] = state && state.select && state.select.chats && state.select.chats?.length > 0 ? state.select.chats : [];
                console.log("id slect chats:", dataChats)
                data = result.body.filter(item1 => item1._id === dataChats.filter(item2 => item2 === item1._id)[0]);
                console.log("slect chats:", data)
                dispatchChat({ type: "ADD_CHATS", payload: { data } });
                dispatchChat({ type: "SELECT_CHAT", payload: { data: initialState.select } });
            }
            setloading(true);
        })();
    }, [])


    return (
        <React.Fragment>
            <CssBaseline />

            <Grid container direction="row" justifyContent="center" spacing={2}>
                <Grid item p={2} sm={10} >
                    <CardInfoModule></CardInfoModule>
                </Grid>
                <Grid item p={2} sm={2}>
                    <NewCardChat></NewCardChat>
                </Grid>

            </Grid>
            <Grid container direction="row" justifyContent="center" spacing={2}>
                {stateChat.filter.map(item => {
                    return (
                        <Grid item p={2} sm={12} md={6} lg={4} key={item._id}>
                            <FormChat data={item}></FormChat>
                        </Grid>
                    )
                })}

            </Grid>

        </React.Fragment>
    )
}
export default chatsPage;


