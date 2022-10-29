
import React, { ChangeEventHandler, useEffect, useState } from 'react'

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import { useRouter } from 'next/router'

import Alert from '@mui/material/Alert';
import { initialState, useModuleState } from '@store/modulesFlows/ModulesContext';
import { ModulesBotModel } from '@models/modules-bot.model';


const customWidth = {
    width: '100%',
    height: 'auto'
}

export const FormModule = () => {
    const router = useRouter();
    const { state, dispatch } = useModuleState();
    const [dataModule, setDataModule] = useState<ModulesBotModel>(state.select)
    

    const handleChangue: ChangeEventHandler<HTMLInputElement> = (e) => {

        setDataModule({ ...dataModule, [e.target.name]: e.target.value })
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md">
                <Grid container direction="row" spacing={2}>
                    <Grid item p={2} sm={12}>
                        <TextField style={customWidth} value={dataModule.name} name="name" onChange={handleChangue} label="Nombre" variant="standard" />
                    </Grid>
                    <Grid item p={2} sm={12}>
                        <TextField style={customWidth} value={dataModule.principal} name="principal" onChange={handleChangue} label="Principal" variant="standard" />
                    </Grid>

                    <Grid item p={2} sm={12}>
                        <TextField style={customWidth} value={dataModule.next_module_id} name="next_module_id" onChange={handleChangue} label="siguiente Modulo" variant="standard" />
                    </Grid>

                </Grid>
                <Grid container direction="row" justifyContent="center" spacing={2}>
                    <Button variant="outlined">Cancelar</Button>
                    <Button style={{ marginLeft: '10px' }} variant="contained">Guardar</Button>
                </Grid>

            </Container>
        </React.Fragment>
    )
}
