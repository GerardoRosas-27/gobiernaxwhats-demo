import { FormModule } from '@components/admin/flows/FormModule';
import FlowsLayout from '@components/admin/layouts/flows';
import { useModuleState } from '@store/modulesFlows/ModulesContext';
import React from 'react'

const NewPage = () => {
    const { state, dispatch } = useModuleState();
    return (
        <div>
            <h1>New module</h1>
            <FormModule></FormModule>
            <p>{JSON.stringify(state.select)}</p>
        </div>
    )
}
export default NewPage;
NewPage.Layout = FlowsLayout