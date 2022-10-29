import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { FormModule } from '@components/admin/flows/FormModule'
import { useModuleState } from '@store/modulesFlows/ModulesContext'

const DetailPage = () => {
    const router = useRouter()

    const { state, dispatch } = useModuleState();

    useEffect(() => {
        console.log("Cargar detalle de servicio id: ", router.query.detail)
    }, [])


    return (
        <div>
            <h1>Editar modulo</h1>
            <FormModule></FormModule>
            <p>{JSON.stringify(state.select)}</p>
        </div>
    )
}
export default DetailPage