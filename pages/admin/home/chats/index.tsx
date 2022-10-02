
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




const chatsPage = () => {

    const { state, dispatch } = useChatState();
    const [loading, setloading] = useState(false);

    useEffect(() => {

        (async function () {
            const data = await getChats()
            if (data && data.staus === 200) {
                dispatch({ type: "ADD_CHATS", payload: { data: data.body } });
                dispatch({ type: "SELECT_CHAT", payload: { data: initialState.select } });
            }
            setloading(true);
        })();
    }, [])


    return (
        <React.Fragment>
            <CssBaseline />
            <Grid container direction="row" justifyContent="center" spacing={2}>
                {state.list.map(item => {
                    return (
                        <Grid item p={2} sm={4} key={item._id}>
                            <FormChat data={item}></FormChat>
                        </Grid>
                    )
                })}

            </Grid>

        </React.Fragment>
    )
}
export default chatsPage;


