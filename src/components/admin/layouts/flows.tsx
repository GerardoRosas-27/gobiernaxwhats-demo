import React from 'react'
import HomeLayout from './home'

const FlowsLayout = (components: any) => {
    return (
        <>
            <p>Lista de flujos</p>

            {components.children}

        </>
    )
}
export default FlowsLayout
FlowsLayout.Layout = HomeLayout