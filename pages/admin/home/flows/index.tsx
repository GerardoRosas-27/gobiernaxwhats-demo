import React, { useEffect, useState } from 'react'

import { responseGeneral } from '@interfaces/response';

import { SkeletonList } from '@components/admin/flows/SkeletonList';
import CssBaseline from '@mui/material/CssBaseline';

import Container from '@mui/material/Container';
import { environment } from 'src/environment/dev';
import { ModulesBotModel } from '@models/modules-bot.model';
import { useModuleState } from '@store/modulesFlows/ModulesContext';

const ListFlowsPage = () => {


    const { state, dispatch } = useModuleState();
    const [loading, setloading] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${environment.apiAdmin}/flows`);
            const data: responseGeneral<ModulesBotModel[]> = await response.json()
            data && dispatch({ type: "ADD_MODULES", payload: { data: data.body } });
            setloading(true);
        }
        fetchData().catch(error => {
            setloading(true);
        })
    }, [])
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">

                {state.map(item => {
                    return (
                        <h1 key={item._id}>{item.name}</h1>
                    )
                })}

            </Container>
        </React.Fragment>
    )
}
export default ListFlowsPage;


