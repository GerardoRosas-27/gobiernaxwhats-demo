import React, { ChangeEventHandler, useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { ChatBotModel } from '@models/chat-bot.model';
import { DataProps } from '@interfaces/Props';

const customWidth = {
    width: '100%',
    height: 'auto'
}

export const FormChat = (props: DataProps<ChatBotModel>) => {
    const { data } = props
    const [dataChat, setDataChat] = useState<ChatBotModel>(data)

    useEffect(() => {
        setDataChat(data)
    }, [data])

    const handleChangue: ChangeEventHandler<HTMLInputElement> = (e) => {
        let name = e.target.name === 'text' ? 'text.body': e.target.name
        setDataChat({ ...dataChat, [name]: e.target.value })
    }

    return (
        <Container maxWidth="md">
            <Grid container direction="row" spacing={1}>
                <Grid item p={2} sm={12}>
                    <TextField style={customWidth} value={dataChat.name} name="name" onChange={handleChangue} label="Nombre" variant="standard" />
                </Grid>
               

                <Grid item p={2} sm={12}>
                    <TextField style={customWidth} value={dataChat.text && dataChat.text.body ? dataChat.text.body : ''} name="text" onChange={handleChangue} label="Mensaje" variant="standard" />
                </Grid>

                <Grid item p={2} sm={12}>
                    <TextField style={customWidth} value={dataChat.type} name="type" onChange={handleChangue} label="Tipo" variant="standard" />
                </Grid>

            </Grid>
            <Grid container direction="row" justifyContent="center" spacing={2}>
                <Button variant="outlined">Cancelar</Button>
                <Button style={{ marginLeft: '10px' }} variant="contained">Guardar</Button>
            </Grid>

        </Container>
    )
}
