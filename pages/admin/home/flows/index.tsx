import React, { useEffect, useState } from 'react'

import { responseGeneral } from '@interfaces/response';

import { SkeletonList } from '@components/admin/flows/SkeletonList';
import CssBaseline from '@mui/material/CssBaseline';

import Container from '@mui/material/Container';
import { environment } from 'src/environment/dev';
import { ModulesBotModel } from '@models/modules-bot.model';
import { initialState, useModuleState } from '@store/modulesFlows/ModulesContext';
import { getModules } from '@services/front/modules.services';
import ListModules from '@components/admin/flows/ListModules';

const ListFlowsPage = () => {

    const { state, dispatch } = useModuleState();
    const [loading, setloading] = useState(false);

    useEffect(() => {
        
        (async function () {
            const data = await getModules()
            if (data && data.staus === 200) {
                dispatch({ type: "ADD_MODULES", payload: { data: data.body } });
                dispatch({ type: "SELECT_MODULE", payload: { data: initialState.select } });
            }
            setloading(true);
        })();
    }, [])

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">

               <ListModules></ListModules>

                <p>{JSON.stringify(state.select)}</p>

            </Container>
        </React.Fragment>
    )
}
export default ListFlowsPage;


